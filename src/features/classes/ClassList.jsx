import React, { useState, useEffect } from 'react';
import supabase from '../../services/supabase'; // Import the Supabase client
import styled from 'styled-components';
import { Button, Fab, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudentListByClass from '../students/StudentListByClass';
import { useNavigate } from 'react-router-dom';


const ClassPageWrapper = styled.div`
  padding: 16px;
`;

const ClassCardContainer = styled.div`
  display: grid; /* Change to grid */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust column width */
    gap: 16px; /* Add gap between cards */
`;

const ClassCard = styled.div`
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

export default function ClassList() {
    const [classes, setClasses] = useState([]);
    const [newClassName, setNewClassName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();


const toggleModal = () => {
  setIsModalOpen(!isModalOpen);
};



  // Fetch classes from the database
  const fetchClasses = async () => {
    try {
      const { data, error } = await supabase.from('classes').select('*');
      if (error) {
        throw error;
      }
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const fetchStudentNumber = async () => {
    try {
      //const { data, error } = await supabase.from("students").select('id,  classes ( code ), students (firstName)');
      const { data, error } = await supabase.from("seances").select('*');
      if (error) {
        throw error;
      }
      console.log("fetch students: ", data);
    } catch (error){
      console.error('Error fetching student count:', error.message);
    }
  }

  useEffect(() => {
    fetchClasses();
    fetchStudentNumber();
  }, [newClassName]);

  // Add a new class
  const addClass = async () => {
    try {
      if (newClassName.trim() === '') {
        return; // Don't add empty names
      }
      console.log(newClassName, "newclassname");
      const { data, error } = await supabase.from('classes').insert([
        { subject: newClassName },
      ]);
      if (error) {
        throw error;
      }
      //console.log(data[0], "data");
      //console.log(data, "data")
      // setClasses([...classes, data[0]]);
    
      setNewClassName('');
    } catch (error) {
      console.error('Error adding class:', error.message);
    }
    
    
  };

  return (
    <ClassPageWrapper>
      <h1>My classes</h1>
      <InputDiv> 
        <Input sx={{margin:2}}
          type="text"
          placeholder="Enter class subject"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
        />
        <Fab color='primary' aria-label='add' onClick={addClass}><AddIcon/></Fab>
      </InputDiv>
      <ClassCardContainer>
        {classes.map((classe) => (
          <ClassCard onClick={() => navigate(`/classes/${classe.id}`)} key={classe.id} className="class-card">
            {classe.code}
          </ClassCard>
        ))}
      </ClassCardContainer>
    </ClassPageWrapper>
  );
}
