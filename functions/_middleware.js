// 白名單:建議同時加入 IPv4 與 IPv6(如果你的網路有 IPv6)
const ALLOWED_IPS = new Set([
  '35.77.150.209',        // 替換成你的固定 IPv4
  // '2001:db8::1234',   // 若有 IPv6 也要加入
]);

export async function onRequest(context) {
  const ip = context.request.headers.get('CF-Connecting-IP');

  // Fail-closed:取不到 IP 或不在白名單一律拒絕
  if (!ip || !ALLOWED_IPS.has(ip)) {
    return new Response('Forbidden', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, private',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }

  const response = await context.next();

  // 放行的回應也禁止任何快取,並阻止搜尋引擎收錄
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store, private');
  headers.set('X-Robots-Tag', 'noindex, nofollow');
  headers.set('Referrer-Policy', 'no-referrer');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
