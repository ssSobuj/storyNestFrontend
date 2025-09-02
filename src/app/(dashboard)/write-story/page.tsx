// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import { toast } from "react-toastify";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

//   const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "Fiction",
//     tags: [] as string[],
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
//     submissionData.append("tags", JSON.stringify(formData.tags));

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
//     <div className="max-w-7xl mx-auto px-6 py-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//         <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
//           Write Your Story
//         </h1>
//         <Button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg shadow-md transition"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//               Submitting...
//             </>
//           ) : (
//             <>
//               <Save className="h-4 w-4 mr-2" />
//               Submit for Review
//             </>
//           )}
//         </Button>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//       >
//         {/* Left Section */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card className="border border-slate-200 shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold text-slate-800">
//                 Story Content
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-5">
//               <div>
//                 <Label
//                   htmlFor="title "
//                   className="text-slate-700 font-medium mb-2"
//                 >
//                   Title *
//                 </Label>
//                 <Input
//                   id="title"
//                   value={formData.title}
//                   onChange={(e) => handleInputChange("title", e.target.value)}
//                   placeholder="Enter an engaging title..."
//                   className="mt-1 outline-none focus:ring-0  focus:outline-none"
//                   required
//                 />
//               </div>
//               <div>
//                 <Label
//                   htmlFor="content"
//                   className="text-slate-700 font-medium  mb-2"
//                 >
//                   Content *
//                 </Label>
//                 <textarea
//                   id="content"
//                   value={formData.content}
//                   onChange={(e) => handleInputChange("content", e.target.value)}
//                   placeholder="Write your story here..."
//                   required
//                   className="w-full p-4 border border-slate-300 rounded-lg h-96  outline-none   focus:outline-none"
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Sidebar */}
//         <div className="space-y-6">
//           {/* Cover Image */}
//           <Card className="border border-slate-200 shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-slate-800">
//                 Cover Image
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border-2 border-dashed rounded-xl p-4 text-center bg-slate-50">
//                 {formData.coverImagePreview ? (
//                   <img
//                     src={formData.coverImagePreview}
//                     alt="Cover preview"
//                     className="w-full h-40 object-cover rounded-md shadow"
//                   />
//                 ) : (
//                   <div className="text-slate-500 py-6">
//                     <Upload className="h-10 w-10 mx-auto mb-3 text-amber-500" />
//                     <p className="text-sm">Upload an image</p>
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

//           {/* Details */}
//           <Card className="border border-slate-200 shadow-sm">
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold text-slate-800">
//                 Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label htmlFor="category" className="font-medium">
//                   Category *
//                 </Label>
//                 <Select
//                   value={formData.category}
//                   onValueChange={(value) =>
//                     handleInputChange("category", value)
//                   }
//                 >
//                   <SelectTrigger className="mt-1">
//                     <SelectValue placeholder="Select a category" />
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
//                 <Label className="font-medium">Tags</Label>
//                 <div className="flex space-x-2 mt-1">
//                   <Input
//                     value={newTag}
//                     onChange={(e) => setNewTag(e.target.value)}
//                     onKeyPress={(e) =>
//                       e.key === "Enter" && (e.preventDefault(), addTag())
//                     }
//                     placeholder="Add a tag"
//                   />
//                   <Button type="button" onClick={addTag} variant="secondary">
//                     Add
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-3">
//                   {formData.tags.map((tag) => (
//                     <Badge
//                       key={tag}
//                       variant="secondary"
//                       onClick={() => removeTag(tag)}
//                       className="cursor-pointer hover:bg-slate-300 transition"
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Save, Loader2, XCircle } from "lucide-react";

// Define the custom color for easier use
const PRIMARY_COLOR = "#d97706"; // A deep orange/amber

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight mb-2">
              Craft Your Narrative
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Bring your ideas to life and share them with the world.
            </p>
          </div>
          <Button
            type="submit"
            form="story-form"
            disabled={loading}
            style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Submit Story
              </>
            )}
          </Button>
        </div>

        {/* Main Form Layout */}
        <form
          id="story-form"
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Column: Story Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-xl pt-0 rounded-2xl border-none bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
              <CardHeader
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="text-white p-6 rounded-t-2xl"
              >
                <CardTitle className="text-2xl font-bold flex items-center">
                  <span className="mr-3">📝</span> Story Details
                </CardTitle>
                <CardDescription className="text-gray-100 dark:text-gray-200">
                  Captivate your readers from the first word.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block"
                  >
                    Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="An epic adventure, a heartwarming tale, or a thrilling mystery..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="content"
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block"
                  >
                    Content <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Start typing your masterpiece here..."
                    required
                    rows={15}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all resize-y dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Metadata & Image */}
          <div className="space-y-8">
            {/* Cover Image */}
            <Card className="pt-0 shadow-xl rounded-2xl border-none bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-700 dark:to-black text-white p-6 rounded-t-2xl">
                <CardTitle className="text-xl font-bold flex items-center">
                  <span className="mr-3">🖼️</span> Cover Image
                </CardTitle>
                <CardDescription className="text-gray-300 dark:text-gray-400">
                  Give your story a visual identity.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <label className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center bg-gray-50 dark:bg-gray-700 cursor-pointer hover:border-orange-500 transition-colors duration-200 block">
                  {formData.coverImagePreview ? (
                    <>
                      <img
                        src={formData.coverImagePreview}
                        alt="Cover preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md mb-4 transition-opacity group-hover:opacity-80"
                      />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Image selected. Click to change.
                      </p>
                    </>
                  ) : (
                    <div className="py-8">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-gray-600 dark:text-gray-400 transition-transform" />
                      <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        Drag & Drop or Click to Upload
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        (Max 5MB, JPG/PNG)
                      </p>
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </CardContent>
            </Card>

            {/* Story Metadata */}
            <Card className="pt-0 shadow-xl rounded-2xl border-none bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-2xl">
              <CardHeader
                style={{ backgroundColor: PRIMARY_COLOR }}
                className="text-white p-6 rounded-t-2xl"
              >
                <CardTitle className="text-xl font-bold flex items-center">
                  <span className="mr-3">✨</span> Categorization
                </CardTitle>
                <CardDescription className="text-gray-100 dark:text-gray-200">
                  Help readers discover your amazing story.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Label
                    htmlFor="category"
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block"
                  >
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-700 dark:text-white">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:text-white">
                      {[
                        "Fiction",
                        "Non-Fiction",
                        "Fantasy",
                        "Sci-Fi",
                        "Horror",
                        "Romance",
                        "Thriller",
                        "Mystery",
                        "Adventure",
                        "Biography",
                        "Poetry",
                        "Historical",
                        "Young Adult",
                        "Children's",
                        "Self-Help",
                        "Science",
                        "Technology",
                        "Art",
                        "Culture",
                      ].map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600"
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block">
                    Tags
                  </Label>
                  <div className="flex space-x-3 mb-3">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                      placeholder="Add relevant keywords (e.g., magic, futuristic)"
                      className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-lg text-base focus:ring-2 focus:ring-orange-400 focus:border-orange-400 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      variant="outline"
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 rounded-lg border-gray-300 dark:border-gray-600 transition-colors"
                    >
                      Add Tag
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        style={{
                          backgroundColor: PRIMARY_COLOR,
                          color: "white",
                        }}
                        className="py-2 px-4 rounded-full text-sm font-medium flex items-center cursor-pointer hover:opacity-90 transition-colors group"
                      >
                        {tag}
                        <XCircle
                          className="ml-2 h-4 w-4 text-white hover:text-red-300 transition-colors"
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  {formData.tags.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                      No tags added yet. Add some to improve discoverability!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </form>

        {/* Bottom Submit Button */}
        <div className="flex justify-end mt-12 mb-6">
          <Button
            type="submit"
            form="story-form"
            disabled={loading}
            style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                Submitting Your Story...
              </>
            ) : (
              <>
                <Save className="h-6 w-6 mr-3" />
                Submit Your Story
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
