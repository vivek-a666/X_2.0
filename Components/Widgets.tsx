"use client";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'
import {TwitterTimelineEmbed} from 'react-twitter-embed'

function Widgets() {
  return (
    <div className='col-span-2 mt-2 hidden px-2 lg:inline'>
        <div className='flex items-center space-x-2 rounded-full bg-gray-100 p-3'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' />
            <input type="text" placeholder='Search on X' className='flex-1 bg-transparent outline-none'/>
        </div>
        <div className='px-2 py-2'>
        <TwitterTimelineEmbed
  sourceType="profile"
  screenName="vaathi_yaaru_"
  options={{height: 600}}
/>
        </div>

    </div>
  )
}

export default Widgets