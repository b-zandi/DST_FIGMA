import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../hooks/use-auth";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Percent, 
  Building, 
  FileText, 
  Phone, 
  Mail, 
  ArrowLeft, 
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Shield,
  Info
} from "lucide-react";
import { InvestmentProgressTracker } from "../components/investment-progress-tracker";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

// Example DST investment opportunities (same as in investing-page.tsx)
const investments = [
  {
    id: 1,
    title: "Multi-Family Apartment Complex",
    location: "Dallas, TX",
    propertyType: "Residential",
    assetClass: "Multi-Family",
    minInvestment: 50000,
    projectedYield: "5.8%",
    offeringSize: "$85,200,000",
    holdPeriod: "5-7 years",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=500",
    description: "Class A apartment complex with 320 units in a high-growth suburb of Dallas. The property features resort-style amenities, modern fixtures, and is located near major employers.",
    status: "available",
    sponsor: "North Star Real Estate",
    propertyAddress: "8750 Central Expressway, Dallas, TX 75231",
    yearBuilt: "2018",
    squareFeet: "375,000",
    occupancy: "94%",
    offeringDate: "October 2023",
    closingDate: "November 30, 2023",
    distributionFrequency: "Monthly",
    debtFinancing: "60% LTV, 10-year term, 4.2% fixed rate",
    taxAdvantages: "100% bonus depreciation in year 1",
    detailedDescription: "This Class A apartment complex consists of 320 units across 12 three-story buildings on a 22-acre site. The property was built in 2018 and features modern finishes including granite countertops, stainless steel appliances, and wood-style flooring. Community amenities include a resort-style pool, state-of-the-art fitness center, dog park, and resident clubhouse.\n\nThe property is located in a high-growth suburb of Dallas with excellent access to major employment centers, retail, and entertainment options. The submarket has experienced 5.2% average annual rent growth over the past 5 years with occupancy consistently above 93%.\n\nThe business plan involves light value-add improvements to unit interiors and common areas to support continued rent growth, with a target hold period of 5-7 years."
  },
  {
    id: 2,
    title: "Medical Office Portfolio",
    location: "Charlotte, NC",
    propertyType: "Commercial",
    assetClass: "Medical Office",
    minInvestment: 100000,
    projectedYield: "6.2%",
    offeringSize: "$42,500,000",
    holdPeriod: "7-10 years",
    imageUrl: "https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?auto=format&fit=crop&q=80&w=500",
    description: "Portfolio of three medical office buildings leased to credit tenants with weighted average lease term of 8.4 years. All properties are located near major hospital systems.",
    status: "available",
    sponsor: "Healthcare Properties Trust",
    propertyAddress: "Multiple locations in Charlotte, NC",
    yearBuilt: "2008-2015",
    squareFeet: "156,000 (total)",
    occupancy: "97%",
    offeringDate: "September 2023",
    closingDate: "December 15, 2023",
    distributionFrequency: "Monthly",
    debtFinancing: "55% LTV, 7-year term, 4.5% fixed rate",
    taxAdvantages: "Cost segregation study provided",
    detailedDescription: "This medical office portfolio consists of three Class A medical office buildings totaling 156,000 square feet in Charlotte, NC. The buildings are strategically located adjacent to major hospital systems and are leased to a diverse mix of medical practices including cardiology, ophthalmology, orthopedics, and primary care.\n\nThe portfolio has a weighted average lease term of 8.4 years with structured rent increases averaging 2.5% annually. The tenant base includes several credit-rated healthcare systems and established medical practices with long operating histories in the market.\n\nThe investment thesis is centered on the stable, recession-resistant nature of healthcare real estate and the strong demographic trends supporting healthcare demand in the Charlotte market."
  },
  {
    id: 3,
    title: "Industrial Distribution Center",
    location: "Phoenix, AZ",
    propertyType: "Commercial",
    assetClass: "Industrial",
    minInvestment: 25000,
    projectedYield: "5.5%",
    offeringSize: "$38,750,000",
    holdPeriod: "5-7 years",
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=500",
    description: "Modern distribution facility with 215,000 square feet leased to an e-commerce tenant. Strategic location with excellent access to major highways and growing population centers.",
    status: "available",
    sponsor: "Logistics Capital Partners",
    propertyAddress: "4720 E Jones Ave, Phoenix, AZ 85040",
    yearBuilt: "2019",
    squareFeet: "215,000",
    occupancy: "100%",
    offeringDate: "November 2023",
    closingDate: "January 20, 2024",
    distributionFrequency: "Monthly",
    debtFinancing: "58% LTV, 5-year term, 4.0% fixed rate",
    taxAdvantages: "Cost segregation and 100% bonus depreciation",
    detailedDescription: "This modern industrial distribution facility was built in 2019 and features 215,000 square feet of high-bay warehouse space with 32' clear heights, ESFR sprinkler system, 50 dock-high doors, and 2 drive-in doors. The property is 100% leased to a national e-commerce logistics provider on a 7-year triple-net lease with 2.75% annual rent escalations.\n\nLocated in the Southeast Valley industrial submarket of Phoenix, the property has excellent access to I-10, I-17, and Loop 202, allowing for efficient distribution throughout the Southwest region. The Phoenix industrial market has experienced significant growth due to population migration, e-commerce expansion, and reshoring of manufacturing operations.\n\nThe investment strategy is focused on stable cash flow from the in-place lease with potential for rent growth upon renewal given the property's strategic location and the strong fundamentals of the Phoenix industrial market."
  },
  {
    id: 4,
    title: "Grocery-Anchored Retail Center",
    location: "Nashville, TN",
    propertyType: "Commercial",
    assetClass: "Retail",
    minInvestment: 50000,
    projectedYield: "6.0%",
    offeringSize: "$32,400,000",
    holdPeriod: "7-10 years",
    imageUrl: "https://images.unsplash.com/photo-1565953937565-436f3628fb59?auto=format&fit=crop&q=80&w=500",
    description: "Neighborhood retail center anchored by a national grocery chain with 93% occupancy. Strong demographics with household income 25% above national average within 3-mile radius.",
    status: "available",
    sponsor: "Retail Value Investors",
    propertyAddress: "2350 Franklin Pike, Nashville, TN 37204",
    yearBuilt: "2012 (renovated 2020)",
    squareFeet: "95,000",
    occupancy: "93%",
    offeringDate: "October 2023",
    closingDate: "December 31, 2023",
    distributionFrequency: "Monthly",
    debtFinancing: "62% LTV, 10-year term, 4.7% fixed rate",
    taxAdvantages: "Cost segregation benefits available",
    detailedDescription: "This grocery-anchored retail center consists of 95,000 square feet anchored by a leading national grocery chain occupying 45,000 square feet with 8 years remaining on their lease. The remaining space is leased to a complementary mix of national and regional tenants including quick-service restaurants, service providers, and specialty retailers.\n\nThe property is located in an affluent Nashville suburb with average household income 25% above the national average within a 3-mile radius. The area has experienced strong population growth of 2.4% annually since 2015.\n\nThe property was renovated in 2020 with updated façades, enhanced landscaping, and improved signage. The investment thesis centers on the non-cyclical, internet-resistant nature of grocery-anchored retail and the strong demographic trends supporting the Nashville market."
  },
  {
    id: 5,
    title: "Class A Office Building",
    location: "Austin, TX",
    propertyType: "Commercial",
    assetClass: "Office",
    minInvestment: 100000,
    projectedYield: "5.2%",
    offeringSize: "$78,500,000",
    holdPeriod: "7-10 years",
    imageUrl: "https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&q=80&w=500",
    description: "Trophy office property in Austin's thriving tech corridor with 96% occupancy. LEED Gold certified with premium amenities and blue-chip tenant roster.",
    status: "closing soon",
    sponsor: "Innovation Real Estate Partners",
    propertyAddress: "11600 Domain Drive, Austin, TX 78758",
    yearBuilt: "2017",
    squareFeet: "245,000",
    occupancy: "96%",
    offeringDate: "August 2023",
    closingDate: "November 10, 2023",
    distributionFrequency: "Monthly",
    debtFinancing: "57% LTV, 7-year term, 4.3% fixed rate",
    taxAdvantages: "Cost segregation analysis provided",
    detailedDescription: "This Class A office building is a 12-story, 245,000 square foot LEED Gold certified property located in Austin's thriving tech corridor. Built in 2017, the property features modern architecture, floor-to-ceiling windows, and premium tenant amenities including a rooftop terrace, fitness center, conference facilities, and ground-floor retail.\n\nThe property is 96% leased to a diverse roster of technology, professional services, and financial firms with a weighted average lease term of 6.5 years. The tenant mix includes several Fortune 500 companies and high-growth technology firms that have made significant investments in their space buildouts.\n\nAustin continues to be one of the fastest-growing office markets in the country, benefiting from significant corporate relocations and expansions. The property's location provides excellent access to major thoroughfares and is surrounded by high-end retail, dining, and residential options."
  },
  {
    id: 6,
    title: "Senior Living Community",
    location: "Denver, CO",
    propertyType: "Residential",
    assetClass: "Senior Housing",
    minInvestment: 75000,
    projectedYield: "6.5%",
    offeringSize: "$54,800,000",
    holdPeriod: "7-10 years",
    imageUrl: "https://images.unsplash.com/photo-1568385247005-0d142c9888d2?auto=format&fit=crop&q=80&w=500",
    description: "Upscale continuing care retirement community with independent living, assisted living, and memory care units. Located in affluent suburb with strong demographics.",
    status: "closing soon",
    sponsor: "Senior Living Ventures",
    propertyAddress: "8545 E Belleview Ave, Denver, CO 80237",
    yearBuilt: "2015",
    squareFeet: "220,000",
    occupancy: "92%",
    offeringDate: "September 2023",
    closingDate: "November 15, 2023",
    distributionFrequency: "Monthly",
    debtFinancing: "55% LTV, 7-year term, 4.5% fixed rate",
    taxAdvantages: "Significant cost segregation benefits",
    detailedDescription: "This senior living community is a premier continuing care retirement community located in an affluent Denver suburb. The property includes 120 independent living units, 60 assisted living units, and 40 memory care units across 220,000 square feet on a 8.5-acre campus.\n\nThe community features upscale amenities including multiple dining venues, a wellness center with indoor pool, library, arts and crafts studio, theater, and landscaped grounds with walking paths. The property is managed by a nationally recognized senior living operator with extensive experience in the Colorado market.\n\nThe investment thesis is supported by the aging demographics of the U.S. population and the strong fundamentals of the Denver market. The property is located in an area with median home values over $650,000 and median household incomes exceeding $110,000, providing a deep pool of qualified residents."
  },
];

export default function InvestmentDetailPage() {
  const [, params] = useRoute("/investment/:id");
  const [investment, setInvestment] = useState<any>(null);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [investmentStage, setInvestmentStage] = useState(2); // Simulated investment stage (1-5)

  useEffect(() => {
    if (params && params.id) {
      const investmentId = parseInt(params.id);
      const foundInvestment = investments.find(inv => inv.id === investmentId);
      setInvestment(foundInvestment);
    }
  }, [params]);

  if (!investment) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1A2B50] mb-4">Investment Not Found</h1>
            <p className="text-gray-600 mb-6">The investment you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link href="/investing">Back to Investments</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <Button variant="outline" size="sm" asChild className="sm:w-auto w-full flex items-center">
              <Link href="/investing">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Investments
              </Link>
            </Button>
            
            <div className="flex items-center">
              {investment.status === "closing soon" ? (
                <Badge variant="destructive" className="flex items-center">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Closing Soon
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Available
                </Badge>
              )}
            </div>
          </div>

          {/* Property Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-64 sm:h-96">
              <img
                src={investment.imageUrl}
                alt={investment.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{investment.title}</h1>
                    <div className="flex items-center text-white/90">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{investment.propertyAddress}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-white border-white bg-white/10 text-sm">
                    {investment.assetClass}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-t border-gray-200">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Minimum Investment</span>
                <div className="flex items-center font-semibold text-[#1A2B50]">
                  <DollarSign className="h-4 w-4 mr-1 text-primary" />
                  ${investment.minInvestment.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Projected Yield</span>
                <div className="flex items-center font-semibold text-[#1A2B50]">
                  <Percent className="h-4 w-4 mr-1 text-primary" />
                  {investment.projectedYield}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Property Type</span>
                <div className="flex items-center font-semibold text-[#1A2B50]">
                  <Building className="h-4 w-4 mr-1 text-primary" />
                  {investment.propertyType}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">Hold Period</span>
                <div className="flex items-center font-semibold text-[#1A2B50]">
                  <Calendar className="h-4 w-4 mr-1 text-primary" />
                  {investment.holdPeriod}
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs & CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Property Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <Shield className="h-5 w-5 text-primary mt-0.5" />
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-[#1A2B50]">Accredited Investors Only</h4>
                            <p className="text-sm text-gray-700 mt-1">
                              This DST investment is exclusively available to accredited investors. Accreditation verification will be required prior to investment.{" "}
                              <Link href="/accreditation" className="text-primary hover:text-primary/90 font-medium">
                                Learn more about accreditation requirements
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="whitespace-pre-line">{investment.detailedDescription}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span>Institutional-quality {investment.assetClass.toLowerCase()} property in a high-growth market</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span>Projected annual cash yield of {investment.projectedYield} paid {investment.distributionFrequency.toLowerCase()}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span>Professional asset management by experienced {investment.assetClass.toLowerCase()} operator</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span>{investment.taxAdvantages}</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                          <span>1031 exchange eligible investment opportunity</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Address</TableCell>
                            <TableCell>{investment.propertyAddress}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Property Type</TableCell>
                            <TableCell>{investment.propertyType} - {investment.assetClass}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Year Built</TableCell>
                            <TableCell>{investment.yearBuilt}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Square Footage</TableCell>
                            <TableCell>{investment.squareFeet}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Occupancy</TableCell>
                            <TableCell>{investment.occupancy}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">Sponsor</TableCell>
                            <TableCell>{investment.sponsor}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Offering Size</TableCell>
                            <TableCell>{investment.offeringSize}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Minimum Investment</TableCell>
                            <TableCell>${investment.minInvestment.toLocaleString()}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Projected Yield</TableCell>
                            <TableCell>{investment.projectedYield}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Distribution Frequency</TableCell>
                            <TableCell>{investment.distributionFrequency}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Hold Period</TableCell>
                            <TableCell>{investment.holdPeriod}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Debt Financing</TableCell>
                            <TableCell>{investment.debtFinancing}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Offering Date</TableCell>
                            <TableCell>{investment.offeringDate}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">Closing Date</TableCell>
                            <TableCell>{investment.closingDate}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="documents" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Offering Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {user ? (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <span>Private Placement Memorandum</span>
                            </div>
                            <Button size="sm" variant="outline" className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <span>Executive Summary</span>
                            </div>
                            <Button size="sm" variant="outline" className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <span>Property Inspection Report</span>
                            </div>
                            <Button size="sm" variant="outline" className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-primary" />
                              <span>Subscription Agreement</span>
                            </div>
                            <Button size="sm" variant="outline" className="flex items-center">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <AlertCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Please log in to access documents
                          </h3>
                          <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            These documents contain detailed information about the investment and are available to registered users only.
                          </p>
                          <Button asChild>
                            <Link href="/auth">Log In or Register</Link>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="space-y-6">
              {/* Investment Progress Tracker */}
              {user && (
                <>
                  <InvestmentProgressTracker
                    currentStage={investmentStage}
                    startDate={investment.offeringDate}
                    estimatedCloseDate={investment.closingDate}
                    nextAction={{
                      text: "Complete Next Step",
                      link: "#"
                    }}
                  />
                  
                  {/* Test Controls - DEMO ONLY */}
                  <div className="flex flex-wrap gap-2 mt-3 px-2">
                    {[1, 2, 3, 4, 5].map(stage => (
                      <button
                        key={stage}
                        onClick={() => setInvestmentStage(stage)}
                        className={`px-2 py-1 text-xs rounded ${
                          investmentStage === stage 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Stage {stage}
                      </button>
                    ))}
                  </div>
                </>
              )}
              
              {/* CTA Card */}
              <Card className="border-t-4 border-primary">
                <CardHeader>
                  <CardTitle>Interested in this investment?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Speak with an investment advisor to learn more about this DST opportunity and determine if it's right for your portfolio.
                  </p>
                  
                  <div className="space-y-3">
                    <Button className="w-full">Schedule a Consultation</Button>
                    {user && (
                      <Button variant="outline" className="w-full">
                        Express Interest
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Key Metrics Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Current Investors</span>
                    </div>
                    <span className="font-medium">{Math.floor(Math.random() * 20) + 15}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <span>Funding Progress</span>
                    </div>
                    <span className="font-medium">{Math.floor(Math.random() * 50) + 40}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Days Until Closing</span>
                    </div>
                    <span className="font-medium">
                      {investment.status === "closing soon" ? 
                        Math.floor(Math.random() * 15) + 1 : 
                        Math.floor(Math.random() * 30) + 15}
                    </span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">Have questions about this investment? Our team is here to help.</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 mr-3 text-primary" />
                      <span>(888) 555-1234</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 mr-3 text-primary" />
                      <span>investments@dstbrokerage.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}