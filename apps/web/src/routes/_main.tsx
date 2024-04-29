import { Icon } from '@acme/ui/components'
import { useQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { querySession } from 'lib/queries/AuthQueries'

export const Route = createFileRoute('/_main')({
  component: LayoutComponent,
})

function LayoutComponent() {

  const { data: session, isPending: isLoadingSession } = useQuery(querySession)

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
                  to={session ? '/account/saved' : '/login'}
                  search={session ? undefined : { redirect: '/saved' }}
                >
                  Saved
                </Link>
              </li>
              <li>
                {isLoadingSession ? (
                  <div className='btn btn-sm skeleton w-32' />
                ) : (
                  <Link
                    className='btn btn-primary btn-sm w-32 flex gap-1'
                    to={session ? '/account' : '/login'}
                  >
                    <Icon name='User' />
                    {session ? 'Profile' : 'Sign Up'}
                  </Link>
                )}
              </li>
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