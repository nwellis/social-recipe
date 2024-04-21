import { AlertDialog, Icon } from '@acme/ui/components'
import { useMutation } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { ApiClient } from 'lib/ApiClient'
import { isAuthenticatedOrRedirect } from 'lib/Auth'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: isAuthenticatedOrRedirect,
  component: LayoutComponent,
})

function LayoutComponent() {

  const { mutate: logout } = useMutation({ mutationFn: ApiClient.auth.deleteSession.mutate })

  return (
    <div className='h-full grid grid-rows-header-footer'>
      <header className='w-full border-b border-divider bg-base-100'>
        <div className='container navbar'>
          <div className='flex-1'>
            <Link to='/' className='btn btn-ghost btn-sm text-xl text-primary'>Recipes</Link>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1 gap-2'>
              <li>
                <Link
                  className='btn btn-ghost btn-sm w-20'
                  to={'/saved'}
                >
                  Saved
                </Link>
              </li>
              <li>
                <button
                  className='btn btn-primary btn-sm w-32'
                  onClick={() => (document.getElementById('_dashboard-logout') as HTMLDialogElement)?.showModal()}
                >
                  <Icon name='Exit' />
                  Logout
                </button>
                <AlertDialog
                  open={false}
                  id='_dashboard-logout'
                  title='Logout'
                  onConfirm={() => logout()}
                  blocking
                >
                  <p className='py-4'>Are you sure you want to logout?</p>
                </AlertDialog>
              </li>
              {/* <li>
                <details>
                  <summary>
                    Parent
                  </summary>
                  <ul className='p-2 bg-base-100 rounded-t-none'>
                    <li><a>Link 1</a></li>
                    <li><a>Link 2</a></li>
                  </ul>
                </details>
              </li> */}
            </ul>
          </div>
        </div>
      </header>
      <div className='overflow-y-auto'>
        <Outlet />
      </div>
      <footer />
    </div>
  )
}