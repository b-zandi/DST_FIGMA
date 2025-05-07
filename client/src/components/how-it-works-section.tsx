import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="bg-white p-6 border border-gray-200 rounded-md h-full">
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <div className="rounded-full bg-blue-500 text-white flex items-center justify-center h-7 w-7 text-sm font-medium">
            {number}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="py-12 bg-gray-50 border-b border-gray-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            How Does It Work?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StepCard 
              number={1}
              title="Prepare"
              description="Determine which investment property you want to sell, establish a qualified intermediary, and close your property."
            />
            
            <StepCard 
              number={2}
              title="Identify a DST"
              description="Our platform will connect you with a DST that matches your investment objectives and timeline."
            />
            
            <StepCard 
              number={3}
              title="Deposit & Close"
              description="Make a non-refundable deposit in order to secure your position in the investment."
            />
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-black hover:bg-gray-800 text-white rounded-md text-sm px-6 py-2 h-auto gap-2">
              <Link href="/learn-more">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}