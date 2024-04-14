import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { querySelf } from 'lib/queries/UserQueries'

export const Route = createFileRoute('/_dashboard/account')({
  component: Account
})

function Account() {

  const { data: self } = useQuery(querySelf)

  return (
    <div className="h-full container flex flex-col gap-8 py-8">
      <p>{self?._id}</p>

      <div className='card flex flex-col bg-white shadow-xl p-4 min-h-64'>
        <h1 className='font-bold text-3xl text-primary'>Your Recipes</h1>
        <div className='flex flex-wrap gap-4 mt-4'>

        </div>

      </div>
      <div className='card flex flex-col bg-white shadow-xl p-4 min-h-64'>
        <h1 className='font-bold text-3xl text-primary'>Saved Recipes</h1>
        <div className='flex flex-wrap gap-4 mt-4'>

        </div>

      </div>


    </div>
  )
}