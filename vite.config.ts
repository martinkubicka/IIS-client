import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    {
      name: 'custom-mime-type',
      transform(code, id) {
        if (id.endsWith('.tsx')) {
          return {
            code,
            map: null,
            mimeType: 'application/javascript'
          };
        }
      }
    }
  ]
});
