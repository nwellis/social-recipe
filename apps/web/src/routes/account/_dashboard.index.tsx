import { AlertDialog, Icon } from '@acme/ui/components'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import AddRecipeButton from 'components/recipe/AddRecipeButton'
import { ApiClient } from 'lib/ApiClient'
import { querySelf } from 'lib/queries/UserQueries'

export const Route = createFileRoute('/account/_dashboard/')({
  component: Account
})

function Account() {

  const navigate = useNavigate()
  const { data: self } = useQuery(querySelf)
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
          className='btn btn-primary btn-sm w-32'
          onClick={() => (document.getElementById('_dashboard-logout') as HTMLDialogElement)?.showModal()}
        >
          <Icon name='Exit' />
          Logout
        </button>
      </div>

      <div className='card flex flex-col bg-white shadow-xl p-4 min-h-64 gap-4'>
        <h1 className='font-bold text-3xl text-primary'>Your Recipes</h1>
        <div className='flex-1 flex flex-wrap gap-4'>
          <AddRecipeButton className='h-full text-xl' />
        </div>

      </div>

      <div className='card flex flex-col bg-white shadow-xl p-4 min-h-64 gap-4'>
        <h1 className='font-bold text-3xl text-primary'>Saved Recipes</h1>
        <div className='flex-1 flex flex-wrap gap-4'>

        </div>

      </div>


    </div>
  )
}