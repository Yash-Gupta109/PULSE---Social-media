import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status :false,
    userData: null
}

// we are doing this createSlice to track the authentication
const authSlice  =createSlice({
    name: "auth",
    initialState,
    reducers: {
        // action se milta hai payload
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        }, 
        logout: (state) => {
            state.status =false;
            state.userData = null;
        }
    }
})

// reducers values are called actions like login logout
export const {login,logout} = authSlice.actions;

export default authSlice.reducer;