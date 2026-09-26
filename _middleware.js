export async function onRequest(context) {
  // 1. 這裡改成你的固定 IP (例如 '220.135.xx.xx')
  const ALLOWED_IP = '35.77.150.209 '; 

  // 2. 獲取來訪客人的真實 IP
  const clientIP = context.request.headers.get('CF-Connecting-IP');

  // 3. 檢查 IP 是否相符
  if (clientIP !== ALLOWED_IP) {
    // 如果 IP 不對，直接在伺服器端攔截，回傳 403 錯誤，內容完全不給看
    return new Response('Access Denied: You do not have permission to view this site.', {
      status: 403,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }

  // 如果 IP 正確，放行讓客人看網頁
  return next();
}

// 輔助函式，讓程式能順利執行下一步
async function next() {
  return fetch;
}
