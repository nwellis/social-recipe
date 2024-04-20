import React from "react";

export type TemplateProps = {

} & React.ComponentProps<'div'>

export default function Template({
  className,
  ...rest
}: TemplateProps) {
  return (
    <div
      className={className}
      {...rest}
    >

    </div>
  )
}