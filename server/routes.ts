import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);
  
  // FAQ routes
  app.get("/api/faqs", async (req, res, next) => {
    try {
      const category = req.query.category as string | undefined;
      
      if (category) {
        const faqs = await storage.getFaqsByCategory(category);
        res.json(faqs);
      } else {
        const faqs = await storage.getAllFaqs();
        res.json(faqs);
      }
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/faqs/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid FAQ ID" });
      }
      
      const faq = await storage.getFaqById(id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      
      res.json(faq);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
