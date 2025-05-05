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
import { Building, Shield, Briefcase, AlertTriangle, CheckCircle2, UserCircle, DollarSign } from "lucide-react";
import { DSTInvestorQuestionnaire } from "@/components/dst-investor-questionnaire";
import { DstAnswers } from "@/lib/calculateDstScore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passwordConfirm: z.string().min(8, "Password confirmation is required"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

const registerProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterEmailFormValues = z.infer<typeof registerEmailSchema>;
type RegisterProfileFormValues = z.infer<typeof registerProfileSchema>;

// Registration process stages
type RegistrationStage = 'emailForm' | 'profileForm' | 'questionnaire' | 'accreditationResult';

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
  const [registrationStage, setRegistrationStage] = useState<RegistrationStage>('emailForm');
  const [emailFormData, setEmailFormData] = useState<Omit<RegisterEmailFormValues, 'agreeTerms' | 'passwordConfirm'> | null>(null);
  const [profileFormData, setProfileFormData] = useState<RegisterProfileFormValues | null>(null);
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
      email: "",
      password: "",
    },
  });

  const registerEmailForm = useForm<RegisterEmailFormValues>({
    resolver: zodResolver(registerEmailSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      agreeTerms: false,
    },
  });
  
  const registerProfileForm = useForm<RegisterProfileFormValues>({
    resolver: zodResolver(registerProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onLoginSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  const onRegisterEmailSubmit = (data: RegisterEmailFormValues) => {
    // Save email form data and proceed to profile form
    const { agreeTerms, passwordConfirm, ...emailData } = data;
    setEmailFormData(emailData);
    setRegistrationStage('profileForm');
  };
  
  const onRegisterProfileSubmit = (data: RegisterProfileFormValues) => {
    // Save profile data and proceed to questionnaire
    setProfileFormData(data);
    setRegistrationStage('questionnaire');
  };
  
  const handleQuestionnaireComplete = (result: AccreditationResult) => {
    setAccreditationResult(result);
    setRegistrationStage('accreditationResult');
  };
  
  const handleCompleteRegistration = () => {
    if (emailFormData && profileFormData && accreditationResult) {
      // Process data for storage
      // Update accredited status based on segment
      const isAccredited = accreditationResult.segment === 'high' || accreditationResult.segment === 'medium';
      
      // Convert questionnaire answers to JSON string for storage
      // Remove passwordConfirm as it's not stored in the database
      const { passwordConfirm, ...userData } = {
        ...emailFormData,
        ...profileFormData,
        accreditedStatus: isAccredited,
        accreditationScore: accreditationResult.score,
        accreditationSegment: accreditationResult.segment,
        questionnaireData: JSON.stringify(accreditationResult.answers)
      };
      
      registerMutation.mutate(userData);
    }
  };
  
  const resetRegistration = () => {
    setRegistrationStage('emailForm');
    setEmailFormData(null);
    setProfileFormData(null);
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" {...field} />
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
                  {registrationStage === 'emailForm' && (
                    <>
                      <Form {...registerEmailForm}>
                        <form onSubmit={registerEmailForm.handleSubmit(onRegisterEmailSubmit)} className="space-y-4">
                          <FormField
                            control={registerEmailForm.control}
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
                            control={registerEmailForm.control}
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
                            control={registerEmailForm.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Confirm your password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={registerEmailForm.control}
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
                            Create Account
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
                  
                  {registrationStage === 'profileForm' && (
                    <>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Complete Your Profile</h3>
                        <p className="text-gray-600 text-sm">
                          Please provide your name to continue with the registration process.
                        </p>
                      </div>
                      
                      <Form {...registerProfileForm}>
                        <form onSubmit={registerProfileForm.handleSubmit(onRegisterProfileSubmit)} className="space-y-4">
                          <FormField
                            control={registerProfileForm.control}
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
                            control={registerProfileForm.control}
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

                          <Button 
                            type="submit" 
                            className="w-full"
                          >
                            Continue to Questionnaire
                          </Button>
                          
                          <div className="text-center mt-2">
                            <Button 
                              variant="link" 
                              onClick={() => setRegistrationStage('emailForm')}
                              className="text-sm text-gray-500"
                            >
                              Back to Account Details
                            </Button>
                          </div>
                        </form>
                      </Form>
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
              <h2 className="text-2xl font-bold mb-6">What is an Accredited Investor?</h2>

              <div className="space-y-6">
                <p className="text-white/90 text-lg mb-4">
                  An accredited investor is an individual or entity that is allowed to invest in securities that are not registered with financial authorities like the SEC.
                </p>
                
                <h3 className="font-semibold text-xl my-4">Qualifying Criteria</h3>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Income Qualification</h3>
                    <p className="text-white/80">
                      Individual income exceeding $200,000 in each of the two most recent years, or joint income with a spouse exceeding $300,000.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Building className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Net Worth Qualification</h3>
                    <p className="text-white/80">
                      Net worth exceeding $1 million, either individually or jointly with a spouse (excluding primary residence).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Professional Qualification</h3>
                    <p className="text-white/80">
                      Certain professional certifications, designations, or credentials recognized by the SEC.
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
