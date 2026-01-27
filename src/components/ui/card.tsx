import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

const Card = ({ children, className = "", ...props }: CardProps) => {
  return (
    <div className={`card ${className}`.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
