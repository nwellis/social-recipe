import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin } from '@mdxeditor/editor'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { queryRecipe } from 'lib/queries/RecipeQueries'

export const Route = createFileRoute('/account/_dashboard/recipe/edit/$recipeId')({
  component: Recipe,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(queryRecipe(params.recipeId))
  }
})

function Recipe() {

  const recipeId = Route.useParams().recipeId
  const { data: recipe } = useSuspenseQuery(queryRecipe(recipeId))

  return (
    <div className="h-full container flex flex-col gap-8 py-8">
      <MDXEditor
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin()
        ]}
        markdown={recipe.description}
      />
    </div>
  )
}