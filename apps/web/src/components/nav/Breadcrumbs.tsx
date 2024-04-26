import React from "react";
import 'app'
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
    .filter(match => match.pathname.split('/').filter(seg => seg && !seg.startsWith('_')).length)
    .map((match) => {
      return {
        title: match.pathname.split('/').at(-1),
        path: match.pathname,
        routeId: match.routeId,
      }
    })
  // console.log(breadcrumbs)
  // console.log(router.state.matches)

  return (
    <div
      className={cn(
        'breadcrumbs',
        className,
      )}
      {...rest}
    >
      <ul>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.routeId}>
            <Link to={breadcrumb.path} className='text-primary'>{breadcrumb.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}