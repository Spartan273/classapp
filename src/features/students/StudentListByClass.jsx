import React, { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import { useStudents } from "./useStudents";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import StudentCard from "./StudentCard";
import { Grid, createTheme } from "@mui/material";

export default function StudentListByClass(props) {
  const [students, setStudents] = useState([]);
  const { isLoading, result, error } = useStudents();

  console.log("setStudents", students);

  useEffect(() => {
    console.log("useeffect");
    setStudents(result);
  }, [result]);

  //const theme = createTheme();
  //theme.spacing(2);
  //useEffect(()=> {
  //  setStudents(result);
  //  console.log("studentList: ", students);
  // }, [result])

  return (
    <>
      <Grid container spacing={2}>
        {students
          ? students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))
          : null}
      </Grid>
    </>
  );
}
