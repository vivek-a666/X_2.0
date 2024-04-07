import { client } from "@/sanity";
import { Post } from "@/typings";
import { groq } from "next-sanity";
import { NextResponse } from "next/server";

const feedQuery =groq`
*[_type=="post" && !blockTweet]{
    _id,
    ...
  } | order(_createdAt desc)
`

export const revalidate = 60; // Revalidate cache every 60 seconds

export async function GET() {
  const posts: Post[] = await client.fetch(feedQuery);
  return NextResponse.json({ posts });
}