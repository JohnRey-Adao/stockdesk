import type { ComponentProps } from "react";
import "./Input.scss";

interface InputProps extends ComponentProps<"input"> {
  invalid?: boolean;
}

export function Input({
  invalid = false,
  className = "",
  ...rest
}: InputProps) {
  const classes = ["input", invalid ? "input--invalid" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <input className={classes} aria-invalid={invalid || undefined} {...rest} />
  );
}
