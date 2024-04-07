import { Post } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data: Omit<Post, "_id" | "_createdAt" | "_updatedAt" | "rev"> = await request.json();

    const mutations = {
      mutations: [
        {
          create: {
            _type: "post",
            text: data.text,
            username: data.username,
            blockTweet: false,
            profileImg: data.profileImg,
            image: data.image,
          },
        },
      ],
    };

    const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
    const result = await fetch(apiEndpoint, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_API_KEY}`,
      },
      body: JSON.stringify(mutations),
      method: "POST",
    });

    if (!result.ok) {
      const errorData = await result.json();
      console.error("Error adding post:", errorData);
      return NextResponse.json({ message: errorData.error.message }, { status: 500 });
    }

    const responseData = await result.json();
    console.log("Post added:", responseData);
    return NextResponse.json({ message: "Post added" });
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}