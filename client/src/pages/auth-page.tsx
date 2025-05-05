import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { Building, Shield, Briefcase, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DSTInvestorQuestionnaire } from "@/components/dst-investor-questionnaire";
import { DstAnswers } from "@/lib/calculateDstScore";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

// Registration process stages
type RegistrationStage = 'form' | 'questionnaire' | 'accreditationResult';

// Accreditation result type
type AccreditationResult = {
  answers: DstAnswers;
  score: number;
  segment: 'high' | 'medium' | 'low' | 'notReady';
};

export default function AuthPage() {
  const [searchParams] = useLocation();
  const params = new URLSearchParams(searchParams);
  const tabFromUrl = params.get("tab");
  const [activeTab, setActiveTab] = useState<string>(tabFromUrl === "register" ? "register" : "login");
  
  // Registration process state
  const [registrationStage, setRegistrationStage] = useState<RegistrationStage>('form');
  const [formData, setFormData] = useState<Omit<RegisterFormValues, 'agreeTerms'> | null>(null);
  const [accreditationResult, setAccreditationResult] = useState<AccreditationResult | null>(null);

  const { user, loginMutation, registerMutation } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // Save form data and proceed to questionnaire
    const { agreeTerms, ...userData } = data;
    setFormData(userData);
    setRegistrationStage('questionnaire');
  };
  
  const handleQuestionnaireComplete = (result: AccreditationResult) => {
    setAccreditationResult(result);
    setRegistrationStage('accreditationResult');
  };
  
  const handleCompleteRegistration = () => {
    if (formData) {
      // Add accreditation status to user data
      const userData = {
        ...formData,
        accreditationScore: accreditationResult?.score || 0,
        accreditationSegment: accreditationResult?.segment || 'notReady',
        questionnaire: accreditationResult?.answers || {}
      };
      
      registerMutation.mutate(userData);
    }
  };
  
  const resetRegistration = () => {
    setRegistrationStage('form');
    setFormData(null);
    setAccreditationResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:w-1/2 p-8 lg:p-12">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-[#1A2B50] mb-2">Welcome to DST Brokerage</h1>
                <p className="text-gray-600">
                  Access institutional-quality real estate investments with professional management.
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Log In"}
                      </Button>
                    </form>
                  </Form>

                  <div className="text-center mt-4">
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab("register")}
                      className="text-sm text-primary"
                    >
                      Don't have an account? Register here
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  {registrationStage === 'form' && (
                    <>
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input placeholder="Choose a username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
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
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Create a password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerForm.control}
                            name="agreeTerms"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm">
                                    I agree to the terms of service and privacy policy
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full"
                          >
                            Continue
                          </Button>
                        </form>
                      </Form>

                      <div className="text-center mt-4">
                        <Button 
                          variant="link" 
                          onClick={() => setActiveTab("login")}
                          className="text-sm text-primary"
                        >
                          Already have an account? Log in here
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {registrationStage === 'questionnaire' && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Investor Questionnaire</h3>
                        <p className="text-gray-600 text-sm">
                          DST investments are exclusively available to accredited investors. Please complete this questionnaire to determine your suitability.
                        </p>
                      </div>
                      
                      <DSTInvestorQuestionnaire onComplete={handleQuestionnaireComplete} />
                      
                      <div className="mt-4 text-center">
                        <Button 
                          variant="outline" 
                          onClick={resetRegistration}
                          className="text-sm"
                        >
                          Back to Registration Form
                        </Button>
                      </div>
                    </>
                  )}
                  
                  {registrationStage === 'accreditationResult' && accreditationResult && (
                    <div className="space-y-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Accreditation Assessment</h3>
                        <p className="text-gray-600 mb-4">
                          Based on your responses, we've completed an initial assessment of your investor profile.
                        </p>
                        
                        {accreditationResult.segment === 'high' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-green-500 flex-shrink-0 mt-1 mr-3" />
                            <div>
                              <h4 className="font-semibold text-green-800">You appear to be an Accredited Investor</h4>
                              <p className="text-green-700 mt-1">
                                Based on your responses, you likely meet the SEC requirements for accredited investor status. You'll be eligible to access our full range of DST investment opportunities.
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {accreditationResult.segment === 'medium' && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                            <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1 mr-3" />
                            <div>
                              <h4 className="font-semibold text-blue-800">You may be an Accredited Investor</h4>
                              <p className="text-blue-700 mt-1">
                                Based on your responses, you may meet the requirements for accredited investor status. We'll need to verify some additional information after registration.
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {accreditationResult.segment === 'low' && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                            <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1 mr-3" />
                            <div>
                              <h4 className="font-semibold text-yellow-800">Additional Verification Needed</h4>
                              <p className="text-yellow-700 mt-1">
                                Based on your responses, we'll need to collect additional documentation to verify your accredited investor status after registration.
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {accreditationResult.segment === 'notReady' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                            <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1 mr-3" />
                            <div>
                              <h4 className="font-semibold text-red-800">You may not qualify as an Accredited Investor</h4>
                              <p className="text-red-700 mt-1">
                                Based on your responses, you may not currently meet the SEC requirements for accredited investor status. You can still create an account to access educational resources.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <Button 
                          onClick={handleCompleteRegistration}
                          className="w-full"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? "Creating account..." : "Complete Registration"}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          onClick={() => setRegistrationStage('questionnaire')}
                          className="w-full"
                        >
                          Retake Questionnaire
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="md:w-1/2 bg-[#1A2B50] p-8 lg:p-12 text-white flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-6">Why Choose DST Investments?</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Institutional-Quality Properties</h3>
                    <p className="text-white/80">
                      Access commercial real estate opportunities typically available only to large institutional investors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Risk Management</h3>
                    <p className="text-white/80">
                      Professional asset management with thorough due diligence and risk assessment processes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Tax Benefits</h3>
                    <p className="text-white/80">
                      Potential tax advantages through 1031 exchanges and passive income opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
