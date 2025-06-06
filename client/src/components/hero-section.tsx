import { Link } from "wouter";
import { EducationalCalculator } from "@/components/educational-calculator";

export function HeroSection() {
  return (
    <section className="bg-gray-50 py-16 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            DST Investing. Made Simple.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Learn all about Delaware Statutory Trust Investment Vehicles, how you can qualify today.
          </p>
          
          {/* Educational Calculator */}
          <div className="mb-8">
            <EducationalCalculator />
          </div>
          
          {/* Quick Links */}
          <div className="flex flex-wrap gap-4">
            <Link href="/how-it-works" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">How do DSTs work?</span>
            </Link>
            <Link href="/benefits" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">DST investment benefits</span>
            </Link>
            <Link href="/accreditation" className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              <span className="text-gray-700">Am I accredited?</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
