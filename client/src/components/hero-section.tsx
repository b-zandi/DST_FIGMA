import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, ArrowRight } from "lucide-react";
import { ChatInterface } from "@/components/chat-interface";

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-50/70 to-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-64 bg-blue-100/50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-40 right-20 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
      <div className="absolute top-40 left-20 w-16 h-16 bg-primary/10 rounded-full blur-lg"></div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-tight mb-8">
            DST Investing.<br />Made Simple.
          </h1>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Discover institutional-quality real estate investments with tax advantages and passive income potential through Delaware Statutory Trusts.
          </p>
          
          {/* Chat Interface */}
          <ChatInterface />
          
          <div className="flex justify-center items-center gap-8 mt-8">
            <Link href="/accreditation" className="flex items-center gap-2 text-primary font-medium hover:underline">
              Accreditation Process
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/learn-more" className="flex items-center gap-2 text-primary font-medium hover:underline">
              DST Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Benefits Card */}
        <div className="max-w-4xl mx-auto mt-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Invest in institutional-quality real estate
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Access professionally managed Delaware Statutory Trust investments with significant tax advantages and passive income potential.
              </p>
              <Button size="lg" variant="outline" className="gap-2 border-gray-300" asChild>
                <Link href="/learn-more">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold ml-4">DST Investment Benefits</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Passive income opportunities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Tax advantages through 1031 exchanges</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Professional asset management</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">✓</span>
                  </div>
                  <span>Institutional-quality properties</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
