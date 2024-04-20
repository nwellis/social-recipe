import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { ApiClient } from '../lib/ApiClient'

export const Route = createFileRoute('/_main/')({
  component: Home,
})

function Home() {

  const { data: user, error } = useQuery({
    queryKey: ['self'],
    queryFn: () => ApiClient.user.getSelf.query(),
    staleTime: Infinity,
    retry: false,
  })

  return (
    <div className="container p-2">
      <h3>Env</h3>
      <pre className='w-fit bg-black font-semibold text-white rounded-lg p-2'>{JSON.stringify(import.meta.env, null, 2)}</pre>
      <h3>Session</h3>
      <pre className='w-fit bg-black font-semibold text-white rounded-lg p-2'>{JSON.stringify(error || user, null, 2)}</pre>
    </div>
  )
}