'use client'

import { IoEyeOutline, IoPencilOutline, IoTrashBinOutline } from "react-icons/io5"
import { StudentsResponse } from "../students/interfaces/students-response.interface"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { useEffect } from "react"
import { getStudentAction } from "../store/actions/StudentsAction"
import { useStudentStore } from "../students/_store/studentStore"

// interface Props{
// 	student: StudentsResponse[]
// }

// export const StudentTable = ({student}: Props) => {
export const StudentTable = () => {

	//Redux
	const dispatch = useDispatch<AppDispatch>();

	//Zustand
	const {students, getStudents} = useStudentStore();



	//Zustand
	useEffect(()=>{
		getStudents(20, 0);
	},[getStudents])



	//Redux
	useEffect(()=>{
		dispatch(getStudentAction(10, 0));
	},[dispatch])


  return (
	<>
    <div className="flex items-center justify-center min-h-screen">
	<div className="col-span-12">
		<div className="overflow-auto lg:overflow-visible ">
			<table className="table text-gray-400 border-separate space-y-6 text-sm">
				<thead className="bg-gray-800 text-gray-500">
					<tr >
						<th className="p-3">Nombre</th>
						<th className="p-3 text-left">Edad</th>
						<th className="p-3 text-left">Email</th>
						<th className="p-3 text-left">Género</th>
						<th className="p-3 text-left">Nick</th>
						<th className="p-3 text-left">Materias favoritas</th>
						<th className="p-3 text-left">Notas</th>

					</tr>
				</thead>
				<tbody>
				{
					students ? students.map(student => (
								<tr className="bg-gray-800" key={student.id}>
						
						<td className="p-3">
							<div className="flex flex-row items-center">
								<img className="rounded-full h-12 w-12  object-cover" src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" alt="unsplash image"/>
								<div className="ml-3">
									<div className="">{student.name}</div>
								</div>
							</div>
						</td>
						<td className="p-3">
							{student.age}
						</td>
						<td className="p-3 font-bold">
							{student.email}
						</td>
						<td className="p-3 font-bold">
							{student.gender}
						</td>
						<td className="p-3 font-bold">
							{student.nickname}
						</td>
						<td className="p-3 font-bold">
							{(student.subjects).join(', ')}
						</td>
						<td className="p-3">
							<div className="flex flex-row items-center">
							<a href="#" className="text-gray-400 hover:text-gray-100 mr-2">
								<IoEyeOutline/>
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-100  mx-2">
                            <IoPencilOutline/>
							</a>
							<a href="#" className="text-gray-400 hover:text-gray-100  ml-2">
                            <IoTrashBinOutline/>
							</a>
							</div>
						</td>

					</tr>
							)): <div>Ponga celdas aqui</div>
						}
					
				</tbody>
			</table>
		</div>
	</div>
</div>
	</>
  )
}
