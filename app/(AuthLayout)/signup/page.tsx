"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUserRegistration } from "@/hooks/auth.hook";
import { signupSchema } from "@/schemas/auth.schema";
import { USER_ROLES } from "@/constant";
import { useUser } from "@/context/user.provider";

type TSignUpFormData = {
  name: string;
  email: string;
  photo: File;
  password: string;
};

export default function Signup() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { setUser } = useUser();

  const router = useRouter();

  const {
    mutate: registerUser,
    data: userData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useUserRegistration();

  const { handleSubmit, control } = useForm<TSignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TSignUpFormData) => {
    const formData = new FormData();

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    formData.append("data", JSON.stringify(userData));

    formData.append("photo", data.photo);
    registerUser(formData);
  };

  useEffect(() => {
    if (isSuccess && userData?.data) {
      console.log("Registration successful:", userData);

      setUser(userData.data);

      if (userData.data.role === USER_ROLES.ADMIN) {
        router.push("/admin/dashboard");
      } else if (userData.data.role === USER_ROLES.USER) {
        router.push("/library");
      }
    }
  }, [isSuccess, userData, setUser, router]);

  return (
    <section className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col items-center justify-center min-h-[87vh] w-full gap-8 ">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2 font-serif">
            Sign Up your account
          </h1>
          <p className="font-medium text-gray-500">
            To use BookWorm, Please enter your details.
          </p>
        </div>
        <div className="w-full max-w-md border rounded-lg p-6 bg-card">
          {isError && (
            <Alert variant="destructive" className="mb-5 ">
              <AlertCircleIcon />
              <AlertTitle>Unable to sing up.</AlertTitle>
              <AlertDescription>
                <p>{error?.message}</p>
              </AlertDescription>
            </Alert>
          )}
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Name *</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      type="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your name"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                name="photo"
                control={control}
                render={({
                  field: { value, onChange, ...field },
                  fieldState,
                }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="photo">Photo *</FieldLabel>
                    <Input
                      {...field}
                      id="photo"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        onChange(file);
                      }}
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
                        placeholder="At least 8 characters"
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
            </FieldGroup>

            <Button
              disabled={isPending}
              type="submit"
              className="w-full hover:cursor-pointer"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-sm font-medium text-gray-500">
              Already have an account?
            </span>
            <Link
              href="/login"
              className="font-medium text-primary text-sm hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
