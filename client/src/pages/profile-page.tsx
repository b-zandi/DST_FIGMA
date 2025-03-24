import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle2, Shield, BadgeCheck, Briefcase } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAccreditedInvestor, setIsAccreditedInvestor] = useState(user?.accreditedStatus || false);

  const form = useForm<ProfileUpdate>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      email: user?.email || "",
    },
  });

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
                <p className="text-gray-600">Manage your account information and preferences</p>
              </div>
            </div>

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
                                  <Input placeholder="Enter your first name" {...field} />
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
                                  <Input placeholder="Enter your last name" {...field} />
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
                                <Input type="email" placeholder="Enter your email" {...field} />
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
                                <Input type="tel" placeholder="Enter your phone number" {...field} />
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
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Active Investments</p>
                        <p className="text-sm text-gray-500">0 Investments</p>
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
                          <span>Explore available investment opportunities</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
