import { Link } from "wouter";
import { Building, MapPin, Phone, Mail } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-primary">
                <Building className="h-6 w-6" />
              </span>
              <span className="font-semibold text-xl text-white">DST Brokerage</span>
            </div>
            <p className="text-gray-400 mb-4">
              Connecting accredited investors with institutional-quality real estate investments.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-150"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-150"
                aria-label="Twitter"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-150"
                aria-label="Facebook"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-150">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/investments" className="text-gray-400 hover:text-white transition duration-150">
                  Investments
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition duration-150">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition duration-150">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-150">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Learn More</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/what-is-dst" className="text-gray-400 hover:text-white transition duration-150">
                  What is a DST?
                </Link>
              </li>
              <li>
                <Link href="/1031-exchange" className="text-gray-400 hover:text-white transition duration-150">
                  1031 Exchange Guide
                </Link>
              </li>
              <li>
                <Link href="/tax-benefits" className="text-gray-400 hover:text-white transition duration-150">
                  Tax Benefits
                </Link>
              </li>
              <li>
                <Link href="/investor-resources" className="text-gray-400 hover:text-white transition duration-150">
                  Investor Resources
                </Link>
              </li>
              <li>
                <Link href="/market-insights" className="text-gray-400 hover:text-white transition duration-150">
                  Market Insights
                </Link>
              </li>
              <li>
                <Link href="/due-diligence" className="text-gray-400 hover:text-white transition duration-150">
                  Due Diligence Process
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <span className="text-gray-400">
                  123 Financial District, Suite 400<br />New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">(800) 555-1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <span className="text-gray-400">info@dstbrokerage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DST Brokerage. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition duration-150">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition duration-150">
              Terms of Service
            </Link>
            <Link href="/disclosures" className="text-gray-400 hover:text-white text-sm transition duration-150">
              Disclosures
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
