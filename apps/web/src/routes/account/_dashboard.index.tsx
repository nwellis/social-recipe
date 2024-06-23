import { AlertDialog, Icon } from '@acme/ui/components'
import { numberRange } from '@acme/util'
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'
import AddRecipeButton from 'components/recipe/AddRecipeButton'
import RecipePreview from 'components/recipe/RecipePreview'
import { ApiClient } from 'lib/ApiClient'
import { queryOrgRecipes } from 'lib/queries/RecipeQueries'
import { querySelf } from 'lib/queries/UserQueries'

export const Route = createFileRoute('/account/_dashboard/')({
  component: Account
})

function Account() {

  const navigate = useNavigate()
  const { data: self } = useSuspenseQuery(querySelf)
  const { data: recipes = [], isPending: isPendingRecipes } = useQuery(queryOrgRecipes(self.organization._id))
  const { mutate: logout } = useMutation({
    mutationFn: ApiClient.auth.deleteSession.mutate,
    onSettled: () => navigate({ to: '/login', replace: true }),
  })

  return (
    <div className="h-full container flex flex-col gap-8 py-8">

      <AlertDialog
        id='_dashboard-logout'
        title='Logout'
        onConfirm={() => logout()}
      >
        <p className='py-4'>Are you sure you want to logout?</p>
      </AlertDialog>

      <div className='flex gap-4 justify-between'>
        <p className='font-semibold text-lg'>{self?.email || self?._id}</p>

        <button
          className='btn btn-accent w-32'
          onClick={() => (document.getElementById('_dashboard-logout') as HTMLDialogElement)?.showModal()}
        >
          <Icon name='Exit' />
          Logout
        </button>
      </div>

      <div className='flex flex-col min-h-64 gap-4'>
        <h1 className='font-bold text-3xl text-primary'>Your Recipes</h1>
        <div className='flex-1 flex flex-wrap gap-4'>
          <AddRecipeButton className='h-full text-xl' />
          {recipes.map(recipe => (
            <Link
              className='h-full flex flex-col justify-center btn btn-ghost text-lg'
              to='/account/recipe/$recipeId'
              params={{ recipeId: recipe._id }}
            >
              <RecipePreview key={recipe._id} recipe={recipe} />
            </Link>
          ))}
          {isPendingRecipes && numberRange(3).map(i => (
            <div key={i} className='w-64 h-64 bg-base-200 rounded-lg animate-pulse' />
          ))}
        </div>
      </div>

      <div className='flex flex-col min-h-64 gap-4'>
        <h1 className='font-bold text-3xl text-primary'>Saved Recipes</h1>
        <div className='flex-1 flex flex-wrap gap-4'>

        </div>

      </div>


    </div>
  )
}