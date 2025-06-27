import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Send } from "lucide-react";

interface Comment {
  id: number;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  rating: number;
  date: string;
}

interface StoryCommentsProps {
  storyId: number;
}

const StoryComments = ({ storyId }: StoryCommentsProps) => {
  console.log(storyId);

  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Mock comments data (in real app, this would be fetched from API)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: {
        name: "Alice Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616c345d862?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "What a beautifully written story! The imagery of the midnight garden was so vivid, I felt like I was walking through it myself. Emma's writing style is truly captivating.",
      rating: 5,
      date: "2024-06-16",
    },
    {
      id: 2,
      author: {
        name: "Michael Chen",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "The blend of science and fantasy in this story is masterful. I loved how the author connected botany with extraterrestrial communication. Can't wait to read more from this author!",
      rating: 5,
      date: "2024-06-17",
    },
    {
      id: 3,
      author: {
        name: "Sarah Kim",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "Such an enchanting tale! The character development of Elena was excellent, and the world-building was immersive. This story stayed with me long after reading.",
      rating: 4,
      date: "2024-06-18",
    },
  ]);

  const handleSubmitComment = () => {
    if (newComment.trim() && userRating > 0) {
      const comment: Comment = {
        id: comments.length + 1,
        author: {
          name: "Current User", // In real app, this would come from auth context
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        },
        content: newComment,
        rating: userRating,
        date: new Date().toISOString().split("T")[0],
      };

      setComments([comment, ...comments]);
      setNewComment("");
      setUserRating(0);
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

  return (
    <div className="space-y-6">
      {/* Add Comment Section */}
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
              placeholder="Share your thoughts about this story..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || userRating === 0}
            className="bg-amber-600 hover:bg-amber-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Post Comment
          </Button>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-slate-900">
          Comments ({comments.length})
        </h3>

        {comments.map((comment) => (
          <Card key={comment.id} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={comment.author.avatar}
                    alt={comment.author.name}
                  />
                  <AvatarFallback>
                    {comment.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {comment.author.name}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {new Date(comment.date).toLocaleDateString()}
                      </p>
                    </div>
                    {renderStars(comment.rating)}
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {comments.length === 0 && (
          <Card className="border-slate-200">
            <CardContent className="p-8 text-center">
              <p className="text-slate-500">
                No comments yet. Be the first to share your thoughts!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StoryComments;
