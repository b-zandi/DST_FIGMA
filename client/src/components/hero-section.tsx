import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, ArrowRight, Search } from "lucide-react";
import { ChatInterface } from "@/components/chat-interface";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DST Investing. Made Simple.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Get expert DST due diligence and Delaware Statutory Trust investment advice for your 1031 exchange or direct investment
          </p>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white p-1">
              <div className="flex-1 flex items-center px-3 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <Input 
                  type="text" 
                  placeholder="Ask Franklin AI about DST investments..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-1"
                />
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mb-10">
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span>How do DSTs work?</span>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span>DST investment benefits</span>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-sm">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span>Am I accredited?</span>
            </div>
          </div>
        </div>
        
        {/* Benefits Card */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in institutional-quality real estate
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Access professionally managed Delaware Statutory Trust investments with significant tax advantages and passive income potential.
              </p>
              <Button size="lg" variant="outline" className="gap-2 border-gray-300" asChild>
                <Link href="/products/find-dst">
                  Find a DST
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold ml-4">DST Investment Benefits</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Passive income opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Tax advantages through 1031 exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Professional asset management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Institutional-quality properties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
