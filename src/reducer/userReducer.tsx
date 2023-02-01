import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SliceState = {
    username : string,
    email : string,
}

const initialState : SliceState = {
    username : "",
    email : "",
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUsername : (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail : (state, action) => {
            state.email = action.payload;
        }
    }
});

export const { setUsername, setEmail } = userSlice.actions;

export default userSlice.reducer;