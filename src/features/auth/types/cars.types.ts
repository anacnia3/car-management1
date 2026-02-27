export type SearchField = "all" | "brand" | "model" | "color" | "year";

export type Car = {
  id: number;
  brand: string;
  model: string;
  color: string;
  year: number;
  createdAt?: string;
};

export type CarsResponse =
  | Car[]
  | {
      content: Car[];
      totalPages: number;
      number: number;
      totalElements?: number;
    };

export type CarsQueryParams = {
  page: number;
  pageSize: number;
  search: string;
  searchField: SearchField;
};

export type CarPayload = Omit<Car, "id" | "createdAt">;
export type CarInitialData = CarPayload & { id: number };

