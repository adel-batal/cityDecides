import React, { useState, useContext } from 'react';
import * as xlsx from 'xlsx';
import AuthContext from '../../Context/Auth/AuthContext';
import StudentContext from '../../Context/Student/StudentContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import camelizeObjectKeys from '../../Utils/camelizeObjectKeys';
import allowFormat from '../../Utils/allowFormat';

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
  FormHelperText,
} from '@material-ui/core';
import { useStyles } from '../../Hooks/StylesHook';
import hasCommonEmail from '../../Utils/hasCommon';

export default function UploadStudentsForm({ form, setForm }) {
  const classes = useStyles();
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);
  const { addStudent, students } = studentContext;
  const { register } = authContext;
  const { setNotification } = notificationContext;
  const [studentList, setStudentList] = useState(null);

  // Create a state variable with a default value null
  function readSheet(file) {
    // Use the utility function allowFormat(type) to check if
    // the uploaded file's format is of an allowed type
    if (!allowFormat(file.type)) {
      // If not, show a notification with the error and return;
      setNotification(
        'Format not allowed, please use a different format and try again.',
        'error',
        8000
      );
      return;
    }
    // otherwise, declare a promise and a file reader
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      // When the file is loaded get the buffer array
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        // Read the book using one of the xlsx (Sheet.js) fucntions
        const workBook = xlsx.read(bufferArray, { type: 'buffer' });
        // Get the first sheet
        const workSheetName = workBook.SheetNames[0];
        // and initilize it
        const workSheet = workBook.Sheets[workSheetName];
        // Then convert to JSON using a Sheet.js utility function and resolve it
        const data = xlsx.utils.sheet_to_json(workSheet);
        resolve(data);
      };
      // In case of an error reject
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    // otherwise assign the data to the usestate hook
    promise.then((data) => {
      if (hasCommonEmail(data, students) /* || hasCommonEmail(data, data) */) {
        setNotification(
          'You can only add students with unique emails in relation to each other and the already existing students, please check your list and try again.',
          'error',
          10000
        );
        return;
      }
      if (data.length === 0) {
        setNotification('Cannot upload empty sheets.', 'error');
        return;
      }
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
    setForm({ open: false });
  }
  return (
    <>
      <Dialog open={form.open}>
        <DialogTitle name='form-dialog-title'>
          Upload a list of students
        </DialogTitle>
        <DialogContent>
          <input
            type='file'
            name='studentListSheet'
            onChange={(e) => {
              const file = e.target.files[0];
              readSheet(file);
            }}
          />
          <FormHelperText id='component-helper-text'>
            Allowd formats: .xls, .xlsx, .xltx, .ots, .ods.
          </FormHelperText>
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
                      <TableRow key={student.Email}>
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
            onClick={() => setForm({ open: false })}
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
