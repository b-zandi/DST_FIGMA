import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PromoterDisclosure } from "@/components/promoter-disclosure";
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
                    DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC). DST interests are illiquid, may be leveraged, and investors can lose all or part of their principal.
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
                      Here's how it works:
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
                          <p className="font-medium text-gray-900">Complete Our Questionnaire</p>
                          <p className="text-gray-600">Answer a few income/net-worth questions to see if you meet SEC criteria.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Third-party verification & next steps</p>
                          <p className="text-gray-600">If you qualify, we’ll introduce you to an independent adviser that will complete the formal accreditation check and, at your request, discuss DST options</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <PromoterDisclosure />
                      <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-3">
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
        <section className="py-12 bg-white border-b border-gray-100 w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>

              {/* FAQ List */}
              <div className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/faq" className="group">
                    <div className="border border-gray-200 rounded-md p-6 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        What is a Delaware Statutory Trust (DST)?
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        A Delaware Statutory Trust (DST) is a legally recognized trust that allows investors to own fractional interests in commercial real estate properties.
                      </p>
                      <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                  
                  <Link href="/faq" className="group">
                    <div className="border border-gray-200 rounded-md p-6 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        How does a 1031 exchange work with a DST?
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        When selling an investment property, investors can use a 1031 exchange to defer capital gains taxes by reinvesting the proceeds into a DST property.
                      </p>
                      <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                  
                  <Link href="/faq" className="group">
                    <div className="border border-gray-200 rounded-md p-6 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        What are the potential benefits of DST investments?
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        DST investments offer several potential benefits including tax deferral, passive income, access to institutional-quality properties, and more.
                      </p>
                      <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                  
                  <Link href="/faq" className="group">
                    <div className="border border-gray-200 rounded-md p-6 hover:border-blue-300 hover:shadow-sm transition-all duration-200">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 mb-2">
                        Who can invest in a DST?
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        DST investments are available exclusively to accredited investors as defined by the Securities and Exchange Commission (SEC).
                      </p>
                      <span className="text-blue-600 text-sm font-medium inline-flex items-center">
                        Read more
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </div>
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

        {/* CTA Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Ready to Explore DST Investments?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Create an account, complete the questionnaire, and begin your DST Investment journey .
              </p>
              <PromoterDisclosure />
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                <Button size="lg" asChild>
                  <Link href="/auth">
                    Start Questionnaire
                  </Link>
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
