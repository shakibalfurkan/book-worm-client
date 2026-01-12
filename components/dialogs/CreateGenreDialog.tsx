"use client";
import { AlertCircleIcon, PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { genreSchema } from "@/schemas/genre.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useCreateGenre } from "@/hooks/genre.hook";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";

type TGenreFormData = {
  name: string;
  description: string;
};

export default function CreateGenreDialog() {
  const { handleSubmit, control, reset } = useForm<TGenreFormData>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const {
    mutate: createGenre,
    data: genreData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useCreateGenre();

  console.log(genreData);
  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit = async (data: TGenreFormData) => {
    createGenre(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-1" />
          <span>Add New Genre</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to create genre.</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Genre</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Genre Name *</FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Genre Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Genre Description *
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Genre Description"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={isPending} type="submit">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
