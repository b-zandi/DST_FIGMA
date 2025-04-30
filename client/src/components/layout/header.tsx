import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building, ChevronDown, User, Menu, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: <Building className="h-4 w-4 mr-1.5" /> },
    { title: "Investments", href: "/investing", icon: <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg> },
    { title: "Funding", href: "/funding", icon: <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg> },
    { title: "Contact", href: "/contact", icon: <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg> },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex h-14 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center mr-8">
            <Link href="/" className="flex items-center text-blue-500">
              <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-medium text-base">DST Brokerage</span>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1 flex-1">
            {navItems.map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                className="flex items-center text-gray-600 hover:text-gray-900 py-1 px-3 text-sm font-medium"
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
            
            {/* The active item will have a border-bottom */}
            <Link 
              href="/investors"
              className="flex items-center text-gray-600 hover:text-gray-900 py-1 px-3 text-sm font-medium border-b-2 border-blue-500"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Investors
            </Link>
          </nav>

          {/* Search + Auth - Desktop */}
          <div className="hidden md:flex items-center ml-auto">
            <div className="relative mr-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <Input
                type="search"
                placeholder="Search..."
                className="w-52 pl-8 pr-4 py-1 text-sm border-gray-300 rounded-md h-8"
              />
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{user.firstName || user.username}</span>
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
                    "text-gray-700 text-sm"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "bg-black text-white hover:bg-gray-800 ml-2"
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
          {/* Search */}
          <div className="relative my-3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 py-1 text-sm border-gray-300 rounded-md"
            />
          </div>
          
          {navItems.map((item) => (
            <div key={item.title} className="py-2">
              <Link
                href={item.href}
                className="flex items-center text-sm text-gray-700 hover:text-gray-900"
              >
                {item.icon}
                {item.title}
              </Link>
            </div>
          ))}
          
          <div className="py-2">
            <Link
              href="/investors"
              className="flex items-center text-sm text-gray-700 hover:text-gray-900 font-medium"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Investors
            </Link>
          </div>
          
          <div className="pt-4 mt-2 border-t border-gray-200">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-sm text-gray-700 hover:text-gray-900"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block py-2 text-sm text-gray-700 hover:text-gray-900"
                >
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
