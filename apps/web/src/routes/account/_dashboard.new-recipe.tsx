import { createFileRoute, useRouter } from '@tanstack/react-router'
import RecipeForm from 'components/recipe/RecipeForm'

export const Route = createFileRoute('/account/_dashboard/new-recipe')({
  component: Recipe
})

function Recipe() {
  const router = useRouter()

  return (
    <div className="h-full container flex flex-col gap-8 py-8">
      <RecipeForm onSuccess={(updated) => router.navigate({
        to: '/account/recipe/$recipeId',
        replace: true,
        params: { recipeId: updated._id },
      })} />
    </div>
  )
}