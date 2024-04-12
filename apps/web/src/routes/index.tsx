import { useQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getSelf } from '../lib/api/UserApi'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  const { data: user, error } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    staleTime: Infinity,
    retry: false,
  })

  return (
    <div className="p-2">
      <h3>Welcome Directory</h3>
      <pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
      <Link to='/login'>Login</Link>
      <pre>{JSON.stringify(error || user, null, 2)}</pre>
    </div>
  )
}