"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs"
import axios from 'axios'
import { UserDetailConext } from '@/context/UserContext'
import { SelectedChaptersConext } from '@/context/SelectedChapter'
import { ThemeProvider } from "next-themes"

function Provider({ children }) {

  const { user } = useUser()

  const [userDetail, setUserDetail] = useState()
  const [selectedChapters, setSelectedChapters] = useState(0)
  useEffect(() => {
    user && createNewUser()
  }, [user])

  const createNewUser = async () => {
    const result = await axios.post("/api/user", {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress
    })

    console.log(result.data)
  }
  return (
    <UserDetailConext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChaptersConext.Provider value={{ selectedChapters, setSelectedChapters }}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div>{children}</div>
        </ThemeProvider>
      </SelectedChaptersConext.Provider>
    </UserDetailConext.Provider>
  )
}

export default Provider