"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Heart,
  Eye,
  BarChart3,
  Users,
  Settings,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const Dashboard = () => {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "writer", // or "admin"
    joinDate: "2024-01-15",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  });

  // Mock data for user stories
  const userStories = [
    {
      id: 1,
      title: "The Digital Dreamer",
      status: "published",
      views: 1234,
      likes: 89,
      publishedDate: "2024-06-10",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Whispers in the Wind",
      status: "draft",
      views: 0,
      likes: 0,
      lastModified: "2024-06-18",
      genre: "Romance",
    },
    {
      id: 3,
      title: "The Last Library",
      status: "published",
      views: 856,
      likes: 67,
      publishedDate: "2024-05-28",
      genre: "Drama",
    },
  ];

  // Mock data for admin dashboard
  const adminStats = {
    totalUsers: 15420,
    totalStories: 3456,
    totalViews: 234567,
    newUsersThisMonth: 1205,
  };

  const recentStories = [
    {
      id: 1,
      title: "The Midnight Garden",
      author: "Emma Thompson",
      status: "pending",
    },
    {
      id: 2,
      title: "Code of the Heart",
      author: "David Chen",
      status: "approved",
    },
    {
      id: 3,
      title: "Letters from Tomorrow",
      author: "Sarah Martinez",
      status: "pending",
    },
  ];

  const renderUserDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStories.length}</div>
            <p className="text-xs text-muted-foreground">
              {userStories.filter((s) => s.status === "published").length}{" "}
              published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStories.reduce((sum, story) => sum + story.views, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Across all stories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {userStories.reduce((sum, story) => sum + story.likes, 0)}
            </div>
            <p className="text-xs text-muted-foreground">From readers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Engagement
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2%</div>
            <p className="text-xs text-muted-foreground">Likes per view</p>
          </CardContent>
        </Card>
      </div>

      {/* Stories Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Stories</CardTitle>
              <CardDescription>
                Manage and track your published stories
              </CardDescription>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4 mr-2" />
              New Story
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userStories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {story.title}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge
                      variant={
                        story.status === "published" ? "default" : "secondary"
                      }
                    >
                      {story.status}
                    </Badge>
                    <span className="text-sm text-slate-500">
                      {story.genre}
                    </span>
                    {story.status === "published" ? (
                      <span className="text-sm text-slate-500">
                        Published{" "}
                        {story.publishedDate
                          ? new Date(story.publishedDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    ) : (
                      <span className="text-sm text-slate-500">
                        Last modified{" "}
                        {story.lastModified
                          ? new Date(story.lastModified).toLocaleDateString()
                          : "N/A"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {story.status === "published" && (
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{story.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes}</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{adminStats.newUsersThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stories</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats.totalStories.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+127 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {adminStats.totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Engagement Rate
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Story Management */}
      <Card>
        <CardHeader>
          <CardTitle>Story Management</CardTitle>
          <CardDescription>
            Review and moderate platform content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentStories.map((story) => (
              <div
                key={story.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {story.title}
                  </h3>
                  <p className="text-sm text-slate-500">by {story.author}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      story.status === "approved" ? "default" : "secondary"
                    }
                  >
                    {story.status}
                  </Badge>
                  {story.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">
              {user.role === "admin" ? "Admin Dashboard" : "Writer Dashboard"}
            </h1>
            <p className="text-slate-600">Welcome back, {user.name}</p>
          </div>
          <Button variant="outline" className="border-slate-300">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        <Tabs
          defaultValue={user.role === "admin" ? "overview" : "stories"}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stories">
              {user.role === "admin" ? "Content" : "Stories"}
            </TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {user.role === "admin"
              ? renderAdminDashboard()
              : renderUserDashboard()}
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            {user.role === "admin"
              ? renderAdminDashboard()
              : renderUserDashboard()}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      First Name
                    </label>
                    <Input value="John" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700">
                      Last Name
                    </label>
                    <Input value="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <Input value={user.email} className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Bio
                  </label>
                  <Input
                    placeholder="Tell us about yourself..."
                    className="mt-1"
                  />
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
