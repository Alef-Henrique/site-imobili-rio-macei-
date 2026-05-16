import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", (req, res) => {
    const { name, email, phone, message } = req.body;
    console.log("Contact Form Submission:", { name, email, phone, message });
    // In a real app, send an email or save to DB here
    res.json({ success: true, message: "Mensagem recebida com sucesso!" });
  });

  // API Route for Properties (simulated backend)
  app.get("/api/properties", (req, res) => {
    // This could also be a JSON file or DB
    res.json([
      { id: 1, type: 'house', name: 'Residencial Ocean Breeze', location: 'Ponta Verde', price: 2500000, beds: 4, area: 350, image: 'https://picsum.photos/seed/house1/800/600' },
      { id: 2, type: 'house', name: 'Villa Tropical Palms', location: 'Pajuçara', price: 1850000, beds: 3, area: 220, image: 'https://picsum.photos/seed/house2/800/600' },
      // ... more will be added in frontend data
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
