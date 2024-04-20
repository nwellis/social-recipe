import React from 'react'
import { cn } from '@acme/ui/util'
import { Label } from '@acme/ui/components'

export type RecipeFormProps = {

} & React.ComponentProps<'form'>

export default function RecipeForm({
  className,
  ...rest
}: RecipeFormProps) {
  return (
    <form
      className={cn(
        'flex flex-col gap-2',
        className,
      )}
      {...rest}
    >
      <Label
        text='Recipe Name'
      >
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </Label>
    </form>
  )
}