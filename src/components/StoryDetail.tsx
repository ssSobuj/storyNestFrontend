// src/components/StoryDetail.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ArrowLeft, Share2, Bookmark, Star } from "lucide-react";
import Link from "next/link";
import { IStory } from "@/app/stories/[slug]/page"; // Import the shared type
import StoryComments from "./StoryComments";

export default function StoryDetail({ story }: { story: IStory }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  console.log(story);

  // Robustly split paragraphs
  const contentParagraphs = story.content
    .split(/\r?\n\r?\n/)
    .filter((p) => p.trim() !== "");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/stories">
          <Button
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-amber-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Stories
          </Button>
        </Link>

        <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden mb-8">
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-amber-100 text-amber-800">
              {story.category}
            </Badge>
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
                  src={story.author.profilePicture}
                  alt={story.author.username}
                />
                <AvatarFallback>
                  {story.author.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-900">
                  {story.author.username}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.readingTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{story.avgRating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
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

        <Card className="border-slate-200 mb-8">
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              {contentParagraphs.map((paragraph, index) => (
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

        {/* We will handle the author bio card later if needed, focusing on comments now */}
        {/* <Card className="border-slate-200 mb-8">
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
        </Card> */}
        {/* Pass the story's DATABASE ID (_id) to the comments component */}
        <StoryComments storyId={story._id} />
      </div>
    </div>
  );
}
