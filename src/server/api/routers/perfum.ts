import { Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { PRICE_RANGE } from "~/utils/constants";

export const perfumRouter = createTRPCRouter({
  getAll: publicProcedure.input(
    z.object({
      page: z.number(),
      itemsPerPage: z.number(),
      sort: z.enum(["asc", "desc"]).optional(),
      store: z.array(z.string()).optional(),
      gender: z.array(z.string()).optional(),
      price: z.array(z.string()).optional(),
      search: z.string().optional(),
    })
  ).query(({ ctx, input }) => {

    const prices = PRICE_RANGE.filter((price) => input.price?.includes(price.id)) ?? [];
    const stores = input.store?.filter((store) => store !== "") ?? [];
    let where: Prisma.PerfumWhereInput = {};

    if (input.search) {
      where.title = {
        contains: input.search
      }
    }

    if (prices.length > 0) {
      where.OR =
        prices.map((price) => (
          {
            price: {
              gte: price.min ?? undefined,
              lte: price.max ?? undefined,
            }
          }
        ))
    }

    if (stores.length > 0) {
      where.store = {
        in: stores
      }
    }

    return ctx.db.perfum.findMany({
      take: input.itemsPerPage,
      skip: input.page === 1 ? 0 : (input.page - 1) * input.itemsPerPage,
      orderBy: {
        price: input.sort,
      },
      where
    });
  }),
  getOne: publicProcedure.input(
    z.object({
      id: z.number(),
    })
  ).query(({ ctx, input }) => {
    return ctx.db.perfum.findUnique({
      where: { id: input.id },
    });
  }),
  countPefums: publicProcedure.input(
    z.object({
      sort: z.enum(["asc", "desc"]).optional(),
      store: z.array(z.string()).optional(),
      gender: z.array(z.string()).optional(),
      price: z.array(z.string()).optional(),
      search: z.string().optional(),
    })
  ).query(({ ctx, input }) => {

    const prices = PRICE_RANGE.filter((price) => input.price?.includes(price.id)) ?? [];
    const stores = input.store?.filter((store) => store !== "") ?? [];
    let where: Prisma.PerfumWhereInput = {};

    if (input.search) {
      where.title = {
        contains: input.search
      }
    }

    if (prices.length > 0) {
      where.OR =
        prices.map((price) => (
          {
            price: {
              gte: price.min ?? undefined,
              lte: price.max ?? undefined,
            }
          }
        ))
    }

    if (stores.length > 0) {
      where.store = {
        in: stores
      }
    }

    return ctx.db.perfum.count({
      orderBy: {
        price: input.sort,
      },
      where
    });
  }),
  getStores: publicProcedure.query(({ ctx }) => {
    return ctx.db.perfum.findMany({
      distinct: ["store"],
      select: {
        store: true,
      },
    });
  })
});