const { createServer } = require('http');
const https = require('https');

const targetHost = 'morning-voice-9f1a.pparseh880.workers.dev'; // ← اینجا آدرس ورکر خود را وارد کن

createServer((req, res) => {
  const options = {
    hostname: targetHost,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const proxy = https.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  req.pipe(proxy, { end: true });

  proxy.on('error', (e) => {
    res.writeHead(500);
    res.end(`Error: ${e.message}`);
  });
}).listen();
