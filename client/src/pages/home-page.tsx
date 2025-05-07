import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
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
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Are you an accredited investor?
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC).
                  </p>
                  
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Income requirements</p>
                        <p className="text-gray-600">Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Net worth requirements</p>
                        <p className="text-gray-600">Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Professional qualifications</p>
                        <p className="text-gray-600">Certain professional certifications, designations, or credentials recognized by the SEC.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button asChild variant="outline" className="gap-2">
                      <Link href="/accreditation">
                        Learn more about accreditation
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Right Column - Qualification Card */}
                <div>
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <div className="flex items-center mb-5">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <InfoIcon className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Qualification Process
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Our streamlined verification process helps determine if you meet the SEC's criteria for an accredited investor. Here's how it works:
                    </p>
                    
                    <div className="space-y-5">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Create an account</p>
                          <p className="text-gray-600">Sign up for free and complete your investor profile</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Submit verification materials</p>
                          <p className="text-gray-600">Provide the necessary documentation based on your qualification method</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Receive confirmation</p>
                          <p className="text-gray-600">Once verified, gain access to all DST investment opportunities</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        <Link href="/auth?tab=register">
                          Start Verification Process
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="py-12 bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>

              {/* FAQ Accordion */}
              <div className="space-y-4 mb-8">
                <Accordion type="single" collapsible>
                  {faqs?.slice(0, 3).map((faq) => (
                    <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border border-gray-200 rounded-md overflow-hidden mb-4">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <h3 className="text-base font-medium text-gray-900 text-left">
                          {faq.question}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
                        <p>{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="text-center">
                <Button asChild variant="outline" className="gap-2 border-gray-300 bg-white rounded-md text-sm h-auto px-6 py-2">
                  <Link href="/faq">
                    View All FAQs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Have questions about DST investments?
              </h2>
              <p className="text-gray-600 mb-10 text-center">
                Our team of investment professionals is here to help you navigate the world of DST investments and 1031 exchanges
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
                  <div className="flex justify-center mb-5">
                    <Phone className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Schedule a Call</h3>
                  <p className="text-gray-600 mb-6">
                    Speak with one of our investment advisors at a time that works for you.
                  </p>
                  <div>
                    <Button variant="outline" className="text-sm px-6 py-2 h-auto border-gray-300 w-full">
                      Book a Time
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
                  <div className="flex justify-center mb-5">
                    <Mail className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Email Us</h3>
                  <p className="text-gray-600 mb-6">
                    Send us your questions and we'll respond within one business day.
                  </p>
                  <div>
                    <Button variant="outline" className="text-sm px-6 py-2 h-auto border-gray-300 w-full">
                      Contact Us
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
