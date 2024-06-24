import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase'; // Import the Supabase client
import styled from 'styled-components';
import { Button, Fab, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const TeacherPageWrapper = styled.div`
  padding: 16px;
`;

const TeacherCardContainer = styled.div`
  display: grid; /* Change to grid */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width */
    gap: 16px; /* Add gap between cards */
`;

const TeacherCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  align-items: center;
  padding: 16px;
  margin: 8px;
  width: 200px; /* Adjust as needed */
`;

const InputDiv = styled.div`
  margin: 20px;
`;

export default function Teachers() {
  

  const [teachers, setTeachers] = useState([]);
  const [newTeacherName, setNewTeacherName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};



  // Fetch classes from the database
  const fetchTeachers = async () => {
    try {
      const { data, error } = await supabase.from('teachers').select('*');
      if (error) {
        throw error;
      }
      setTeachers(data);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, [newTeacherName]);

  // Add a new class
  const addClass = async () => {
    try {
      if (newTeacherName.trim() === '') {
        return; // Don't add empty names
      }
      console.log(newTeacherName, "newteachername");
      const { data, error } = await supabase.from('teachers').insert([
        { subject: newTeacherName },
      ]);
      if (error) {
        throw error;
      }
      //console.log(data[0], "data");
      //console.log(data, "data")
      // setClasses([...classes, data[0]]);
    
      setNewTeacherName('');
    } catch (error) {
      console.error('Error adding teacher:', error.message);
    }
    
    
  };

  return (
    <TeacherPageWrapper>
      <h1>My teachers</h1>
      <InputDiv> 
        <Input sx={{margin:2}}
          type="text"
          placeholder="Enter class subject"
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
        />
        <Fab color='primary' aria-label='add' onClick={addClass}><AddIcon/></Fab>
      </InputDiv>
      <TeacherCardContainer>
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.id} className="class-card">
            {teacher.firstName}
            {teacher.code}
          </TeacherCard>
        ))}
      </TeacherCardContainer>
    </TeacherPageWrapper>
  );

}
