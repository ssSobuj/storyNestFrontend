// // app/(dashboard)/write-story/page.tsx

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Upload, Save, Loader2 } from "lucide-react";

// export default function WriteStoryPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   // Use a separate state for the file object
//   const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "Fiction", // Match your API enum
//     tags: [] as string[],
//     // We'll manage the image preview URL separately
//     coverImagePreview: "",
//   });

//   const [newTag, setNewTag] = useState("");

//   const handleInputChange = (field: string, value: string | string[]) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const addTag = () => {
//     if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
//       handleInputChange("tags", [...formData.tags, newTag.trim()]);
//       setNewTag("");
//     }
//   };

//   const removeTag = (tagToRemove: string) => {
//     handleInputChange(
//       "tags",
//       formData.tags.filter((tag) => tag !== tagToRemove)
//     );
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setCoverImageFile(file);
//       // Create a temporary URL for instant preview
//       setFormData((prev) => ({
//         ...prev,
//         coverImagePreview: URL.createObjectURL(file),
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.title || !formData.content || !formData.category) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }
//     setLoading(true);

//     const submissionData = new FormData();
//     submissionData.append("title", formData.title);
//     submissionData.append("content", formData.content);
//     submissionData.append("category", formData.category);
//     submissionData.append("tags", JSON.stringify(formData.tags)); // Send tags as a JSON string

//     if (coverImageFile) {
//       submissionData.append("coverImage", coverImageFile);
//     }

//     try {
//       await api.post("/api/v1/stories", submissionData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Your story has been submitted for review!");
//       router.push("/dashboard");
//     } catch (error) {
//       toast.error("Failed to submit story. Please try again.");
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-3xl font-bold text-slate-900">Write Your Story</h1>
//         <Button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-amber-600 hover:bg-amber-700"
//         >
//           {loading ? (
//             <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//           ) : (
//             <Save className="h-4 w-4 mr-2" />
//           )}
//           {loading ? "Submitting..." : "Submit for Review"}
//         </Button>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//       >
//         {/* Main Form Area */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Story Content</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="title">Title *</Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => handleInputChange("title", e.target.value)}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="content">Content *</Label>
//                 <textarea
//                   id="content"
//                   value={formData.content}
//                   onChange={(e) => handleInputChange("content", e.target.value)}
//                   required
//                   className="w-full p-3 border rounded-md h-96"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Cover Image</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border-2 border-dashed rounded-lg p-4 text-center">
//                 {formData.coverImagePreview ? (
//                   <img
//                     src={formData.coverImagePreview}
//                     alt="Cover preview"
//                     className="w-full h-32 object-cover rounded"
//                   />
//                 ) : (
//                   <div className="text-slate-500 py-4">
//                     <Upload className="h-8 w-8 mx-auto mb-2" />
//                     <p>Upload an image</p>
//                   </div>
//                 )}
//               </div>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full mt-4"
//               />
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Details</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="category">Category *</Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value: any) =>
//                     handleInputChange("category", value)
//                   }
//                 >
//                   <SelectTrigger>
//                     <SelectValue />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {[
//                       "Fiction",
//                       "Non-Fiction",
//                       "Fantasy",
//                       "Sci-Fi",
//                       "Horror",
//                       "Romance",
//                     ].map((cat) => (
//                       <SelectItem key={cat} value={cat}>
//                         {cat}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div>
//                 <Label>Tags</Label>
//                 <div className="flex space-x-2">
//                   <Input
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyPress={(e) =>
//                       e.key === "Enter" && (e.preventDefault(), addTag())
//                     }
//                   />
//                   <Button type="button" onClick={addTag}>
//                     Add
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {formData.tags.map((tag) => (
//                     <Badge
//                       key={tag}
//                       variant="secondary"
//                       onClick={() => removeTag(tag)}
//                       className="cursor-pointer"
//                     >
//                       {tag} ×
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Loader2 } from "lucide-react";

export default function WriteStoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Fiction",
    tags: [] as string[],
    coverImagePreview: "",
  });

  const [newTag, setNewTag] = useState("");

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImageFile(file);
      setFormData((prev) => ({
        ...prev,
        coverImagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("content", formData.content);
    submissionData.append("category", formData.category);
    submissionData.append("tags", JSON.stringify(formData.tags));

    if (coverImageFile) {
      submissionData.append("coverImage", coverImageFile);
    }

    try {
      await api.post("/api/v1/stories", submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Your story has been submitted for review!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to submit story. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Write Your Story
        </h1>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Submit for Review
            </>
          )}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-800">
                Story Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <Label
                  htmlFor="title "
                  className="text-slate-700 font-medium mb-2"
                >
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter an engaging title..."
                  className="mt-1 outline-none focus:ring-0  focus:outline-none"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="content"
                  className="text-slate-700 font-medium  mb-2"
                >
                  Content *
                </Label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your story here..."
                  required
                  className="w-full p-4 border border-slate-300 rounded-lg h-96  outline-none   focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Cover Image */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-xl p-4 text-center bg-slate-50">
                {formData.coverImagePreview ? (
                  <img
                    src={formData.coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-40 object-cover rounded-md shadow"
                  />
                ) : (
                  <div className="text-slate-500 py-6">
                    <Upload className="h-10 w-10 mx-auto mb-3 text-amber-500" />
                    <p className="text-sm">Upload an image</p>
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mt-4"
              />
            </CardContent>
          </Card>

          {/* Details */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800">
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category" className="font-medium">
                  Category *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Fiction",
                      "Non-Fiction",
                      "Fantasy",
                      "Sci-Fi",
                      "Horror",
                      "Romance",
                    ].map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-medium">Tags</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                    placeholder="Add a tag"
                  />
                  <Button type="button" onClick={addTag} variant="secondary">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer hover:bg-slate-300 transition"
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
