import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import FAQPage from "@/pages/faq-page";
import ProfilePage from "@/pages/profile-page";
import TestPage from "@/pages/test-page";
import LandingPage from "@/pages/landing-page";
import ForgotPasswordPage from "@/pages/forgot-password-page";
import ResetPasswordPage from "@/pages/reset-password-page";

import InvestmentDetailPage from "@/pages/investment-detail-page";
import AccreditationPage from "@/pages/accreditation-page";
import LearnMorePage from "@/pages/learn-more-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/home" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/faq" component={FAQPage} />

      <Route path="/investment/:id" component={InvestmentDetailPage} />
      <Route path="/accreditation" component={AccreditationPage} />
      <Route path="/learn-more" component={LearnMorePage} />
      <Route path="/test" component={TestPage} />
      <Route path="/forgot-password" component={ForgotPasswordPage} />
      <Route path="/reset-password" component={ResetPasswordPage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
