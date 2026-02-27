import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CarsQueryParams, CarsResponse } from "@/features/auth/types/cars.types";

export function useCarsQuery({ page, pageSize, search, searchField }: CarsQueryParams) {
  const normalizedSearch = search.trim();

  return useQuery({
    queryKey: ["cars", page, pageSize, normalizedSearch, searchField],
    placeholderData: (previousData) => previousData,
    queryFn: async () => {
      const isYearFilter = searchField === "year";
      const parsedYear = normalizedSearch && isYearFilter ? Number(normalizedSearch) : undefined;

      const response = await api.get<CarsResponse>("/cars", {
        params: {
          page,
          size: pageSize,
          search: normalizedSearch || undefined,
          field: normalizedSearch ? searchField : undefined,
          year: isYearFilter && !Number.isNaN(parsedYear) ? parsedYear : undefined,
        },
      });

      return response.data;
    },
  });
}

