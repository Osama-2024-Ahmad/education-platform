"use client"
import React from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Book, UserCircle2Icon, WalletCards, Compass, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CourseFormDialog from './CourseFormDialog'
function AppSidebar() {
  const path = usePathname()

  const menu = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard"
    },

    {
      title: "My Courses",
      icon: Book,
      path: "/dashboard/my-courses"
    },

    {
      title: "Explore Courses",
      icon: Compass,
      path: "/dashboard/explore"
    },

    {
      title: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing"
    },

    {
      title: "Profile",
      icon: UserCircle2Icon,
      path: "/dashboard/profile"
    },
  ]

  return (
    <div>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border/50">
          <div className="flex items-center gap-3 px-2">
            <Image src={"/logo.png"} width={50} height={50} alt='logo' className="object-contain" />
            <h2 className="font-bold text-lg text-sidebar-foreground tracking-tight">Lumina AI</h2>
          </div>
        </SidebarHeader>
        <SidebarContent className="pt-4">
          <SidebarGroup >
            <CourseFormDialog>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"> + Create New Course</Button>
            </CourseFormDialog>
          </SidebarGroup >
          <SidebarGroup >
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menu.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <Link className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 group ${path === item.path ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'} `} href={item.path}>
                        <item.icon className={`w-5 h-5 ${path === item.path ? 'text-primary' : 'text-muted-foreground group-hover:text-primary transition-colors'}`} />
                        <span>{item.title}</span>

                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>

          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  )
}

export default AppSidebar