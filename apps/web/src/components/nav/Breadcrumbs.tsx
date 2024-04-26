import React from 'react'
import { cn } from '@acme/ui/util'
import { Link, useRouter } from '@tanstack/react-router';

export type BreadcrumbsProps = {

} & React.ComponentProps<'div'>

export default function Breadcrumbs({
  className,
  ...rest
}: BreadcrumbsProps) {

  const router = useRouter()

  const breadcrumbs = router.state.matches
    .filter(match => {
      const fileRouteId = match.routeId.split('/').at(-1) ?? ''
      return fileRouteId.length > 0 && !fileRouteId.startsWith('_')
    })
    .map((match) => {
      return {
        title: match.pathname.split('/').at(-1),
        path: match.pathname,
        routeId: match.routeId,
      }
    })

  return (
    <div
      className={cn(
        'breadcrumbs',
        className,
      )}
      {...rest}
    >
      <ul>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.routeId}>
            <Link to={breadcrumb.path} className='text-primary'>{breadcrumb.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}