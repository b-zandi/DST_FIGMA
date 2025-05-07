import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

function FeatureCard({ icon, title, description, linkText, linkHref }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-md p-6 border border-gray-200 h-full">
      <div className="mb-4">
        <div className="text-blue-500">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {linkText && linkHref && (
        <Link href={linkHref} className="inline-flex items-center text-blue-500 text-sm font-medium hover:underline">
          {linkText}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose a DST Investment Vehicle?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-sm">
                <div className="w-4 h-4 bg-blue-500" />
              </div>}
              title="Passive Income"
              description="Receive regular distributions from professionally managed properties without the hassles of direct management."
            />
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
              </div>}
              title="Asset Protection"
              description="Benefit from structured liability protection providing added security."
            />
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-blue-500" />
              </div>}
              title="Tax Advantages"
              description="Take advantage of potential tax deferrals through 1031 exchanges and other tax benefits."
            />
          </div>
        
          <div className="text-center">
            <Button asChild variant="outline" className="gap-2 border-gray-300 bg-white rounded-md text-sm px-6 py-2 h-auto">
              <Link href="/learn-more">
                View All DST Benefits
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
