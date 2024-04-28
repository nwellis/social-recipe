import React from "react";
import { cn } from '@acme/ui/util'

export type TemplateProps = {

} & React.ComponentPropsWithoutRef<'div'>

export function Template({
  className,
  ...rest
}: TemplateProps) {
  return (
    <div
      className={cn(
        '',
        className,
      )}
      {...rest}
    >

    </div>
  )
}