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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center bg-primary/10 text-primary rounded-full py-1 px-3 text-sm font-medium mb-4">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Investor Qualifications
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                  Are you an accredited investor?
                </h2>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC).
                </p>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Income requirements</p>
                      <p className="text-gray-600">Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Net worth requirements</p>
                      <p className="text-gray-600">Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1 mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Professional qualifications</p>
                      <p className="text-gray-600">Certain professional certifications, designations, or credentials recognized by the SEC.</p>
                    </div>
                  </div>
                </div>
                
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/accreditation">
                    Learn more about accreditation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="relative">
                <div className="absolute -z-10 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-8 relative">
                  <div className="flex items-center mb-6">
                    <InfoIcon className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      Qualification Process
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">
                    Our streamlined verification process helps determine if you meet the SEC's criteria for an accredited investor. Here's how it works:
                  </p>
                  
                  <ol className="space-y-4 mb-6">
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-medium">1</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Create an account</p>
                        <p className="text-gray-600 text-sm">Sign up for free and complete your investor profile</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-medium">2</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Submit verification materials</p>
                        <p className="text-gray-600 text-sm">Provide the necessary documentation based on your qualification method</p>
                      </div>
                    </li>
                    
                    <li className="flex gap-4">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-primary text-white flex items-center justify-center font-medium">3</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">Receive confirmation</p>
                        <p className="text-gray-600 text-sm">Once verified, gain access to all DST investment opportunities</p>
                      </div>
                    </li>
                  </ol>
                  
                  <Button asChild className="w-full">
                    <Link href="/auth?tab=register">
                      Start Verification Process
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTASection />

        {/* FAQ Preview Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about Delaware Statutory Trust investments
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3 mb-10">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs?.slice(0, 4).map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <h3 className="text-lg font-medium text-gray-900 text-left">
                        {faq.question}
                      </h3>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/faq">
                  View All FAQs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Options Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Have questions about DST investments?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our team of investment professionals is here to help you navigate the world of DST investments and 1031 exchanges
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Schedule a Call</h3>
                <p className="text-gray-600 mb-6">
                  Speak directly with one of our investment advisors at a time that works for you.
                </p>
                <div className="mt-auto">
                  <ScheduleCallDialog />
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Email Us</h3>
                <p className="text-gray-600 mb-6">
                  Send us your questions and we'll respond within one business day.
                </p>
                <div className="mt-auto">
                  <Button variant="outline">
                    Contact Us
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <MessageSquareText className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Chat with AI</h3>
                <p className="text-gray-600 mb-6">
                  Get immediate answers to common questions with our AI assistant.
                </p>
                <div className="mt-auto">
                  <Button variant="outline">
                    Start Chat
                  </Button>
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
