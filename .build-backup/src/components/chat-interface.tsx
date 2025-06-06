import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageSquareText, Building } from "lucide-react";

export function ChatInterface() {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`flex items-center gap-2 border ${focused ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'} rounded-lg p-2 pl-5 bg-white transition-all shadow-md hover:shadow-lg`}
      >
        <MessageSquareText className="h-5 w-5 text-primary" />
        <Input 
          type="text" 
          placeholder="Ask AI about DST investments..."
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-3 text-base"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Button size="icon" className="bg-primary hover:bg-primary/90 text-white rounded-md h-10 w-10">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex flex-wrap justify-center mt-6 text-sm text-gray-600 gap-x-8 gap-y-3">
        <span className="flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
          How do DSTs work?
        </span>
        <span className="flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
          1031 exchange benefits
        </span>
        <span className="flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
          Am I accredited?
        </span>
        <span className="flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm hover:shadow transition-all cursor-pointer">
          <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
          Passive income strategies
        </span>
      </div>
      
      <div className="flex justify-center items-center gap-3 mt-6 text-xs text-gray-500">
        <Building className="h-3 w-3" />
        <span>Powered by AI</span>
      </div>
    </div>
  );
}