import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import ApiUrl from './api';
import { Msg } from './types/msg';

export const guildApi = createApi({
    reducerPath: 'guildApi',
    baseQuery: fetchBaseQuery({baseUrl: ApiUrl + '/guilds'}),
    endpoints: (builder) => ({
        getGuildMsgs: builder.query<Array<Msg>, number>({
            query: (guildId) => `/${guildId}/msgs`,
        }),
    }),
});
