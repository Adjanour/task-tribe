

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// Icons
import {
  BiLogoDigitalocean,
  BiNotification,
  BiSolidNotification,
  BiUserCircle,
  BiSolidUserCircle,
} from "react-icons/bi";

import { RiTaskLine, RiTaskFill } from "react-icons/ri";
import { FaRegStickyNote, FaStickyNote } from "react-icons/fa";
import { GoHome as HomeIcon, GoHomeFill as HomeFillIcon } from "react-icons/go";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";
import { BsGrid ,BsFillGridFill} from "react-icons/bs";
import {cn} from "@/app/(main)/_UI/lib/utils";
import {Tooltip} from "antd";





type Props = {
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
   isOpen: boolean;
};

interface SideNavItemType {
  icon: {
    icon: React.ReactNode;
    fillicon: React.ReactNode;
  };
  label: string;
  href: string;
  isSidebarOpen: boolean;
}
const sidebarItems: SideNavItemType[] = [
  {
    icon: { icon: <HomeIcon />, fillicon: <HomeFillIcon /> },
    label: "Home",
    href: "/task/home",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <RiTaskLine />, fillicon: <RiTaskFill /> },
    label: "Tasks",
    href: "/task/create",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <RiTaskLine />, fillicon: <RiTaskFill /> },
    label: "Dashboard",
    href: "/task/dashboard",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <BsGrid />, fillicon: <BsFillGridFill /> },
    label: "Grid",
    href: "/task/all",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <FaRegStickyNote />, fillicon: <FaStickyNote /> },
    label: "Notes",
    href: "/task/notes",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <BiNotification />, fillicon: <BiSolidNotification /> },
    label: "Notifications",
    href: "/settings/notifications",
    isSidebarOpen: true,
  },
  {
    icon: { icon: <BiUserCircle />, fillicon: <BiSolidUserCircle /> },
    label: "Profile",
    href: "/settings/profile",
    isSidebarOpen: true,
  },

  {
    icon: { icon: <IoSettingsOutline />, fillicon: <IoSettingsSharp /> },
    label: "Settings",
    href: "/settings",
    isSidebarOpen: false,
  },
];

/**
 * Renders the sidebar component.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isOpen - Whether the sidebar is open or closed.
 * @param {Function} props.setIsOpen - The function to set the sidebar open or closed.
 * @returns {JSX.Element} The rendered sidebar component.
 */
export default function Sidebar({isOpen: isSidebarOpen, setIsOpen: setSidebarOpen}: Props) {
  return (
      <>
        <div
            // className={cn(
            //     "min-h-screen fixed max-h-screen overflow-y-auto md:pr-6 pr-6 pt-2 flex flex-col gap-2 border-r-[1px] pl-[20px] shadow-lg  bg-white dark:bg-zinc-800 dark:bg-black rounded-lg",
            //     !isSidebarOpen && "md:[135px]"
            // )}
        >
          {/* logo */}
          <div className="flex flex-row mb-0">
            <HoverContainer>
              <Link href={"/"}>
                <BiLogoDigitalocean className="text-3xl" />
              </Link>
            </HoverContainer>
            {isSidebarOpen && (
                <p
                    className={cn(
                        " hidden text-2xl md:block  transition-all mt-2",
                        isSidebarOpen && "font-bold"
                    )}
                >
                  Task Tribe
                </p>
            )}
          </div>

          {/* sidenavitems */}
          {sidebarItems.map((sidebarItem, key) => {
            return (
                <HoverContainer key={key}>
                  <SideNavItem
                      key={key}
                      icon={{
                        icon: sidebarItem.icon.icon,
                        fillicon: sidebarItem.icon.fillicon,
                      }}
                      href={sidebarItem.href}
                      label={sidebarItem.label}
                      isSidebarOpen={isSidebarOpen}
                  />
                </HoverContainer>
            );
          })}

          {/* toggle button */}
          <section
              className={cn(
                  "flex w-fit justify-end",
                  !isSidebarOpen && "justify-start"
              )}
          >
            <HoverContainer>
              <HiOutlineArrowRightCircle
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className={cn(
                      "text-black text-2xl transition-all",
                      isSidebarOpen && "rotate-180 "
                  )}
              />
            </HoverContainer>
          </section>
        </div>
      </>
  );
}

const SideNavItem = ({
  href,
  icon,
  label,
  isSidebarOpen,
}: SideNavItemType & { isSidebarOpen: boolean }) => {
  const [animationParent] = useAutoAnimate();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link ref={animationParent} href={href}>
      <div
        className={cn(
          "flex flex-row gap-1 items-center align-middle cursor-pointer",
          !isSidebarOpen && "justify-start"
        )}
      >
        {/* Icon */}
        <div className={cn("text-2xl")}>
          {isSidebarOpen &&  (isActive ? icon.fillicon : icon.icon)}
          {!isSidebarOpen && (<Tooltip title={label} placement="right">{isActive ? icon.fillicon : icon.icon}</Tooltip>)}
        </div>
        {/* label */}
        {isSidebarOpen && (
          <p
            className={cn(
              "hidden md:block  transition-all ",
              isActive && "font-bold"
            )}
          >
            {label}
          </p>
        )}
      </div>
    </Link>
  );
};

const HoverContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="p-2 transition-all rounded-full cursor-pointer hover:bg-gray-200 w-fit dark:hover:bg-zinc-900 group:dark:bg-zinc-900 group-hover:dark:bg-zinc-900 group-hover:bg-gray-200">
      {children}
    </div>
  );
};
