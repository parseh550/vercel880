const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = 'https://morning-voice-9f1a.pparseh880.workers.dev' + req.url;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    });

    res.writeHead(response.status, Object.fromEntries(response.headers));
    response.body.pipe(res);
  } catch (err) {
    res.writeHead(500);
    res.end('Proxy error: ' + err.message);
  }
};
