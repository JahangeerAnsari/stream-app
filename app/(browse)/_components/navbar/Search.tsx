"use client";

import { Button } from "@/components/ui/button";
// every thing insdide render search will be client comp
// but if we use {children} we can also render the server comp\
import qs from "query-string";
import { Input } from "@/components/ui/input";
import { SearchIcon,X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const handleSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          term: value,
        },
      },
      { skipEmptyString: true }
    );
    //localhost:3000?term=value
    router.push(url);
    };
    // clear search box when user click the icon
    const handleClear = () => {
        setValue("")
    }
  return (
    <form
      onSubmit={handleSearchForm}
      className="relative w-full lg:w-[400px] flex items-center outline-none"
    >
      <Input
        value={value}
        placeholder="Search"
        onChange={(e) => setValue(e.target.value)}
        className="rounded-r-none"
      />
          {value && <X className="absolute top-2.5 right-14 hover: w-5 text-muted-foreground cursor-pointer
          hover:opacity-75 transition"
           onClick={handleClear}
          />}
      <Button
        type="submit"
        size="sm"
        variant="secondary"
        className="rounded-l-none"
      >
        <SearchIcon className="text-muted-foreground h-5 w-5 text-black" />
      </Button>
    </form>
  );
};

// server comp
// export const Search = () => {
//   return <div>{children}</div>;
// };
