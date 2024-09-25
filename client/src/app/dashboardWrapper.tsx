"use client"

import Navbar from "@/app/(components)/Navbar";
import { useState } from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  const [lightMode, setTheme] = useState(true);

  return (
    <div className={`${lightMode ? 'light' : 'dark'} flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      Sidebar
      <main className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 md:pl-24`}>
        <Navbar setTheme={setTheme} lightMode={lightMode} />
        {children}
      </main>
    </div>
  )
}

export default DashboardWrapper