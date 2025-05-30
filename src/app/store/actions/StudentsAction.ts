import { fetchingdataFailure, setStudentsData, startFetchingStudents, Student } from "../slices/studentSlice"

export const getStudentAction = (limit = 10, offset=0) => async (dispatch: any) => {
    dispatch(startFetchingStudents);

    try{
        const data: Student[] = await fetch(`http://localhost:9000/api/students?limit=${limit}&offset=${offset}`)
            .then(res => res.json());
        if (!data) throw new Error("Error fetching data");

        dispatch(setStudentsData(data));
    }catch(error){
        dispatch(fetchingdataFailure(error));
    }
}