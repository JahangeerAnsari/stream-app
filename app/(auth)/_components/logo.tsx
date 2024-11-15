import { cn } from "@/lib/utils"
import Image from "next/image"
import {Poppins} from 'next/font/google'

const font = Poppins({
    subsets: ['latin'],
    weight:['200','300','400','500','600','700','800']
})
export const Logo = () => {
    return (
      <div className="flex flex-col items-center gsp-y-4">
        <div className="bg-white rounded-full p-1">
          <Image src="/angry.png" width="50" height="50" alt="angry" />
        </div>
        <div className={cn("flex flex-col items-center", font.className)}>
          <p className="text-xl font-semibold">Stream App</p>
          <p className="text-sm text-muted-foreground">Let&apos;s play</p>
        </div>
      </div>
    );
  }