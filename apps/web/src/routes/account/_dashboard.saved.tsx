import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/_dashboard/saved')({
  component: Saved
})

function Saved() {
  return (
    <div className="h-full container flex flex-col gap-8 py-8">
    </div>
  )
}