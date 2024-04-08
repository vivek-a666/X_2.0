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
        <SidebarRow Icon={HomeIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Home" />
        <SidebarRow Icon={HashtagIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Explore" />
        <SidebarRow Icon={BellIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Notifications" />
        <SidebarRow Icon={EnvelopeIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Messages" />
        <SidebarRow Icon={BookmarkIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Bookmarks" />
        <SidebarRow Icon={CircleStackIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="Lists" />
        <SidebarRow Icon={EllipsisHorizontalCircleIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title="More" />
        <SidebarRow onClick={session? signOut:signIn} Icon={UserIcon as (props: React.SVGProps<SVGSVGElement>) => JSX.Element} title= {session? 'Sign Out':'Sign In'} />


    </div>
  )
}

export default Sidebar