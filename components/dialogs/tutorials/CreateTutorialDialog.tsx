"use client";
import { AlertCircleIcon, PlusIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import z from "zod";
import { tutorialSchema } from "@/schemas/tutorial.schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTutorial } from "@/hooks/tutorial.hook";

type TTutorialFormData = z.infer<typeof tutorialSchema>;

export default function CreateTutorialDialog() {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control, reset } = useForm<TTutorialFormData>({
    resolver: zodResolver(tutorialSchema),
    defaultValues: {
      title: "",
      youtubeUrl: "",
    },
  });

  const {
    mutate: createTutorial,
    isSuccess,
    isPending,
    isError,
    error,
  } = useCreateTutorial();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  const onSubmit = async (data: TTutorialFormData) => {
    createTutorial(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="w-4 h-4 mr-1" />
          <span>Add New Tutorial</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25">
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to create tutorial.</AlertTitle>
            <AlertDescription>
              <p>{error?.message}</p>
            </AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create New Tutorial</DialogTitle>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Tutorial Title *</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    type="text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Tutorial Title"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="youtubeUrl"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="youtubeUrl">
                    Youtube URL (Embed Code) *
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="youtubeUrl"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Youtube Embed Code"
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
