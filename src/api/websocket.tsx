import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { chatApi } from './api'

export const gatewayApi = chatApi.injectEndpoints({
    endpoints : (builder) => ({
        startWS : builder.query({
            queryFn: () => ({ data: null }),
            onCacheEntryAdded : async (
                arg,
                { dispatch, getState, extra, requestId },
            ) => {
                const ws = new WebSocket('ws://localhost:8080/ws')
            }
        }),
    }),
})