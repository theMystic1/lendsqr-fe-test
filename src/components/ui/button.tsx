import type { ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "primary-outline"
  | "secondary"
  | "outline"
  | "pending"
  | "danger"
  | "danger-outline"
  | "active";

type CustomBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const CustomBtn = ({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: CustomBtnProps) => {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`.trim()}
      {...props}
    />
  );
};

export default CustomBtn;
