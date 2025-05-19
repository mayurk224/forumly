"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { ChevronLeftIcon, MenuIcon } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import CreatePost from "../post/CreatePost";
import Link from "next/link";
import { ModeToggle } from "../ModeToggle";

const Header = () => {
  // const { user } = useUser();
  const { toggleSidebar, open = false, isMobile } = useSidebar();
  // const isBanned = user?.publicMetadata["IS_BANNED"] as boolean;

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-[#171717]">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSidebar}
          className="focus:outline-none"
          aria-label={open ? "Close Sidebar" : "Open Sidebar"}
        >
          {open && !isMobile ? (
            <ChevronLeftIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>

        {/* Desktop Logo (hide if sidebar is open on desktop) */}
        <Link href="/" className="hidden md:block">
          {!open && (
            <Image
              src="/images/brandFullLogo.png"
              alt="Forumly Full Logo"
              width={150}
              height={60}
              priority
            />
          )}
        </Link>

        {/* Mobile Logo (always shown on mobile) */}
        <Link href="/" className="block md:hidden">
          <Image
            src="/images/brandlogo.png"
            alt="Forumly Logo"
            width={40}
            height={40}
            priority
          />
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <ModeToggle />
        <CreatePost />
        <SignedIn>
          <UserButton signInUrl="/" />
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
