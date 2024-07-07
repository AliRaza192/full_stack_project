import { z } from "zod";

export const signIpSchema = z.object({
  userName: z.string(),
  password: z.string(),
});
