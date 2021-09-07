import React, { useState, useContext } from 'react';
import StudentContext from '../../Context/Student/StudentContext';

import { useRowStyles } from '../../Hooks/StylesHook';
import {
  TableCell,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

export default function StudentRow(props) {
  const {
    id,
    email,
    firstName,
    lastName,
    regNumber,
    creditCount,
    selectedTracks,
    selectedUnits,
    academicYear,
  } = props;
  const studentContext = useContext(StudentContext);

  const { checkedStudents, checkStudent, uncheckStudent, setCurrentStudent } =
    studentContext;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  const handleBoxCheck = () => {
    if (!checkedStudents.includes(id)) {
      checkStudent(id);
      setCurrentStudent(props);
    } else {
      uncheckStudent(id);
    }
  };
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedStudents.includes(id)}
                onChange={handleBoxCheck}
                color='primary'
              />
            }
          />
        </TableCell>
        <TableCell>
          <IconButton
            type='button'
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {email}
        </TableCell>
        <TableCell component='th' scope='row'>
          {firstName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {lastName}
        </TableCell>
        <TableCell component='th' scope='row'>
          {regNumber}
        </TableCell>
        <TableCell component='th' scope='row'>
          {creditCount}
        </TableCell>
        <TableCell component='th' scope='row'>
          {academicYear}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            {selectedTracks.length > 0 ? (
              <Box margin={1}>
                <Typography variant='h6' gutterBottom component='div'>
                  Submitted Preferences
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Preferred Tracks</TableCell>
                      <TableCell>Preferred Units</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableCell component='tr'>
                      <TableCell component='td' style={{ border: 'none' }}>
                        {selectedTracks.map((track) => (
                          <div key={track.id}>{track.name}</div>
                        ))}
                      </TableCell>
                    </TableCell>
                    <TableCell component='tr'>
                      <TableCell component='td' style={{ border: 'none' }}>
                        {selectedUnits.map((unit) => (
                          <div key={unit.id}>{unit.name}</div>
                        ))}
                      </TableCell>
                    </TableCell>
                  </TableBody>
                </Table>
              </Box>
            ) : (
              <h3>This Student has not submitted prefrences yet.</h3>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
