import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const API_URL = process.env.VITE_API_URL || "https://default-api.example.com";
const APP_ENV = process.env.VITE_APP_ENV || "development";

export default defineConfig({
  plugins: [react()],
  define: {
    __DEFINES__: JSON.stringify({
      API_URL,
      APP_ENV,
    }),
  },
});
