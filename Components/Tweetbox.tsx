"use client";

import React, { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import {
  CalendarIcon,
  FaceSmileIcon,
  MagnifyingGlassCircleIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { Post } from "@/typings";
import { fetchPosts } from "@/utils/fetchPosts";
import toast from "react-hot-toast";

interface Props {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

function Tweetbox({ posts, setPosts }: Props) {
  const { data: session } = useSession();
  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageInputRef.current?.files?.[0]) {
      setImage(imageInputRef.current.files[0]);
      setShowImageInput(false);
    }
  };

  const postTweet = async () => {
    if (!input.trim()) return;

    const postInfo: Omit<Post, "_id" | "_createdAt" | "_updatedAt" | "rev"> = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
      image: image ? URL.createObjectURL(image) : undefined,
      _rev: "",
      _type: "post",
      blockTweet: false
    };

    try {
      const result = await fetch(`/addPost`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
        method: "POST",
      });

      if (!result.ok) {
        throw new Error("Failed to add post");
      }

      const newPosts = await fetchPosts();
      setPosts([...posts, {
        _id: Math.random().toString(), ...postInfo,
        _createdAt: "",
        _updatedAt: ""
      }]);

      toast.success("Posted!");
    } catch (error) {
      console.error("Error posting tweet:", error);
      toast.error("Failed to post tweet");
    } finally {
      setInput("");
      setImage(null);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTweet();
  };

  return (
    <div className="flex space-x-2 p-5">
      <img
        className="h-14 w-14 object-cover rounded-full mt-4"
        src={session?.user?.image || "https://example.com/default-avatar.jpg"}
        alt=""
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col" onSubmit={handleSubmit}>
          <input
            className="h-20 w-full text-xl outline-none placeholder:text-xl"
            type="text"
            placeholder="What's Happening?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex items-center">
            <div className="flex-1 flex space-x-2 text-gray-600">
              <label htmlFor="image-upload" className="cursor-pointer">
                <PhotoIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150" />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                ref={imageInputRef}
              />
              <MagnifyingGlassCircleIcon className="h-5 w-5" />
              <FaceSmileIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <MapPinIcon className="h-5 w-5" />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || !session}
              className="rounded-full bg-gray-900 px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Post
            </button>
          </div>
          {showImageInput && (
            <form className="mt-5 flex rounded-lg bg-gray-700/80 py-2 px-4" onSubmit={handleImageUpload}>
              <input
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter Image URL..."
                ref={imageInputRef}
              />
              <button type="submit" className="font-bold text-white">
                Add Image
              </button>
            </form>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={URL.createObjectURL(image)}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Tweetbox;