const ALLOWED_IPS = new Set([
  '35.77.150.209', // 替换成你的固定 IP
]);

export default {
  async fetch(request, env) {
    const ip = request.headers.get('CF-Connecting-IP');

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

    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set('Cache-Control', 'no-store, private');
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(res.body, { status: res.status, headers });
  },
};
