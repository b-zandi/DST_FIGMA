import { ArrowRight } from "lucide-react";
import { Button } from "./ui/"button";
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
            What is a DST Investment?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-sm">
                <div className="w-4 h-4 bg-blue-500" />
              </div>}
              title="Fractional Real-Estate Ownership"
              description="Investors purchase beneficial interests in a Delaware Statutory Trust that already owns income-producing property. One DST can have dozens of passive co-owners."
            />
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center rounded-full">
                <div className="w-4 h-4 bg-blue-500 rounded-full" />
              </div>}
              title="1031 Exchange Friendly"
              description="Because the DST owns the real estate, a properly structured DST interest can qualify as like-kind property, letting investors defer capital-gains tax when they roll over sale proceeds."
            />
            <FeatureCard
              icon={<div className="w-8 h-8 bg-blue-100 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] border-l-transparent border-r-transparent border-b-blue-500" />
              </div>}
              title="Professional Management & Limited Liability"
              description="The property manager handles leasing, financing, and reporting. Investors' liability is limited to their invested capital; they don't sign on the loan personally."
            />
          </div>

          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 italic">
              DST interests are illiquid, may be leveraged, and investors can lose all or part of their principal. Past performance of real-estate markets does not guarantee future results.
            </p>
          </div>
        
          <div className="text-center">
            <Button asChild variant="outline" className="gap-2 border-gray-300 bg-white rounded-md text-sm px-6 py-2 h-auto">
              <Link href="/learn-more">
                Learn More About DST Investments
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
