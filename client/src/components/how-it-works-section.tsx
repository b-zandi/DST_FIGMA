import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            How Does It Work?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {/* Prepare */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-8 w-8 flex-shrink-0 mr-4">
                  <span className="font-semibold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prepare</h3>
                  <p className="text-sm text-gray-600">
                    Determine which investment property you want to sell, establish a qualified intermediary, and close your property.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Identify a DST */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-8 w-8 flex-shrink-0 mr-4">
                  <span className="font-semibold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Identify a DST</h3>
                  <p className="text-sm text-gray-600">
                    Our platform will connect you with a DST that matches your investment objectives and timeline.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Deposit & Close */}
            <div className="bg-white p-6 border border-gray-200 rounded-lg">
              <div className="flex items-start">
                <div className="rounded-full bg-gray-100 flex items-center justify-center h-8 w-8 flex-shrink-0 mr-4">
                  <span className="font-semibold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Deposit & Close</h3>
                  <p className="text-sm text-gray-600">
                    Make a non-refundable deposit in order to secure your position in the investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button asChild size="sm" className="bg-black hover:bg-gray-800 text-white">
              <Link href="/learn-more">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}