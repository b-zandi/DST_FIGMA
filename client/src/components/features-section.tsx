import { Check, ArrowRight } from "lucide-react";
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
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center mb-4">
        <div className="text-blue-600">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      {linkText && linkHref && (
        <Link href={linkHref} className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline">
          {linkText}
          <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Why Choose a DST Investment Vehicle?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <rect width="20" height="20" x="2" y="2" rx="2" />
              </svg>}
              title="Passive Income"
              description="Receive regular distributions from professionally managed properties without the hassles of direct management."
              linkText="Learn about distributions"
              linkHref="/learn-more/income"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <circle cx="12" cy="12" r="10" />
              </svg>}
              title="Asset Protection"
              description="Benefit from structured liability protection providing added security."
              linkText="Explore protection benefits"
              linkHref="/learn-more/protection"
            />
            <FeatureCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                <path d="M12 2L1 21h22L12 2z" />
              </svg>}
              title="Tax Advantages"
              description="Take advantage of potential tax deferrals through 1031 exchanges and other tax benefits."
              linkText="Understand tax benefits"
              linkHref="/learn-more/tax"
            />
          </div>
        
          <div className="text-center">
            <Button asChild size="sm" variant="outline" className="gap-2">
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
