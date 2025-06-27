"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
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
import { toast } from "react-toastify";

const RegisterPage = () => {
  const { register, loading, error } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ==> CHANGE 1: Use useEffect to reactively show errors from the hook
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Move to top
    setSuccessMessage(null); // Reset on new submission

    if (formData?.password !== formData?.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await register(
        formData?.userName,
        formData?.email,
        formData?.password
      );
      if (response && response.success) {
        setSuccessMessage(response.data); // e.g., "Registration successful. Please check your email..."
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="userName" className="text-slate-700">
                    Username
                  </Label>
                  <Input
                    id="userName"
                    name="userName" // Changed from userName
                    type="text"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="john_doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password" className="text-slate-700">
                    Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="border-slate-300 focus:border-amber-500 focus:ring-amber-500 pr-10"
                      placeholder="8+ characters"
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
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-700">
                    Confirm Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                </div>

                {/* ==> CHANGE 3: Button now reflects loading state */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2.5 mt-6"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

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
