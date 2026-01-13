import { TReviewFormData } from "@/components/dialogs/review/AddReviewDialog";
import { createReview } from "@/services/ReviewService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateReview = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, TReviewFormData>({
    mutationKey: ["CREATE_REVIEW"],
    mutationFn: async (reviewData) => await createReview(reviewData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
