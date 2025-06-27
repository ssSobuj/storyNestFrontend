"use client";
import React from "react"; // Add this line
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import StoryComments from "@/components/StoryComments.tsx";

interface Story {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  readTime: string;
  publishedDate: string;
  genre: string;
  tags: string[];
  coverImage: string;
}

export default function StoryDetail({
  params,
}: {
  params: { slug: string };
} & {
  children?: React.ReactNode;
}) {
  const { slug } = params;
  console.log(slug);

  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(245);

  // Mock story data (in real app, this would be fetched based on ID)
  const story: Story = {
    id: 1,
    title: "The Midnight Garden",
    content: `In the heart of the city, where concrete and steel had long since replaced the natural world, there existed a secret that only a few knew about. Dr. Elena Vasquez had stumbled upon it quite by accident, during one of her late-night walks through the university's botanical gardens.

It was past midnight when she first noticed the peculiar glow emanating from behind the old greenhouse. As a botanist, she had spent countless hours in these gardens, but never had she seen anything like this. The soft, ethereal light seemed to pulse with a rhythm all its own, calling to her like a siren's song.

Pushing through the overgrown hedges, Elena discovered what would change her understanding of plant life forever. Before her lay a garden unlike any other—flowers that bloomed exclusively under the cover of darkness, their petals shimmering with an otherworldly luminescence.

The moonflowers, as she would later name them, were unlike anything in botanical literature. Their stems grew directly from what appeared to be pure moonlight, condensed and crystallized into a substance that felt both solid and ethereal. Each bloom pulsed with its own inner light, creating a symphony of colors that danced across the spectrum.

But the true mystery lay not in their appearance, but in their purpose. As Elena observed night after night, she began to notice patterns. The flowers seemed to be communicating—not just with each other, but with something far beyond the Earth's atmosphere.

Each petal movement, each pulse of light, appeared to be part of an intricate language. Elena documented everything, filling notebook after notebook with her observations. The more she learned, the more she realized that these weren't just plants—they were beacons, calling out to something in the vast expanse of space.

As weeks turned to months, Elena's obsession grew. She neglected her regular duties, her research, even her relationships. The midnight garden had become her world, and she its sole guardian and interpreter.

Then, one fateful night, the flowers began to bloom brighter than ever before. The entire garden erupted in a cascade of light so brilliant that Elena had to shield her eyes. When the light finally dimmed, she found herself face to face with visitors who had traveled farther than she could have ever imagined.

The beings before her were tall and ethereal, their forms seeming to shift between solid matter and pure energy. They communicated not through words, but through the same pulsing patterns of light that Elena had been observing in the flowers.

"We have been waiting," they said, their message appearing directly in her mind as waves of warm, golden light. "The garden keepers have called us home."

Elena realized in that moment that the midnight garden was not just a collection of unusual plants—it was a communication system, a beacon that had been planted by these beings generations ago, waiting for the right person to discover and tend to it.

The visitors explained that they had seeded many worlds with such gardens, hoping to find those who could appreciate the delicate balance between science and wonder, between the known and the unknowable. Elena had proven herself worthy through her dedication and her willingness to believe in something beyond conventional understanding.

As dawn approached, the visitors began to fade, but not before offering Elena a choice. She could return to her normal life, her memory of this encounter gently erased, or she could become a true guardian of the midnight garden—protecting it, learning from it, and preparing for the day when humanity would be ready to join the vast network of worlds connected by these luminous flowers.

Elena's decision was swift and sure. She had found her purpose, her calling among the stars that bloomed only in darkness. As the sun rose over the city, she began planning how to expand the garden, how to cultivate more of these remarkable plants, and how to prepare for the next visit from her celestial friends.

The midnight garden would remain her secret for now, but Elena knew that someday, when humanity was ready, these flowers would bloom across the entire world, turning Earth into a beacon of light in the cosmic darkness—a signal that we too were ready to join the greater community of worlds that had been waiting for us all along.`,
    author: {
      name: "Emma Thompson",
      bio: "A passionate writer of fantasy and science fiction, Emma has been crafting stories that blend the magical with the scientific for over a decade.",
      avatar:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face",
    },
    readTime: "12 min read",
    publishedDate: "2024-06-15",
    genre: "Fantasy",
    tags: ["Science Fiction", "Mystery", "Magic", "Space"],
    coverImage:
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=400&fit=crop",
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link href="/stories">
          <Button
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-amber-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>

        {/* Cover Image */}
        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-8">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Story Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-amber-100 text-amber-800">{story.genre}</Badge>
            {story.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-slate-300 text-slate-600"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-4 leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={story.author.avatar}
                  alt={story.author.name}
                />
                <AvatarFallback>
                  {story.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">
                  {story.author.name}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span>
                    {new Date(story.publishedDate).toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`border-slate-300 ${
                  isLiked ? "text-red-600 bg-red-50" : "text-slate-600"
                }`}
              >
                <Heart
                  className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`}
                />
                {likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`border-slate-300 ${
                  isBookmarked ? "text-amber-600 bg-amber-50" : "text-slate-600"
                }`}
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-600"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Story Content */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {story.content.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-slate-700 leading-relaxed mb-4 text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Author Bio */}
        <Card className="border-slate-200 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={story.author.avatar}
                  alt={story.author.name}
                />
                <AvatarFallback>
                  {story.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  About {story.author.name}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  {story.author.bio}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                >
                  <User className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <StoryComments storyId={story.id} />
      </div>
    </div>
  );
}
