import React from "react";

export type RecipeFormProps = {

} & React.ComponentProps<'form'>

export default function RecipeForm({
  className,
  ...rest
}: RecipeFormProps) {
  return (
    <form
      className={className}
      {...rest}
    >

    </form>
  )
}