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
import { useDropzone } from '@acme/ui/hooks'
import { UploadFile } from 'lib/UploadFile'
import { useOrgFileMetadata } from 'hooks/UseOrgFileMetadata'

const initialInstructions = `
# Instructions

1. Step 1
`

export type RecipeFormProps = {
  current?: Partial<Recipe>
  onSuccess?: (updated: Recipe) => void
} & React.ComponentPropsWithoutRef<'form'>

export default function RecipeForm({
  current = {
    title: '',
    instructions: initialInstructions,
  },
  className,
  ...rest
}: RecipeFormProps) {

  const queryClient = useQueryClient()
  const instructionsRef = useRef<MDXEditorMethods>(null)

  const [pending, setPending] = useState<Partial<Recipe>>(current)
  const { mutate: updateRecipe } = useMutation({
    mutationFn: (updates: Partial<Recipe>) => current._id
      ? ApiClient.recipe.updateRecipe.mutate({
        _id: current._id,
        instructions: instructionsRef.current?.getMarkdown() ?? '',
        ...updates,
      })
      : ApiClient.recipe.createRecipe.mutate({
        title: updates.title ?? '',
        instructions: instructionsRef.current?.getMarkdown() ?? '',
        publishedAt: updates.publishedAt,
      }),
    onSuccess: (updated) => {
      setPending(updated)
      queryClient.setQueryData(queryRecipe(updated._id).queryKey, updated)
      rest.onSuccess?.(updated)
    }
  })

  const imageMetadata = Object.values(useOrgFileMetadata(pending.imageIds || []))

  const { mutate: uploadFile } = useMutation({
    mutationFn: UploadFile.uploadOrgFile,
    onSuccess: ([_file, metadata]) => {
      updateRecipe({
        imageIds: (pending.imageIds ?? []).concat(metadata._id),
      })
    },
  })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop: ([file]) => {
      uploadFile(UploadFile.decorateFile(file, {
        _id: window.crypto.randomUUID(),
        previewUri: URL.createObjectURL(file),
        uploading: true,
        error: undefined,
      }))
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
        updateRecipe(pending)
      }}
      {...rest}
    >
      <div className='flex flex-col-reverse sm:flex-row justify-between gap-2'>
        <div className='flex flex-col gap-2'>
          <Label text='Recipe Name'>
            <input
              type='text'
              placeholder='Give this recipe a name'
              className='input input-bordered w-full max-w-sm'
              value={pending.title}
              onChange={e => setPending({ ...pending, title: e.target.value })}
            />
          </Label>
          {/* <div className="w-fit form-control">
            <label className="cursor-pointer label flex gap-2">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={Boolean(pending.publishedAt)}
                onChange={() => setPending({
                  ...pending,
                  publishedAt: pending.publishedAt ? 0 : Date.now()
                })}
              />
              <span className="label-text">Publish</span>
            </label>
          </div> */}
        </div>

        <div className='tablet:flex-1' />

        <div className='tablet:w-60 flex flex-col gap-2'>
          <div className='w-full flex flex-row gap-4'>
            <button
              type='submit'
              className='flex-1 btn btn-primary'
            >
              {current._id ? 'Update' : 'Create'}
            </button>
            <button
              type='button'
              disabled={!current._id}
              className={cn(
                'btn btn-outline',
                current.publishedAt ? 'btn-success' : 'btn-error'
              )}
              onClick={() => updateRecipe({
                publishedAt: current.publishedAt ? 0 : Date.now()
              })}
            >
              {current.publishedAt ? 'Published' : 'Publish'}
            </button>
          </div>

          <EntityManagedTimes className='h-fit w-fit' entity={pending} />
        </div>
      </div>

      <div className='grid grid-cols-1 tablet:grid-cols-2 gap-4'>
        {imageMetadata.map(metadata => (
          <div key={metadata._id} className='relative'>
            <img
              className='rounded-xl'
              src={metadata.url}
            />
          </div>
        ))}
        <div
          className={cn(
            'py-8 px-4 flex flex-col gap-2 justify-center items-center text-lg',
            'border border-dashed border-neutral-content rounded-xl',
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className='text-xl font-semibold'>Cover Photo</p>
          {
            isDragActive ?
              <p>Drop an image here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>
      </div>

      {/** TODO: Offer two ways to input this. Simple/quick vs. Markdown */}
      <MdEditor
        ref={instructionsRef}
        markdown={pending.instructions ?? ''}
      />

      <pre>
        {JSON.stringify(current, null, 2)}
      </pre>
    </form>
  )
}