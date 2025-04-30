import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building, ChevronDown, User, Menu, LogOut } from "lucide-react";
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

  const navItems = [
    { title: "Find a DST", href: "/products/find-dst" },
    { title: "Are You Accredited?", href: "/accreditation" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-semibold text-lg text-gray-900">DST Brokerage</span>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button key={item.title} variant="ghost" className="text-gray-600 text-sm" asChild>
                <Link href={item.href}>
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Auth Navigation - Desktop */}
          <div className="hidden lg:flex items-center">
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
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden bg-white border-t ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="py-3 px-4">
          {navItems.map((item) => (
            <div key={item.title} className="py-2">
              <Link
                href={item.href}
                className="block text-sm text-gray-700 hover:text-gray-900"
              >
                {item.title}
              </Link>
            </div>
          ))}
          
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
              <div className="flex flex-col space-y-3 pt-2">
                <Link
                  href="/auth?tab=login"
                  className="block py-2 px-4 text-center rounded-md border border-gray-300 text-gray-700 text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className="block py-2 px-4 text-center rounded-md bg-black text-white text-sm"
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
