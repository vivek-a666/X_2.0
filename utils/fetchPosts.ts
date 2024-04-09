import { Post } from "@/typings";

export const fetchPosts = async (baseUrl: string) => {
    const res = await fetch(`${baseUrl}/posts`)
    const data = await res.json();
    const posts: Post[] = data.posts;
    return posts;
  }