"use client";

import React, {SVGProps} from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    onClick?: () => {}
}

function SidebarRow({Icon, title, onClick}: Props) {
  return (
    <div onClick={() => onClick?.()} className='group flex max-w-fit cursor-pointer items-center space-x-2 rounded-full px-4 py-3 transition-all duration-200 hover:bg-gray-200'>
        <Icon className='h-6 w-6'/>
        <p className='hidden group-hover:text-gray-900 md:inline-flex text-base font-light'>{title}</p>
    </div>
  )
}

export default SidebarRow