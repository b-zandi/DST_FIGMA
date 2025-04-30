import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { CTASection } from "@/components/cta-section";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, InfoIcon, Phone, Mail, MessageSquareText, CheckCircle2 } from "lucide-react";
import { FAQ } from "@shared/schema";
import { ScheduleCallDialog } from "@/components/schedule-call-dialog";

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
        <HowItWorksSection />
        
        {/* Accreditation Info Section */}
        <section className="py-8 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Are you an accredited investor?
              </h2>
              
              <p className="text-gray-600 mb-5 text-sm">
                To participate in DST investments, you must be an accredited investor as defined by the Securities and Exchange Commission (SEC).
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Income requirements</p>
                    <p className="text-gray-600 text-xs">Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Net worth requirements</p>
                    <p className="text-gray-600 text-xs">Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Professional certifications</p>
                    <p className="text-gray-600 text-xs">Certain professional certifications, designations, or credentials recognized by the SEC.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-xs">Entity investments</p>
                    <p className="text-gray-600 text-xs">Financial institutions, private business development companies, or organizations with assets exceeding $5 million.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-5 border border-gray-200 rounded-lg mb-5">
                <h3 className="font-semibold text-sm mb-3">Qualification Process</h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">1</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-xs">Create your account</p>
                      <p className="text-gray-600 text-xs">Complete your investor profile</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">2</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-xs">Submit verification documents</p>
                      <p className="text-gray-600 text-xs">Upload required financial documentation</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">3</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-xs">Receive confirmation</p>
                      <p className="text-gray-600 text-xs">Gain access to all DST investment opportunities</p>
                    </div>
                  </li>
                </ol>
              </div>
              
              <div className="text-center">
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md text-xs">
                  <Link href="/auth?tab=register">
                    Start Verification Process
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />

        {/* FAQ Preview Section */}
        <section className="py-8 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Frequently Asked Questions
              </h2>

              {/* FAQ Accordion */}
              <div className="space-y-2 mb-6">
                <Accordion type="single" collapsible className="space-y-2">
                  {faqs?.slice(0, 3).map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline">
                        <h3 className="text-sm font-medium text-gray-900 text-left">
                          {faq.question}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-3 text-gray-600">
                        <p className="text-xs">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="text-center">
                <Button asChild size="sm" variant="outline" className="gap-1 text-xs h-8 border-gray-300 rounded-md">
                  <Link href="/faq">
                    View All FAQs
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                Have questions about DST investments?
              </h2>
              <p className="text-sm text-gray-600 mb-6 text-center">
                Our team of investment professionals is here to help you navigate the world of DST investments and 1031 exchanges
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Schedule a Call</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Speak with one of our investment advisors at a time that works for you.
                  </p>
                  <div>
                    <Button size="sm" variant="outline" className="text-xs h-7 w-full">
                      Book a Time
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Send us your questions and we'll respond within one business day.
                  </p>
                  <div>
                    <Button size="sm" variant="outline" className="text-xs h-7 w-full">
                      Contact Us
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <MessageSquareText className="h-4 w-4 text-gray-700" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Chat with AI</h3>
                  <p className="text-xs text-gray-600 mb-3">
                    Get immediate answers to common questions with our AI assistant.
                  </p>
                  <div>
                    <Button size="sm" variant="outline" className="text-xs h-7 w-full">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
