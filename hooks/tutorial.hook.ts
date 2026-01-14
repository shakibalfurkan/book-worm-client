import { createTutorial, getAllTutorials } from "@/services/TutorialService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useCreateTutorial = () => {
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_TUTORIAL"],
    mutationFn: async (tutorialData) => await createTutorial(tutorialData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_TUTORIALS"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllTutorials = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useQuery<any, Error, FieldValues>({
    queryKey: ["GET_TUTORIALS"],
    queryFn: async () => await getAllTutorials(),
  });
};
