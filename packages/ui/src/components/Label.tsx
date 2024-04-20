import { cn } from "../util/CSS.js"

export type LabelProps = {
  text?: string
  error?: string
} & React.ComponentProps<'label'>

export function Label({
  text,
  error,

  children,
  className,
  ...rest
}: LabelProps) {
  return (
    <label
      className={cn(
        'form-control',
        className,
      )}
      {...rest}
    >
      {text && (
        <div className='label'>
          <span className='label-text'>{text}</span>
        </div>
      )}
      {children}
      <div className='label min-h-6'>
        <span
          aria-hidden={!error}
          className={cn(
            'label-text',
            error ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-300 ease-in-out',
          )}
        >
          {error}
        </span>
      </div>
    </label>
  )
}
