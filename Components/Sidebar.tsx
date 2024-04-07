"use client";

import React from 'react'
import{
    BellIcon,
    HashtagIcon,
    CircleStackIcon,
    EllipsisHorizontalCircleIcon,
    EnvelopeIcon,
    UserIcon,
    HomeIcon,
    BookmarkIcon,
} from '@heroicons/react/24/outline'
import logo from '../assets/Images/X-Logo.png'
import Image from 'next/image';
import SidebarRow from './SidebarRow';
import { signIn, signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const  {data: session} = useSession()
  return (
    <div className='col-span-2 flex flex-col items-center px-4 md:items-start'>
        <Image className='h-10 w-10' src= {logo} alt="" />
        <SidebarRow Icon={HomeIcon} title="Home" />
        <SidebarRow Icon={HashtagIcon} title="Explore" />
        <SidebarRow Icon={BellIcon} title="Notifications" />
        <SidebarRow Icon={EnvelopeIcon} title="Messages" />
        <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarRow Icon={CircleStackIcon} title="Lists" />
        <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
        <SidebarRow onClick={session? signOut:signIn} Icon={UserIcon} title= {session? 'Sign Out':'Sign In'} />


    </div>
  )
}

export default Sidebar