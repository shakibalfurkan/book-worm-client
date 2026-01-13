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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { RatingGroupAdvanced } from "@/components/ui/rating-group";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReview } from "@/hooks/review.hook";
import { reviewSchema } from "@/schemas/review.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Star } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export type TReviewFormData = z.infer<typeof reviewSchema>;

export default function AddReviewDialog({
  bookId,
  userId,
}: {
  bookId: string;
  userId: string;
}) {
  const [open, setOpen] = useState(false);

  const { handleSubmit, control } = useForm<TReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: "0",
      comment: "",
    },
  });

  const { mutate: createReview, isPending, isError, error } = useCreateReview();

  const onSubmit = async (data: TReviewFormData) => {
    const reviewData = {
      ...data,
      user: userId,
      book: bookId,
    };
    createReview(reviewData, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => {}} variant="outline" className="gap-2">
          <Star className="w-4 h-4" />
          Add Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-140">
        {isError && (
          <Alert variant="destructive" className="mb-5">
            <AlertCircleIcon />
            <AlertTitle>Unable to add review.</AlertTitle>
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
              name="rating"
              control={control}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="rating">Rating *</FieldLabel>
                  <RatingGroupAdvanced
                    allowHalf={true}
                    value={value.toString()}
                    onValueChange={(rating) => {
                      onChange(rating);
                    }}
                    {...field}
                    max={5}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="comment"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="comment">Comment *</FieldLabel>
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
              {isPending ? "Adding..." : "Add Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
