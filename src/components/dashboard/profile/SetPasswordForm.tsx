"use client";

import { useState } from "react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, KeyRound } from "lucide-react";

const initialFormState = { newPassword: "", confirmNewPassword: "" };
const initialErrorState = { newPassword: "", confirmNewPassword: "" };

export default function SetPasswordForm({ mutate }: { mutate: () => void }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = { ...initialErrorState };
    let isValid = true;
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
      isValid = false;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
      isValid = false;
    }
    if (!formData.confirmNewPassword) {
      // Also check if confirm is empty
      newErrors.confirmNewPassword = "Please confirm your password.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.put("/api/v1/auth/setpassword", {
        newPassword: formData.newPassword,
      });
      toast.success("Password set successfully!");
      await mutate();
      setFormData(initialFormState);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to set password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Set a Password</CardTitle>
          <CardDescription>
            Add a password to enable logging in with your email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="newPassword-set">New Password</Label>
            <Input
              id="newPassword-set"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmNewPassword-set">Confirm New Password</Label>
            <Input
              id="confirmNewPassword-set"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="outline" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4 mr-2" />
              )}
              Set Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
