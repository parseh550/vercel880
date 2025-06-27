const fetch = require('node-fetch');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = async (req, res) => {
  const baseUrl = 'https://documents.jal.id.ir';
  const url = new URL(req.url, baseUrl).toString();

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
      agent: agent,
    });

    if (!response.ok) {
      res.writeHead(response.status);
      res.end(`Upstream server error: ${response.statusText}`);
      return;
    }

    res.writeHead(response.status, Object.fromEntries(response.headers));
    response.body.pipe(res);
  } catch (err) {
    res.writeHead(502);
    res.end('Bad Gateway: ' + err.message);
  }
};
