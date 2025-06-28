"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Eye, EyeOff, MailCheck, Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // Assuming you have this from shadcn/ui

// 1. Define the validation schema with Zod
const formSchema = z
  .object({
    // Renamed from 'userName' to match your previous `register` function call
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Show the error on the confirm password field
  });

// Infer the TypeScript type from the schema
type RegisterFormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  // 2. Use our SWR-powered auth hook
  const { register, loginWithGoogle } = useAuth();

  // 3. State management is now minimal
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 4. Initialize React Hook Form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Get the loading state directly from react-hook-form
  const { isSubmitting } = form.formState;

  // 5. The new submit handler
  const onSubmit = async (data: RegisterFormValues) => {
    setSuccessMessage(null);
    try {
      // The `register` function from your useAuth hook
      const response = await register(data.username, data.email, data.password);
      if (response && response.data.success) {
        // Assuming your API response has a `data.data` or `data.message` field
        setSuccessMessage(
          response.data.data ||
            "Registration successful. Please check your email to verify your account."
        );
      }
    } catch (error: any) {
      // Show backend error message if available, otherwise a generic one
      toast.error(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      await loginWithGoogle(credentialResponse);
      // On success, the useAuth hook will handle the redirect
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Google login failed. Please try again."
      );
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Success Message sections remain the same... */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <BookOpen className="h-10 w-10 text-amber-600" />
            <span className="text-2xl font-serif font-bold text-slate-900">
              StoryVerse
            </span>
          </Link>
        </div>

        {successMessage ? (
          <Card className="border-green-200 shadow-lg text-center animate-in fade-in-50">
            {/* This success card remains unchanged */}
            <CardHeader>
              <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                <MailCheck className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-serif text-green-800 mt-4">
                Almost there!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">{successMessage}</p>
              <p className="mt-4 text-sm text-slate-500">
                Didn't get an email? Check your spam folder or try registering
                again later.
              </p>
              <Button
                asChild
                className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Link href="/login">Back to Login</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-slate-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-slate-900">
                Join StoryVerse
              </CardTitle>
              <CardDescription className="text-slate-600">
                Create your account and start your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Google login part remains unchanged */}
              <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 flex-shrink text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                />
              </div>

              {/* 6. Wrap the form with the Form provider from react-hook-form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john_doe"
                            {...field}
                            className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john.doe@example.com"
                            type="email"
                            {...field}
                            className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
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
                        <FormLabel className="text-slate-700">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative mt-1">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="8+ characters"
                              {...field}
                              className="border-slate-300 focus:border-amber-500 focus:ring-amber-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative mt-1">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                              className="border-slate-300 focus:border-amber-500 focus:ring-amber-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 7. The button's disabled and text state is now handled by the form state */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 mt-6"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-amber-600 hover:text-amber-700 font-medium hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
