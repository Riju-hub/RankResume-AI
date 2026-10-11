// backend/src/server.js
import dns from 'node:dns';

// Force Node.js to prioritize IPv4 addresses over IPv6
dns.setDefaultResultOrder('ipv4first');

// Set fallback DNS resolvers to IPv4 Google DNS
dns.setServers([
  '8.8.8.8',
  '8.8.4.4'
]);

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});