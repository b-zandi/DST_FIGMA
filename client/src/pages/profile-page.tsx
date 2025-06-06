import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileUpdate, profileUpdateSchema } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  UserCircle2, 
  Shield, 
  BadgeCheck, 
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Percent,
  Calendar,
  AlertCircle,
  ArrowRight,
  Clock,
  ChevronRight,
  Info as InfoIcon,
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Helper function to get tier badge based on accreditation segment
const getTierBadge = (segment: string) => {
  const tierMapping = {
    'diamond': { tier: 'GOLD', color: 'bg-yellow-500 text-white' },
    'hot': { tier: 'SILVER', color: 'bg-slate-300 text-slate-800' },
    'warm': { tier: 'BRONZE', color: 'bg-white text-amber-700 border border-amber-700' },
    'cold': null // Don't show badge for cold leads
  };
  
  const tierInfo = tierMapping[segment as keyof typeof tierMapping];
  if (!tierInfo) return null;
  
  return (
    <Badge className={`${tierInfo.color} text-xs font-semibold tracking-wide uppercase px-2 py-1`}>
      {tierInfo.tier} TIER
    </Badge>
  );
};

// Types for user investments
type UserInvestment = {
  id: number;
  userId: number;
  investmentId: number;
  investmentAmount: string;
  investmentDate: string;
  ownershipPercentage: string;
  distributionsPaid: string;
  lastDistributionDate: string | null;
  investmentStatus: string;
  investment: Investment;
};

type Investment = {
  id: number;
  title: string;
  location: string;
  propertyType: string;
  assetClass: string;
  minInvestment: number;
  projectedYield: string;
  offeringSize: string;
  holdPeriod: string;
  imageUrl: string;
  description: string;
  status: string;
  sponsor: string;
  propertyAddress: string;
  yearBuilt: string;
  squareFeet: string;
  occupancy: string;
  offeringDate: string;
  closingDate: string;
  distributionFrequency: string;
  debtFinancing: string;
  taxAdvantages: string;
  detailedDescription: string;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAccreditedInvestor, setIsAccreditedInvestor] = useState(user?.accreditedStatus || false);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Parse questionnaire data to check if user selected "Not Sure" for accreditation
  const [isNotSureAboutAccreditation, setIsNotSureAboutAccreditation] = useState(false);
  
  useEffect(() => {
    if (user?.questionnaireData) {
      try {
        const questionnaireData = JSON.parse(user.questionnaireData);
        setIsNotSureAboutAccreditation(questionnaireData.accredited === "notSure");
      } catch (e) {
        console.error("Failed to parse questionnaire data", e);
      }
    }
  }, [user?.questionnaireData]);

  // Fetch user investments
  const { 
    data: userInvestments = [], 
    isLoading: isLoadingInvestments,
    error: investmentsError
  } = useQuery<UserInvestment[]>({
    queryKey: ["/api/user/investments"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!user, // Only run if user is logged in
  });

  const form = useForm<ProfileUpdate>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.email || "",
    } as ProfileUpdate,
  });

  // Update form values when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        email: user.email || "",
      } as ProfileUpdate);
      setIsAccreditedInvestor(user.accreditedStatus || false);
    }
  }, [user, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileUpdate & { accreditedStatus: boolean }) => {
      const res = await apiRequest("PUT", "/api/user/profile", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
    },
    onError: (error) => {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProfileUpdate) => {
    updateProfileMutation.mutate({
      ...data,
      accreditedStatus: isAccreditedInvestor,
    });
  };
  
  // Calculate total investment value
  const totalInvestmentValue = userInvestments.reduce(
    (sum, inv) => sum + parseFloat(inv.investmentAmount), 
    0
  );
  
  // Helper function to format currency
  const formatCurrency = (value: string | number) => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numValue);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-4">
              <UserCircle2 className="h-12 w-12 text-[#1A2B50]" />
              <div>
                <h1 className="text-3xl font-bold text-[#1A2B50]">Your Profile</h1>
                <p className="text-gray-600">Manage your account information and DST investments</p>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-1 mb-4">
                <TabsTrigger value="profile" className="px-8">
                  <UserCircle2 className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-8">
                {/* Welcome Banner */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h2 className="text-xl font-medium text-blue-800">
                          Welcome back, {user?.firstName || 'Investor'}! 👋
                        </h2>
                        {user?.accreditationSegment && getTierBadge(user.accreditationSegment)}
                      </div>
                      <p className="text-blue-600 mt-1">
                        Manage your DST investment portfolio and update your profile below.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Accreditation Information Box for "Not Sure" users */}
                {isNotSureAboutAccreditation && !user?.accreditedStatus && (
                  <Card className="border-amber-200 bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-amber-800">
                        <InfoIcon className="h-5 w-5 mr-2 text-amber-600" />
                        Learn About Accreditation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-amber-700 mb-4">
                        You indicated that you're not sure about your accreditation status. Becoming an accredited investor 
                        is required for Delaware Statutory Trust investments. Here are some resources to help you:
                      </p>
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-amber-700">
                            <span className="font-medium">Annual Income:</span> Individual income exceeding $200,000 (or $300,000 with spouse) in each of the two most recent years.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-amber-700">
                            <span className="font-medium">Net Worth:</span> Net worth over $1 million (individually or with spouse), excluding your primary residence.
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                          <p className="text-amber-700">
                            <span className="font-medium">Professional Credentials:</span> Certain licenses, designations or credentials recognized by the SEC.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-100">
                          <Link href="/accreditation">
                            Read Full Requirements
                          </Link>
                        </Button>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          Start Verification Process
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your profile information</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter your first name" 
                                        value={field.value || ""} 
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        name={field.name}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter your last name"
                                        value={field.value || ""} 
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        ref={field.ref}
                                        name={field.name}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="email" 
                                      placeholder="Enter your email" 
                                      value={field.value || ""} 
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      ref={field.ref}
                                      name={field.name}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone</FormLabel>
                                  <FormControl>
                                    <Input 
                                      type="tel" 
                                      placeholder="Enter your phone number" 
                                      value={field.value || ""} 
                                      onChange={field.onChange}
                                      onBlur={field.onBlur}
                                      ref={field.ref}
                                      name={field.name}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div>
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={isAccreditedInvestor}
                                    onCheckedChange={(checked) => 
                                      setIsAccreditedInvestor(checked === true)
                                    }
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>
                                    I confirm that I meet the definition of an Accredited Investor
                                  </FormLabel>
                                  <FormDescription>
                                    By checking this box, you confirm that you meet the SEC's definition of an accredited investor, which typically requires an income exceeding $200,000 (or $300,000 with spouse) for the past two years or a net worth over $1 million (excluding primary residence).
                                  </FormDescription>
                                </div>
                              </FormItem>
                            </div>

                            <Button 
                              type="submit" 
                              disabled={updateProfileMutation.isPending}
                              className="mt-4"
                            >
                              {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
                            </Button>
                          </form>
                        </Form>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Account Status</CardTitle>
                        <CardDescription>Information about your account</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center space-x-3">
                          <Shield className={`h-5 w-5 ${user?.isProfileComplete ? "text-green-500" : "text-gray-400"}`} />
                          <div>
                            <p className="font-medium">Profile Status</p>
                            <p className="text-sm text-gray-500">
                              {user?.isProfileComplete ? "Complete" : "Incomplete"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <BadgeCheck className={`h-5 w-5 ${user?.accreditedStatus ? "text-green-500" : "text-gray-400"}`} />
                          <div>
                            <p className="font-medium">Accreditation Status</p>
                            <p className="text-sm text-gray-500">
                              {user?.accreditedStatus ? "Accredited" : "Not Verified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Briefcase className={`h-5 w-5 ${userInvestments.length > 0 ? "text-green-500" : "text-gray-400"}`} />
                          <div>
                            <p className="font-medium">Active Investments</p>
                            {isLoadingInvestments ? (
                              <Skeleton className="h-4 w-20 mt-1" />
                            ) : (
                              <p className="text-sm text-gray-500">
                                {`${userInvestments.length} Investment${userInvestments.length !== 1 ? 's' : ''}`}
                              </p>
                            )}
                          </div>
                        </div>

                        <hr className="my-4" />

                        <div>
                          <h4 className="font-medium mb-2">Next Steps</h4>
                          <ul className="space-y-2 text-sm">
                            {!user?.isProfileComplete && (
                              <li className="flex items-center space-x-2">
                                <span className="text-primary">1.</span>
                                <span>Complete your profile information</span>
                              </li>
                            )}
                            {!user?.accreditedStatus && (
                              <li className="flex items-center space-x-2">
                                <span className="text-primary">2.</span>
                                <span>Verify your accredited investor status</span>
                              </li>
                            )}
                            <li className="flex items-center space-x-2">
                              <span className="text-primary">3.</span>
                              <span>
                                {userInvestments.length === 0 ? (
                                  <>Explore available investment opportunities</>
                                ) : (
                                  <>Check your investment portfolio</>
                                )}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Educational Resources Section */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Educational Resources</h3>
                      <p className="text-sm text-gray-600 mb-4">Learn more about DST investments and accreditation</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <Building className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">DST Investments Guide</p>
                            <p className="text-xs text-gray-500">Learn about Delaware Statutory Trusts</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/learn-more">
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <BadgeCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Accreditation Status</p>
                            <p className="text-xs text-gray-500">Understanding investor requirements</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/accreditation">
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                          <InfoIcon className="h-5 w-5 text-purple-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Frequently Asked Questions</p>
                            <p className="text-xs text-gray-500">Common questions about DST investing</p>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/faq">
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
