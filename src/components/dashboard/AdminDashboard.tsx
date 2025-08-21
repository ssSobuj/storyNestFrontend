// components/dashboard/AdminDashboard.tsx

"use client";

import { useEffect, useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

interface Story {
  _id: string;
  title: string;
  author: { _id: string; username: string };
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AdminDashboard() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/api/v1/stories?status=${activeTab}&limit=100&sort=-createdAt`
        );
        setStories(res.data.data);
      } catch (error) {
        toast.error(`Failed to fetch ${activeTab} stories.`);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [activeTab]);

  const handleUpdateStatus = async (
    storyId: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      await api.put(`/api/v1/stories/${storyId}/status`, { status: newStatus });
      setStories((prev) => prev.filter((story) => story._id !== storyId));
      toast.success(`Story has been ${newStatus}.`);
    } catch (error: any) {
      console.log(error);

      toast.error(
        error?.response.data.error || "Failed to update story status."
      );
    }
  };

  const renderStoryList = (storyList: Story[]) => {
    if (loading)
      return (
        <div className="text-center p-10">
          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
        </div>
      );
    if (storyList.length === 0)
      return (
        <p className="text-center text-slate-500 py-8">
          No stories in this category.
        </p>
      );

    return (
      <div className="space-y-4">
        {storyList.map((story) => (
          <div
            key={story._id}
            className="flex items-center justify-between gap-4 p-4 border rounded-lg bg-white"
          >
            <div>
              <Link
                href={`/story/${story._id}`}
                className="font-semibold text-slate-900 hover:text-amber-600"
              >
                {story.title}
              </Link>
              <p className="text-sm text-slate-500">
                by {story.author.username}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {story.status === "pending" && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(story._id, "approved")}
                  >
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdateStatus(story._id, "rejected")}
                  >
                    <XCircle className="h-4 w-4 mr-2 text-red-600" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Story Management</CardTitle>
        <CardDescription>Review and moderate stories.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">
              <Clock className="h-4 w-4 mr-2" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved">
              <CheckCircle className="h-4 w-4 mr-2" />
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected">
              <XCircle className="h-4 w-4 mr-2" />
              Rejected
            </TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-6">
            {renderStoryList(stories)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
