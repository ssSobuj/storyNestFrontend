"use client";

import { useState, useEffect } from "react";
import { User } from "@/hooks/useAuth";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";

const initialErrorState = { username: "" };

export default function UpdateDetailsForm({
  user,
  mutate,
}: {
  user: User;
  mutate: () => void;
}) {
  const [username, setUsername] = useState(user.username);
  const [errors, setErrors] = useState(initialErrorState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setUsername(user.username);
  }, [user.username]);

  const validate = () => {
    const newErrors = { ...initialErrorState };
    let isValid = true;
    if (username.trim().length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // Clear error when user starts typing
    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    setIsSubmitting(true);
    try {
      await api.put("/api/v1/auth/updatedetails", { username });
      await mutate();
      toast.success("Username updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={handleChange}
            className="mt-1"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            className="mt-1"
            disabled
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Username
        </Button>
      </div>
    </form>
  );
}
