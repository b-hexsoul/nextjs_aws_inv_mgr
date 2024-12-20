"use client"

import { useAppDispatch, useAppSelector } from "@/app/redux"
import { toggleDarkMode, toggleSidebar } from "@/app/state"
import { useGetAuthUserQuery } from "@/app/state/api"
import { signOut } from "aws-amplify/auth"
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode, isSidebarCollapsed } = useAppSelector(({ global }) => global);
  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue" onClick={() => dispatch(toggleSidebar(!isSidebarCollapsed))}>
          <Menu className="w-4 h-4"/>
        </button>
        <div className="relative">
          <input type="search" placeholder="Search products" className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500" />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={() => dispatch(toggleDarkMode(!isDarkMode))}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="text-gray-500 cursor-pointer" size={24} />
            <span className="absolute top-2 right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-cs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
              {/* MAKE NOTIFICATIONS IN FUTURE */}
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://s3-inv-mgmt-imgs.s3.us-west-2.amazonaws.com/profile.jpg"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold">Brandon H.</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="text-gray-500 cursor-pointer" size={24} />
        </Link>
        <button
          className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default Navbar