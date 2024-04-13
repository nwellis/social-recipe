import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/account/_layout')({
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