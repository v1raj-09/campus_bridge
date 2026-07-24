import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      // Default mobile size (e.g., h-8 w-8), scaling up on larger screens (sm:h-10 sm:w-10, md:h-12 md:w-12)
      "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10 md:h-12 md:w-12",
      className
    )}
    {...props} 
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props} 
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      // Responsive text sizing inside the fallback to match the scaling avatar
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium sm:text-sm md:text-base",
      className
    )}
    {...props} 
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }