import React from 'react'
import StudentListByClass from '../features/students/StudentListByClass'
import { useParams } from 'react-router-dom'

export default function Class() {

  //const { classId } = useParams();
  //console.log("classID: ", classId);

  return (
    <div>Class
      <StudentListByClass />
    </div>
  )
}
