import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(public)/login')({
  component: Login
})

function Login() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className='font-bold text-3xl text-primary'>Recipes</h1>

      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body flex flex-col gap-2">
          <h2 className="card-title">Login</h2>
          <p>Login with one of the following</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary btn-wide">
              Login with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}