import z from "zod";

export const genreSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required.")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  description: z
    .string()
    .nonempty("Description is required.")
    .max(200, "Description must be less than 200 characters")
    .trim(),
});
