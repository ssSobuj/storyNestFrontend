// src/app/stories/[slug]/page.tsx

import StoryDetail from "@/components/StoryDetail";
import api from "@/lib/api";
import { notFound } from "next/navigation";

// Define the Story type based on your API response
// This is crucial for type safety
export interface IAuthor {
  _id: string;
  username: string;
  profilePicture?: string; // Assuming this might exist
}

export interface IStory {
  _id: string;
  title: string;
  content: string;
  slug: string;
  author: IAuthor;
  status: string;
  coverImage: string;
  readingTime: number;
  category: string;
  tags: string[];
  avgRating: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  comments: IComment[]; // Assuming your API populates this
}

export interface IComment {
  _id: string;
  text: string;
  rating: number;
  author: IAuthor;
  createdAt: string;
}

// Re-using your Props type definition
type Props = {
  params: { slug: string };
};

// Fetch data on the server
async function getStory(slug: string): Promise<IStory | null> {
  console.log(slug);

  try {
    const res = await api.get(`/api/v1/stories/${slug}`);

    return res.data.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const story = await getStory(params.slug);
//   if (!story) {
//     return { title: "Story Not Found | StoryNest" };
//   }
//   return {
//     title: `${story.title} | StoryNest`,
//     description: story.content.substring(0, 160),
//   };
// }

export default async function Page({ params }: Props) {
  const story = await getStory(params.slug);

  if (!story) {
    notFound(); // Triggers the not-found.tsx page
  }

  // Pass the fetched story to the client component
  return <StoryDetail story={story} />;
}
