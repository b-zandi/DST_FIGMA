import { Wallet, ShieldCheck, HandCoins, ArrowRight } from "lucide-react";
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
    <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
      {linkText && linkHref && (
        <Link href={linkHref} className="inline-flex items-center text-primary font-medium hover:underline">
          {linkText}
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose DST Investments?
          </h2>
          <p className="text-xl text-gray-600">
            Discover the advantages of Delaware Statutory Trust investments for accredited investors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Wallet className="h-6 w-6 text-primary" />}
            title="Passive Income"
            description="Receive regular distributions from professionally managed properties without the hassles of direct management."
            linkText="Learn about distributions"
            linkHref="/learn-more/income"
          />
          <FeatureCard
            icon={<ShieldCheck className="h-6 w-6 text-primary" />}
            title="Asset Protection"
            description="Benefit from structured liability protection and enhanced estate planning opportunities."
            linkText="Explore protection benefits"
            linkHref="/learn-more/protection"
          />
          <FeatureCard
            icon={<HandCoins className="h-6 w-6 text-primary" />}
            title="Tax Advantages"
            description="Take advantage of potential tax deferrals through 1031 exchanges and other tax benefits."
            linkText="Understand tax benefits"
            linkHref="/learn-more/tax"
          />
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="gap-2">
            <Link href="/learn-more">
              View All DST Benefits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
