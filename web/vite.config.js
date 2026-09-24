import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    {
      name: 'clean-urls-dev',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const rawUrl = req.url ? req.url.split('?')[0] : '';
          if (rawUrl === '/login') req.url = req.url.replace('/login', '/login.html');
          else if (rawUrl === '/admin') req.url = req.url.replace('/admin', '/admin.html');
          else if (rawUrl === '/employee') req.url = req.url.replace('/employee', '/employee.html');
          else if (rawUrl === '/client') req.url = req.url.replace('/client', '/client.html');
          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        admin: resolve(__dirname, 'admin.html'),
        employee: resolve(__dirname, 'employee.html'),
        client: resolve(__dirname, 'client.html'),
      },
    },
  },
});
