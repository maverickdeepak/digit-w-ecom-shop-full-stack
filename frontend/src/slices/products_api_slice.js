import { api_slice } from "./api_slice";
import { PRODUCTS_URL } from "../constants";

export const products_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    get_products: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery } = products_api_slice;
