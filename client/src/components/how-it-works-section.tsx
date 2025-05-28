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
        "bg-white p-6 border rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md flex flex-col justify-between h-full",
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StepCard 
              number={1}
              title="Get Qualified"
              description="Create an account, take our self-attest quiz, then we connect you with our third-party partner for verification."
              icon={<CheckCircle className="h-5 w-5 text-blue-500" />}
              benefit=""
              isActive={activeStep === 1}
              onClick={() => setActiveStep(1)}
            />
            
            <StepCard 
              number={2}
              title="Prepare Your Exchange"
              description="List the property, hire a qualified intermediary, and mark the 45-/180-day IRS deadlines."
              icon={<Clock className="h-5 w-5 text-blue-500" />}
              benefit=""
              isActive={activeStep === 2}
              onClick={() => setActiveStep(2)}
            />
            
            <StepCard 
              number={3}
              title="Identify a DST"
              description="After verification, review DST offerings that match your goals and timeline."
              icon={<Briefcase className="h-5 w-5 text-blue-500" />}
              benefit=""
              isActive={activeStep === 3}
              onClick={() => setActiveStep(3)}
            />
            
            <StepCard 
              number={4}
              title="Deposit & Close"
              description="Reserve your interest with a deposit, sign subscription docs, and fund before Day 180."
              icon={<ArrowUpRight className="h-5 w-5 text-blue-500" />}
              benefit=""
              isActive={activeStep === 4}
              onClick={() => setActiveStep(4)}
            />
          </div>
          
          <div className="text-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 py-6 h-auto text-base">
              <Link href="/auth?tab=register">
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