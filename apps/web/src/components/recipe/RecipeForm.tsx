import React, { useRef, useState } from 'react'
import { cn } from '@acme/ui/util'
import { Label } from '@acme/ui/components'
import { Recipe } from '@acme/core'
import MdEditor from 'components/md/MdEditor'
import { useMutation } from '@tanstack/react-query'
import { ApiClient } from 'lib/ApiClient'
import { MDXEditorMethods } from '@mdxeditor/editor'

const initialInstructions = `
# Instructions

1. Step 1
`

export type RecipeFormProps = {
  initial?: Partial<Recipe>
  onSuccess?: (updated: Recipe) => void
} & React.ComponentPropsWithoutRef<'form'>

export default function RecipeForm({
  initial = {
    title: '',
    instructions: initialInstructions,
  },
  className,
  ...rest
}: RecipeFormProps) {

  const instructionsRef = useRef<MDXEditorMethods>(null)
  const [recipe, setRecipe] = useState<Partial<Recipe>>(initial)
  const { mutate: updateRecipe } = useMutation({
    mutationFn: () => ApiClient.recipe.createRecipe.mutate({
      ...recipe,
      instructions: instructionsRef.current?.getMarkdown() ?? '',
    }),
    onSuccess: rest.onSuccess
  })

  return (
    <form
      className={cn(
        'flex flex-col gap-2 max-w-screen-lg',
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault()
        updateRecipe()
      }}
      {...rest}
    >
      <div className='flex flex-col-reverse sm:flex-row justify-between gap-2'>
        <Label
          text='Recipe Name'
        >
          <input
            type='text'
            placeholder='Give this recipe a name'
            className='input input-bordered w-full max-w-xs'
            value={recipe.title}
            onChange={e => setRecipe({ ...recipe, title: e.target.value })}
          />
        </Label>

        <button
          type='submit'
          className='btn btn-primary'
        >
          {initial._id ? 'Update' : 'Create'}
        </button>
      </div>

      {/** TODO: Offer two ways to input this. Simple/quick vs. Markdown */}
      <MdEditor
        ref={instructionsRef}
        markdown={recipe.instructions ?? ''}
      />
    </form>
  )
}