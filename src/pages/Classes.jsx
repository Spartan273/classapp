
import React, { useState, useEffect } from 'react';
import supabase from '../services/supabase'; // Import the Supabase client
import styled from 'styled-components';
import { Button, Fab, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClassList from '../features/classes/ClassList';



export default function Classes(){


  return (
    
    <ClassList/>
  );
};