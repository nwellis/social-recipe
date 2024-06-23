import { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { queryInfinitePublishedRecipes } from 'lib/queries/RecipeQueries'
import { useDebounceValue } from '@acme/ui/hooks'
import { cn } from '@acme/ui/util'
import { Icon } from '@acme/ui/components'

export const Route = createFileRoute('/_main/')({
  component: Home,
})

function Home() {

  const [search, setSearch] = useState("")
  const [debouncedSearch] = useDebounceValue(search, 600)
  const {
    isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, data: results,
  } = useInfiniteQuery(queryInfinitePublishedRecipes({ search: debouncedSearch }))

  return (
    <div className="container py-4 sm:py-8 flex flex-col gap-4">
      <h1 className='font-bold text-3xl'>Discover new recipes <span className='text-primary'>with ease</span></h1>
      <p className='text-lg'>Easily find your next recipe with <span className='text-primary'>no advertisements</span>. No life story, just a recipe and simple instructions.</p>
      <hr /><label className="input input-bordered flex items-center gap-2 max-w-xs">
        <Icon name="MagnifyingGlass" />
        <input
          type="text"
          className="grow"
          placeholder="Search all recipes…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </label>
      <hr />
      <ul className="flex flex-col items-center self-stretch text-sm">
        {results?.pages.flatMap(page => page.entities).map(recipe => {
          return (
            <li key={recipe._id} className="w-full border-b-[1px] border-neutral-mgray xl:py-2">
              {recipe.title}
            </li>
          )
        })}
        {/* {isFetching && (
          <li>
            <Spinner className="text-4xl text-primary-700 my-4" />
          </li>
        )} */}
        <button
          type="button"
          disabled={!hasNextPage || isFetching || isFetchingNextPage}
          className={cn(
            "text-lg btn btn-primary my-4",
            "transition-opacity duration-300 ease-in-out",
            (isFetching || isFetchingNextPage) ? "opacity-0" : "opacity-100",
          )}
          onClick={() => fetchNextPage()}
        >
          Load More
        </button>
      </ul>
    </div>
  )
}