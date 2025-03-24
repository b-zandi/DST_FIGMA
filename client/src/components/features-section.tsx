import { Wallet, ShieldCheck, HandCoins } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-8 text-center flex flex-col items-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-[#1A2B50] mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-[#1A2B50] mb-16">
          Why Choose DST Investments?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Wallet className="h-8 w-8 text-primary" />}
            title="Passive Income"
            description="Receive regular distributions from professionally managed properties without the hassles of direct management."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-8 w-8 text-primary" />}
            title="Asset Protection"
            description="Benefit from structured liability protection and enhanced estate planning opportunities."
          />
          <FeatureCard
            icon={<HandCoins className="h-8 w-8 text-primary" />}
            title="Tax Advantages"
            description="Take advantage of potential tax deferrals through 1031 exchanges and other tax benefits."
          />
        </div>
      </div>
    </section>
  );
}
