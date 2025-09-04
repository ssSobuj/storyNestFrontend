"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Upload, Save, Loader2, ArrowLeft } from "lucide-react";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";

export default function EditStoryPage() {
  const router = useRouter();
  const params = useParams();
  const storyId = params.id;
  const {data:categories,isLoading:categoriesLoading} = useSwrFetcher(`/api/v1/categories`);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Use a separate state for the file object
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Fiction",
    tags: [] as string[],
    // This will hold the URL of the existing or newly uploaded image
    coverImagePreview: "",
  });

  const [newTag, setNewTag] = useState("");

  // Fetch existing story data on component mount
  useEffect(() => {
    if (storyId) {
      const fetchStory = async () => {
        try {
          const response = await api.get(`/api/v1/stories/${storyId}`);
          const story = response.data.data;
          setFormData({
            title: story.title,
            content: story.content,
            category: story.category,
            tags: story.tags || [],
            coverImagePreview: story.coverImage, // Use existing cover image URL
          });
        } catch (error) {
          toast.error("Failed to fetch story details.");
          console.error(error);
          router.push("/dashboard");
        } finally {
          setInitialLoading(false);
        }
      };
      fetchStory();
    }
  }, [storyId, router]);

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
      // Create a temporary URL for instant preview
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
    submissionData.append("tags", JSON.stringify(formData.tags)); // Send tags as a JSON string

    if (coverImageFile) {
      submissionData.append("coverImage", coverImageFile);
    }

    try {
      // Use the PUT method to update the story
      await api.put(`/api/v1/stories/${storyId}`, submissionData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Your story has been updated successfully!");
      router.push("/dashboard"); // Or redirect to the story page
    } catch (error) {
      toast.error("Failed to update story. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
        <p className="ml-2">Loading Story...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Edit Your Story</h1>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-amber-600 hover:bg-amber-700"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {loading ? "Updating..." : "Update Story"}
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Story Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  required
                  className="w-full p-3 border rounded-md h-96"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {formData.coverImagePreview ? (
                  <img
                    src={formData.coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="text-slate-500 py-4">
                    <Upload className="h-8 w-8 mx-auto mb-2" />
                    <p>Upload an image</p>
                  </div>
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full mt-4"
              />
              <p className="text-xs text-slate-500 mt-2">
                Upload a new image to replace the existing one.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
            <div>
                  <Label
                    htmlFor="category"
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 block"
                  >
                    Category <span className="text-red-500">*</span>
                  </Label>
                  {categoriesLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Loading categories...
                      </span>
                    </div>
                  ) : categories?.data?.length === 0 ? (
                    <p className="text-red-500 text-sm">
                      No categories available. Please contact support.
                    </p>
                  ) : (
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
                        {categories?.data?.map((category:{_id:string,name:string}) => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                            className="hover:bg-gray-100 dark:hover:bg-gray-600"
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              <div>
                <Label>Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      onClick={() => removeTag(tag)}
                      className="cursor-pointer"
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
