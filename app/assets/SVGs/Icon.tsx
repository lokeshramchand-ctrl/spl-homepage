import * as React from "react";

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

export function Icon({
  size = 24,
  children,
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}
