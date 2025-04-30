import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, ArrowRight, Search } from "lucide-react";
import { ChatInterface } from "@/components/chat-interface";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            DST Investing. Made Simple.
          </h1>
          <p className="text-base text-gray-600 mb-6">
            Get expert DST due diligence and Delaware Statutory Trust investment advice for your 1031 exchange or direct investment
          </p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <div className="flex-1 flex items-center px-3 py-1">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <Input 
                  type="text" 
                  placeholder="Ask Franklin AI about DST investments..."
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-1 text-sm"
                />
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-md mr-1">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-2 mb-8">
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-xs">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
              <span>How do DSTs work?</span>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-xs">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
              <span>DST investment benefits</span>
            </div>
            <div className="flex items-center bg-white border border-gray-200 rounded-full py-1 px-3 text-xs">
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1.5"></span>
              <span>Am I accredited?</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
