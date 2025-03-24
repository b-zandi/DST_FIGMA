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

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: faqs = [] } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

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
