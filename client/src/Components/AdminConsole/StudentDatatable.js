import React, { useContext, useEffect } from 'react';
import {
  TableCell,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import StudentRow from './StudentRow'

import StudentContext from '../../Context/Student/StudentContext';



export default function StudentDatatable() {
  const studentContext = useContext(StudentContext);
  const { students, getStudents, loading } = studentContext;
  
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  console.log(students)
  return (
    <TableContainer component={Paper} >
      <Table aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>Email</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Reg. Num.</TableCell>
            <TableCell>Credits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map(
            ({
              email,
              firstName,
              lastName,
              regNumber,
              creditCount,
              selectedTracks,
              selectedUnits,
            }) => (
              <StudentRow
                key={email}
                email={email}
                firstName={firstName}
                lastName={lastName}
                regNumber={regNumber}
                creditCount={creditCount}
                selectedTracks={selectedTracks}
                selectedUnits={selectedUnits}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
