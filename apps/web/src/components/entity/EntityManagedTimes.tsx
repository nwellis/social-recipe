import React from "react";
import { cn } from '@acme/ui/util'
import { ServerEntityManaged } from '@acme/core';
import { dayjs } from '@acme/util';

export type EntityControlsProps = {
  entity: Partial<ServerEntityManaged> & {
    updatedAt?: number
    publishedAt?: number
  }
} & React.ComponentPropsWithoutRef<'table'>

export default function EntityControls({
  entity = {},

  className,
  ...rest
}: EntityControlsProps) {
  const { createdAt, updatedAt, publishedAt } = entity

  return (
    <table
      className={cn(
        'table table-xs',
        className,
      )}
      {...rest}
    >
      <tbody>
        {typeof createdAt === 'number' && (
          <tr>
            <td>Created</td>
            <td>{createdAt > 0 ? dayjs(createdAt).format('MMM D, YYYY') : 'Pending'}</td>
          </tr>
        )}
        {typeof updatedAt === 'number' && updatedAt > 0 && (
          <tr>
            <td>Updated</td>
            <td>{dayjs(updatedAt).format('MMM D, YYYY')}</td>
          </tr>
        )}
        {typeof publishedAt === 'number' && (
          <tr>
            <td>Published</td>
            <td>{publishedAt <= 0 ? 'Unpublished' : dayjs(publishedAt).format('MMM D, YYYY')}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}