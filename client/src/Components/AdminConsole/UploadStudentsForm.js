import React, { useState, useContext } from 'react';
import * as xlsx from 'xlsx';
import AuthContext from '../../Context/Auth/AuthContext';
import StudentContext from '../../Context/Student/StudentContext';
import camelizeObjectKeys from '../../Utils/camelizeObjectKeys';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';

export default function UploadStudentsForm({
  handleUploadStudentsFormClose,
  uploadStudentsFormOpen,
}) {
  const [studentList, setStudentList] = useState(null);
  const classes = useStyles();
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const { addStudent } = studentContext;
  const { register } = authContext;

  function readSheet(file) {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const workBook = xlsx.read(bufferArray, { type: 'buffer' });
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];
        const data = xlsx.utils.sheet_to_json(workSheet);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((data) => {
      setStudentList(data);
    });
  }

  function getHeaders(list) {
    return Object.keys(list[0]);
  }

  function onUpload(students) {
    students.forEach((student) => {
      let camelizedStudent = camelizeObjectKeys(student);
      let {
        email,
        firstName,
        lastName,
        regNumber,
        creditCount,
        academicYear,
        password,
      } = camelizedStudent;
      addStudent({
        email: email,
        firstName: firstName,
        lastName: lastName,
        regNumber: regNumber,
        creditCount: creditCount,
        academicYear: academicYear,
      });
      register({
        email: email,
        password: password.toString(),
        role: 'student',
      });
    });
    handleUploadStudentsFormClose();
  }

  return (
    <>
      <Dialog
        open={uploadStudentsFormOpen}
        onClose={handleUploadStudentsFormClose}
      >
        <DialogTitle name='form-dialog-title'>
          Upload a list of students
        </DialogTitle>
        <DialogContent>
          <input
            type='file'
            onChange={(e) => {
              const file = e.target.files[0];
              readSheet(file);
            }}
          />
          <br />
          <br />
          {studentList && (
            <>
              <DialogContentText>Preview:</DialogContentText>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      {getHeaders(studentList).map((element) => (
                        <TableCell align='left' key={element}>
                          {element}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentList.map((student) => (
                      <TableRow key={student.email}>
                        {Object.values(student).map((attr) => (
                          <TableCell key={attr} align='left'>
                            {attr}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type='button'
            onClick={handleUploadStudentsFormClose}
            color='secondary'
          >
            Cancel
          </Button>
          {studentList ? (
            <Button
              variant='contained'
              onClick={() => onUpload(studentList)}
              color='primary'
            >
              Upload
            </Button>
          ) : (
            <Button disabled variant='contained'>
              Upload
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
