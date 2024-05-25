import React from "react";

import { cn } from "../../lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = props => {
  return (
    <input
      {...props}
      className={cn(
        `px-[15px] py-[10px] rounded-[10px] bg-gray-100 border-transparent
        border-[2px] transition-all ease-in-out placeholder:text-gray-400 
        focus:border-[2px] focus:border-blue-400`,
        props.className,
      )}
    />
  );
};
