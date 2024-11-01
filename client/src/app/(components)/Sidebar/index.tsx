"use client"

import { useAppDispatch, useAppSelector } from "@/app/redux"
import { toggleSidebar } from "@/app/state";
import { Archive, CircleDollarSign, Clipboard, LucideIcon, Menu, PanelsTopLeft, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ISidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: ISidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");
  const { isSidebarCollapsed } = useAppSelector(({ global }) => global);

  return (
    <Link href={href}>
      <div className={`cursor-pointer flex items-center ${
        isSidebarCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"}
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}
      }`}>
        <Icon className="w-6 h-6 !text-gray-700" />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"} font-medium text-gray-700`}>{label}</span>
      </div>
    </Link>
  )
}

const Sidebar = () => {
  const { isSidebarCollapsed } = useAppSelector(({ global }) => global);
  const dispatch = useAppDispatch();

  const sidebarClassnames = `fixed flex flex-col justify-between ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassnames}>
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? 'px-5' : 'px-8'}`}>
        <div>Logo</div>
        <h1 className={`${isSidebarCollapsed ? 'hidden' : 'block'} font-extrabold text-2xl`}>STOCKIT</h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={() => dispatch(toggleSidebar(!isSidebarCollapsed))}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        <nav>
          <ul>
            <li>
              <SidebarLink
                href="/dashboard"
                icon={PanelsTopLeft}
                label="Dashboard"
              />
            </li>
            <li>
              <SidebarLink
                href="/inventory"
                icon={Archive}
                label="Inventory"
              />
            </li>
            <li>
              <SidebarLink
                href="/products"
                icon={Clipboard}
                label="Products"
              />
            </li>
            <li>
              <SidebarLink
                href="/settings"
                icon={Settings2}
                label="Settings"
              />
            </li>
            <li>
              <SidebarLink
                href="/expenses"
                icon={CircleDollarSign}
                label="Expenses"
              />
            </li>
          </ul>
        </nav>
      </div>

      <div className={`${isSidebarCollapsed ? 'hidden' : 'block'} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 STOCKIT</p>
      </div>
    </div>
  )
}

export default Sidebar