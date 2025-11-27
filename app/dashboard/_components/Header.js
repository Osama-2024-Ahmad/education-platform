import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Header({ hideSideBar = false }) {
  return (
    <div className='flex item-center justify-between p-5 shadow-sm'>
      {!hideSideBar ? <SidebarTrigger /> :
        <Link href={'/dashboard'} className='flex gap-2 items-center text-sm font-bold hover:text-primary transition-all'>
          <ArrowLeft className='h-5 w-5' /> Back to Dashboard
        </Link>}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}

export default Header