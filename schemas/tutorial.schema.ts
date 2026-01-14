import z from "zod";

export const tutorialSchema = z.object({
  title: z.string().nonempty("Title is required."),
  youtubeUrl: z.string().nonempty("Youtube URL is required."),
});
