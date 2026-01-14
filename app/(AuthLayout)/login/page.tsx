"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schemas/auth.schema";
import { useUserLogin } from "@/hooks/auth.hook";
import { useUser } from "@/context/user.provider";
import { USER_ROLES } from "@/constant";

type TLoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUser } = useUser();

  const router = useRouter();

  const {
    mutate: loginUser,
    data: userData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useUserLogin();

  const { handleSubmit, control } = useForm<TLoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: TLoginFormData) => {
    loginUser({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess && userData?.data) {
      setUser(userData.data);

      if (userData.data.role === USER_ROLES.ADMIN) {
        router.push("/admin/dashboard");
      } else if (userData.data.role === USER_ROLES.USER) {
        router.push("/user/my-library");
      }
    }
  }, [isSuccess, userData, setUser, router]);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-[87vh] w-full gap-8">
        <div className="text-center">
          <h3 className="text-xl font-medium text-muted-foreground font-serif">
            Welcome back to BookWorm
          </h3>
          <h1 className="text-3xl font-semibold mt-1.5 mb-2 font-serif">
            Sign In your account
          </h1>
          <p className="font-medium text-muted-foreground font-sans">
            To use BookWorm, Please enter your details.
          </p>
        </div>
        <div className="w-full max-w-md border rounded-lg p-6 bg-card">
          {isError && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircleIcon />
              <AlertTitle>Unable to sing in.</AlertTitle>
              <AlertDescription>
                <p>{error?.message}</p>
              </AlertDescription>
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email *</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Password *</FieldLabel>

                    {/* Wrapper for input + icon */}
                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        className="pr-10"
                      />

                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute top-1/2 -translate-y-1/2 right-3 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={
                          isPasswordVisible ? "Hide password" : "Show password"
                        }
                      >
                        {isPasswordVisible ? (
                          <FaEyeSlash className="h-4 w-4" />
                        ) : (
                          <FaEye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <div className="flex items-center justify-between">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FieldSet>
                      <Field
                        className="w-fit"
                        orientation="horizontal"
                        data-invalid={fieldState.invalid}
                      >
                        <Checkbox
                          id="remember-checkbox"
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                          className="cursor-pointer"
                        />
                        <FieldLabel htmlFor={`remember-checkbox`} className="">
                          Remember Me
                        </FieldLabel>
                      </Field>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldSet>
                  )}
                />

                <div className="w-fit">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-primary underline text-sm"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
            </FieldGroup>

            <Button
              disabled={isPending}
              type="submit"
              className="w-full hover:cursor-pointer"
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-sm font-medium text-gray-500">
              Don&apos;t have an account?
            </span>
            <Link
              href="/signup"
              className="font-medium text-primary text-sm hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
