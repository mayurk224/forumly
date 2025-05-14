"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";

const Header = () => {
  // const { user } = useUser();
  const { toggleSidebar, open = false, isMobile } = useSidebar();
  // const isBanned = user?.publicMetadata["IS_BANNED"] as boolean;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className=" focus:outline-none"
          aria-label={open ? "Close Sidebar" : "Open Sidebar"}
        >
          {open && !isMobile ? (
            <ChevronLeftIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>  

        {/* Desktop Logo */}
        <Image
          src="/images/brandFullLogo.png"
          alt="Brand Icon"
          width={150}
          height={60}
          className={open ? "hidden" : "block md:block"}

        />       

        {/* Mobile Logo */}
        <Image
          src="/images/brandlogo.png"
          alt="Brand Icon"
          width={40}
          height={40}
          className="block md:hidden"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <Button asChild variant="outline">
            <SignInButton mode="modal" />
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
