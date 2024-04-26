import { cn } from '@acme/ui/util'
import { Icon } from '@acme/ui/components';
import { Link, type LinkProps } from '@tanstack/react-router';

export type AddRecipeButtonProps = {
  className?: string
} & Omit<LinkProps, "to">

export default function AddRecipeButton({
  className,
  ...rest
}: AddRecipeButtonProps) {
  return (
    <Link
      to={'/account/new-recipe'}
      className={cn(
        'btn flex flex-col justify-center items-center border border-dashed border-primary text-muted-more',
        className,
      )}
      {...rest}
    >
      <Icon name='Utensils' size='lg' />
      <span>Add Recipe</span>
    </Link>
  )
}