import { Icon } from '@acme/ui/components'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import Breadcrumbs from 'components/nav/Breadcrumbs'
import { isAuthenticatedOrRedirect } from 'lib/Auth'

export const Route = createFileRoute('/account/_dashboard')({
  beforeLoad: isAuthenticatedOrRedirect,
  component: LayoutComponent,
})

function LayoutComponent() {

  return (
    <div className='h-full grid grid-rows-header-footer'>

      <header className='w-full border-b border-divider bg-base-100'>
        <div className='container navbar'>
          <div className='flex-1 flex gap-2'>
            <Link to='/' className='btn btn-ghost btn-sm text-xl text-primary'>Recipes</Link>
            <Breadcrumbs />
          </div>

          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1 gap-2'>
              <li>
                <Link
                  className='btn btn-ghost btn-sm w-20'
                  to={'/account/saved'}
                >
                  Saved
                </Link>
              </li>
              <li>
                <Link
                  className='btn btn-primary btn-sm w-32 flex gap-2'
                  to={'/account'}
                >
                  <Icon name='User' />
                  <span>Profile</span>
                </Link>
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