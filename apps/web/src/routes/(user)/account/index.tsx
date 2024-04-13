import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(user)/account/')({
  component: Account
})

function Account() {
  return (
    <div className="h-full container flex flex-col">
      <h1 className='font-bold text-3xl text-primary'>Account</h1>


    </div>
  )
}