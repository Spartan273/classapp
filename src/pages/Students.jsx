
import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase'; // Import the Supabase client
import styled from 'styled-components';
import { Fab, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


const StudentPageWrapper = styled.div`
  padding: 16px;
`;

const StudentCardContainer = styled.div`
  display: grid; /* Change to grid */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width */
    gap: 16px; /* Add gap between cards */
`;

const StudentCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 16px;
  margin: 8px;
  width: 200px; /* Adjust as needed */
`;

export default function Students(){
  const [students, setStudents] = useState([]);
  const [newStudentName, setNewStudentName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};



  // Fetch students from the database
  const fetchStudents = async () => {
    try {
      const { data, error } = await supabase.from('students').select('*');
      if (error) {
        throw error;
      }
      console.log("students data", data);
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [newStudentName]);

  // Add a new student
  const addStudent = async () => {
    try {
      if (newStudentName.trim() === '') {
        return; // Don't add empty names
      }
      const { data, error } = await supabase.from('students').insert([
        { name: newStudentName },
      ]);
      if (error) {
        throw error;
      }
      //setStudents([...students, data[0]]);
      setNewStudentName('');
    } catch (error) {
      console.error('Error adding student:', error.message);
    }
  };

  return (
    <StudentPageWrapper>
      <h1>Student Page</h1>
      <div>
        <Input
          sx={{margin:2}}
          type="text"
          placeholder="Enter student name"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
        />
        <Fab color='primary' onClick={addStudent}><AddIcon/></Fab>
      </div>
      <StudentCardContainer>
        {students.map((student) => (
          <StudentCard key={student.id} className="student-card">
            {student.firstName}
            {student.code}
          </StudentCard>
        ))}
      </StudentCardContainer>
      
    </StudentPageWrapper>
  );
};