import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import ApiUrl from './api'
export const gateway = createApi({
    baseQuery : fetchBaseQuery({ baseUrl : ApiUrl }),
    endpoints : (builder) => ({
        startWS : builder.query({
            queryFn: () => ({ data: null }),
            onCacheEntryAdded : async (
                arg,
                { dispatch, getState, extra, requestId, signal },
            ) => {
                const { gateway } = getState()
                const { data } = gateway.endpoints.startWS.select(requestId)
                if (data) return
                const ws = new WebSocket('ws://' + ApiUrl + '/ws')
                ws.onopen = () => {
                    dispatch(gateway.endpoints.startWS.initiate())
                }
                ws.onmessage = (e) => {
                    const data = JSON.parse(e.data)
                    dispatch(gateway.util.updateQueryData('startWS', data))
                }
            }
        }),
    }),
})