import { cn } from '@acme/ui/util'
import { Icon } from '@acme/ui/components';
import { Recipe } from '@acme/core';

export type RecipePreviewProps = {
  recipe: Recipe
  className?: string
} & React.ComponentPropsWithoutRef<'div'>

export default function RecipePreview({
  recipe,

  className,
  ...rest
}: RecipePreviewProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center',
        className,
      )}
      {...rest}
    >
      <Icon name='Utensils' size='lg' />
      <h3>{recipe.title}</h3>
    </div>
  )
}