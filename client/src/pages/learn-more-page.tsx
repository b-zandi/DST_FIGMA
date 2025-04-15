import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  Briefcase, 
  DollarSign, 
  FileCheck, 
  ChevronRight, 
  Handshake, 
  TrendingUp, 
  Shield, 
  PieChart 
} from "lucide-react";

export default function LearnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#1A2B50] py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Understanding Delaware Statutory Trusts
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Your comprehensive guide to DST investments, 1031 exchanges, and building a diversified real estate portfolio
              </p>
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Tabs defaultValue="what-is-dst" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="what-is-dst">What is a DST?</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
                <TabsTrigger value="exchange">1031 Exchange</TabsTrigger>
                <TabsTrigger value="investing">Investing Process</TabsTrigger>
              </TabsList>
              
              {/* What is a DST Tab */}
              <TabsContent value="what-is-dst" className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <Building className="h-10 w-10 text-primary mr-4" />
                    <h2 className="text-3xl font-bold text-[#1A2B50]">What is a Delaware Statutory Trust?</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6">
                    A Delaware Statutory Trust (DST) is a legally recognized trust that allows investors to purchase fractional ownership interests in real estate. DSTs are created under Delaware state law and are recognized by the IRS as qualified replacement properties for 1031 exchanges.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-8 mt-8">
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-[#1A2B50] mb-3">
                        DST Structure
                      </h3>
                      <p className="text-gray-600 mb-6">
                        DSTs are pre-packaged real estate investments typically comprised of institutional-quality, commercial properties. The trust is managed by a professional sponsor who handles all aspects of property management, allowing for truly passive ownership.
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Single-purpose entity created to hold title to real estate</li>
                        <li>Sponsor acts as trustee and manages the property</li>
                        <li>Investors purchase beneficial interests in the trust</li>
                        <li>Typically holds a single property or portfolio of properties</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <h3 className="text-xl font-semibold text-[#1A2B50] mb-3">
                        DST vs. Other Investment Types
                      </h3>
                      <p className="text-gray-600 mb-4">
                        DSTs differ from other real estate investment vehicles in several key ways:
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6">vs.</div>
                          <div>
                            <span className="font-medium">REITs</span>: DSTs provide direct ownership in specific properties rather than shares in a company that owns real estate
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6">vs.</div>
                          <div>
                            <span className="font-medium">TICs</span>: DSTs offer simplified management and lower minimum investments than Tenancy-In-Common structures
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-6">vs.</div>
                          <div>
                            <span className="font-medium">Direct Ownership</span>: DSTs eliminate management responsibilities while maintaining tax benefits
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-2xl font-semibold text-[#1A2B50] mb-4">
                    Legal Framework of DSTs
                  </h3>
                  <p className="text-gray-700 mb-6">
                    DSTs operate under specific IRS guidelines and Delaware state laws. In 2004, the IRS issued Revenue Ruling 2004-86, which established that beneficial interests in a properly structured DST qualify as "like-kind" property for 1031 exchange purposes.
                  </p>
                  <p className="text-gray-700 mb-6">
                    To maintain qualification for 1031 exchanges, all DSTs must adhere to the "Seven Deadly Sins" - restrictions outlined by the IRS that limit what actions the DST can take regarding the property.
                  </p>
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h4 className="text-xl font-medium text-[#1A2B50] mb-3">The Seven Deadly Sins - DST Restrictions</h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>The DST cannot purchase additional assets after closing</li>
                      <li>The DST cannot renegotiate the terms of existing loans or take on new debt</li>
                      <li>The DST cannot reinvest proceeds from the sale of its real estate</li>
                      <li>The DST cannot renegotiate leases or enter into new leases</li>
                      <li>The DST cannot make major structural changes to the property</li>
                      <li>The DST has limited ability to make capital expenditures</li>
                      <li>The DST must distribute all cash, other than necessary reserves, to investors</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Benefits Tab */}
              <TabsContent value="benefits" className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="h-10 w-10 text-primary mr-4" />
                    <h2 className="text-3xl font-bold text-[#1A2B50]">Benefits of DST Investments</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-8">
                    Delaware Statutory Trusts offer numerous advantages for real estate investors, particularly those looking to defer capital gains taxes through 1031 exchanges and those seeking passive investment opportunities.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-6">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                        Tax Advantages
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Eligible for 1031 tax-deferred exchanges</li>
                        <li>Potential step-up in basis upon death</li>
                        <li>Pass-through depreciation benefits</li>
                        <li>No state income tax in Delaware</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Handshake className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                        Passive Ownership
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>No landlord responsibilities</li>
                        <li>Professional property management</li>
                        <li>No property-level decisions required</li>
                        <li>Simplified ownership structure</li>
                        <li>Regular income distributions</li>
                      </ul>
                    </Card>
                    
                    <Card className="p-6">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <PieChart className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                        Diversification
                      </h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600">
                        <li>Access to institutional-quality properties</li>
                        <li>Lower minimum investment thresholds</li>
                        <li>Ability to split investment across multiple DSTs</li>
                        <li>Diversification across property types and locations</li>
                      </ul>
                    </Card>
                  </div>
                  
                  <div className="mt-8 bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-[#1A2B50] mb-3">
                      Additional DST Benefits
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-[#1A2B50] mb-2">Estate Planning Advantages</h4>
                        <p className="text-gray-600 mb-4">
                          DSTs can simplify estate planning by allowing fractional interests to be passed to multiple heirs, potentially removing management burdens from future generations while maintaining the tax benefits.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-[#1A2B50] mb-2">Liability Protection</h4>
                        <p className="text-gray-600 mb-4">
                          DST investors have no personal liability beyond their investment amount. The trust structure and non-recourse financing protect investors from personal liability for property-related issues and debt.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* 1031 Exchange Tab */}
              <TabsContent value="exchange" className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <Briefcase className="h-10 w-10 text-primary mr-4" />
                    <h2 className="text-3xl font-bold text-[#1A2B50]">DSTs and 1031 Exchanges</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-8">
                    A 1031 exchange, named after Section 1031 of the Internal Revenue Code, allows investors to defer capital gains taxes by reinvesting proceeds from the sale of investment property into "like-kind" property. DSTs are recognized by the IRS as qualified replacement properties for 1031 exchanges.
                  </p>
                  
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200">
                        <h3 className="text-xl font-semibold text-[#1A2B50] mb-4">
                          Key 1031 Exchange Requirements
                        </h3>
                        <ul className="list-disc pl-5 space-y-3 text-gray-600">
                          <li><strong>45-Day Identification Period:</strong> Investors must identify potential replacement properties within 45 days of selling their relinquished property</li>
                          <li><strong>180-Day Exchange Period:</strong> The replacement property must be acquired within 180 days of the sale</li>
                          <li><strong>Qualified Intermediary:</strong> A neutral third party must facilitate the exchange</li>
                          <li><strong>Equal or Greater Value:</strong> To defer all taxes, the replacement property must be of equal or greater value than the relinquished property</li>
                          <li><strong>Like-Kind Requirement:</strong> Properties must be of "like-kind" - generally, any real property held for investment or business use</li>
                        </ul>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-[#1A2B50] mb-4">
                          How DSTs Solve 1031 Exchange Challenges
                        </h3>
                        <ul className="list-disc pl-5 space-y-3 text-gray-600">
                          <li><strong>Timing Solution:</strong> Pre-packaged DST investments are available immediately, helping investors meet tight 1031 deadlines</li>
                          <li><strong>Debt Replacement:</strong> DSTs typically include non-recourse financing, helping investors meet debt replacement requirements</li>
                          <li><strong>Fractional Ownership:</strong> Investors can precisely match replacement property values by purchasing the exact amount needed</li>
                          <li><strong>Diversification:</strong> Capital can be split across multiple DST properties, reducing concentration risk</li>
                          <li><strong>Management Relief:</strong> Transition from active to passive ownership while maintaining tax deferral benefits</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-[#1A2B50] mb-4">
                      DST 1031 Exchange Process
                    </h3>
                    <div className="relative">
                      {/* Timeline */}
                      <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gray-300 transform -translate-x-1/2"></div>
                      
                      {/* Timeline Steps */}
                      <div className="space-y-8 relative">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-medium text-[#1A2B50] mb-2">1. Property Sale</h4>
                              <p className="text-gray-600">
                                Sell your investment property and have proceeds transferred to a Qualified Intermediary (QI) to begin the 1031 exchange process.
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2"></div>
                          <div className="md:w-1/2 md:pl-12"></div>
                        </div>
                        
                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="md:w-1/2 md:pr-12 md:text-right"></div>
                          <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2"></div>
                          <div className="md:w-1/2 md:pl-12">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-medium text-[#1A2B50] mb-2">2. Identify DST Properties</h4>
                              <p className="text-gray-600">
                                Work with our team to identify suitable DST investments within the 45-day identification period required by the IRS.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-medium text-[#1A2B50] mb-2">3. Due Diligence</h4>
                              <p className="text-gray-600">
                                Review offering materials, property details, financial projections, and risk factors with your financial advisor.
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2"></div>
                          <div className="md:w-1/2 md:pl-12"></div>
                        </div>
                        
                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="md:w-1/2 md:pr-12"></div>
                          <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2"></div>
                          <div className="md:w-1/2 md:pl-12">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-medium text-[#1A2B50] mb-2">4. Complete Investment</h4>
                              <p className="text-gray-600">
                                Submit subscription documents and instruct your QI to transfer funds to complete the DST investment within the 180-day exchange period.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Step 5 */}
                        <div className="flex flex-col md:flex-row items-start">
                          <div className="md:w-1/2 md:pr-12 mb-4 md:mb-0">
                            <div className="bg-white p-5 rounded-lg border border-gray-200">
                              <h4 className="text-lg font-medium text-[#1A2B50] mb-2">5. Receive Distributions</h4>
                              <p className="text-gray-600">
                                Start receiving regular income distributions from your DST investment while the sponsor handles all property management responsibilities.
                              </p>
                            </div>
                          </div>
                          <div className="hidden md:block absolute left-1/2 w-6 h-6 rounded-full bg-primary transform -translate-x-1/2"></div>
                          <div className="md:w-1/2 md:pl-12"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Investing Process Tab */}
              <TabsContent value="investing" className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center mb-6">
                    <FileCheck className="h-10 w-10 text-primary mr-4" />
                    <h2 className="text-3xl font-bold text-[#1A2B50]">The DST Investment Process</h2>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-8">
                    Investing in Delaware Statutory Trusts is a straightforward process designed to give accredited investors access to institutional-quality real estate. Our platform streamlines this process while providing comprehensive support at every step.
                  </p>
                  
                  <div className="grid gap-8">
                    {/* Step 1 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          1
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Verify Accreditation Status
                          </h3>
                          <p className="text-gray-600 mb-4">
                            DST investments are only available to accredited investors as defined by the SEC. Our platform offers a simple verification process to confirm your status.
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <Link href="/accreditation" className="flex items-center gap-1">
                              Accreditation Information
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Step 2 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          2
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Consult With Our DST Specialists
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Connect with our team of DST investment specialists who can provide detailed information about available offerings across diverse property types and locations. Our experts will guide you through property information, sponsor details, financial projections, and risk factors.
                          </p>

                        </div>
                      </div>
                    </Card>
                    
                    {/* Step 3 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          3
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Complete Due Diligence
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Review comprehensive offering materials including the Private Placement Memorandum (PPM), financial projections, property condition reports, market analysis, and sponsor track record. Our investment specialists are available to answer any questions.
                          </p>
                          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <h4 className="font-medium text-[#1A2B50] mb-2">Due Diligence Materials Include:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-gray-600">
                              <li>Private Placement Memorandum (PPM)</li>
                              <li>Property financial statements and projections</li>
                              <li>Property condition and environmental reports</li>
                              <li>Tenant information and lease terms</li>
                              <li>Market and location analysis</li>
                              <li>Sponsor background and track record</li>
                              <li>Investment risk factors</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Step 4 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          4
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Complete Subscription Documents
                          </h3>
                          <p className="text-gray-600 mb-4">
                            After selecting a DST investment, complete the subscription agreement and related documents. Our platform offers electronic document signing to streamline this process. For 1031 exchange investors, we coordinate with your Qualified Intermediary.
                          </p>
                          <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-md">
                            <Shield className="h-5 w-5 text-primary" />
                            <span>All documents and personal information are secured with bank-level encryption.</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Step 5 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          5
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Fund Your Investment
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Transfer funds to complete your investment. For 1031 exchange investors, your Qualified Intermediary will transfer funds directly to the DST. Cash investors can wire funds from their bank or investment account.
                          </p>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Step 6 */}
                    <Card className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-4">
                          6
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-[#1A2B50] mb-2">
                            Receive Confirmation and Distributions
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Once your investment is complete, you'll receive confirmation of your ownership interest in the DST. Regular income distributions are typically paid monthly or quarterly directly to your bank account. You'll also receive regular updates on property performance.
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <Link href="/profile" className="flex items-center gap-1">
                              View Your Investments
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold text-[#1A2B50] mb-4">
                  Ready to Explore DST Investments?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Schedule a call with one of our DST investment specialists to learn more about current opportunities.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">

                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      Schedule a Consultation
                    </Link>
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