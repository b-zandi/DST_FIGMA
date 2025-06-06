import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useQuery } from "@tanstack/react-query";
import { FAQ } from "@shared/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";

// Static FAQ content
const staticFaqs: FAQ[] = [
  {
    id: 1,
    question: "What is a Delaware Statutory Trust (DST)?",
    answer: "A Delaware Statutory Trust (DST) is a legally recognized trust that allows investors to own fractional interests in commercial real estate properties. DSTs are commonly used for 1031 exchanges, offering professional management and potential tax benefits for accredited investors.",
    category: "basics",
    order: 1
  },
  {
    id: 2,
    question: "How does a 1031 exchange work with a DST?",
    answer: "When selling an investment property, investors can use a 1031 exchange to defer capital gains taxes by reinvesting the proceeds into a DST property. The DST must be identified within 45 days of the sale, and the exchange must be completed within 180 days. This allows investors to defer taxes while transitioning to a more passive investment structure.",
    category: "tax",
    order: 2
  },
  {
    id: 3,
    question: "What are the potential benefits of DST investments?",
    answer: "DST investments offer several potential benefits including tax deferral through 1031 exchanges, passive income opportunities, access to institutional-quality properties, professional management, potential appreciation, portfolio diversification, and simplified estate planning.",
    category: "benefits",
    order: 3
  },
  {
    id: 4,
    question: "Who can invest in a DST?",
    answer: "DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC). Accreditation typically requires an individual income exceeding $200,000 (or $300,000 with spouse) for the past two years, or a net worth over $1 million (excluding primary residence).",
    category: "eligibility",
    order: 4
  },
  {
    id: 5,
    question: "What types of properties are available through DSTs?",
    answer: "DSTs typically invest in commercial real estate assets such as multifamily apartment complexes, industrial properties, medical facilities, self-storage facilities, retail centers, and office buildings. These properties are often institutional-grade assets with stable income potential.",
    category: "investment",
    order: 5
  },
  {
    id: 6,
    question: "What are the minimum investment amounts for DSTs?",
    answer: "Minimum investment amounts for DSTs typically range from $25,000 to $100,000, depending on the specific offering. This lower entry point (compared to direct property ownership) allows for greater diversification across multiple properties or DST investments.",
    category: "investment",
    order: 6
  },
  {
    id: 7,
    question: "What risks should I be aware of when investing in DSTs?",
    answer: "Key risks include: lack of liquidity (DSTs are generally not easily sold), potential fluctuations in property value, the inability to make changes to the property or management (the 'no-call provision'), dependence on the expertise of the sponsor/asset manager, and market/economic risks affecting commercial real estate.",
    category: "risks",
    order: 7
  },
  {
    id: 8,
    question: "How are DST investments taxed?",
    answer: "DST investments typically provide pass-through tax treatment, with income, deductions, and depreciation passed to investors on a pro-rata basis. Investors receive Schedule K-1 forms reporting their share of income and expenses. When using a 1031 exchange, capital gains taxes from the sale of a previous investment property can be deferred.",
    category: "tax",
    order: 8
  }
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // API FAQs (but use static FAQs if none are returned from the API)
  const { data: apiFaqs = [] } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });
  
  // Use API FAQs if available, otherwise use static FAQs
  const faqs = apiFaqs.length > 0 ? apiFaqs : staticFaqs;

  // Get unique categories from FAQs
  const categories = ["all", ...Array.from(new Set(faqs.map(faq => faq.category)))];

  // Filter FAQs based on category and search term
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-[#1A2B50] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about DST investments, 1031 exchanges, and our platform
            </p>
          </div>

          {/* Search and filter */}
          <div className="mb-10 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* FAQ Accordion */}
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                  <Card className="overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="text-left">
                        <h3 className="text-lg font-medium text-[#1A2B50]">
                          {faq.question}
                        </h3>
                        <span className="inline-block mt-1 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full capitalize">
                          {faq.category}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center p-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500">No FAQs found matching your criteria.</p>
            </div>
          )}

          {/* Additional resources */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#1A2B50] mb-6 text-center">
              Still Have Questions?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#1A2B50] mb-3">
                  Contact Our Team
                </h3>
                <p className="text-gray-600 mb-4">
                  Our investment professionals are available to answer any questions you may have about DST investments.
                </p>
                <a
                  href="/contact"
                  className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                >
                  Contact Us
                </a>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-[#1A2B50] mb-3">
                  Educational Resources
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore our library of articles, guides, and videos about real estate investing, 1031 exchanges, and DSTs.
                </p>
                <a
                  href="/resources"
                  className="text-primary hover:text-primary/90 font-medium inline-flex items-center"
                >
                  View Resources
                </a>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
