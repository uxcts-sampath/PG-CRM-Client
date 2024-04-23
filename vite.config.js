import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const { REACT_APP_API_URL } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Replace environment variables at build time
    replace({
      preventAssignment: true,
      values: {
        'process.env.REACT_APP_API_URL': JSON.stringify(REACT_APP_API_URL),
      },
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: REACT_APP_API_URL,
        secure: false,
      },
    },
  },
});
