import { createAsyncThunk } from "@reduxjs/toolkit";
import { thunkAPIConfig } from "./store";

//FOR THE LOVE OF GOD, DO NOT PUT THIS IN ITS OWN FILE PLEASE

export const asyncThunkAPI = createAsyncThunk.withTypes<thunkAPIConfig>();