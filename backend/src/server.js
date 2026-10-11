// backend/src/server.js
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dns from 'node:dns';
import dotenv from 'dotenv';

// Resolve path to backend/.env regardless of where the terminal starts
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

dns.setServers([
  '8.8.8.8',
  '8.8.4.4',
  '2001:4860:4860::8888',
  '2001:4860:4860::8844'
]);

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});