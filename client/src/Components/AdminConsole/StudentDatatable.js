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
import StudentRow from './StudentRow';

import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';

export default function StudentDatatable() {
  const studentContext = useContext(StudentContext);
  const campaignContext = useContext(CampaignContext);
  const { students, getStudents } = studentContext;
  const { academicYear } = campaignContext;

  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  const filteredStudents =
    academicYear !== ''
      ? students.filter((student) => student.academicYear === academicYear)
      : students;

  return (
    <TableContainer component={Paper}>
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
            <TableCell>AcademicYear</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map(
            ({
              _id,
              email,
              firstName,
              lastName,
              regNumber,
              creditCount,
              selectedTracks,
              selectedUnits,
              academicYear,
            }) => (
              <StudentRow
                key={_id}
                id={_id}
                email={email}
                firstName={firstName}
                lastName={lastName}
                regNumber={regNumber}
                creditCount={creditCount}
                selectedTracks={selectedTracks}
                selectedUnits={selectedUnits}
                academicYear={academicYear}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
