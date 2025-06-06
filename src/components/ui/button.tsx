import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#F5821D] text-white hover:bg-[#F5821D]/90",
        destructive:
          "bg-[#F5821D] text-white hover:bg-[#F5821D]/90",
        outline:
          "border border-input bg-background hover:bg-[#0BDEC2] hover:text-black",
        secondary:
          "bg-[#CE97E8] text-white hover:bg-[#CE97E8]/80",
        accent:
          "bg-[#0BDEC2] text-black hover:bg-[#0BDEC2]/80",
        yellow:
          "bg-[#EDD224] text-black hover:bg-[#EDD224]/80",
        ghost: "hover:bg-[#0BDEC2]/10 hover:text-[#0BDEC2]",
        link: "text-[#F5821D] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
