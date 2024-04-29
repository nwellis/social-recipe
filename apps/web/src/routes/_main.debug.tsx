import { useQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { querySession } from 'lib/queries/AuthQueries'
import { querySelf } from 'lib/queries/UserQueries'

export const Route = createFileRoute('/_main/debug')({
  component: () => Home,
})

function Home() {

  const navigate = useNavigate()
  if (import.meta.env.MODE !== 'development') {
    navigate({ to: '/', replace: true })
  }

  const { data: user, error } = useQuery(querySelf)
  const { data: session } = useQuery(querySession)

  return (
    <div className="container p-2">
      <h3>Env</h3>
      <pre className='w-fit bg-black font-semibold text-white rounded-lg p-2'>{JSON.stringify(import.meta.env, null, 2)}</pre>
      <h3>Session</h3>
      <pre className='w-fit bg-black font-semibold text-white rounded-lg p-2'>{JSON.stringify(session || user, null, 2)}</pre>
      <h3>User</h3>
      <pre className='w-fit bg-black font-semibold text-white rounded-lg p-2'>{JSON.stringify(error || user, null, 2)}</pre>
    </div>
  )
}