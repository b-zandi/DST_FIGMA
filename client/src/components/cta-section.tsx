import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export function CTASection() {
  const { user } = useAuth();

  return (
    <section className="bg-[#1A2B50] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:flex-1 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A2B50] mb-3">
                Ready to start investing?
              </h2>
              <p className="text-gray-600">
                Create an account today and explore our investment opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {user ? (
                <Button asChild>
                  <Link href="/investments">Explore Investments</Link>
                </Button>
              ) : (
                <>
                  <Button asChild>
                    <Link href="/auth?tab=register">Sign Up</Link>
                  </Button>
                  <Button variant="outline" className="text-[#1A2B50]" asChild>
                    <Link href="/auth?tab=login">Log In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
