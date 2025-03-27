import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building, Bell, BarChart2, User, Menu, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary">
                <Building className="h-6 w-6" />
              </span>
              <span className="text-[#1A2B50] font-semibold text-lg">DST Brokerage</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="/notifications"
              className="flex items-center text-gray-600 hover:text-[#1A2B50]"
            >
              <Bell className="h-4 w-4 mr-1" />
              <span>Notifications</span>
            </Link>
            <Link
              href="/investing"
              className="flex items-center text-gray-600 hover:text-[#1A2B50]"
            >
              <BarChart2 className="h-4 w-4 mr-1" />
              <span>Search Investments</span>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-[#1A2B50]">
                  <User className="h-4 w-4 mr-1" />
                  <span>{user.firstName || user.username}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex w-full cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      {user.firstName ? `${user.firstName}'s Profile` : "Profile"}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/auth"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "text-[#1A2B50]"
                )}
              >
                Log In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/notifications"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </div>
          </Link>
          <Link
            href="/investing"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" />
              Search Investments
            </div>
          </Link>
          
          {user ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {user.firstName ? `${user.firstName}'s Profile` : "Profile"}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
              >
                <div className="flex items-center">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </div>
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Log In
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
