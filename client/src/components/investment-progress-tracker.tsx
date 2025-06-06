import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { 
  CheckCircle, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock, 
  ArrowRight,
  Info
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface InvestmentStage {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  date?: string;
}

interface InvestmentProgressTrackerProps {
  currentStage: number;
  startDate: string;
  estimatedCloseDate: string;
  nextAction?: {
    text: string;
    link: string;
  };
  stages?: InvestmentStage[];
}

export function InvestmentProgressTracker({
  currentStage = 1,
  startDate,
  estimatedCloseDate,
  nextAction,
  stages: customStages
}: InvestmentProgressTrackerProps) {
  const [animateProgress, setAnimateProgress] = useState(false);
  
  // Default stages if none provided
  const defaultStages: InvestmentStage[] = [
    {
      id: 1,
      name: "Offering Review",
      description: "Initial review of investment offering materials",
      icon: <FileText className="h-5 w-5" />,
      date: startDate
    },
    {
      id: 2,
      name: "Investment Reserved",
      description: "Your investment position has been reserved",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      id: 3,
      name: "Documents Signed",
      description: "Subscription documents completed and signed",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 4,
      name: "Funds Transferred",
      description: "Investment funds successfully transferred",
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      id: 5,
      name: "Investment Closed",
      description: "Investment has been successfully closed",
      icon: <CheckCircle className="h-5 w-5" />,
      date: estimatedCloseDate
    }
  ];
  
  const stages = customStages || defaultStages;
  
  useEffect(() => {
    // Start animation after component mounts
    setTimeout(() => {
      setAnimateProgress(true);
    }, 300);
  }, []);
  
  const calculateProgress = () => {
    return ((currentStage - 1) / (stages.length - 1)) * 100;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Investment Progress</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Info className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Investment Progress Information</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Track your investment's progress from initial review to closing. Watch as each stage is completed.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Timeline Progress Bar */}
      <div className="relative mb-8">
        <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: animateProgress ? `${calculateProgress()}%` : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
        
        {/* Timeline Markers */}
        <div className="flex justify-between mt-1">
          {stages.map((stage) => (
            <div key={stage.id} className="relative flex flex-col items-center">
              <motion.div 
                className={`h-5 w-5 rounded-full flex items-center justify-center ${
                  stage.id <= currentStage ? "bg-blue-500" : "bg-gray-300"
                }`}
                initial={{ scale: 1 }}
                animate={{ 
                  scale: stage.id === currentStage ? [1, 1.2, 1] : 1,
                  backgroundColor: stage.id <= currentStage ? "#3b82f6" : "#d1d5db"
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: stage.id === currentStage ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 2
                }}
              >
                {stage.id < currentStage && (
                  <CheckCircle className="h-3 w-3 text-white" />
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Stages List */}
      <div className="space-y-4">
        {stages.map((stage) => (
          <div 
            key={stage.id} 
            className={`flex items-start space-x-3 ${
              stage.id === currentStage ? "bg-blue-50 p-3 rounded-md -mx-3" : ""
            }`}
          >
            <div className="flex-shrink-0 mt-0.5">
              <motion.div 
                className={`h-6 w-6 rounded-full flex items-center justify-center ${
                  stage.id < currentStage 
                    ? "bg-blue-500 text-white" 
                    : stage.id === currentStage 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-500"
                }`}
                initial={{ backgroundColor: stage.id <= currentStage ? "#3b82f6" : "#e5e7eb" }}
                animate={{ 
                  backgroundColor: stage.id < currentStage 
                    ? "#3b82f6" 
                    : stage.id === currentStage 
                      ? "#3b82f6" 
                      : "#e5e7eb",
                  scale: stage.id === currentStage ? [1, 1.1, 1] : 1,
                }}
                transition={{ 
                  duration: 0.5,
                  repeat: stage.id === currentStage ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 1.5
                }}
              >
                {stage.id < currentStage ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  stage.icon || <span className="text-xs">{stage.id}</span>
                )}
              </motion.div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  stage.id <= currentStage ? "text-gray-900" : "text-gray-500"
                }`}>
                  {stage.name}
                  
                  {stage.id === currentStage && (
                    <motion.span 
                      className="inline-flex items-center justify-center ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Current
                    </motion.span>
                  )}
                </h4>
                
                {stage.date && (
                  <span className="text-xs text-gray-500">{stage.date}</span>
                )}
              </div>
              
              <AnimatePresence>
                {(stage.id <= currentStage || stage.id === stages.length) && (
                  <motion.p 
                    className="text-sm text-gray-600 mt-0.5"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {stage.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
      
      {/* Next Action Button if provided */}
      {nextAction && (
        <motion.div 
          className="mt-6 pt-4 border-t border-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button asChild className="w-full gap-2">
            <a href={nextAction.link}>
              {nextAction.text}
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      )}
    </div>
  );
}