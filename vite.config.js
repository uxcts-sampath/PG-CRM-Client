// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import replace from '@rollup/plugin-replace';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// // Get environment variables
// const { REACT_APP_API_URL } = process.env;

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     // Replace environment variables at build time
//     replace({
//       preventAssignment: true,
//       values: {
//         'process.env.REACT_APP_API_URL': JSON.stringify(REACT_APP_API_URL),
//       },
//     }),
//   ],
//   server: {
//     proxy: {
//       '/api': {
//         target: REACT_APP_API_URL,
//         secure: false,
//       },
//     },
//   },
// });




import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get environment variables
const { REACT_APP_API_URL } = process.env;

// Define API URLs for local and server environments
const LOCAL_API_URL = 'http://localhost:3000'; // Update with your local API URL
const SERVER_API_URL = REACT_APP_API_URL; // Assuming REACT_APP_API_URL points to your server API

// Determine which API URL to use based on the environment
const apiURL = process.env.NODE_ENV === 'production' ? SERVER_API_URL : LOCAL_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Replace environment variables at build time
    replace({
      'process.env.REACT_APP_API_URL': JSON.stringify(apiURL),
      preventAssignment: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: apiURL,
        secure: false,
      },
    },
  },
});
