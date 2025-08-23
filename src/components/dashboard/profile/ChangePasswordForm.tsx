"use client";

import { useState } from "react";
import { User } from "@/hooks/useAuth";
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
import { Loader2 } from "lucide-react";

const initialFormState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const initialErrorState = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function ChangePasswordForm({ user }: { user: User }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = { ...initialErrorState };
    let isValid = true;
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required.";
      isValid = false;
    }
    if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
      isValid = false;
    }
    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
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
      await api.put("/api/v1/auth/updatepassword", formData);
      toast.success("Password updated successfully!");
      setFormData(initialFormState);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            {user.googleId
              ? "You can log in with Google or with your email and password."
              : "Update your password."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="mt-1"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="newPassword-change">New Password</Label>
            <Input
              id="newPassword-change"
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
            <Label htmlFor="confirmNewPassword-change">
              Confirm New Password
            </Label>
            <Input
              id="confirmNewPassword-change"
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
              {isSubmitting && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
