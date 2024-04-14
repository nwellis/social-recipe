import { Outlet, createFileRoute } from '@tanstack/react-router'
import { isAuthenticatedOrRedirect } from 'lib/Auth'

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: isAuthenticatedOrRedirect,
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div className='h-full grid grid-rows-header-footer'>
      <header className='bg-primary text-white p-4'>Header</header>
      <Outlet />
      <footer className='bg-primary text-white p-4'>Footer</footer>
    </div>
  )
}