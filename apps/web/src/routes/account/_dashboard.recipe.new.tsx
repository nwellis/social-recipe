import { createFileRoute } from '@tanstack/react-router'
import RecipeForm from 'components/recipe/RecipeForm'

export const Route = createFileRoute('/account/_dashboard/recipe/new')({
  component: Recipe
})

function Recipe() {

  return (
    <div className="h-full container flex flex-col gap-8 py-8">
      <RecipeForm />
    </div>
  )
}