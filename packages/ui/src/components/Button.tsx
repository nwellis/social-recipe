import { cn } from "../util/CSS.js"

export type ButtonProps = {

} & React.ComponentProps<'button'>

export function Button({
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(className)}
      {...rest}
    >
      {children}
    </button>
  )
}