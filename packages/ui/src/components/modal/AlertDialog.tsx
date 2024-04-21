import { cn } from '@acme/ui/util'
import { Dialog, DialogProps } from './Dialog.js';

export type AlertDialogProps = {
  title: string
  description?: string
  confirmText?: string
  onConfirm?: () => void
} & DialogProps

export function AlertDialog({
  title,
  description,
  confirmText = "OK",

  className,
  children,
  ...rest
}: AlertDialogProps) {
  return (
    <Dialog
      className={cn(
        className,
      )}
      {...rest}
    >
      <h3 className='text-xl font-bold'>{title}</h3>
      {children}
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
          <button className="btn btn-primary">{confirmText}</button>
        </form>
      </div>
    </Dialog>
  )
}