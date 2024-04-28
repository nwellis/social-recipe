import { createFileRoute } from '@tanstack/react-router'
import { joinPaths } from '@acme/util'
import { Icon } from '@acme/ui/components'

const gitHubAuthUrl = joinPaths(import.meta.env.VITE_API_URL, 'api/v1/auth/github')

export const Route = createFileRoute('/login')({
  component: Login
})

function Login() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className='font-bold text-3xl text-primary'>Recipes</h1>

      <div className="card bg-neutral text-neutral-content w-96 shadow-xl">
        <div className="card-body flex flex-col gap-2">
          <h2 className="card-title">Login</h2>
          <p>Login with one of the following</p>
          <div className="card-actions justify-center">
            <a href={gitHubAuthUrl} className="btn btn-wide bg-black text-white text-lg">
              <Icon name='GitHub' /> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}