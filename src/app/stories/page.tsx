"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Search,
  Clock,
  User,
  Heart,
  BookOpen,
  Star,
  MessageSquare,
  Filter,
} from "lucide-react";

const Stories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [lengthFilter, setLengthFilter] = useState("all");

  // Mock data for stories with ratings and comments
  const stories = [
    {
      id: 1,
      title: "The Midnight Garden",
      excerpt:
        "In a world where flowers bloom only under moonlight, a young botanist discovers the secret that could change everything...",
      author: "Emma Thompson",
      readTime: "12 min read",
      likes: 245,
      rating: 4.8,
      comments: 56,
      genre: "Fantasy",
      language: "English",
      length: "medium",
      publishedDate: "2024-06-15",
      coverImage:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      title: "কোডের হৃদয়",
      excerpt:
        "যখন একটি সফটওয়্যার ইঞ্জিনিয়ারের AI সৃষ্টি প্রেমের কবিতা লিখতে শুরু করে, সে প্রশ্ন করে অনুভব করার অর্থ কী...",
      author: "আহমেদ হাসান",
      readTime: "৮ মিনিট পড়া",
      likes: 189,
      rating: 4.6,
      comments: 34,
      genre: "Sci-Fi",
      language: "Bangla",
      length: "short",
      publishedDate: "2024-06-14",
      coverImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Letters from Tomorrow",
      excerpt:
        "A mysterious post office that delivers mail from the future becomes the center of one woman's quest for answers...",
      author: "Sarah Martinez",
      readTime: "15 min read",
      likes: 342,
      rating: 4.9,
      comments: 78,
      genre: "Mystery",
      language: "English",
      length: "medium",
      publishedDate: "2024-06-13",
      coverImage:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "The Last Library",
      excerpt:
        "In a post-apocalyptic world, the guardian of the last remaining library fights to preserve human knowledge...",
      author: "Michael Roberts",
      readTime: "20 min read",
      likes: 156,
      rating: 4.4,
      comments: 23,
      genre: "Drama",
      language: "English",
      length: "long",
      publishedDate: "2024-06-12",
      coverImage:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      title: "ছায়ার সাথে নাচ",
      excerpt:
        "একজন ব্যালে নর্তকী আবিষ্কার করেন যে তার ছায়ার নিজস্ব মন রয়েছে, যা আত্মআবিষ্কারের যাত্রার দিকে নিয়ে যায়...",
      author: "ফাতিমা খান",
      readTime: "১০ মিনিট পড়া",
      likes: 278,
      rating: 4.7,
      comments: 45,
      genre: "Drama",
      language: "Bangla",
      length: "short",
      publishedDate: "2024-06-11",
      coverImage:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop",
    },
    {
      id: 6,
      title: "The Digital Dreamer",
      excerpt:
        "When virtual reality becomes indistinguishable from dreams, a programmer must navigate between worlds...",
      author: "Alex Johnson",
      readTime: "18 min read",
      likes: 203,
      rating: 4.5,
      comments: 67,
      genre: "Sci-Fi",
      language: "English",
      length: "medium",
      publishedDate: "2024-06-10",
      coverImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    },
  ];

  const genres = [
    "All",
    "Fantasy",
    "Sci-Fi",
    "Mystery",
    "Drama",
    "Romance",
    "Horror",
  ];
  const [selectedGenre, setSelectedGenre] = useState("All");

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "topRated", label: "Top Rated" },
    { value: "mostCommented", label: "Most Commented" },
    { value: "mostLiked", label: "Most Liked" },
  ];

  const languageOptions = [
    { value: "all", label: "All Languages" },
    { value: "English", label: "English" },
    { value: "Bangla", label: "বাংলা" },
  ];

  const lengthOptions = [
    { value: "all", label: "All Lengths" },
    { value: "short", label: "Short (< 10 min)" },
    { value: "medium", label: "Medium (10-15 min)" },
    { value: "long", label: "Long (> 15 min)" },
  ];

  const filteredAndSortedStories = stories
    .filter((story) => {
      const matchesSearch =
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || story.genre === selectedGenre;
      const matchesLanguage =
        languageFilter === "all" || story.language === languageFilter;
      const matchesLength =
        lengthFilter === "all" || story.length === lengthFilter;
      return matchesSearch && matchesGenre && matchesLanguage && matchesLength;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "topRated":
          return b.rating - a.rating;
        case "mostCommented":
          return b.comments - a.comments;
        case "mostLiked":
          return b.likes - a.likes;
        case "oldest":
          return (
            new Date(a.publishedDate).getTime() -
            new Date(b.publishedDate).getTime()
          );
        case "newest":
        default:
          return (
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
          );
      }
    });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-slate-600 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Discover Amazing Stories
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore a curated collection of tales from talented writers around
            the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search stories or authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                Filters:
              </span>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={lengthFilter} onValueChange={setLengthFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Length" />
              </SelectTrigger>
              <SelectContent>
                {lengthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Genre Filter */}
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedGenre(genre)}
                className={
                  selectedGenre === genre
                    ? "bg-amber-600 hover:bg-amber-700 text-white"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedStories.map((story) => (
            <Card
              key={story.id}
              className="border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
            >
              <div className="aspect-video bg-slate-200 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    {story.genre}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {story.language}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="mb-2">{renderStars(story.rating)}</div>

                <CardTitle className="text-xl font-serif hover:text-amber-600 transition-colors">
                  <Link href={`/stories/${story.id}`}>{story.title}</Link>
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed">
                  {story.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4" />
                    <span>{story.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{story.comments}</span>
                  </div>
                </div>

                <Link href={`/stories/${story.id}`}>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Story
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAndSortedStories.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              No stories found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
