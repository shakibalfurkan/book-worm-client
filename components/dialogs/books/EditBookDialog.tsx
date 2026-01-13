"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBook } from "@/hooks/book.hook";
import { useGetAllGenres } from "@/hooks/genre.hook";
import { IBook } from "@/interfaces/book.interface";
import { IGenre } from "@/interfaces/genre.interface";
import { editBookSchema } from "@/schemas/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, EditIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type TEditBookFormData = z.infer<typeof editBookSchema>;

export default function EditBookDialog({ book }: { book: IBook }) {
  const [open, setOpen] = useState(false);

  const {
    data: genres,
    isSuccess: isGenresSuccess,
    isError: isGenresError,
    error: genresError,
  } = useGetAllGenres();

  const { mutate: updateBook, isError, error, isPending } = useUpdateBook();

  const { handleSubmit, control } = useForm<TEditBookFormData>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: book?.title || "",
      author: book?.author || "",
      genre:
        typeof book?.genre === "object" && "_id" in book.genre
          ? book.genre._id
          : (book?.genre as string) || "",
      description: book?.description || "",
      totalPages: book?.totalPages?.toString() || "",
    },
  });

  const onSubmit = (data: TEditBookFormData) => {
    const bookUpdateData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      description: data.description,
      totalPages: data.totalPages,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(bookUpdateData));

    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    updateBook(
      { id: book._id, formData },
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
        <Button variant={"outline"} size={"icon"} className="cursor-pointer">
          <EditIcon className="w-4 h-4 text-blue-500" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-300">
        {isGenresError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to load genres.</AlertTitle>
            <AlertDescription>{genresError?.message}</AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Update failed.</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Book: {book.title}</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            {/* Title Field */}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Book Title *</FieldLabel>
                  <Input {...field} placeholder="Book Title" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Author Field */}
            <Controller
              name="author"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Author *</FieldLabel>
                  <Input {...field} placeholder="Book Author" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Genre Select */}
            <Controller
              name="genre"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>Genre *</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {isGenresSuccess &&
                        genres?.data?.map((genre: IGenre) => (
                          <SelectItem key={genre._id} value={genre._id}>
                            {genre.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description *</FieldLabel>
                  <Textarea {...field} placeholder="Description" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Cover Image Field */}
            <Controller
              name="coverImage"
              control={control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>
                    Cover Image (Leave empty to keep current)
                  </FieldLabel>
                  <Input
                    {...field}
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                </Field>
              )}
            />

            {/* Total Pages */}
            <Controller
              name="totalPages"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Total Pages *</FieldLabel>
                  <Input {...field} type="text" placeholder="Total Pages" />
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
