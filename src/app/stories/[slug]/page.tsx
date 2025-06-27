// src/app/stories/[slug]/page.tsx

import StoryDetail from "@/components/StoryDetail";

// 1. Define a single, shared props type
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 2. (Optional but Recommended) Add a generateMetadata function using the shared 'Props' type
// This function will set the page title dynamically based on the story
export async function generateMetadata({ params }: Props): Promise<any> {
  // In a real app, you would fetch the story title based on the slug.
  // For now, we can create a placeholder title.
  const slug = params.slug;
  const storyTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase()); // e.g., "my-story" -> "My Story"

  return {
    title: `${storyTitle} | StoryNest`,
  };
}

// 3. Use the shared 'Props' type for your Page component
export default function Page({ params }: Props) {
  // The StoryDetail component only needs the params, which is fine
  return <StoryDetail params={params} />;
}
