import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "../../hooks/use-auth";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "../lib/utils";
import { Building, ChevronDown, User, Menu, LogOut } from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

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

  // Different nav items based on authentication status
  const commonNavItems: NavItem[] = [
    { title: "FAQ", href: "/faq", icon: <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg> },
  ];
  
  const guestNavItems: NavItem[] = [
    { title: "Get Started", href: "/auth?tab=register", icon: <Building className="h-4 w-4 mr-1.5" /> },
    { title: "Are You Accredited?", href: "/accreditation", icon: <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg> },
  ];
  
  // Empty array for logged-in users since we're removing the menu items
  const userNavItems: NavItem[] = [];
  
  // Combine the appropriate nav items based on auth status
  const navItems: NavItem[] = [
    ...(user ? userNavItems : guestNavItems),
    ...commonNavItems
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex h-12 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-8">
            <Link href="/" className="flex items-center text-blue-500">
              <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium text-sm">DST Brokerage</span>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6 flex-1">
            {navItems.map((item, index) => {
              const isActive = location === item.href || 
                              (item.href === "/auth?tab=register" && location === "/auth") ||
                              (item.href === "/accreditation" && location === "/accreditation") ||
                              (item.href === "/faq" && location === "/faq");
              
              return (
                <Link 
                  key={item.title} 
                  href={item.href}
                  className={`flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium py-3 ${isActive ? 'border-b-2 border-blue-500' : ''}`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* Auth - Desktop */}
          <div className="hidden md:flex items-center ml-auto">
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-sm ml-4">
                    <User className="h-4 w-4" />
                    <span>{user.firstName || user.email}</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/auth?tab=login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "text-gray-700 text-sm ml-4"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-black text-white hover:bg-gray-800 ml-2 text-sm"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white border-t ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="py-2 px-4">
          
          {navItems.map((item, index) => {
            const isActive = location === item.href || 
                            (item.href === "/auth?tab=register" && location === "/auth") ||
                            (item.href === "/accreditation" && location === "/accreditation") ||
                            (item.href === "/faq" && location === "/faq");
            
            return (
              <div key={item.title} className="py-2">
                <Link
                  href={item.href}
                  className={`flex items-center text-sm ${isActive ? 'text-blue-500 font-medium' : 'text-gray-700'} hover:text-gray-900 py-1.5`}
                >
                  {item.icon}
                  {item.title}
                </Link>
              </div>
            );
          })}
          
          <div className="pt-4 mt-2 border-t border-gray-200">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <User className="h-4 w-4 mr-1.5" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link
                  href="/auth?tab=login"
                  className="block py-1.5 px-3 text-center rounded-md border border-gray-300 text-gray-700 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className="block py-1.5 px-3 text-center rounded-md bg-black text-white text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
