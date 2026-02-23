import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
       
        "h-11 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors",
        "placeholder:text-muted-foreground dark:placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
        "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "!text-black dark:!text-white", 
        className
      )}
      {...props}
    />
  )
}

export { Input }
