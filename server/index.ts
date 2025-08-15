import express from "express";
import { setupVite, serveStatic } from "./vite";
import { createServer } from "http";
import path from "path";

const app = express();
const server = createServer(app);

// Parse JSON payloads
app.use(express.json());

(async () => {
  if (process.env.NODE_ENV === "development") {
    // In development, use Vite's dev server
    await setupVite(app, server);
  } else {
    // In production, serve static files and handle client-side routing
    const distPath = path.resolve(process.cwd(), "dist/public");
    app.use(express.static(distPath));
    
    // Handle client-side routing by serving index.html for all routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen(port, "localhost", () => {
    console.log(`Server running on port ${port}`);
  });
})();
