"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Users,
  PenTool,
  Heart,
  Star,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";
import Link from "next/link";
import { Story } from "./stories/page";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import useAuth from "@/hooks/useAuth";
import { useSwrFetcher } from "@/hooks/useSwrFetcher";

const Home = () => {
  const { user } = useAuth();
  const { data } = useSwrFetcher(`/api/v1/stories?sort=top-rated`);

  const features = [
    {
      icon: <PenTool className="h-8 w-8 text-amber-500" />,
      title: "Write & Share",
      description:
        "Craft beautiful stories with our intuitive editor and share them with the world.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-amber-500" />,
      title: "Discover Stories",
      description:
        "Explore a vast library of tales from writers around the globe.",
    },
    {
      icon: <Users className="h-8 w-8 text-amber-500" />,
      title: "Connect",
      description: "Join a community of passionate storytellers and readers.",
    },
    {
      icon: <Heart className="h-8 w-8 text-amber-500" />,
      title: "Engage",
      description:
        "Like, comment, and follow your favorite authors and stories.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Author",
      content:
        "StoryVerse has transformed how I share my stories. The community is incredibly supportive and engaged.",
      rating: 5,
    },
    {
      name: "James Cooper",
      role: "Reader",
      content:
        "I've discovered so many amazing writers here. It's like having a personalized library that never ends.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Storyteller",
      content:
        "The platform is beautifully designed and makes writing a joy. My stories have found their perfect audience.",
      rating: 5,
    },
  ];

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
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-amber-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Where Stories
              <span className="text-amber-600 block">Come Alive</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of storytellers and readers in a timeless platform
              dedicated to the art of narrative. Share your tales, discover new
              worlds, and connect with fellow literature enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={user ? "/write-story" : "/register"}>
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
                >
                  Start Your Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={user ? "/stories" : "/register"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
                >
                  Explore Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Stories Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Top Rated Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the most beloved tales from our community of talented
              storytellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {data?.data?.slice(0, 3)?.map((story: Story) => (
              <Card
                key={story._id}
                className="border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-slate-200 overflow-hidden relative">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Optional Top Badge - If you want to mark Top Rated, Trending, etc. */}
                  {/* <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              #1 Trending
            </div> */}
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                      {story.category}
                    </span>
                    {story.avgRating > 0 && renderStars(story.avgRating)}
                  </div>

                  <CardTitle className="text-xl font-serif hover:text-amber-600 transition-colors line-clamp-2">
                    <Link href={`/stories/${story._id}`}>{story.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed line-clamp-3">
                    {story.content}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{story.author.username}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{story.readingTime} min read</span>
                    </div>
                  </div>

                  <Link href={`/stories/${story._id}`}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Story
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/stories?sort=top-rated">
              <Button
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 text-lg"
              >
                View All Stories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Everything You Need to Tell Your Story
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our platform provides all the tools and community support you need
              to share your creativity with the world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl font-serif">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-slate-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
              Loved by Storytellers Worldwide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See what our community of writers and readers have to say about
              their StoryVerse experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-slate-200 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-slate-600 leading-relaxed italic">
                    &quot{testimonial.content}&quot
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold text-slate-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Begin Your Literary Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Join our growing community of storytellers and readers. Your story
            matters, and we can&apos;t wait to read it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={user ? "/dashboard" : "/register"}>
              <Button
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
              >
                Join StoryVerse Today
              </Button>
            </Link>
            <Link href={user ? "/dashboard" : "/login"}>
              <Button
                variant="outline"
                size="lg"
                className="border-white  hover:bg-white hover:text-slate-900 px-8 py-3 text-lg"
              >
                Already a Member?
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
