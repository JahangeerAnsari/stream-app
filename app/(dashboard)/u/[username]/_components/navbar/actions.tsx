import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { currentUser, } from "@clerk/nextjs/server";
import { Clapperboard, LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// this is our server componets
export const Actions = async () => {
  const user = await currentUser();
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
        <Link href="/">
          <LogOut className="h-5 w-5 mr-2" />
          Exit
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/"/>
     </div>
  );
};
