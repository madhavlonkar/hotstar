import { createSlice } from "@reduxjs/toolkit";
import userData from "../Component/Data/UserData";

const users=createSlice({
    name:'users',
    initialState:userData,
    reducers:{
    }
})

export default users.reducer;  