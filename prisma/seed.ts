import { Prisma, PrismaClient } from '@prisma/client'
import perfums from "./data.json"

const prisma = new PrismaClient()

interface Perfum {
  id: string
  title: string
  price: string
  handle: string
  image: string
  gender: string
  store: string
}

async function seedPerfums(data: Prisma.PerfumCreateManyInput[]) {
  return await prisma.perfum.createMany({
    data: data
  })
}

async function main() {
  const allPerfums: Prisma.PerfumCreateManyInput[] = (<Perfum[]>perfums).map((perfum) => ({
    id: +perfum.id,
    title: perfum.title,
    price: +perfum.price,
    handle: perfum.handle,
    image: perfum.image,
    gender: perfum.gender,
    store: perfum.store
  }))
  await prisma.perfum.deleteMany({})
  await seedPerfums(allPerfums)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })