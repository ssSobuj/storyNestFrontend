"use client";
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PenTool, Save, Eye, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const WriteStory = () => {
  const router = useRouter();
  // const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    genre: "",
    language: "",
    coverImage: "",
    tags: [] as string[],
  });

  const [newTag, setNewTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const genres = [
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Drama",
    "Romance",
    "Horror",
    "Adventure",
    "Comedy",
  ];
  const languages = ["English", "Bangla", "Hindi", "Spanish", "French"];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = () => {
    // if (
    //   !formData.title ||
    //   !formData.content ||
    //   !formData.genre ||
    //   !formData.language
    // ) {
    //   toast({
    //     title: "Missing Information",
    //     description: "Please fill in all required fields.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // toast({
    //   title: "Story Published!",
    //   description: "Your story has been successfully published to Story Nest.",
    // });
    router.push("/stories");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      const imageUrl = URL.createObjectURL(file);
      handleInputChange("coverImage", imageUrl);
    }
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              Preview Story
            </h1>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsPreview(false)}>
                <PenTool className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-amber-600 hover:bg-amber-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          {formData.coverImage && (
            <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-8">
              <img
                src={formData.coverImage}
                alt={formData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-amber-100 text-amber-800">
                {formData.genre}
              </Badge>
              <Badge variant="outline">{formData.language}</Badge>
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
              {formData.title}
            </h1>
            <p className="text-xl text-slate-600 mb-6">{formData.excerpt}</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                {formData.content.split("\n\n").map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-slate-700 leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Write Your Story
            </h1>
            <p className="text-slate-600">
              Share your imagination with the Story Nest community
            </p>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(true)}
              disabled={!formData.title || !formData.content}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Story Details</CardTitle>
                <CardDescription>
                  Basic information about your story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter your story title"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      handleInputChange("excerpt", e.target.value)
                    }
                    placeholder="A brief description of your story..."
                    className="w-full p-3 border border-slate-300 rounded-md focus:border-amber-500 focus:ring-amber-500 h-20 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Story Content *</Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Write your story here..."
                    className="w-full p-3 border border-slate-300 rounded-md focus:border-amber-500 focus:ring-amber-500 h-96 resize-none"
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
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                    {formData.coverImage ? (
                      <img
                        src={formData.coverImage}
                        alt="Cover"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="text-slate-500">
                        <Upload className="h-8 w-8 mx-auto mb-2" />
                        <p>Upload cover image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="genre">Genre *</Label>
                  <Select
                    value={formData.genre}
                    onValueChange={(value) => handleInputChange("genre", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language">Language *</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) =>
                      handleInputChange("language", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((language) => (
                        <SelectItem key={language} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help readers find your story
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                  />
                  <Button onClick={addTag} size="sm">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteStory;
