import { 
  users, 
  faqs, 
  investments, 
  userInvestments,
  type User, 
  type InsertUser, 
  type FAQ, 
  type InsertFAQ,
  type Investment,
  type InsertInvestment,
  type UserInvestment,
  type InsertUserInvestment
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { db, pool } from "./db";
import { eq, and } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  // FAQ methods
  getAllFaqs(): Promise<FAQ[]>;
  getFaqById(id: number): Promise<FAQ | undefined>;
  getFaqsByCategory(category: string): Promise<FAQ[]>;
  createFaq(faq: InsertFAQ): Promise<FAQ>;
  
  // Investment methods
  getAllInvestments(): Promise<Investment[]>;
  getInvestmentById(id: number): Promise<Investment | undefined>;
  getInvestmentsByAssetClass(assetClass: string): Promise<Investment[]>;
  getInvestmentsByPropertyType(propertyType: string): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  
  // User Investment methods
  getUserInvestments(userId: number): Promise<(UserInvestment & { investment: Investment })[]>;
  getUserInvestmentById(id: number): Promise<(UserInvestment & { investment: Investment }) | undefined>;
  createUserInvestment(userInvestment: InsertUserInvestment): Promise<UserInvestment>;
  updateUserInvestment(id: number, data: Partial<UserInvestment>): Promise<UserInvestment | undefined>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private faqs: Map<number, FAQ>;
  private investments: Map<number, Investment>;
  private userInvestments: Map<number, UserInvestment>;
  sessionStore: session.Store;
  currentUserId: number;
  currentFaqId: number;
  currentInvestmentId: number;
  currentUserInvestmentId: number;

  constructor() {
    this.users = new Map();
    this.faqs = new Map();
    this.investments = new Map();
    this.userInvestments = new Map();
    this.currentUserId = 1;
    this.currentFaqId = 1;
    this.currentInvestmentId = 1;
    this.currentUserInvestmentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    
    // Initialize some default FAQs
    this.initDefaultFaqs();
    
    // Initialize some default investments 
    this.initDefaultInvestments();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    
    // Create a properly typed User object
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      email: insertUser.email,
      firstName: insertUser.firstName || null,
      lastName: insertUser.lastName || null,
      phone: insertUser.phone || null,
      accreditedStatus: insertUser.accreditedStatus || false,
      accreditationScore: insertUser.accreditationScore || 0,
      accreditationSegment: insertUser.accreditationSegment || 'notReady',
      questionnaireData: insertUser.questionnaireData || null,
      isProfileComplete: false,
      createdAt: now
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getAllFaqs(): Promise<FAQ[]> {
    return Array.from(this.faqs.values()).sort((a, b) => a.order - b.order);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    return this.faqs.get(id);
  }

  async getFaqsByCategory(category: string): Promise<FAQ[]> {
    return Array.from(this.faqs.values())
      .filter(faq => faq.category === category)
      .sort((a, b) => a.order - b.order);
  }

  async createFaq(insertFaq: InsertFAQ): Promise<FAQ> {
    const id = this.currentFaqId++;
    const faq: FAQ = { ...insertFaq, id };
    this.faqs.set(id, faq);
    return faq;
  }

  // Investment methods
  async getAllInvestments(): Promise<Investment[]> {
    return Array.from(this.investments.values());
  }

  async getInvestmentById(id: number): Promise<Investment | undefined> {
    return this.investments.get(id);
  }

  async getInvestmentsByAssetClass(assetClass: string): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(investment => investment.assetClass === assetClass);
  }

  async getInvestmentsByPropertyType(propertyType: string): Promise<Investment[]> {
    return Array.from(this.investments.values())
      .filter(investment => investment.propertyType === propertyType);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.currentInvestmentId++;
    const investment: Investment = { ...insertInvestment, id };
    this.investments.set(id, investment);
    return investment;
  }

  // User Investment methods
  async getUserInvestments(userId: number): Promise<(UserInvestment & { investment: Investment })[]> {
    const userInvestmentsList = Array.from(this.userInvestments.values())
      .filter(ui => ui.userId === userId);
    
    return userInvestmentsList.map(ui => {
      const investment = this.investments.get(ui.investmentId);
      if (!investment) {
        throw new Error(`Investment with id ${ui.investmentId} not found`);
      }
      return { ...ui, investment };
    });
  }

  async getUserInvestmentById(id: number): Promise<(UserInvestment & { investment: Investment }) | undefined> {
    const userInvestment = this.userInvestments.get(id);
    if (!userInvestment) return undefined;
    
    const investment = this.investments.get(userInvestment.investmentId);
    if (!investment) return undefined;
    
    return { ...userInvestment, investment };
  }

  async createUserInvestment(insertUserInvestment: InsertUserInvestment): Promise<UserInvestment> {
    const id = this.currentUserInvestmentId++;
    const now = new Date();
    
    const userInvestment: UserInvestment = {
      id,
      userId: insertUserInvestment.userId,
      investmentId: insertUserInvestment.investmentId,
      investmentAmount: insertUserInvestment.investmentAmount,
      investmentDate: now,
      ownershipPercentage: insertUserInvestment.ownershipPercentage,
      distributionsPaid: "0", // Starting with 0 distributions paid
      lastDistributionDate: null, // No distributions yet
      investmentStatus: insertUserInvestment.investmentStatus,
    };
    
    this.userInvestments.set(id, userInvestment);
    return userInvestment;
  }

  async updateUserInvestment(id: number, data: Partial<UserInvestment>): Promise<UserInvestment | undefined> {
    const userInvestment = this.userInvestments.get(id);
    if (!userInvestment) return undefined;
    
    const updatedUserInvestment = { ...userInvestment, ...data };
    this.userInvestments.set(id, updatedUserInvestment);
    return updatedUserInvestment;
  }

  private initDefaultFaqs() {
    const defaultFaqs: Array<Omit<FAQ, 'id'>> = [
      {
        question: "What is a Delaware Statutory Trust (DST)?",
        answer: "A Delaware Statutory Trust (DST) is a legally recognized trust that allows investors to own fractional interests in commercial real estate properties. DSTs are commonly used as replacement properties in 1031 exchanges, offering investors the ability to defer capital gains taxes while transitioning from actively managed real estate to passive investment ownership.",
        category: "general",
        order: 1
      },
      {
        question: "How does a 1031 exchange work with a DST?",
        answer: "When selling an investment property, investors can use a 1031 exchange to defer capital gains taxes by reinvesting the proceeds into a \"like-kind\" property. DSTs qualify as like-kind properties under IRS regulations. Investors must identify replacement properties within 45 days of selling their relinquished property and complete the acquisition within 180 days. DSTs can simplify this process by providing readily available replacement options.",
        category: "taxes",
        order: 2
      },
      {
        question: "What are the potential benefits of DST investments?",
        answer: "DST investments offer several potential benefits including: tax deferral through 1031 exchanges, passive income without landlord responsibilities, access to institutional-quality properties, potential depreciation benefits, professional asset management, and estate planning advantages. Investors can also diversify across multiple properties and property types with lower minimum investments than direct ownership.",
        category: "benefits",
        order: 3
      },
      {
        question: "What risks should I consider with DST investments?",
        answer: "Like all investments, DSTs involve risks including: limited liquidity (DST interests typically cannot be sold or transferred easily), lack of control (investors have no management authority), potential for property value fluctuation, dependence on the sponsor's management capabilities, and market risks affecting real estate values. Investors should thoroughly review offering documents and consult with financial and tax professionals before investing.",
        category: "risks",
        order: 4
      },
      {
        question: "Who can invest in a DST?",
        answer: "DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC). To qualify as an accredited investor, you must meet one of the following criteria: Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000; Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence); Certain professional certifications, designations, or credentials recognized by the SEC.",
        category: "eligibility",
        order: 5
      },
      {
        question: "What is the minimum investment for a DST?",
        answer: "Minimum investment amounts for DSTs typically range from $25,000 to $100,000, depending on the specific offering and sponsor. This is significantly lower than the capital typically required to purchase institutional-quality commercial real estate directly, allowing for greater diversification across properties and asset classes.",
        category: "investment",
        order: 6
      },
      {
        question: "How are DST investments structured?",
        answer: "In a DST structure, a sponsor company acquires a property and places it into a Delaware Statutory Trust. The sponsor then sells beneficial interests in the trust to investors. Each investor owns a fractional, undivided interest in the entire property and receives their proportionate share of any income generated, as well as potential tax benefits. The DST sponsor handles all property management responsibilities.",
        category: "structure",
        order: 7
      },
      {
        question: "Can I use my IRA to invest in a DST?",
        answer: "Yes, self-directed IRAs (SDIRAs) can be used to invest in DSTs. However, when a DST is held within an IRA, the tax deferral benefits of a 1031 exchange do not apply, as IRAs already provide tax advantages. Additionally, any income from the DST investment held in an IRA may be subject to Unrelated Business Taxable Income (UBTI) if the property has debt financing. Consult with a tax professional for guidance specific to your situation.",
        category: "investment",
        order: 8
      }
    ];
    
    defaultFaqs.forEach(faq => {
      const id = this.currentFaqId++;
      this.faqs.set(id, { ...faq, id });
    });
  }
  
  private initDefaultInvestments() {
    // Using the investments data from the investing-page.tsx as our default data
    const defaultInvestments: Array<Omit<Investment, 'id'>> = [
      {
        title: "Multi-Family Apartment Complex",
        location: "Dallas, TX",
        propertyType: "Residential",
        assetClass: "Multi-Family",
        minInvestment: 50000,
        projectedYield: "5.8%",
        offeringSize: "$85,200,000",
        holdPeriod: "5-7 years",
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=500",
        description: "Class A apartment complex with 320 units in a high-growth suburb of Dallas. The property features resort-style amenities, modern fixtures, and is located near major employers.",
        status: "available",
        sponsor: "North Star Real Estate",
        propertyAddress: "8750 Central Expressway, Dallas, TX 75231",
        yearBuilt: "2018",
        squareFeet: "375,000",
        occupancy: "94%",
        offeringDate: "October 2023",
        closingDate: "November 30, 2023",
        distributionFrequency: "Monthly",
        debtFinancing: "60% LTV, 10-year term, 4.2% fixed rate",
        taxAdvantages: "100% bonus depreciation in year 1",
        detailedDescription: "This Class A apartment complex consists of 320 units across 12 three-story buildings on a 22-acre site. The property was built in 2018 and features modern finishes including granite countertops, stainless steel appliances, and wood-style flooring. Community amenities include a resort-style pool, state-of-the-art fitness center, dog park, and resident clubhouse.\n\nThe property is located in a high-growth suburb of Dallas with excellent access to major employment centers, retail, and entertainment options. The submarket has experienced 5.2% average annual rent growth over the past 5 years with occupancy consistently above 93%.\n\nThe business plan involves light value-add improvements to unit interiors and common areas to support continued rent growth, with a target hold period of 5-7 years."
      },
      {
        title: "Medical Office Portfolio",
        location: "Charlotte, NC",
        propertyType: "Commercial",
        assetClass: "Medical Office",
        minInvestment: 100000,
        projectedYield: "6.2%",
        offeringSize: "$42,500,000",
        holdPeriod: "7-10 years",
        imageUrl: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&q=80&w=500",
        description: "Portfolio of three medical office buildings leased to credit tenants with weighted average lease term of 8.4 years. All properties are located near major hospital systems.",
        status: "available",
        sponsor: "Healthcare Properties Trust",
        propertyAddress: "Multiple locations in Charlotte, NC",
        yearBuilt: "2008-2015",
        squareFeet: "156,000 (total)",
        occupancy: "97%",
        offeringDate: "September 2023",
        closingDate: "December 15, 2023",
        distributionFrequency: "Monthly",
        debtFinancing: "55% LTV, 7-year term, 4.5% fixed rate",
        taxAdvantages: "Cost segregation study provided",
        detailedDescription: "This medical office portfolio consists of three Class A medical office buildings totaling 156,000 square feet in Charlotte, NC. The buildings are strategically located adjacent to major hospital systems and are leased to a diverse mix of medical practices including cardiology, ophthalmology, orthopedics, and primary care.\n\nThe portfolio has a weighted average lease term of 8.4 years with structured rent increases averaging 2.5% annually. The tenant base includes several credit-rated healthcare systems and established medical practices with long operating histories in the market.\n\nThe investment thesis is centered on the stable, recession-resistant nature of healthcare real estate and the strong demographic trends supporting healthcare demand in the Charlotte market."
      },
      {
        title: "Industrial Distribution Center",
        location: "Phoenix, AZ",
        propertyType: "Commercial",
        assetClass: "Industrial",
        minInvestment: 25000,
        projectedYield: "5.5%",
        offeringSize: "$38,750,000",
        holdPeriod: "5-7 years",
        imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=500",
        description: "Modern distribution facility with 215,000 square feet leased to an e-commerce tenant. Strategic location with excellent access to major highways and growing population centers.",
        status: "available",
        sponsor: "Logistics Capital Partners",
        propertyAddress: "4720 E Jones Ave, Phoenix, AZ 85040",
        yearBuilt: "2019",
        squareFeet: "215,000",
        occupancy: "100%",
        offeringDate: "November 2023",
        closingDate: "January 20, 2024",
        distributionFrequency: "Monthly",
        debtFinancing: "58% LTV, 5-year term, 4.0% fixed rate",
        taxAdvantages: "Cost segregation and 100% bonus depreciation",
        detailedDescription: "This modern industrial distribution facility was built in 2019 and features 215,000 square feet of high-bay warehouse space with 32' clear heights, ESFR sprinkler system, 50 dock-high doors, and 2 drive-in doors. The property is 100% leased to a national e-commerce logistics provider on a 7-year triple-net lease with 2.75% annual rent escalations.\n\nLocated in the Southeast Valley industrial submarket of Phoenix, the property has excellent access to I-10, I-17, and Loop 202, allowing for efficient distribution throughout the Southwest region. The Phoenix industrial market has experienced significant growth due to population migration, e-commerce expansion, and reshoring of manufacturing operations.\n\nThe investment strategy is focused on stable cash flow from the in-place lease with potential for rent growth upon renewal given the property's strategic location and the strong fundamentals of the Phoenix industrial market."
      }
    ];
    
    defaultInvestments.forEach(investment => {
      const id = this.currentInvestmentId++;
      this.investments.set(id, { ...investment, id });
    });
  }
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  async getAllFaqs(): Promise<FAQ[]> {
    return db.select().from(faqs).orderBy(faqs.order);
  }

  async getFaqById(id: number): Promise<FAQ | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async getFaqsByCategory(category: string): Promise<FAQ[]> {
    return db
      .select()
      .from(faqs)
      .where(eq(faqs.category, category))
      .orderBy(faqs.order);
  }

  async createFaq(insertFaq: InsertFAQ): Promise<FAQ> {
    const [faq] = await db.insert(faqs).values(insertFaq).returning();
    return faq;
  }

  async getAllInvestments(): Promise<Investment[]> {
    return db.select().from(investments);
  }

  async getInvestmentById(id: number): Promise<Investment | undefined> {
    const [investment] = await db.select().from(investments).where(eq(investments.id, id));
    return investment;
  }

  async getInvestmentsByAssetClass(assetClass: string): Promise<Investment[]> {
    return db
      .select()
      .from(investments)
      .where(eq(investments.assetClass, assetClass));
  }

  async getInvestmentsByPropertyType(propertyType: string): Promise<Investment[]> {
    return db
      .select()
      .from(investments)
      .where(eq(investments.propertyType, propertyType));
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const [investment] = await db.insert(investments).values(insertInvestment).returning();
    return investment;
  }

  async getUserInvestments(userId: number): Promise<(UserInvestment & { investment: Investment })[]> {
    const result = await db
      .select({
        userInvestment: userInvestments,
        investment: investments
      })
      .from(userInvestments)
      .innerJoin(investments, eq(userInvestments.investmentId, investments.id))
      .where(eq(userInvestments.userId, userId));

    return result.map(({ userInvestment, investment }) => ({
      ...userInvestment,
      investment
    }));
  }

  async getUserInvestmentById(id: number): Promise<(UserInvestment & { investment: Investment }) | undefined> {
    const [result] = await db
      .select({
        userInvestment: userInvestments,
        investment: investments
      })
      .from(userInvestments)
      .innerJoin(investments, eq(userInvestments.investmentId, investments.id))
      .where(eq(userInvestments.id, id));

    if (!result) return undefined;

    return {
      ...result.userInvestment,
      investment: result.investment
    };
  }

  async createUserInvestment(insertUserInvestment: InsertUserInvestment): Promise<UserInvestment> {
    const [userInvestment] = await db
      .insert(userInvestments)
      .values(insertUserInvestment)
      .returning();
    return userInvestment;
  }

  async updateUserInvestment(id: number, data: Partial<UserInvestment>): Promise<UserInvestment | undefined> {
    const [updatedUserInvestment] = await db
      .update(userInvestments)
      .set(data)
      .where(eq(userInvestments.id, id))
      .returning();
    return updatedUserInvestment;
  }
}

// Switch to database storage instead of memory storage
export const storage = new DatabaseStorage();
