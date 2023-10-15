import { z } from "zod";
import { get_html_template } from "~/components/email-template";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const emailRouter = createTRPCRouter({
  sendEmail: publicProcedure.input(
    z.object({
      name: z.string(),
      email: z.string(),
      message: z.string(),
    })
  ).mutation(async ({ ctx, input }) => {
    return fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: "Perfumy <onboarding@resend.dev>",
        to: [env.RECIPIENT_EMAIL],
        subject: `Perfumy new message from ${input.name}`,
        html: get_html_template(input.name, input.email, input.message)
      }),
    });
  }
  ),
});