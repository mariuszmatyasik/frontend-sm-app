import React from "react"
import home from "@/assets/icons/home.svg"
import directIcon from "@/assets/icons/direct.svg"
import logoutIcon from "@/assets/icons/logout.svg"
import addIcon from "@/assets/icons/add.svg"
import myphotosIcon from "@/assets/icons/myphotos.svg"
import settingsIcon from "@/assets/icons/settings.svg"
import notificationIcon from "@/assets/icons/notification.svg"
import profileIcon from "@/assets/icons/profile.svg"
import {Link, useLocation } from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {buttonVariants} from "@/components/ui/button.tsx";
import {useUserAuth} from "@/context/userAuthContext.tsx";

interface ISidebarProps {
}

const navItems = [
    {
        name: "Home",
        link: "/",
        icon: home,
    },
    {
        name: "Add photos",
        link: "/post",
        icon: addIcon,
    },
    {
        name: "My Photos",
        link: "/myphotos",
        icon: myphotosIcon,
    },
    {
        name: "Profile",
        link: "/profile",
        icon: profileIcon,
    },
    {
        name: "Notifications",
        link: "#",
        icon: notificationIcon,
    },
    {
        name: "Direct",
        link: "#",
        icon: directIcon,
    },
    {
        name: "Settings",
        link: "#",
        icon: settingsIcon,
    },
]
const Sidebar: React.FC<ISidebarProps> = ({}) => {
  const {pathname} = useLocation();
  const { logout } = useUserAuth();
    return (
      <nav className="flex flex-col relative h-screen max-w-sm w-full">
          <div className="flex justify-center m-5">
              <div className="text-white text-l">MemoShare</div>
          </div>
          {navItems.map((item) => (
              <div className={cn(
                  buttonVariants({variant: "default"}),
                  pathname === item.link ? "bg-white text-white-800 hover:bg-white rounded-none"
                      : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
                  "justify-start"
              )} key={item.name}>
                  <Link to={item.link} className="flex">
                      <span><img src={item.icon} className="w-5 h-5 mr-2" alt={item.name} style={{
                          filter: `${pathname === item.link ? "invert(0)" : "invert(1)"}`
                      }}/></span>
                      <span>{item.name}</span>
                  </Link>
              </div>
          ))}

          <div className={cn(
              buttonVariants({variant: "default"}),
              pathname === "/login" ? "bg-white text-white-800 hover:bg-white rounded-none"
                  : "hover:bg-slate-950 hover:text-white bg-transparent rounded-none",
              "justify-start")}
          >
              <Link to="/login" className="flex" onClick={logout}>
                      <span>
                          <img
                              src={logoutIcon}
                              className="w-5 h-5 mr-2"
                              alt="Logout"
                              style={{
                          filter: `${pathname === "/login" ? "invert(0)" : "invert(1)"}`
                      }}/></span>
                  <span>Logout</span>
              </Link>
          </div>
      </nav>
  )
  }

  export default Sidebar;