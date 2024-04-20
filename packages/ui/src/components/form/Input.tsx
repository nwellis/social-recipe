import { cn } from "../../util/CSS.js"

export type InputProps = {
  text?: string
  color?: 'primary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
} & React.ComponentProps<'input'>

export function Input({
  text,
  color,

  children,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      className={cn(
        'input',
        color === 'primary' && 'input-primary',
        color === 'accent' && 'input-accent',
        color === 'info' && 'input-info',
        color === 'success' && 'input-success',
        color === 'warning' && 'input-warning',
        color === 'error' && 'input-error',
        className,
      )}
      {...rest}
    />
  )
}
