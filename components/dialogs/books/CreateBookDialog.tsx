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
import { useCreateBook } from "@/hooks/book.hook";
import { useGetAllGenres } from "@/hooks/genre.hook";
import { IGenre } from "@/interfaces/genre.interface";
import { bookSchema } from "@/schemas/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
type TBookFormData = {
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: File;
  totalPages: string;
};
export default function CreateBookDialog() {
  const [open, setOpen] = useState(false);
  const {
    data: genres,
    isPending: isGenresPending,
    isSuccess: isGenresSuccess,
    isError: isGenresError,
    error: genresError,
  } = useGetAllGenres();

  const {
    mutate: createBook,
    isError,
    error,
    isPending,
    isSuccess,
  } = useCreateBook();

  const { handleSubmit, control, reset } = useForm<TBookFormData>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      totalPages: "",
    },
  });

  const onSubmit = async (data: TBookFormData) => {
    const bookData = {
      title: data.title,
      author: data.author,
      genre: data.genre,
      description: data.description,
      totalPages: data.totalPages,
    };
    const formData = new FormData();

    formData.append("data", JSON.stringify(bookData));

    formData.append("coverImage", data.coverImage);

    createBook(formData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-1" />
          <span>Add New Book</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-300">
        {isGenresError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to load genres.</AlertTitle>
            <AlertDescription>
              <p>{genresError?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to create book.</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Book</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Book Title *</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Book Title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="author"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="author">Author *</FieldLabel>
                  <Input
                    {...field}
                    id="author"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Book Author"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="genre"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="genre">Genre *</FieldLabel>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="genre"
                      aria-invalid={fieldState.invalid}
                      className="w-full"
                    >
                      <SelectValue placeholder="Select a genre" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
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

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description *</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="coverImage"
              control={control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="coverImage">Cover Image *</FieldLabel>
                  <Input
                    {...field}
                    id="coverImage"
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
              name="totalPages"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="totalPages">Total Pages *</FieldLabel>
                  <Input
                    {...field}
                    id="totalPages"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Total Pages"
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

            <Button disabled={isGenresPending || isPending} type="submit">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
