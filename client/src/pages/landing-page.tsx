import { useAuth } from @/hooks/use-auth";
import { Loader2 } from "lucide-react";
import HomePage from "./home-page";
import ProfilePage from "./profile-page";

export default function LandingPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  // If user is logged in, show their profile page
  if (user) {
    return <ProfilePage />;
  }

  // Otherwise, show the marketing home page
  return <HomePage />;
}