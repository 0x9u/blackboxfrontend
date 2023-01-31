import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username : "",
    email : "",
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUsername : (state, action) => {
            state.username = action.payload;
        },
        setEmail : (state, action) => {
            state.email = action.payload;
        }
    }
});

export const { setUsername, setEmail } = userSlice.actions;

export default userSlice.reducer;