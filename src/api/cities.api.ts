import { citySchema, type CityContent } from "@/schemas/content.schema";
import { createListApi } from "@/api/createListApi";
import { dummyCities } from "@/api/mock/cities.mock";

export const getCities = createListApi<CityContent>({
  path: "/cities",
  itemSchema: citySchema,
  getMock: () => dummyCities,
  delay: 140,
});
