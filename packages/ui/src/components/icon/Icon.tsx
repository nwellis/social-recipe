import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { AppFontAwesomeIcons } from "./Icon.data.js";
import { forwardRef } from 'react';

export type IconProps = {
  name: keyof typeof AppFontAwesomeIcons
} & Pick<FontAwesomeIconProps, "className" | "size">

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  function Icon({
    name,
    ...rest
  }: IconProps, ref) {
    return (
      <FontAwesomeIcon
        icon={AppFontAwesomeIcons[name]}
        {...rest}
        ref={ref}
      />
    )
  }
)