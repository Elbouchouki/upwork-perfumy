import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
    })
  ).mutation(({ ctx, input }) => {
    console.log(input)
    return Promise.resolve("ok")
  }
  ),
});