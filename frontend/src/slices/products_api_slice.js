import { PRODUCTS_URL } from "../constants";
import { api_slice } from "./api_slice";

export const products_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query({
      query: (productID) => ({
        url: `${PRODUCTS_URL}/${productID}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductsDetailsQuery } =
  products_api_slice;
