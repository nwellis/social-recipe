import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: LayoutComponent,
})

function LayoutComponent() {

  return (
    <div className='h-full grid grid-rows-header-footer'>
      <header className='w-full border-b border-divider'>
        <div className='container navbar bg-base-100'>
          <div className='flex-1'>
            <a className='btn btn-ghost btn-sm text-xl text-primary'>Recipes</a>
          </div>
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link to='/login' className='btn btn-primary btn-sm'>Sign Up</Link>
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
      <Outlet />
      <footer />
    </div>
  )
}