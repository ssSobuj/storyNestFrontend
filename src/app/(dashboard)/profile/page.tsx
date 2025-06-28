// app/(dashboard)/profile/page.tsx

"use client";

import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
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
import { Loader2, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, isLoading } = useAuth(); // Assuming useAuth has a revalidate function
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [pageLoading, setPageLoading] = useState(false);

  // When the user data is loaded, populate the form
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPageLoading(true);
    try {
      // NOTE: You need to create this endpoint on your backend
      const res = await api.put("/api/v1/auth/updatedetails", formData);

      // Re-fetch user data to update the UI everywhere
      // if (revalidateUser) {
      //   await revalidateUser();
      // }

      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setPageLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">
          Manage your account information and preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your public username and account email.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                {/* <AvatarImage src={user?.avatarUrl || ""} /> */}
                <AvatarFallback className="text-xl">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">
                Change Avatar
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  disabled // It's often best practice to have a separate "change email" flow
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={pageLoading}
                className="bg-amber-600 hover:bg-amber-700"
              >
                {pageLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* You can add more cards here for changing password, notification settings, etc. */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password for better security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" className="mt-1" />
          </div>
          <div className="flex justify-end">
            <Button type="button" variant="outline">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
