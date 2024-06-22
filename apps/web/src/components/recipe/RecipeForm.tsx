import React, { useRef, useState } from 'react'
import { cn } from '@acme/ui/util'
import { Label } from '@acme/ui/components'
import { Recipe } from '@acme/core'
import MdEditor from 'components/md/MdEditor'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiClient } from 'lib/ApiClient'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { queryRecipe } from 'lib/queries/RecipeQueries'
import EntityManagedTimes from 'components/entity/EntityManagedTimes'

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

  const queryClient = useQueryClient()
  const instructionsRef = useRef<MDXEditorMethods>(null)
  const [recipe, setRecipe] = useState<Partial<Recipe>>(initial)
  const { mutate: updateRecipe } = useMutation({
    mutationFn: () => recipe._id
      ? ApiClient.recipe.updateRecipe.mutate({
        _id: recipe._id,
        title: recipe.title ?? '',
        instructions: instructionsRef.current?.getMarkdown() ?? '',
      })
      : ApiClient.recipe.createRecipe.mutate({
        ...recipe,
        title: recipe.title ?? '',
        instructions: instructionsRef.current?.getMarkdown() ?? '',
      }),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryRecipe(updated._id).queryKey, updated)
      rest.onSuccess?.(updated)
    }
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

        <div className='flex flex-row justify-between tablet:justify-normal gap-2'>
          <EntityManagedTimes className='h-fit w-fit border-divider' entity={recipe} />

          <button
            type='submit'
            className='btn btn-primary'
          >
            {initial._id ? 'Update' : 'Create'}
          </button>
        </div>
      </div>

      {/** TODO: Offer two ways to input this. Simple/quick vs. Markdown */}
      <MdEditor
        ref={instructionsRef}
        markdown={recipe.instructions ?? ''}
      />
    </form>
  )
}