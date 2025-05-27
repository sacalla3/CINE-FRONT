import { StudentTable } from "@/app/components/StudentTable";
import { StudentsResponse } from '../../students/interfaces/students-response.interface';

// const getStudents = async (limit = 10, offset = 0) : Promise<StudentsResponse[]> =>{
//     const data: StudentsResponse[] = await fetch(`http://localhost:9000/api/students?limit=${limit}&offset=${offset}`)
//     .then(res => res.json());
//     return data;
// }

export default async function StudentsPage() {

    //const students = await getStudents();

  return (
    <div className="bg-black">
      
      <StudentTable/>


    </div>
  );
}