import { TReviewFormData } from "@/components/dialogs/review/AddReviewDialog";
import { ApiResponse } from "@/interfaces";
import { IReview } from "@/interfaces/review.interface";
import { createReview, getAllReviews } from "@/services/ReviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, TReviewFormData>({
    mutationKey: ["CREATE_REVIEW"],
    mutationFn: async (reviewData) => await createReview(reviewData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_REVIEWS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllReviews = () => {
  return useQuery<ApiResponse<IReview[]>, Error>({
    queryKey: ["GET_ALL_REVIEWS"],
    queryFn: async () => await getAllReviews(),
  });
};
