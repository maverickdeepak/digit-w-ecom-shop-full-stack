import { USERS_URL } from "../constants";
import { api_slice } from "./api_slice";

export const users_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}`,
          method: "POST",
          body: data,
        }),
      }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: "POST",
        }),
      }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = users_api_slice;
