"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Check } from "lucide-react";
import { ChevronsUpDown } from "lucide-react";
import { GetSubredditsQueryResult } from "@/sanity.types";
import { useRouter } from "next/navigation";

interface SubredditComboboxProps {
  subreddits: GetSubredditsQueryResult;
  defaultValue?: string;
}

export function SubredditCombobox({
  subreddits,
  defaultValue = "",
}: SubredditComboboxProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue); // this should store the slug

  const handleSelect = (slug: string) => {
    setValue(slug);
    setOpen(false);
    if (slug) {
      router.push(`/create-post?subreddit=${slug}`);
    } else {
      router.push(`/create-post`);
    }
  };

  const selectedSubreddit = subreddits.find(
    (subreddit) => subreddit.slug === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedSubreddit?.title || "Select a community"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search community..." />
          <CommandList>
            <CommandEmpty>No subreddit found.</CommandEmpty>
            <CommandGroup>
              {subreddits.map((subreddit) => (
                <CommandItem
                  key={subreddit._id}
                  value={subreddit.slug ?? undefined}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === subreddit.slug ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subreddit.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
