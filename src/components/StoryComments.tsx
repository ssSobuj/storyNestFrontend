// src/components/StoryComments.tsx
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Send } from "lucide-react";
import { IComment } from "@/app/stories/[slug]/page"; // Import shared type
import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import api from "@/lib/api";

interface StoryCommentsProps {
  storyId: string; // The ID is a string
}

const StoryComments = ({ storyId }: StoryCommentsProps) => {
  const { user } = useAuth(); // Get user and token from your auth context
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        // Using the axios instance for consistency
        const res = await api.get(`/api/v1/stories/${storyId}/comments`);
        setComments(res.data.data);
      } catch (err: any) {
        // ... error handling
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [storyId]);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || userRating === 0 || !user) return;
    setIsSubmitting(true);
    try {
      const res = await api.post(`/api/v1/stories/${storyId}/comments`, {
        text: newComment,
        rating: userRating,
      });

      // The rest of the logic is the same
      setComments([res.data.data, ...comments]);
      setNewComment("");
      setUserRating(0);
    } catch (err: any) {
      alert(`Error: ${err.message}`); // Simple error handling for now
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "h-4 w-4"
  ) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? hoveredRating || userRating : rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
            onClick={interactive ? () => setUserRating(star) : undefined}
            onMouseEnter={
              interactive ? () => setHoveredRating(star) : undefined
            }
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  // Render a loading state
  if (isLoading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Render an error state
  if (error) {
    return <Card className="p-8 text-center text-red-500">Error: {error}</Card>;
  }

  return (
    <div className="space-y-6">
      {/* Only show the "Add Comment" form if the user is logged in */}
      {user ? (
        <Card className="border-slate-200">
          <CardHeader>
            <h3 className="text-xl font-semibold text-slate-900">
              Leave a Comment & Rating
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Rating
              </label>
              {renderStars(userRating, true, "h-6 w-6")}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Comment
              </label>
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment?.trim() || userRating === 0 || isSubmitting}
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 text-center border-slate-200">
          <p className="text-slate-600">
            <Link
              href="/login"
              className="text-amber-600 font-semibold hover:underline"
            >
              Log in
            </Link>{" "}
            to leave a comment or rating.
          </p>
        </Card>
      )}

      {/* Comments List */}

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">
          Comments ({comments.length})
        </h3>
        {comments.length > 0 &&
          comments?.map((comment) => (
            <Card key={comment._id} className="border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={comment.author.profilePicture}
                      alt={comment.author.username}
                    />
                    <AvatarFallback>
                      {comment.author.username
                        ?.split(" ")
                        ?.map((n) => n[0])
                        ?.join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">
                          {comment.author.username}
                        </h4>
                        <p className="text-sm text-slate-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {renderStars(comment.rating)}
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        {comments.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-slate-500">No comments yet. Be the first!</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StoryComments;
