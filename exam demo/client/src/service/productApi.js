import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => `products/`,
    }),
    getOneProduct: builder.query({
        query: (id) => `products/${id}`,
      }),
    deleteProduct:builder.mutation({
        query:(id)=>({
            url:`products/${id}`,
            method:"DELETE"
        })
    }),
    postProduct:builder.mutation({
        query:(newProduct)=>({
            url:"products",
            method:"POST",
            body:newProduct,
            headers:{
                "Context-type":"application/json"
            }
        })
    })

  }),
})


export const { useGetProductQuery ,useGetOneProductQuery,useDeleteProductMutation,usePostProductMutation} = productApi