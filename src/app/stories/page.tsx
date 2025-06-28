// app/stories/page.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
  Star,
  MessageSquare,
  Filter,
  BookOpen,
  Loader2,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce"; // A custom hook we'll create

// Define the shape of a story from your API
interface Story {
  _id: string;
  title: string;
  content: string; // Excerpt will be a snippet of this
  author: { username: string };
  readingTime: number;
  avgRating: number;
  category: string;
  coverImage: string;
  views: number;
  // likes and comments would come from a separate model, mocking for now
  likes: number;
  comments: number;
}

// Define the shape of the pagination data from your API
interface Pagination {
  totalPages: number;
  currentPage: number;
}

export default function StoriesPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Component State
  const [stories, setStories] = useState<Story[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter State (driven by URL search params for bookmarking/sharing)
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    sort: searchParams.get("sort") || "newest",
    category: searchParams.get("category") || "All",
  });

  // Debounce the search term to avoid firing API calls on every keystroke
  const debouncedSearchTerm = useDebounce(filters.search, 500);

  // Function to update URL search parameters without a full page reload
  const updateSearchParams = useCallback(
    (newFilters: Partial<typeof filters>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value && value !== "All") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  // Main effect to fetch stories whenever filters change
  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          sort: filters.sort === "newest" ? "-createdAt" : filters.sort, // Convert to backend format
          // Add other filters here as they are implemented in your backend
        });

        if (debouncedSearchTerm) {
          params.set("search", debouncedSearchTerm);
        }
        if (filters.category && filters.category !== "All") {
          params.set("category", filters.category);
        }

        const res = await api.get(`/api/v1/stories?${params.toString()}`);
        setStories(res.data.data);
        setPagination(res.data.pagination);
      } catch (error) {
        console.error("Failed to fetch stories", error);
        // Add toast notification for error
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [debouncedSearchTerm, filters.sort, filters.category]); // Dependencies that trigger a refetch

  // Handlers to update state and trigger URL change
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateSearchParams({ [key]: value });
  };

  // Helper to render star ratings
  const renderStars = (rating: number) => {
    /* Your existing renderStars function is perfect */
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header is great, no changes needed */}
        <div className="text-center mb-12">{/* ... */}</div>
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search stories..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select
              value={filters.sort}
              onValueChange={(value) => handleFilterChange("sort", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="avgRating">Top Rated</SelectItem>
                {/* Add more options as your backend supports them */}
              </SelectContent>
            </Select>
            {/* Add more select filters for language, etc. here */}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Fiction",
              "Non-Fiction",
              "Fantasy",
              "Sci-Fi",
              "Horror",
              "Romance",
            ].map((genre) => (
              <Button
                key={genre}
                variant={filters.category === genre ? "default" : "outline"}
                onClick={() => handleFilterChange("category", genre)}
                className={
                  filters.category === genre
                    ? "bg-amber-600 hover:bg-amber-700"
                    : ""
                }
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div className="text-center py-20">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-amber-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <Card
                key={story._id}
                className="hover:shadow-lg transition-shadow"
              >
                <Link href={`/stories/${story._id}`}>
                  <div className="aspect-video bg-slate-200">
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800 w-fit"
                  >
                    {story.category}
                  </Badge>
                  <CardTitle className="pt-2 hover:text-amber-600">
                    <Link href={`/stories/${story._id}`}>{story.title}</Link>
                  </CardTitle>
                  <CardDescription>by {story.author.username}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                    {story.content}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{story.author.username}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{story.readingTime} min read</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold">No stories found</h3>
            <p className="text-slate-500">Try adjusting your filters.</p>
          </div>
        )}

        {/* Pagination controls would go here */}
      </div>
    </div>
  );
}
