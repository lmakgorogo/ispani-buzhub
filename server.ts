import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// In AI Studio / Cloud Run container, NGINX reverse proxies from port 8080 to DEFAULT_APP_PORT (3000)
const port = process.env.DEFAULT_APP_PORT 
  ? Number(process.env.DEFAULT_APP_PORT) 
  : (process.env.PORT && process.env.PORT !== '8080' ? Number(process.env.PORT) : 3000);

// Health check endpoints for Cloud Run & container orchestration
app.get(['/healthz', '/_health', '/api/health'], (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve compiled static frontend assets
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/src/assets/images', express.static(path.join(__dirname, 'src/assets/images')));

// SPA fallback for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Ispani Biz Hub server listening on http://0.0.0.0:${port}`);
});
