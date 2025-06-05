import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  phone: text("phone"),
  
  // Accreditation and scoring
  accreditedStatus: boolean("accredited_status").default(false),
  accreditationScore: integer("accreditation_score").default(0),
  accreditationSegment: text("accreditation_segment").default('notReady'),
  
  // Page 1 - Core Investment Profile
  accredited: text("accredited"), // 'yes', 'notSure', 'no'
  saleStatus: text("sale_status"), // 'active', 'lt6', 'lt12', 'ownNoSale', 'none'
  equityBracket: text("equity_bracket"), // '100-249', '250-499', '500-999', '1mPlus'
  horizon: text("horizon"), // '<3', '3-5', '5-10', '10+'
  returnNeed: text("return_need"), // 'le4', '5-6', '7-8', 'ge9'
  passiveImportance: integer("passive_importance"), // 1-5 scale
  
  // Page 2 - Property and Experience Details
  location: text("location"),
  propertyType: text("property_type"), // 'multifamily', 'industrial', 'retail', 'office', 'land', 'other'
  mortgageBracket: text("mortgage_bracket"), // 'free', 'lt25', '25to50', 'gt50'
  prior1031: text("prior_1031"), // 'yes', 'no'
  qiReady: text("qi_ready"), // 'yes', 'no'
  riskTolerance: integer("risk_tolerance"), // 1-5 scale
  riskBehavior: text("risk_behavior"), // 'Conservative', 'Moderate', 'Adventurous'
  advisor: text("advisor"), // 'yes', 'no'
  notes: text("notes"),
  truthfulAcknowledgement: boolean("truthful_acknowledgement"),
  
  // System fields
  questionnaireData: text("questionnaire_data"), // Backup JSON storage
  isProfileComplete: boolean("is_profile_complete").default(false),
  
  // Password reset fields
  resetToken: text("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull(),
  order: integer("order").notNull(),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  propertyType: text("property_type").notNull(),
  assetClass: text("asset_class").notNull(),
  minInvestment: integer("min_investment").notNull(),
  projectedYield: text("projected_yield").notNull(),
  offeringSize: text("offering_size").notNull(),
  holdPeriod: text("hold_period").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(),
  sponsor: text("sponsor").notNull(),
  propertyAddress: text("property_address").notNull(),
  yearBuilt: text("year_built").notNull(),
  squareFeet: text("square_feet").notNull(),
  occupancy: text("occupancy").notNull(),
  offeringDate: text("offering_date").notNull(),
  closingDate: text("closing_date").notNull(),
  distributionFrequency: text("distribution_frequency").notNull(),
  debtFinancing: text("debt_financing").notNull(),
  taxAdvantages: text("tax_advantages").notNull(),
  detailedDescription: text("detailed_description").notNull(),
});

export const userInvestments = pgTable("user_investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  investmentId: integer("investment_id").notNull(),
  investmentAmount: numeric("investment_amount").notNull(),
  investmentDate: timestamp("investment_date").defaultNow(),
  ownershipPercentage: numeric("ownership_percentage").notNull(),
  distributionsPaid: numeric("distributions_paid").default("0"),
  lastDistributionDate: timestamp("last_distribution_date"),
  investmentStatus: text("investment_status").notNull(),
});

export const insertUserSchema = createInsertSchema(users)
  .pick({
    password: true,
    email: true,
    firstName: true,
    lastName: true,
    phone: true,
    accreditedStatus: true,
    accreditationScore: true,
    accreditationSegment: true,
    // Page 1 questionnaire fields
    accredited: true,
    saleStatus: true,
    equityBracket: true,
    horizon: true,
    returnNeed: true,
    passiveImportance: true,
    // Page 2 questionnaire fields
    location: true,
    propertyType: true,
    mortgageBracket: true,
    prior1031: true,
    qiReady: true,
    riskTolerance: true,
    advisor: true,
    notes: true,
    truthfulAcknowledgement: true,
    questionnaireData: true,
  })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    passwordConfirm: z.string().min(8, "Password confirmation must be at least 8 characters long").optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    accreditationScore: z.number().optional(),
    accreditationSegment: z.enum(['high', 'medium', 'low', 'notReady']).optional(),
    // Questionnaire field validations
    accredited: z.enum(['yes', 'notSure', 'no']).optional(),
    saleStatus: z.enum(['active', 'lt6', 'lt12', 'ownNoSale', 'none']).optional(),
    equityBracket: z.enum(['100-249', '250-499', '500-999', '1mPlus']).optional(),
    horizon: z.enum(['<3', '3-5', '5-10', '10+']).optional(),
    returnNeed: z.enum(['le4', '5-6', '7-8', 'ge9']).optional(),
    passiveImportance: z.number().min(1).max(5).optional(),
    location: z.string().optional(),
    propertyType: z.enum(['multifamily', 'industrial', 'retail', 'office', 'land', 'other']).optional(),
    mortgageBracket: z.enum(['free', 'lt25', '25to50', 'gt50']).optional(),
    prior1031: z.enum(['yes', 'no']).optional(),
    qiReady: z.enum(['yes', 'no']).optional(),
    riskTolerance: z.number().min(1).max(5).optional(),
    advisor: z.enum(['yes', 'no']).optional(),
    notes: z.string().optional(),
    truthfulAcknowledgement: z.boolean().optional(),
    questionnaireData: z.string().optional(),
  })
  .refine((data) => !data.passwordConfirm || data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

export const profileUpdateSchema = createInsertSchema(users)
  .pick({
    firstName: true,
    lastName: true,
    phone: true,
    email: true,
  })
  .extend({
    email: z.string().email("Please enter a valid email address"),
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const insertFaqSchema = createInsertSchema(faqs);

export const insertInvestmentSchema = createInsertSchema(investments);
export const insertUserInvestmentSchema = createInsertSchema(userInvestments)
  .pick({
    userId: true,
    investmentId: true,
    investmentAmount: true,
    ownershipPercentage: true,
    investmentStatus: true,
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type ProfileUpdate = z.infer<typeof profileUpdateSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type User = typeof users.$inferSelect;
export type FAQ = typeof faqs.$inferSelect;
export type InsertFAQ = z.infer<typeof insertFaqSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type UserInvestment = typeof userInvestments.$inferSelect;
export type InsertUserInvestment = z.infer<typeof insertUserInvestmentSchema>;
