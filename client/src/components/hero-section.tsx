import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DST Investing. Made Simple.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get expert DST due diligence and Delaware Statutory Trust investment advice for your 1031 exchange or direct investment
          </p>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
              <div className="flex-1 flex items-center px-4 py-3">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <Input 
                  type="text" 
                  placeholder="Ask AI about DST investments..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0 text-base h-auto"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-none h-full px-5">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4">
            <Link href="/how-it-works" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">How do DSTs work?</span>
            </Link>
            <Link href="/benefits" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">DST investment benefits</span>
            </Link>
            <Link href="/accreditation" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">Am I accredited?</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
