// // app/(dashboard)/profile/page.tsx

// "use client";

// import useAuth from "@/hooks/useAuth";
// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Loader2, Save } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { toast } from "react-toastify";
// import api from "@/lib/api";

// export default function ProfilePage() {
//   const { user, isLoading } = useAuth(); // Assuming useAuth has a revalidate function
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//   });
//   const [pageLoading, setPageLoading] = useState(false);

//   // When the user data is loaded, populate the form
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         username: user.username,
//         email: user.email,
//       });
//     }
//   }, [user]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPageLoading(true);
//     try {
//       // NOTE: You need to create this endpoint on your backend
//       const res = await api.put("/api/v1/auth/updatedetails", formData);

//       // Re-fetch user data to update the UI everywhere
//       // if (revalidateUser) {
//       //   await revalidateUser();
//       // }

//       toast.success("Profile updated successfully!");
//     } catch (error: any) {
//       toast.error(error.response?.data?.error || "Failed to update profile.");
//     } finally {
//       setPageLoading(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
//         <p className="text-slate-500">
//           Manage your account information and preferences.
//         </p>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>
//               Update your public username and account email.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="flex items-center space-x-4">
//               <Avatar className="h-16 w-16">
//                 {/* <AvatarImage src={user?.avatarUrl || ""} /> */}
//                 <AvatarFallback className="text-xl">
//                   {user?.username.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <Button type="button" variant="outline">
//                 Change Avatar
//               </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <Label htmlFor="username">Username</Label>
//                 <Input
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   className="mt-1"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className="mt-1"
//                   disabled // It's often best practice to have a separate "change email" flow
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Button
//                 type="submit"
//                 disabled={pageLoading}
//                 className="bg-amber-600 hover:bg-amber-700"
//               >
//                 {pageLoading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <Save className="h-4 w-4 mr-2" />
//                 )}
//                 Save Changes
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </form>

//       {/* You can add more cards here for changing password, notification settings, etc. */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Change Password</CardTitle>
//           <CardDescription>
//             Update your password for better security.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div>
//             <Label htmlFor="currentPassword">Current Password</Label>
//             <Input id="currentPassword" type="password" className="mt-1" />
//           </div>
//           <div>
//             <Label htmlFor="newPassword">New Password</Label>
//             <Input id="newPassword" type="password" className="mt-1" />
//           </div>
//           <div className="flex justify-end">
//             <Button type="button" variant="outline">
//               Update Password
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";
// Import the new form components

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "react-toastify";
import UpdateDetailsForm from "@/components/dashboard/profile/UpdateDetailsForm";
import ChangePasswordForm from "@/components/dashboard/profile/ChangePasswordForm";
import SetPasswordForm from "@/components/dashboard/profile/SetPasswordForm";

export default function ProfilePage() {
  const { user, isLoading, mutate } = useAuth();

  // Avatar logic remains here as it's not a complex form
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  useEffect(() => {
    if (user) {
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;
    setIsUploadingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", avatarFile);
    try {
      await api.put("/api/v1/auth/updateavatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      await mutate();
      toast.success("Avatar updated successfully!");
      setAvatarFile(null);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to upload avatar.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  // Ensure user is loaded before rendering forms
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">
          Manage your account information and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your avatar and public username. Email cannot be changed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={avatarPreview || undefined}
                alt={user.username}
              />
              <AvatarFallback className="text-xl">
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Change Avatar
            </Button>
            {avatarFile && (
              <Button
                type="button"
                onClick={handleAvatarUpload}
                disabled={isUploadingAvatar}
              >
                {isUploadingAvatar ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Avatar
              </Button>
            )}
          </div>
          {/* Render the isolated form component */}
          <UpdateDetailsForm user={user} mutate={mutate} />
        </CardContent>
      </Card>

      {/* Conditionally render the correct password form */}
      {user.passwordExists ? (
        <ChangePasswordForm user={user} />
      ) : (
        <SetPasswordForm mutate={mutate} />
      )}
    </div>
  );
}
