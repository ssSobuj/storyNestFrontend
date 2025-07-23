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
import { Plus, Trash2, Eye, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";
import Swal from "sweetalert2";

interface Story {
  _id: string;
  id: string;
  title: string;
  status: "pending" | "approved" | "rejected";
  views: number;
}

export default function AllStories() {
  const { data, isLoading, mutate } = useSwrFetcher(`/api/v1/stories`);

  const router = useRouter();

  const handleDelete = async (storyId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/v1/stories/${storyId}`);
        mutate();
        toast.success("Story deleted.");
        Swal.fire("Deleted!", "Your story has been deleted.", "success");
      } catch (error) {
        toast.error("Failed to delete story.");
        Swal.fire(
          "Error!",
          "There was a problem deleting your story.",
          "error"
        );
      }
    }
  };

  if (isLoading)
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
          {data?.data?.length > 0 ? (
            data?.data?.map((story: Story) => (
              <div
                key={story._id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <Link href={`/stories/${story?.id}`}>
                    <h3 className="font-semibold">{story.title}</h3>
                  </Link>
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
                    <span className="text-sm text-slate-500 flex items-center cursor-pointer">
                      <Link href={`/stories/${story?.id}`}></Link>
                      <Eye className="h-4 w-4 mr-1" />
                      {story.views}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
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
