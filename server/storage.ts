import { users, faqs, type User, type InsertUser, type FAQ, type InsertFAQ } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;
  
  getAllFaqs(): Promise<FAQ[]>;
  getFaqById(id: number): Promise<FAQ | undefined>;
  getFaqsByCategory(category: string): Promise<FAQ[]>;
  createFaq(faq: InsertFAQ): Promise<FAQ>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private faqs: Map<number, FAQ>;
  sessionStore: session.Store;
  currentUserId: number;
  currentFaqId: number;

  constructor() {
    this.users = new Map();
    this.faqs = new Map();
    this.currentUserId = 1;
    this.currentFaqId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
    
    // Initialize some default FAQs
    this.initDefaultFaqs();
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
    const user: User = { 
      ...insertUser, 
      id,
      isProfileComplete: false,
      createdAt: new Date()
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
}

export const storage = new MemStorage();
