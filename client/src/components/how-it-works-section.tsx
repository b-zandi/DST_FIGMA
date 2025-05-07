import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Briefcase, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefit: string;
  isActive: boolean;
  onClick: () => void;
}

function StepCard({ number, title, description, icon, benefit, isActive, onClick }: StepCardProps) {
  return (
    <div 
      className={cn(
        "bg-white p-6 border rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md h-full",
        isActive ? "border-blue-500 shadow-md" : "border-gray-200"
      )}
      onClick={onClick}
    >
      <div className="flex items-start mb-4">
        <div className="flex-shrink-0 mr-4">
          <div className={cn(
            "rounded-full flex items-center justify-center h-10 w-10 text-white",
            isActive ? "bg-blue-600" : "bg-blue-500"
          )}>
            {number}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2 flex items-center">
            {title}
            {isActive && <CheckCircle className="h-4 w-4 ml-2 text-blue-500" />}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </div>
      
      {isActive && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3 mt-1">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Key Benefit</p>
              <p className="text-sm text-gray-600">{benefit}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(1);
  
  return (
    <section className="py-16 bg-gray-50 border-b border-gray-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            How Does It Work?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StepCard 
              number={1}
              title="Prepare"
              description="Determine which investment property you want to sell, establish a qualified intermediary, and close your property."
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              benefit="Our team will guide you through the 1031 exchange timeline to ensure you meet all IRS deadlines."
              isActive={activeStep === 1}
              onClick={() => setActiveStep(1)}
            />
            
            <StepCard 
              number={2}
              title="Identify a DST"
              description="Our platform will connect you with a DST that matches your investment objectives and timeline."
              icon={<Briefcase className="h-5 w-5 text-blue-500" />}
              benefit="Access to institutional-quality real estate investments with lower minimum investments than direct ownership."
              isActive={activeStep === 2}
              onClick={() => setActiveStep(2)}
            />
            
            <StepCard 
              number={3}
              title="Deposit & Close"
              description="Make a non-refundable deposit in order to secure your position in the investment."
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              benefit="Complete your 1031 exchange quickly and efficiently, often closing in as few as 1-3 days."
              isActive={activeStep === 3}
              onClick={() => setActiveStep(3)}
            />
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 h-auto text-base">
              <Link href="/investing">
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