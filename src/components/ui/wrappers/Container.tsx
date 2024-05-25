import React from "react";

export const Container = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="w-[1000px] m-auto">{children}</div>
  );
};