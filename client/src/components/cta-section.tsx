import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="py-24 bg-white border-t border-gray-100 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 rounded-2xl px-8 py-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to start investing in DSTs?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Create an account today to explore our institutional-quality real estate investment opportunities.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {user ? (
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white" asChild>
                    <Link href="/investments">
                      Explore Investments
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-white" asChild>
                      <Link href="/auth?tab=register">
                        Create Free Account
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-gray-300" asChild>
                      <Link href="/auth?tab=login">
                        Sign In
                      </Link>
                    </Button>
                  </>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-6">
                DST investments are available exclusively to accredited investors.
                <Link href="/accreditation" className="ml-1 text-primary hover:underline">
                  Learn about accreditation
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
