import { perfumRouter } from "~/server/api/routers/perfum";
import { createTRPCRouter } from "~/server/api/trpc";
import { emailRouter } from "./routers/mail";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  perfum: perfumRouter,
  mail: emailRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
