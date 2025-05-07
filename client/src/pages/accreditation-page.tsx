import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  User, 
  Briefcase, 
  FileText, 
  Shield, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Award, 
  Building, 
  Check
} from "lucide-react";

export default function AccreditationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1A2B50] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Investor Accreditation
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Understanding the requirements and benefits of becoming an accredited investor for DST investments.
              </p>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-white/10 text-white/90 mb-6">
                <Shield className="h-4 w-4" />
                <span className="text-sm font-medium">Required for DST Investments</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="individual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="individual" className="text-sm sm:text-base">
                      <User className="h-4 w-4 mr-2 hidden sm:inline-block" />
                      Individual Investors
                    </TabsTrigger>
                    <TabsTrigger value="entity" className="text-sm sm:text-base">
                      <Building className="h-4 w-4 mr-2 hidden sm:inline-block" />
                      Entities & Organizations
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="individual" className="space-y-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-[#1A2B50] mb-4">
                        Individual Accredited Investor Requirements
                      </h2>
                      <p className="text-gray-600 mb-6">
                        To qualify as an accredited investor, individuals must meet at least one of the following criteria established by the Securities and Exchange Commission (SEC):
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <DollarSign className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Income Threshold</h3>
                            <p className="text-gray-600 mt-1">
                              Individual income exceeding $200,000 in each of the two most recent years, with a reasonable expectation of reaching the same income level in the current year.
                            </p>
                            <p className="text-gray-600 mt-2">
                              <span className="font-medium">OR</span> joint income with a spouse or spousal equivalent exceeding $300,000 in each of the two most recent years, with a reasonable expectation of reaching the same income level in the current year.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Briefcase className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Net Worth Threshold</h3>
                            <p className="text-gray-600 mt-1">
                              Individual or joint net worth with a spouse or spousal equivalent exceeding $1,000,000, excluding the value of the primary residence.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Award className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Professional Certifications</h3>
                            <p className="text-gray-600 mt-1">
                              Holding certain professional certifications, designations, or credentials in good standing, such as Series 7, Series 65, or Series 82 licenses.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Briefcase className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Private Fund Investment Professional</h3>
                            <p className="text-gray-600 mt-1">
                              "Knowledgeable employees" of a private fund or its investment manager, including executives, directors, trustees, general partners, and those involved in the investment activities of the fund.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-[#1A2B50] mb-4">
                        How to Verify Your Accreditation Status
                      </h2>
                      <p className="text-gray-600 mb-6">
                        The SEC requires verification of accredited investor status before participating in certain securities offerings. The verification process typically involves the following steps:
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              1
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Documentation Collection</h3>
                            <p className="text-gray-600 mt-1">
                              Gather relevant financial documentation such as tax returns, W-2s, bank statements, brokerage statements, credit reports, or professional certification information.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              2
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Third-Party Verification</h3>
                            <p className="text-gray-600 mt-1">
                              Submit documentation to a third-party verifier such as a registered broker-dealer, SEC-registered investment advisor, licensed attorney, or certified public accountant.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              3
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Verification Letter</h3>
                            <p className="text-gray-600 mt-1">
                              Receive a verification letter confirming your accredited investor status, which can be provided to issuers of securities.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              4
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Regular Renewal</h3>
                            <p className="text-gray-600 mt-1">
                              Verification is typically valid for 90 days to 3 years, depending on the verifier and the nature of the investment.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-primary">Our Verification Support</h3>
                            <p className="mt-1 text-sm text-gray-600">
                              DST Brokerage works with trusted third-party verification services to streamline the accreditation process for our investors. Our team can guide you through each step of the verification process.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="entity" className="space-y-8">
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-[#1A2B50] mb-4">
                        Entity Accredited Investor Requirements
                      </h2>
                      <p className="text-gray-600 mb-6">
                        For entities and organizations to qualify as accredited investors, they must meet one of the following criteria established by the SEC:
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Building className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Trust with Assets Over $5 Million</h3>
                            <p className="text-gray-600 mt-1">
                              A trust with total assets exceeding $5 million, not formed specifically to acquire the offered securities, and directed by a sophisticated person.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Building className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Entities Owned by Accredited Investors</h3>
                            <p className="text-gray-600 mt-1">
                              Any entity in which all equity owners are accredited investors.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Building className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Entities with Assets Over $5 Million</h3>
                            <p className="text-gray-600 mt-1">
                              Corporations, partnerships, LLCs, and other entities with total assets exceeding $5 million, not formed for the specific purpose of acquiring the offered securities.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Building className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Financial Institutions</h3>
                            <p className="text-gray-600 mt-1">
                              Banks, insurance companies, registered investment companies, business development companies, small business investment companies, and certain employee benefit plans.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                              <Building className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Family Offices</h3>
                            <p className="text-gray-600 mt-1">
                              Family offices with at least $5 million in assets under management and their family clients.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                      <h2 className="text-2xl font-bold text-[#1A2B50] mb-4">
                        Entity Verification Process
                      </h2>
                      <p className="text-gray-600 mb-6">
                        Entities seeking to verify their accredited investor status typically need to provide the following documentation:
                      </p>
                      
                      <div className="space-y-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              1
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Entity Documentation</h3>
                            <p className="text-gray-600 mt-1">
                              Formation documents (e.g., articles of incorporation, partnership agreement, operating agreement) and evidence of good standing.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              2
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Financial Statements</h3>
                            <p className="text-gray-600 mt-1">
                              Audited or certified financial statements or tax returns demonstrating the required asset threshold.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              3
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Ownership Information</h3>
                            <p className="text-gray-600 mt-1">
                              For entities qualifying based on all owners being accredited investors, documentation verifying the accredited status of each owner.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white font-semibold">
                              4
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-[#1A2B50]">Authorization Documentation</h3>
                            <p className="text-gray-600 mt-1">
                              Corporate resolutions or similar documentation authorizing the investment and designating authorized signatories.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <Shield className="h-5 w-5 text-primary" />
                          </div>
                          <div className="ml-3">
                            <h3 className="text-sm font-medium text-primary">Entity Support Services</h3>
                            <p className="mt-1 text-sm text-gray-600">
                              DST Brokerage offers specialized support for entities seeking to invest in DST opportunities. Our team can assist with the verification process and work with your legal and financial advisors to ensure compliance with all requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* FAQ Section */}
                <div className="mt-12">
                  <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-[#1A2B50] mb-6">
                      Frequently Asked Questions About Accreditation
                    </h2>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-[#1A2B50] font-medium">
                          Why are DST investments limited to accredited investors?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          DST investments are considered private securities offerings and are typically offered under Regulation D of the Securities Act. The SEC limits these investments to accredited investors because they are considered sophisticated enough to understand the risks involved and financially capable of bearing potential losses. The accreditation requirement helps protect retail investors from high-risk, complex investments.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="text-[#1A2B50] font-medium">
                          How long does the accreditation verification process take?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          The verification process typically takes 2-5 business days once all required documentation has been submitted. Working with a third-party verification service can streamline this process. At DST Brokerage, we work with trusted verification partners to make the process as efficient as possible.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="text-[#1A2B50] font-medium">
                          Do I need to verify my accreditation status for each investment?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Verification requirements can vary depending on the specific offering and the exemption under which it is being offered. For Rule 506(c) offerings, verification is required for each new offering. However, if you invest in multiple DSTs from the same sponsor within a short timeframe, your verification may be valid for all of those investments. The verification is typically valid for 90 days to 3 years, depending on the verification method used.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="text-[#1A2B50] font-medium">
                          Can my IRA or other retirement account invest in DSTs?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, self-directed IRAs and certain other retirement accounts can invest in DSTs. However, the account itself must qualify as an accredited investor, which typically means the individual who controls the account must meet the accreditation requirements. Additionally, there may be special considerations for retirement accounts, including UBIT (Unrelated Business Income Tax) implications, especially for debt-financed properties.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger className="text-[#1A2B50] font-medium">
                          If I don't qualify as an accredited investor, are there alternative real estate investment options?
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          Yes, there are several alternative real estate investment options for non-accredited investors, including publicly traded REITs (Real Estate Investment Trusts), real estate mutual funds, ETFs focused on real estate, real estate crowdfunding platforms that accept non-accredited investors, and tenancy-in-common arrangements that are structured as public offerings. While these alternatives offer exposure to real estate, they may not provide the same tax advantages as DST investments for 1031 exchanges.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Benefits Card */}
                <Card className="border-t-4 border-primary">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#1A2B50] mb-4">
                      Benefits of Accredited Investor Status
                    </h3>
                    
                    <ul className="space-y-3">
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Access to exclusive private investment opportunities</span>
                      </li>
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Ability to participate in 1031 exchange DST investments</span>
                      </li>
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Potential for higher returns compared to public markets</span>
                      </li>
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Portfolio diversification beyond traditional investments</span>
                      </li>
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Significant tax advantages through 1031 exchanges</span>
                      </li>
                      <li className="flex">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                        <span className="text-gray-700">Passive ownership structure with professional management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Verification Support Card */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#1A2B50] mb-4">
                      Need Help with Verification?
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                      Our team can guide you through the accreditation verification process to ensure you can access our DST investment opportunities.
                    </p>
                    
                    <div className="space-y-4">
                      <Button className="w-full">Schedule a Consultation</Button>
                      <Button variant="outline" className="w-full">Download Verification Guide</Button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                          <p className="mt-1 text-sm text-yellow-700">
                            The information on this page is provided for educational purposes only and does not constitute legal or financial advice. Always consult with qualified professionals regarding your specific situation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Updates Card */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-[#1A2B50] mb-4">
                      Regulatory Updates
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <p className="flex items-center text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>August 26, 2023</span>
                        </p>
                        <h4 className="font-medium text-[#1A2B50]">
                          SEC Amendments to Accredited Investor Definition
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          The SEC expanded the accredited investor definition to include new categories based on professional knowledge and certifications.
                        </p>
                      </div>
                      
                      <div className="border-b pb-4">
                        <p className="flex items-center text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>December 8, 2022</span>
                        </p>
                        <h4 className="font-medium text-[#1A2B50]">
                          Updated Verification Requirements for Rule 506(c) Offerings
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          The SEC clarified verification requirements for Rule 506(c) offerings, emphasizing the importance of reasonable steps to verify status.
                        </p>
                      </div>
                      
                      <div>
                        <p className="flex items-center text-sm text-gray-500 mb-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>March 15, 2022</span>
                        </p>
                        <h4 className="font-medium text-[#1A2B50]">
                          New Guidance on Verification Documentation Retention
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Updated guidance on documentation retention requirements for issuers verifying accredited investor status.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                Schedule a call with one of our DST investment specialists to learn more about current opportunities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" variant="outline" className="border-gray-300">
                  Schedule a Consultation
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