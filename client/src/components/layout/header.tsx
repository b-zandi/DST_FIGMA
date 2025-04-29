import { useState } from "react";
import { Link, useLocation } from "wouter";
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
    { title: "Investments", href: "/investments" },
    { title: "Learn", href: "/learn-more" },
    { title: "Accreditation", href: "/accreditation" },
    { title: "FAQ", href: "/faq" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-primary">
                <Building className="h-8 w-8" />
              </span>
              <span className="font-semibold text-xl">DST Brokerage</span>
            </Link>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-gray-600 font-medium text-base">
                    {item.title}
                    <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link href={item.href} className="cursor-pointer">
                      All {item.title}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`${item.href}/featured`} className="cursor-pointer">
                      Featured {item.title}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`${item.href}/popular`} className="cursor-pointer">
                      Popular {item.title}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* Auth Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
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
                    buttonVariants({ variant: "ghost", size: "default" }),
                    "text-gray-700"
                  )}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className={cn(
                    buttonVariants({ variant: "default", size: "default" }),
                    "bg-primary text-white hover:bg-primary/90"
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
        <div className="py-3 px-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="block py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block py-2 text-base font-medium text-gray-700 hover:text-primary"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link
                  href="/auth?tab=login"
                  className="block py-2 px-4 text-center rounded-md border border-gray-300 text-gray-700 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth?tab=register"
                  className="block py-2 px-4 text-center rounded-md bg-primary text-white font-medium"
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
