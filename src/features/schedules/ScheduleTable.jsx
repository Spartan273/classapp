import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSchedule } from "./useSchedule";
import styled from "styled-components";

const Table = styled.div`
  display: table;
  width: auto;
  //background-color: #eee;
  border: 1px solid #e0e0e0;
  //border-spacing: 1px; /* cellspacing:poor IE support for  this */
  font-family: Poppins;
  border-radius: 5px;
`;  
  
const TableRow = styled.div`
  display: table-row;
  width: auto;
  clear: both;
  :hover {
    background-color: aliceblue;
  }

  
  //border: 5px solid black;

`;

const TableColumn = styled.div`
  float: left; /* fix for  buggy browsers */
  //display: table-column;
  display: table-cell;
  width: 100px;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem;
  //border-bottom: 1px solid #e0e0e0;
  //background-color: #ccc;
`;

const TableHeader = styled(TableRow)`
  background-color: white;
`;

export default function ScheduleTable(props) {
  //const classId = props.query.id;
  const { isLoading, result, error } = useSchedule(props.query.id);
  const [seance, setSeance] = useState(['']);
  const [sortedSeances, setSortedSeances] = useState([]);
  //console.log("result", result);
  //const [data, setData] = useState();

  //const TableHeader = styled.div`
  //
  //`;
  //console.log("Query id: ", props.query.id);

  useEffect(()=>{
    function createScheduleTable(){

      const dayValues = {
        Lundi: 1,
        Mardi: 2,
        Mercredi: 3,
        Jeudi: 4,
        Vendredi: 5
    };

    const sortedCourse = seance?.sort((a, b) => {
      const dayA = dayValues[a.period];
      const dayB = dayValues[b.period];
    
      // First, sort by day
      if (dayA !== dayB) {
        return dayA - dayB;
      }
    
      // If the days are the same, sort by start time
      const timeA = new Date(`1970-01-01T${a.startTime}`);
      const timeB = new Date(`1970-01-01T${b.startTime}`);
      return timeA - timeB;
    });
    setSortedSeances(sortedCourse);
    console.log("sorted courses: ", sortedCourse);  
    
    }

    console.log("props changed");
    console.log("seance by class:", seance);
    setSeance(result);
    createScheduleTable();
  }, [seance, result, props.query])

  //const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
    const daysOfWeek = [ {day: "Lundi", index: 0}, {day: "Mardi", index: 1}, {day: "Mercredi", index: 2}, {day: "Jeudi", index: 3}, {day: "Vendredi", index: 4} ]
    const timeSchedule = [ {startTime: "08:00:00", index: 0}, {startTime: "10:00:00", index: 1}, {startTime: "13:00:00", index: 2}, {startTime: "15:00:00", index: 3} ]

  //result && <DataGrid rows={result} columns={columns} loading={isLoading} />
  return (
    <div>
      {props.query.label}
      <Table>
      <TableHeader>
          {daysOfWeek.map((day) => (
            <TableColumn key={day.index}>{day.day}</TableColumn>
          ))}
        </TableHeader>

          {timeSchedule.map((time) => (
            <TableRow key={time.index}>
            {daysOfWeek.map((day)=> (
              <TableColumn key={day.index}>
                {sortedSeances?.map((seance) => (
                  seance.startTime === time.startTime && seance.period === day.day && ( seance.subjects.name + ' ' + seance.period )
                ))}
              </TableColumn>
            ))}

            </TableRow>
            
          ))}    

          

      </Table>

    </div>
  );
}
