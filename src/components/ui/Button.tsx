import React from "react";

import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      {...props}
      className={cn(
        `bg-gray-900 rounded-[8px] p-[10px] text-white hover:bg-gray-800 transition-all
        ease-in font-semibold flex items-center justify-center disabled:bg-gray-700`,
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};