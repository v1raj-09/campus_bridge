import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      size: {
        default: "text-xs sm:text-sm md:text-base",
        sm: "text-[11px] sm:text-xs md:text-sm",
        lg: "text-sm sm:text-base md:text-lg",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const Label = React.forwardRef(({ className, size, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ size }), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label };
export default Label;