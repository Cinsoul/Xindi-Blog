import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

const saveAvatarPlugin = () => ({
  name: 'save-avatar-plugin',
  configureServer(server: any) {
    server.middlewares.use('/api/save-avatar', (req: any, res: any) => {
      if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { key, dataUrl } = JSON.parse(body);
            if (!dataUrl || !key) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Missing key or dataUrl' }));
            }
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const filename = `${key}-3d-avatar.png`;
            const publicDir = path.resolve(process.cwd(), 'public');
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true });
            }
            fs.writeFileSync(path.join(publicDir, filename), Buffer.from(base64Data, 'base64'));
            console.log(`Successfully saved avatar to public/${filename}`);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, filename, path: `./${filename}` }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message }));
          }
        });
      } else {
        res.statusCode = 405;
        res.end();
      }
    });
  },
});

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), saveAvatarPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
