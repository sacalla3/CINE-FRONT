import { create } from "zustand";
import { Students, StudentStore } from "../interfaces/types";
import axios from "axios";

const url = "http://localhost:9000/api/students";

export const useStudentStore = create<StudentStore>()((set) => ({
    students: [],
    getStudents : async (limit = 10, offset = 0) => {
        const response = await axios.get<Students[]>(`${url}?limit=${limit}&offset=${offset}`);
        const students = response.data;
        return set((state) => ({...state, students}))
    }
}))