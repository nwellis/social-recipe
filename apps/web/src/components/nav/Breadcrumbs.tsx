import React from 'react'
import { cn } from '@acme/ui/util'
import { Link, useRouter } from '@tanstack/react-router';

export type BreadcrumbsProps = {

} & React.ComponentPropsWithoutRef<'div'>

const normalizeFileRouteId = (routeId: string) => {
  return routeId.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

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
      const fileRouteId = match.routeId.split('/').at(-1) ?? ''
      return {
        title: normalizeFileRouteId(fileRouteId),
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
      <ul className='text-base-content'>
        <li aria-hidden />
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.routeId}>
            <Link to={breadcrumb.path} className='font-semibold'>{breadcrumb.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}