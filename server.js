// Villa Concierge — Production Server
// API key is read from environment variable ANTHROPIC_API_KEY

const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('\n❌  Missing ANTHROPIC_API_KEY environment variable.\n');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  // Serve frontend
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) { res.writeHead(500); res.end('Error loading index.html'); return; }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // Proxy to Anthropic
  if (req.method === 'POST' && req.url === '/chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const options = {
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(body)
        }
      };
      const proxyReq = https.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
        proxyRes.pipe(res);
      });
      proxyReq.on('error', (e) => {
        res.writeHead(502);
        res.end(JSON.stringify({ error: { message: e.message } }));
      });
      proxyReq.write(body);
      proxyReq.end();
    });
    return;
  }

  res.writeHead(404); res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n🌿  Villa Concierge running on port ${PORT}\n`);
});
