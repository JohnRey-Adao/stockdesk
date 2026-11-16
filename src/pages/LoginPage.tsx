import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { FormField } from "@/components/molecules/FormField/FormField";
import { loginSchema } from "@/features/auth/loginSchema";
import type { LoginValues } from "@/features/auth/loginSchema";
import { useAuth } from "@/features/auth/useAuth";
import "./LoginPage.scss";

export function LoginPage() {
  const { user, signIn } = useAuth();
  const location = useLocation();
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  const from = (location.state as { from?: string } | null)?.from ?? "/";

  if (user) {
    return <Navigate to={from} replace />;
  }

  async function onSubmit(values: LoginValues) {
    setFormError("");
    try {
      await signIn(values.email, values.password);
    } catch {
      setFormError("Invalid email or password");
    }
  }

  return (
    <main className="login">
      <form
        className="login__card"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className="login__title">Sign in to StockDesk</h1>

        {formError && (
          <p className="login__error" role="alert">
            {formError}
          </p>
        )}

        <FormField
          label="Email"
          type="email"
          autoComplete="username"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>

        <p className="login__hint">
          Demo accounts: admin@stockdesk.test / Admin#1234, staff@stockdesk.test
          / Staff#1234
        </p>
      </form>
    </main>
  );
}
