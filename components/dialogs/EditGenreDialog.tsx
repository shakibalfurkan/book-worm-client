import { genreSchema } from "@/schemas/genre.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { TbEdit } from "react-icons/tb";
import { IGenre } from "@/interfaces/genre.interface";
import { useUpdateGenre } from "@/hooks/genre.hook";
import { useState } from "react";

type TGenreFormData = {
  name: string;
  description: string;
};

export default function EditGenreDialog({ genre }: { genre: IGenre }) {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm<TGenreFormData>({
    resolver: zodResolver(genreSchema),
    defaultValues: {
      name: genre?.name,
      description: genre?.description,
    },
  });

  const { mutate: updateGenre, isError, error, isPending } = useUpdateGenre();

  const onSubmit = async (data: TGenreFormData) => {
    updateGenre(
      {
        id: genre?._id,
        genreData: data,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"icon"} className="cursor-pointer">
          <TbEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to update genre.</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update The Genre</DialogTitle>
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
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
