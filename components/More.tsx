"use client";

import { useState } from "react";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import DeletePost from "./DeletePost";
import { useRouter } from "next/navigation";

interface IMore {
  id: string;
}

const More = ({ id }: IMore) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteRefresh = () => { 
    setOpen(false);
    router.refresh();
   }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <MoreHorizontal className="cursor-pointer text-gray-500" />
      </PopoverTrigger>
      <PopoverContent className="w-36 h-36 absolute right-1 top-1">
        <Command>
          <CommandGroup>
            <CommandItem onSelect={() => setOpen(false)}>
              <Link href={`/edit-post/${id}`}>Edit</Link>
            </CommandItem>
            <CommandItem onSelect={handleDeleteRefresh}>
              <DeletePost id={id} />
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default More;
