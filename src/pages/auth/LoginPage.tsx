import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [showVerificationBanner, setShowVerificationBanner] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check URL params for special messages
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Show message about email verification after registration
    if (urlParams.get('registered') === 'true') {
      setShowVerificationBanner(true);
    }

    // If email was verified successfully
    if (urlParams.get('verified') === 'true') {
      toast({
        title: "Email verified successfully!",
        description: "You can now log in.",
        variant: "default",
      });
    }
    
    // Clear any previous errors
    clearError();
  }, [toast, clearError]);

  const onSubmit = async (values: LoginFormValues) => {
    await login(values.email, values.password);
    // Navigation is handled by the protected route in App.tsx
  };

  // Social login simulation (does nothing, just spinner)
  const handleSocialLogin = (provider: string) => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      toast({
        title: "Social login not implemented",
        description: "For demo, use email/password.",
        variant: "destructive"
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#F5821D]">YaoPets</h1>
          <p className="mt-2 text-gray-600">
            Welcome back! Ready to help more furry friends today? 🐾
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}

        {showVerificationBanner && (
          <Alert className="bg-amber-50 border-amber-200 text-amber-800 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-amber-600" />
              <div>
                <div className="font-semibold text-amber-800 mb-1">Email verification required</div>
                <AlertDescription className="text-sm">
                  <p className="mb-2">
                    You need to verify your email before accessing your account. For security reasons, login is only allowed for accounts with a verified email.
                  </p>
                  <p className="flex items-center text-emerald-700 font-medium mt-2">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    A verification link was sent to your email.
                  </p>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        )}

        <Form {...form}>
          <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-[#CE97E8]/30 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#0BDEC2] focus:border-[#0BDEC2] focus:z-10"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-3 border border-[#CE97E8]/30 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#0BDEC2] focus:border-[#0BDEC2] focus:z-10"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#F5821D] hover:bg-[#F5821D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5821D] disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-[#CE97E8]">Or sign in with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {/* Google Login Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              disabled={!!socialLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4285F4] disabled:opacity-70 transition-colors"
            >
              {socialLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gray-200 border-t-[#4285F4] rounded-full animate-spin" />
              ) : (
                <FaGoogle className="w-5 h-5 text-[#4285F4]" />
              )}
            </button>

            {/* Facebook Login Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              disabled={!!socialLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] disabled:opacity-70 transition-colors"
            >
              {socialLoading === 'facebook' ? (
                <div className="w-5 h-5 border-2 border-gray-200 border-t-[#1877F2] rounded-full animate-spin" />
              ) : (
                <FaFacebook className="w-5 h-5 text-[#1877F2]" />
              )}
            </button>

            {/* LinkedIn Login Button */}
            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              disabled={!!socialLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A66C2] disabled:opacity-70 transition-colors"
            >
              {socialLoading === 'linkedin' ? (
                <div className="w-5 h-5 border-2 border-gray-200 border-t-[#0A66C2] rounded-full animate-spin" />
              ) : (
                <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="text-sm">
            <Link to="/auth/register" className="font-medium text-[#F5821D] hover:text-[#F5821D]/80">
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}