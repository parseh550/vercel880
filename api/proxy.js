const https = require('https');
const fetch = require('node-fetch');

const agent = new https.Agent({
  rejectUnauthorized: false,  // فقط برای تست؛ در محیط واقعی استفاده نکنید
  secureProtocol: 'TLS_method' // می‌توانید 'TLSv1_2_method' یا 'TLSv1_3_method' امتحان کنید
});

module.exports = async (req, res) => {
  const baseUrl = 'https://jal.id.ir';
  const url = new URL(req.url, baseUrl).toString();

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
      agent: agent,
    });

    res.writeHead(response.status, Object.fromEntries(response.headers));
    response.body.pipe(res);
  } catch (err) {
    res.writeHead(500);
    res.end('Proxy error: ' + err.message);
  }
};
