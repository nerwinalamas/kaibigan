"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import CreatePost from "./CreatePost";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { useState } from "react";
import Logout from "./Logout";
import { ModeToggle } from "./Toggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

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
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <div className="flex gap-5">
              <CreatePost />
              <Popover>
                <PopoverTrigger>
                  <Menu />
                </PopoverTrigger>
                <PopoverContent className="w-36 h-36 absolute right-0 top-5">
                  <div className="flex flex-col gap-2">
                    <Command>
                      <CommandGroup>
                        <Link href={`/profile/${data?.user?.email}`}>
                          <CommandItem
                            className="cursor-pointer"
                            onSelect={() => setOpen(false)}
                          >
                            Profile
                          </CommandItem>
                        </Link>
                        <CommandItem
                          className="cursor-pointer"
                          onSelect={() => {
                            setOpen(false);
                            router.refresh();
                          }}
                        >
                          <Logout />
                        </CommandItem>
                      </CommandGroup>
                    </Command>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          <ModeToggle />
        </div>

        <div className="hidden md:flex">
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <div className="flex items-center gap-5">
              <CreatePost />
              <Link href={`/profile/${data?.user?.email}`}>Profile</Link>
              <Logout />
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
