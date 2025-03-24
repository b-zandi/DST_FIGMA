import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { CTASection } from "@/components/cta-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { MapPin, ArrowRight, InfoIcon, Phone, Mail } from "lucide-react";
import { FAQ } from "@shared/schema";

export default function HomePage() {
  const { data: faqs } = useQuery<FAQ[]>({
    queryKey: ["/api/faqs"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <CTASection />

        {/* Accreditation Info Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <InfoIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-[#1A2B50] mb-3">
                    Accredited Investor Information
                  </h3>
                  <p className="text-gray-600 mb-4">
                    DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC). To qualify as an accredited investor, you must meet one of the following criteria:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-4">
                    <li>Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.</li>
                    <li>Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).</li>
                    <li>Certain professional certifications, designations, or credentials recognized by the SEC.</li>
                  </ul>
                  <Link href="/accreditation" className="text-primary hover:text-primary/90 font-medium inline-flex items-center">
                    Learn more about accreditation
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1A2B50] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Learn more about DST investments and how they work
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs?.slice(0, 4).map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                    <Card className="overflow-hidden">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <h3 className="text-lg font-medium text-[#1A2B50] text-left">
                          {faq.question}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center mt-8">
              <Button asChild>
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-[#1A2B50] rounded-lg shadow-lg px-6 py-12 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Have questions about DST investments?
              </h2>
              <p className="text-lg text-white opacity-90 mb-8 max-w-2xl mx-auto">
                Our team of investment professionals is here to help you navigate the world of DST investments and 1031 exchanges.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="secondary" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Schedule a Call
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-[#1A2B50]/80 gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
