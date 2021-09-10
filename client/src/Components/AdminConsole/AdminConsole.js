import React, { useState, useEffect, useContext } from 'react';
import AddStudentPopup from './AddStudentPopup';
import LaunchCampaignForm from './LaunchCampaignForm';
import UpdateStudentForm from './UpdateStudentForm';
import CampaignListForm from './CampaignListForm';
import UploadStudentsForm from './UploadStudentsForm';
import AdminListForm from './AdminListForm';
import { Link } from 'react-router-dom';

import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import StudentDatatable from './StudentDatatable';
import {
  useStyles,
  usePaperStyles,
  useformControlStyles,
} from '../../Hooks/StylesHook';

import AddCampaignIcon from '@material-ui/icons/Add';
import GenerateIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import UpdateIcon from '@material-ui/icons/Cached';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UploadIcon from '@material-ui/icons/Publish';
import AuthContext from '../../Context/Auth/AuthContext';
import NotificationContext from '../../Context/Notification/NotificationContext';
import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import ConfirmationDialogue from '../Layout/ConfirmationDialogue';

export default function AdminConsole() {
  const authContext = useContext(AuthContext);
  const { deleteUsers } = authContext;
  const studentContext = useContext(StudentContext);
  const { deleteStudents, checkedStudents, clearCheckedStudnts } =
    studentContext;
  const classes = useStyles();
  const paperClasses = usePaperStyles();
  const formControlClasses = useformControlStyles();

  const [form, setForm] = useState({
    type: null,
    open: false,
  });

  const notificationContext = useContext(NotificationContext);
  const campaignContext = useContext(CampaignContext);
  const { academicYear, getCampaigns, campaigns, setAcademicYear } =
    campaignContext;
  const { setNotification } = notificationContext;

  const handleYearChange = (event) => {
    setAcademicYear(event.target.value);
  };

  useEffect(() => {
    getCampaigns();
    // eslint-disable-next-line
  }, []);

  const handleUpdateStudentFromOpen = () => {
    if (checkedStudents.length === 0) {
      setNotification('Please Select At Least One Student', 'error');
      return;
    } else if (checkedStudents.length > 1) {
      setNotification('Please Select One Student At a Time To Update', 'error');
      return;
    }
    setForm({ type: 'updateStudent', open: true });
  };

  const handleDeleteStudents = () => {
    deleteStudents(checkedStudents);
    deleteUsers(checkedStudents);
    clearCheckedStudnts();
  };
  function renderForm(type) {
    switch (type) {
      case 'updateStudent':
        return <UpdateStudentForm form={form} setForm={setForm} />;
      case 'addStudent':
        return <AddStudentPopup form={form} setForm={setForm} />;
      case 'launchCampaign':
        return <LaunchCampaignForm form={form} setForm={setForm} />;
      case 'uploadStudents':
        return <UploadStudentsForm form={form} setForm={setForm} />;
      case 'campaignList':
        return <CampaignListForm form={form} setForm={setForm} />;
      case 'confirmRemove':
        return (
          <ConfirmationDialogue
            func={handleDeleteStudents}
            content={`This action is irreversable, are you sure that you wish to remove the checked student(s)?`}
            successMsg={'Student(s) Removed Successfully!'}
            isOpen={form.open}
            close={setForm}
          />
        );
      case 'adminList': 
      return  <AdminListForm form={form} setForm={setForm} />;
      default:
        break;
    }
  }
  return (
    <>
      {form && renderForm(form.type)}

      <div className='admin_admin-console'>
        <Paper
          elevation={3}
          className={`${paperClasses.paper} ${classes.mb1} ${classes.sticky}`}
        >
          <div className={`${classes.rowDirection} ${classes.alignItems}`}>
            <FormControl variant='filled' className={formControlClasses.root}>
              <InputLabel id='demo-simple-select-filled-label'>
                Academic Year
              </InputLabel>
              <Select
                labelId='demo-simple-select-filled-label'
                id='demo-simple-select-filled'
                value={academicYear}
                onChange={handleYearChange}
              >
                <MenuItem value=''>
                  <em>All Years</em>
                </MenuItem>
                {campaigns.map((campaign) => (
                  <MenuItem key={campaign._id} value={campaign.academicYear}>
                    {campaign.academicYear}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              type='button'
              color='primary'
              startIcon={<AddIcon />}
              onClick={() => setForm({ type: 'addStudent', open: true })}
            >
              Add Student
            </Button>
            <Button
              type='button'
              color='primary'
              startIcon={<UpdateIcon />}
              onClick={handleUpdateStudentFromOpen}
            >
              Update Student
            </Button>
            <Button
              type='button'
              color='primary'
              startIcon={<DeleteIcon />}
              onClick={() =>
                checkedStudents.length > 0
                  ? setForm({ type: 'confirmRemove', open: true })
                  : setNotification(
                      'Please Select At Least One Student',
                      'error'
                    )
              }
            >
              Remove
            </Button>

            <Button
              type='button'
              color='primary'
              startIcon={<UploadIcon />}
              onClick={() => setForm({ type: 'uploadStudents', open: true })}
            >
              Upload a list of students
            </Button>
            <Button
              type='button'
              variant='outlined'
              color='primary'
              endIcon={<AddCampaignIcon />}
              onClick={() => setForm({ type: 'launchCampaign', open: true })}
            >
              Launch New Campaign
            </Button>
            <Button
              type='button'
              variant='outlined'
              color='primary'
              endIcon={<VisibilityIcon />}
              onClick={() => setForm({ type: 'campaignList', open: true })}
            >
              View Campaigns
            </Button>
                <Button
                type='button'
                variant='outlined'
                color='primary'
                endIcon={<VisibilityIcon />}
                onClick={() => setForm({ type: 'adminList', open: true })}
              >
                View Admins
              </Button>
           
          </div>
        </Paper>

        <StudentDatatable />

        <Paper elevation={3} className={`${paperClasses.paper} ${classes.mt1}`}>
          <div className={classes.justifyRight}>
            <Link to='/decisionReport'>
              <Button
                type='button'
                variant='contained'
                color='primary'
                className={classes.button}
                endIcon={<GenerateIcon />}
              >
                generate report*
              </Button>
            </Link>
          </div>
          <br />
          <p>
            *Only students that are included in the current campaign will be
            included in the report.
          </p>
        </Paper>
      </div>
    </>
  );
}
