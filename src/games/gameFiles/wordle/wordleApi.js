import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const wordleApi = createApi({
    reducerPath : 'gameWordApi',
    baseQuery : fetchBaseQuery({ baseUrl : "https://random-word-api.herokuapp.com/"}),
    endpoints : (builder) => ({
        word : builder.query({
            query : (length) => ({
                url : `word?length=${length}`
            })
        })
    })
})

export default wordleApi;
export const { useWordQuery } = wordleApi;