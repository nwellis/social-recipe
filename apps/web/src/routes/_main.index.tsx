import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  component: Home,
})

function Home() {



  return (
    <div className="container py-4 sm:py-8 flex flex-col gap-4">
      <h1 className='font-bold text-3xl'>Discover new recipes <span className='text-primary'>with ease</span></h1>
      <p className='text-lg'>Easily find your next recipe with <span className='text-primary'>no advertisements</span>. No life story, just a recipe and simple instructions.</p>
      <hr />
    </div>
  )
}