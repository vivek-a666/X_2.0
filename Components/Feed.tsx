// feed.tsx
"use client";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import Tweetbox from "./Tweetbox";
import { Post } from "@/typings";
import PostComponent from "../Components/Post";
import { fetchPosts } from "@/utils/fetchPosts";
import toast from "react-hot-toast";

interface Props {
  posts: Post[];
}

function Feed({ posts: postsProp }: Props) {
  const [posts, setPosts] = useState<Post[]>(postsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Wait a sec..");
    const posts = await fetchPosts();
    setPosts(posts);
    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 border-x lg:col-span-5 overflow-x-auto">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <ArrowPathIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 cursor-pointer transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <div>
        <Tweetbox posts={posts} setPosts={setPosts} />
      </div>
      <div>
        {posts.map((post) => (
          <PostComponent key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;