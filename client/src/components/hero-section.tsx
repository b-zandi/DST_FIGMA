import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Invest in institutional-quality real estate
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Access professionally managed Delaware Statutory Trust investments with significant tax advantages and passive income potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href="/investments">
                  Browse Investments
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-gray-300" asChild>
                <Link href="/learn-more">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-70 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-center mb-6 w-16 h-16 bg-primary/10 rounded-full">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">DST Investment Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Passive income opportunities</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Tax advantages through 1031 exchanges</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Professional asset management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Institutional-quality properties</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
