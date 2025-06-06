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
            What is a DST? How do you qualify? Start here and find out today.
          </p>
          
          {/* Educational Calculator */}
          <div className="mb-8">
            <EducationalCalculator />
          </div>

        </div>
      </div>
    </section>
  );
}
