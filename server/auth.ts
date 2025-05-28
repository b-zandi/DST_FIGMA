import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { sendPasswordResetEmail } from "./email";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "dst-brokerage-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      // Check if email exists
      const existingEmail = await storage.getUserByEmail(req.body.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Remove passwordConfirm from the payload as we don't store it
      const { passwordConfirm, ...userDataWithoutConfirm } = req.body;
      
      console.log("Creating user with data:", { 
        ...userDataWithoutConfirm,
        password: "REDACTED" 
      });
      
      const user = await storage.createUser({
        ...userDataWithoutConfirm,
        password: await hashPassword(userDataWithoutConfirm.password),
      });

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(userWithoutPassword);
      });
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate(
      'local',
      (
        err: Error | null,
        user: Express.User | false,
        info: Record<string, unknown> | undefined
      ) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        req.login(user, (err) => {
          if (err) return next(err);

          // Remove password from response
          const { password, ...userWithoutPassword } = user as any;
          res.status(200).json(userWithoutPassword);
        });
      }
    )(req, res, next); // <--- This parentheses runs the returned middleware function
  });
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Remove password from response
    const { password, ...userWithoutPassword } = req.user as SelectUser;
    res.json(userWithoutPassword);
  });

  // Password reset request endpoint
  app.post("/api/forgot-password", async (req, res, next) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if email exists for security
        return res.json({ message: "If an account with that email exists, we've sent a reset link." });
      }

      // Generate secure reset token
      const resetToken = randomBytes(32).toString('hex');
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

      // Update user with reset token
      await storage.updateUser(user.id, {
        resetToken,
        resetTokenExpiry
      });

      // Send reset email
      const emailSent = await sendPasswordResetEmail({
        to: user.email,
        resetToken,
        firstName: user.firstName || undefined
      });

      if (!emailSent) {
        return res.status(500).json({ message: "Failed to send reset email. Please try again." });
      }

      res.json({ message: "If an account with that email exists, we've sent a reset link." });
    } catch (error) {
      next(error);
    }
  });

  // Password reset completion endpoint
  app.post("/api/reset-password", async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      
      if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
      }

      // Find user by reset token
      const user = await storage.getUserByResetToken(token);
      if (!user || !user.resetTokenExpiry || new Date() > user.resetTokenExpiry) {
        return res.status(400).json({ message: "Invalid or expired reset token" });
      }

      // Update password and clear reset token
      await storage.updateUser(user.id, {
        password: await hashPassword(newPassword),
        resetToken: null,
        resetTokenExpiry: null
      });

      res.json({ message: "Password reset successfully" });
    } catch (error) {
      next(error);
    }
  });
  
  app.put("/api/user/profile", (req, res, next) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    const userId = (req.user as SelectUser).id;
    
    storage
      .updateUser(userId, {
        ...req.body,
        isProfileComplete: true,
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        
        // Remove password from response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      })
      .catch(next);
  });
}
