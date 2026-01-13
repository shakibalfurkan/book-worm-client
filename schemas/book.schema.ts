import z from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required.")
    .min(2, "Title must be at least 2 characters")
    .max(300, "Title must be less than 300 characters")
    .trim(),
  author: z
    .string()
    .nonempty("Author is required.")
    .min(2, "Author must be at least 2 characters")
    .max(100, "Author must be less than 100 characters")
    .trim(),
  genre: z.string().min(1, "Genre is required.").trim(),

  description: z
    .string()
    .nonempty("Description is required.")
    .min(2, "Description must be at least 2 characters")
    .max(1000, "Description must be less than 1000 characters")
    .trim(),
  coverImage: z
    .instanceof(File, { message: "Cover image is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Cover image must be less than 5MB",
    }),
  totalPages: z
    .string()
    .nonempty("Total pages is required.")
    .min(1, "Total pages must be at least 1")
    .trim(),
});

export const editBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(2, "Author name is required"),
  genre: z.string().min(1, "Genre is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  totalPages: z.string().min(1, "Total pages must be at least 1"),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Cover image must be less than 5MB",
    })
    .optional(),
});
