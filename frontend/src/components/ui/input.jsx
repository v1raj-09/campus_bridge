import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Responsive sizing: optimized touch target on mobile, refined sizing on desktop
        "flex w-full rounded-md border border-input bg-transparent shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        // Height, padding, and text sizing scaling per breakpoint
        "h-9 px-3 py-1 text-sm sm:h-10 sm:px-3.5 sm:py-1.5 sm:text-base md:h-11 md:px-4 md:py-2",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }