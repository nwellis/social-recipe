import React, { useState } from 'react'
import { cn } from '@acme/ui/util'
import { Label } from '@acme/ui/components'
import { Recipe } from '@acme/core'
import MdEditor from 'components/md/MdEditor'

export type RecipeFormProps = {
  initial?: Partial<Recipe>
} & React.ComponentProps<'form'>

export default function RecipeForm({
  initial = {},
  className,
  ...rest
}: RecipeFormProps) {

  const [recipe, setRecipe] = useState<Partial<Recipe>>(initial)

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
        <input
          type='text'
          placeholder='Give this recipe a name'
          className={cn(
            'input input-bordered w-full max-w-xs',

          )}
          value={recipe.title}
          onChange={e => setRecipe({ ...recipe, title: e.target.value })}
        />
      </Label>

      <MdEditor
        className=' rounded-xl input-bordered'
        markdown={'# Hello World\n- List Item 1\n- List Item 2\n## Subheading\n'}
      />
    </form>
  )
}