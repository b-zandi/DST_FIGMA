import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertUserInvestmentSchema } from "@shared/schema";

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Middleware to check if user is accredited
function isAccredited(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && req.user.accreditedStatus) {
    return next();
  }
  res.status(403).json({ message: "Forbidden: User must be accredited" });
}

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
  
  // Investment routes
  app.get("/api/investments", async (req, res, next) => {
    try {
      const assetClass = req.query.assetClass as string | undefined;
      const propertyType = req.query.propertyType as string | undefined;
      
      if (assetClass) {
        const investments = await storage.getInvestmentsByAssetClass(assetClass);
        res.json(investments);
      } else if (propertyType) {
        const investments = await storage.getInvestmentsByPropertyType(propertyType);
        res.json(investments);
      } else {
        const investments = await storage.getAllInvestments();
        res.json(investments);
      }
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/investments/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid Investment ID" });
      }
      
      const investment = await storage.getInvestmentById(id);
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      
      res.json(investment);
    } catch (error) {
      next(error);
    }
  });
  
  // User Investments routes (protected)
  app.get("/api/user/investments", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      const userInvestments = await storage.getUserInvestments(userId);
      res.json(userInvestments);
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/user/investments/:id", isAuthenticated, async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid User Investment ID" });
      }
      
      const userInvestment = await storage.getUserInvestmentById(id);
      if (!userInvestment) {
        return res.status(404).json({ message: "User Investment not found" });
      }
      
      // Check if the investment belongs to the requesting user
      if (userInvestment.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden: Not your investment" });
      }
      
      res.json(userInvestment);
    } catch (error) {
      next(error);
    }
  });
  
  app.post("/api/user/investments", isAuthenticated, isAccredited, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      
      // Validate the request body
      const result = insertUserInvestmentSchema.safeParse({
        ...req.body,
        userId
      });
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid investment data", errors: result.error.format() });
      }
      
      // Check if the investment exists
      const investment = await storage.getInvestmentById(result.data.investmentId);
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      
      const userInvestment = await storage.createUserInvestment(result.data);
      res.status(201).json(userInvestment);
    } catch (error) {
      next(error);
    }
  });
  
  // Profile update (enhanced with complete flag)
  app.put("/api/user/profile", isAuthenticated, async (req, res, next) => {
    try {
      const userId = req.user!.id;
      
      // Check if user provided all required profile fields
      const isProfileComplete = !!(
        req.body.firstName && 
        req.body.lastName && 
        req.body.email && 
        req.body.phone
      );
      
      // Update the user with profile data and completion status
      const updatedUser = await storage.updateUser(userId, {
        ...req.body,
        isProfileComplete
      });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  });
  
  // Temporary routes to check users (remove in production)
  app.get("/api/debug/check-user/:username", async (req, res, next) => {
    try {
      const username = req.params.username;
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { password, ...safeUser } = user;
      res.json({ exists: true, user: safeUser });
    } catch (error) {
      next(error);
    }
  });
  
  app.get("/api/debug/list-users", async (req, res, next) => {
    try {
      // Get all users from the Map in MemStorage
      const allUsers = Array.from((storage as any).users.values()).map(user => {
        const { password, ...safeUser } = user;
        return safeUser;
      });
      res.json(allUsers);
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
