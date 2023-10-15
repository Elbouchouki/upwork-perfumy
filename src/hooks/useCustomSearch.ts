import { useSearchParams } from "next/navigation"

export const useCustomSearch = () => {

  const searchParams = useSearchParams()
  const prices: string[] = searchParams.get("prices")?.split("|") || []
  const genders: string[] = searchParams.get("genders")?.split("|") || []
  const stores: string[] = searchParams.get("stores")?.split("|") || []
  const sort: string = searchParams.get("sort") || "ASC"
  const page: number = parseInt(searchParams.get("page") || "1")
  const search: string = searchParams.get("search") || ""

  return {
    prices,
    genders,
    stores,
    sort,
    page,
    search
  }
}