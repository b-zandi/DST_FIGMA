import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-100 py-8 text-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products/find-dst" className="text-gray-600 hover:text-gray-900">
                    Find a DST
                  </Link>
                </li>
                <li>
                  <Link href="/accreditation" className="text-gray-600 hover:text-gray-900">
                    Are You Accredited?
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 text-gray-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">
                    123 Financial District<br />New York, NY 10001
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">(800) 555-1234</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-600 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">info@dstbrokerage.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-xs mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DST Brokerage. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900"
                aria-label="YouTube"
              >
                <FaYoutube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900"
                aria-label="Instagram"
              >
                <FaInstagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900"
                aria-label="Facebook"
              >
                <FaFacebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
