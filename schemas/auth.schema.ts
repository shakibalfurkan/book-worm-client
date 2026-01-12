import z from "zod";

export const signupSchema = z.object({
  name: z.string().nonempty("Name is required.").trim(),

  email: z.email().nonempty("Email is required."),
  photo: z
    .instanceof(File, { message: "Profile photo is required" })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "Photo must be less than 5MB",
    }),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, { error: "Password must be 8 characters long" })
    .max(20, { error: "Password must be less then 20 characters" })
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    )
    .trim(),
});
