import { client } from "@/sanity";
import { Reply } from "@/typings";
import { groq } from "next-sanity";

import { NextResponse } from "next/server";

const replyQuery = groq`
  *[_type == "comment" && $postId != null && references(*[_type=='post' && _id == $postId]._id)] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _type,
    comment,
    username,
    profileImg,
    "post": *[_type == 'post' && _id == ^.post._ref][0] {
      _id,
      _type,
      // Add any other post properties you need
    }
  } | order(_createdAt desc)
`;

const allRepliesQuery = groq`
  *[_type == "comment"] {
    _id,
    _createdAt,
    _updatedAt,
    _rev,
    _type,
    comment,
    username,
    profileImg,
    "post": *[_type == 'post' && _id == ^.post._ref][0] {
      _id,
      _type,
      // Add any other post properties you need
    }
  } | order(_createdAt desc)
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    let replies: Reply[];

    if (postId) {
      replies = await client.fetch(replyQuery, { postId });
    } else {
      replies = await client.fetch(allRepliesQuery);
    }

    return NextResponse.json(replies);
  } catch (error) {
    console.error("Error Fetching", error);
    return NextResponse.json({ error: "Failed to fetch replies" }, { status: 500 });
  }
}