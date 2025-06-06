import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, Building, MapPin, Calendar, DollarSign, ChevronRight, Filter, SlidersHorizontal, Shield } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "wouter";

// Example DST investment opportunities
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
  },
];

export default function InvestingPage() {
  const { user } = useAuth();
  const [assetFilter, setAssetFilter] = useState<string>("all");
  const [propertyFilter, setPropertyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  // Apply filters and sorting
  const filteredInvestments = investments.filter(investment => {
    if (assetFilter !== "all" && investment.assetClass !== assetFilter) return false;
    if (propertyFilter !== "all" && investment.propertyType !== propertyFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "minInvestment") {
      return a.minInvestment - b.minInvestment;
    } else if (sortBy === "yield") {
      return parseFloat(b.projectedYield) - parseFloat(a.projectedYield);
    }
    return 0; // default, no sorting
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1A2B50] mb-2">Available DST Investments</h1>
            <p className="text-gray-600">
              Browse our curated selection of Delaware Statutory Trust investment opportunities.
              {!user && " Sign in or register to access full investment details."}
            </p>
            <div className="mt-3 p-4 bg-blue-50 border border-blue-100 rounded-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-700">
                    DST investments are exclusively available to accredited investors as defined by the SEC.{" "}
                    <Link href="/accreditation" className="text-primary hover:text-primary/90 font-medium">
                      Learn more about accreditation requirements
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="min-w-[160px]">
                  <Select value={assetFilter} onValueChange={setAssetFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Asset Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Asset Classes</SelectItem>
                      <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Medical Office">Medical Office</SelectItem>
                      <SelectItem value="Senior Housing">Senior Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="min-w-[160px]">
                  <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Residential">Residential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="min-w-[160px]">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Recommended</SelectItem>
                      <SelectItem value="minInvestment">Minimum Investment</SelectItem>
                      <SelectItem value="yield">Projected Yield</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Investments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredInvestments.map((investment) => (
              <Card key={investment.id} className="overflow-hidden flex flex-col h-full border-t-4 border-primary">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={investment.imageUrl} 
                    alt={investment.title} 
                    className="w-full h-full object-cover"
                  />
                  {investment.status === "closing soon" && (
                    <Badge variant="destructive" className="absolute top-3 right-3">
                      Closing Soon
                    </Badge>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{investment.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                        {investment.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-2">
                      {investment.assetClass}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4 flex-grow">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {investment.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="font-medium">${investment.minInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{investment.propertyType}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{investment.projectedYield} Yield</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{investment.holdPeriod}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  <Button className="w-full gap-1" asChild>
                    <a href={`/investment/${investment.id}`}>
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-[#1A2B50] rounded-lg shadow-lg p-6 md:p-8 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Looking for a specific investment opportunity?
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              Our investment specialists can help you find the perfect DST investment 
              that aligns with your financial goals and 1031 exchange requirements.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" size="lg">
                Schedule a Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
                Download Investment Guide
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}