import React, { useState } from 'react'
import { cn } from '@acme/ui/util'
import { Label } from '@acme/ui/components'
import { Recipe } from '@acme/core'
import { MDXEditor, headingsPlugin, listsPlugin } from '@mdxeditor/editor'

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

      <MDXEditor
        plugins={[
          listsPlugin(),
          headingsPlugin(),
        ]}
        markdown='MARKDOWN'
      />
    </form>
  )
}