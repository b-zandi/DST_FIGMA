import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-8 bg-gray-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            How Does It Work?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Prepare */}
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-6 w-6 flex-shrink-0 mr-3 text-sm">
                  <span>1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">Prepare</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Determine which investment property you want to sell, establish a qualified intermediary, and close your property.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Identify a DST */}
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-6 w-6 flex-shrink-0 mr-3 text-sm">
                  <span>2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">Identify a DST</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Our platform will connect you with a DST that matches your investment objectives and timeline.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Deposit & Close */}
            <div className="bg-white p-5 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-6 w-6 flex-shrink-0 mr-3 text-sm">
                  <span>3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5">Deposit & Close</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Make a non-refundable deposit in order to secure your position in the investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-white h-8 rounded-md text-xs gap-1">
              <Link href="/learn-more">
                Get Started
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}