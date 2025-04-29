import { Link } from "wouter";
import { Building, MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-16 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Stay updated with our latest investment offerings
              </h3>
              <p className="text-gray-600">
                Sign up for our newsletter to receive investment insights and new DST opportunities
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="whitespace-nowrap">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-5">
              <span className="text-primary">
                <Building className="h-7 w-7" />
              </span>
              <span className="font-semibold text-xl text-gray-900">DST Brokerage</span>
            </div>
            <p className="text-gray-600 mb-5 leading-relaxed">
              Connecting accredited investors with institutional-quality real estate investments.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition duration-150"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition duration-150"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition duration-150"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary transition duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/investments" className="text-gray-600 hover:text-primary transition duration-150">
                  Investments
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-600 hover:text-primary transition duration-150">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary transition duration-150">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition duration-150">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/what-is-dst" className="text-gray-600 hover:text-primary transition duration-150">
                  What is a DST?
                </Link>
              </li>
              <li>
                <Link href="/1031-exchange" className="text-gray-600 hover:text-primary transition duration-150">
                  1031 Exchange Guide
                </Link>
              </li>
              <li>
                <Link href="/tax-benefits" className="text-gray-600 hover:text-primary transition duration-150">
                  Tax Benefits
                </Link>
              </li>
              <li>
                <Link href="/investor-resources" className="text-gray-600 hover:text-primary transition duration-150">
                  Investor Resources
                </Link>
              </li>
              <li>
                <Link href="/market-insights" className="text-gray-600 hover:text-primary transition duration-150">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/due-diligence" className="text-gray-600 hover:text-primary transition duration-150">
                  Due Diligence Process
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <span className="text-gray-600">
                  123 Financial District, Suite 400<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-600">(800) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-600">info@dstbrokerage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-200 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DST Brokerage. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-primary text-sm transition duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-primary text-sm transition duration-150">
              Terms of Service
            </Link>
            <Link href="/disclosures" className="text-gray-500 hover:text-primary text-sm transition duration-150">
              Disclosures
            </Link>
            <Link href="/accessibility" className="text-gray-500 hover:text-primary text-sm transition duration-150">
              Accessibility
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-center text-gray-500">
          <p>
            Securities offered through DST Brokerage LLC, member FINRA/SIPC. DST Brokerage is not a tax advisor. 
            Investors should consult with their tax professionals regarding their specific situations.
          </p>
        </div>
      </div>
    </footer>
  );
}
