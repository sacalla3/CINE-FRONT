import { createSlice } from "@reduxjs/toolkit";

export type Student = {
    id:       string;
    name:     string;
    age:      number;
    email:    string;
    gender:   string;
    nickname: string;
    subjects: string[];
    grades: string[];
}

export const studentSlice = createSlice({
    name: "Students",
    initialState: {
        data: [],
        loading: false,
        error:null
    },
    reducers: {
        startFetchingStudents: (state) => {
            state.loading = true;
            state.error = null;
        },
        setStudentsData : (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchingdataFailure : (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {startFetchingStudents, setStudentsData, fetchingdataFailure} = studentSlice.actions;
export const studentReducer = studentSlice.reducer;