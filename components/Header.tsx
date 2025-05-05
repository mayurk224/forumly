"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";
import { MenuIcon } from "lucide-react";

const Header = () => {
  const { user } = useUser();
  return (
    <header className="flex items-center justify-between p-3 border-b">
      <div className="left flex items-center gap-2">
        <MenuIcon className="block md:hidden w-6 h-6" />
        <Image
          src="/images/brandFullLogo.png"
          alt="Brand Logo"
          width={200}
          height={50}
          className="hidden md:block"
        />
        <Image
          src="/images/brandlogo.png"
          alt="Brand Name"
          width={40}
          height={40}
          className="block md:hidden"
        />
      </div>
      <div className="right">
        <SignedIn>
          <UserButton />
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
