// components/dashboard/UserDashboard.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface Story {
  _id: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  views: number;
}

export default function UserDashboard() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/v1/stories/me");
        setStories(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch your stories.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyStories();
  }, []);

  const handleDelete = async (storyId: string) => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      try {
        await api.delete(`/api/v1/stories/${storyId}`);
        setStories(stories.filter((s) => s._id !== storyId));
        toast.success("Story deleted.");
      } catch (error) {
        toast.error("Failed to delete story.");
      }
    }
  };

  if (loading)
    return (
      <div className="text-center p-10">
        <Loader2 className="h-6 w-6 animate-spin mx-auto" />
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Stories</CardTitle>
            <CardDescription>Manage your submitted content.</CardDescription>
          </div>
          <Button
            onClick={() => router.push("/write-story")}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Story
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stories.length > 0 ? (
            stories.map((story) => (
              <div
                key={story._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{story.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge
                      variant={
                        story.status === "approved"
                          ? "default"
                          : story.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {story.status}
                    </Badge>
                    <span className="text-sm text-slate-500 flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {story.views}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={story?.status !== "approved"}
                    onClick={() => router.push(`/edit-story/${story._id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(story._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 py-8">
              You haven't written any stories yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
