"use client";
import React, { useEffect, useState } from 'react';
import { Post, Reply } from '@/typings';
import { fetchReplies } from '@/utils/fetchReplies';
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpOnSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import TimeAgo from 'react-timeago';

interface Props {
  post: Post;
}

function PostComponent({ post }: Props) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [profileImageSrc, setProfileImageSrc] = useState<string | undefined>(post.profileImg);

  const refreshReplies = async () => {
    const replies: Reply[] = await fetchReplies(post._id);
    setReplies(replies);
  };

  useEffect(() => {
    refreshReplies();
  }, [post._id]);

  useEffect(() => {
    // Check if the profile image URL has changed
    if (post.profileImg !== profileImageSrc) {
      setProfileImageSrc(post.profileImg);
    }
  }, [post.profileImg, profileImageSrc]);

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={profileImageSrc || 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
          alt=""
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{post.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">@{post.username.replace(/\s+/g, '').toLowerCase()} .</p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={new Date(post._createdAt)}
              title={post._createdAt}
            />
          </div>
          <p className="pt-1">{post.text}</p>
          {post.image && (
            <img
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={post.image}
              alt=""
            />
          )}
        </div>
      </div>
      <div className='mt-5 flex justify-between'>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ChatBubbleOvalLeftEllipsisIcon className='h-5 w-5' />
          <p>{replies.length}</p>
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ArrowPathRoundedSquareIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <HeartIcon className='h-5 w-5' />
        </div>
        <div className='flex cursor-pointer items-center space-x-3 text-gray-400'>
          <ArrowUpOnSquareIcon className='h-5 w-5' />
        </div>
      </div>
      {replies?.length > 0 && (
        <div className='my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5'>
          {replies.map(reply => (
            <div key={reply._id} className='relative flex space-x-2'>
                <hr className='absolute left-5 top-10 h-8 border-x border-gray-700/30' />
              <img className='mt-2 h-7 w-7 object-cover rounded-full' src={reply.profileImg} alt="" />
              <div>
              <div className='flex items-center space-x-1'>
                <p className='mr-1 font-bold'>{reply.username}</p>
                <p className='hidden text-sm text-gray-500 lg:inline'>@{reply.username.replace(/\s+/g, '').toLowerCase()} .</p>
                <TimeAgo className="text-sm text-gray-500" date={reply._createdAt} />
              </div>
            <p>{reply.comment}</p>
            
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PostComponent;
