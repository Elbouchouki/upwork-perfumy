import { perfumRouter } from "~/server/api/routers/perfum";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  perfum: perfumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
