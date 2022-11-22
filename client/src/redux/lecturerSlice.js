import {createSlice} from "@reduxjs/toolkit"



export const lecturerSlice = createSlice({
    name: "lecturer",
    initialState:{
        user: null,
    },
    reducers:{
        setLecturer: (state,action) => {
            state.lecturer = action.payload;
        }
    },
});

export const {setLecturer} = lecturerSlice.actions
export default lecturerSlice.reducer