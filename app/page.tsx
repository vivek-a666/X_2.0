"use client";

import React, { useState, useEffect } from 'react';
import Feed from "@/Components/Feed";
import Sidebar from "@/Components/Sidebar";
import Widgets from "@/Components/Widgets";
import '../app/globals.css';
import { fetchPosts } from "@/utils/fetchPosts";
import { Post } from "@/typings";
import { Toaster } from 'react-hot-toast';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getData(): Promise<void> {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
      }
      try {
        const fetchedPosts = await fetchPosts(baseUrl);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-y-auto">
      <Toaster />
      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  );
}

export default Home;