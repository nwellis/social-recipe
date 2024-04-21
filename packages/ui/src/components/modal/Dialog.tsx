import React from "react";
import { cn } from '@acme/ui/util'

export type DialogProps = {
  blocking?: boolean
} & React.ComponentProps<'dialog'>

export function Dialog({
  blocking,
  className,
  children,
  ...rest
}: DialogProps) {
  return (
    <dialog
      className='modal modal-bottom sm:modal-middle'
      {...rest}
    >
      <div
        className={cn(
          'modal-box w-11/12 max-w-5xl',
          className,
        )}
      >
        {children}
      </div>
      {!blocking && (
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      )}
    </dialog>
  )
}