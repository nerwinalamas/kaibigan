"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Menu = () => {
    const { data, status } = useSession();

    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleLogout = () => {
        router.refresh();
        signOut();
      };

  return (
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
                  handleLogout();
                }}
              >
                Logout
              </CommandItem>
            </CommandGroup>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Menu
