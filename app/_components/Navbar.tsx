"use client";

import { ModeToggle } from "@/components/toggle";
import { Menu } from "lucide-react";
import Link from "next/link";
import CreatePost from "./CreatePost";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data, status } = useSession();
  const router = useRouter()

  // console.log("data: ", data);
  // console.log("status: ", status);

  const handleLogout = () => { 
    router.back();
    signOut();
   }

  return (
    <div>
      <div className=" h-20 py-3 px-5 flex justify-between items-center md:px-20 lg:px-40">
        {/* LOGO */}
        <div>
          <Link href="/">
            <h1 className="text-2xl font-bold">Kaibigan</h1>
          </Link>
        </div>

        {/* TOGGLE */}
        <div className="flex items-center gap-5 md:hidden relative">
          <CreatePost />

          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Menu />
              </PopoverTrigger>
              <PopoverContent className="w-36 h-36 absolute right-0 top-5">
                <div className="flex flex-col gap-2">
                  <Link href="/profile">Profile</Link>
                  <p
                    className="cursor-pointer"
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => handleLogout()}
                  >
                    Logout
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          )}

          <ModeToggle />
        </div>

        <div className="hidden md:flex">
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <div className="flex items-center gap-5">
              <CreatePost />
              <Link href="/profile">Profile</Link>
              <p className="cursor-pointer" onClick={(e: React.MouseEvent<HTMLInputElement>) => signOut()}>Logout</p>
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
