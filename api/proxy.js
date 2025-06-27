const https = require('https');

module.exports = (req, res) => {
  const options = {
    hostname: 'morning-voice-9f1a.pparseh880.workers.dev',
    path: req.url,
    method: req.method,
    headers: req.headers
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
};
