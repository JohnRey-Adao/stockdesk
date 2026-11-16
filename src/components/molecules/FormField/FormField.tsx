import { useId } from "react";
import type { ComponentProps } from "react";
import { Input } from "@/components/atoms/Input/Input";
import "./FormField.scss";

interface FormFieldProps extends Omit<ComponentProps<"input">, "id"> {
  label: string;
  error?: string;
  hint?: string;
}

export function FormField({
  label,
  error,
  hint,
  ...inputProps
}: FormFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;
  const message = error ?? hint;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      <Input
        id={id}
        invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {message && (
        <p
          id={messageId}
          className={`form-field__message${error ? " form-field__message--error" : ""}`}
          role={error ? "alert" : undefined}
        >
          {message}
        </p>
      )}
    </div>
  );
}
