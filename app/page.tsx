"use client";

import Feed from "@/Components/Feed";
import Sidebar from "@/Components/Sidebar";
import Widgets from "@/Components/Widgets";
import '../app/globals.css';
import { fetchPosts } from "@/utils/fetchPosts";
import { Post } from "@/typings";
import { Toaster } from 'react-hot-toast';

async function getData(): Promise<Post[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BASE_URL is not defined');
  }
  const posts = await fetchPosts(baseUrl);
  return posts;
}

export default async function Home() {
  const posts = await getData();
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