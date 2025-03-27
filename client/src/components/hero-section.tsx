import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, ChevronRight, ExternalLink } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <div className="flex justify-center mb-6">
          <span className="text-primary text-5xl">
            <Building className="h-16 w-16" />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1A2B50] mb-4">
          DST Investments
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
          Access institutional-quality real estate investments with professional management and significant tax advantages.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="gap-2" asChild>
            <Link href="/investing">
              View Investments
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="gap-2 text-[#1A2B50] border-gray-300" asChild>
            <Link href="/learn-more">
              Learn More
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
