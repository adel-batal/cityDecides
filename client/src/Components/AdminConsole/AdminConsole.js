import React, { useState, useEffect, useContext } from 'react';
import AddStudentPopup from './AddStudentPopup';
import LaunchCampaignForm from './LaunchCampaignForm';
import UpdateStudentForm from './UpdateStudentForm';
import CampaignListForm from './CampaignListForm';
import UploadStudentsForm from './UploadStudentsForm';
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

export default function AdminConsole() {
  const studentContext = useContext(StudentContext);
  const authContext = useContext(AuthContext);
  const {
    students,
    deleteStudents,
    checkedStudents,
    clearCheckedStudnts,
    setCurrentStudent,
  } = studentContext;
  const { deleteUsers, loadAdminUser, user } = authContext;
  const classes = useStyles();
  const paperClasses = usePaperStyles();
  const formControlClasses = useformControlStyles();
  const [addStudentPopupOpen, setAddStudentPopupOpen] = useState(false);
  const [updateStudentFormOpen, setUpdateStudentFormOpen] = useState(false);
  const [launchCampaignFormOpen, setLaunchCampaignFormOpen] = useState(false);
  const [viewCampaignsFormOpen, setViewCampaignsFormOpen] = useState(false);
  const [uploadStudentsFormOpen, setUploadStudentsFormOpen] = useState(false);
  const notificationContext = useContext(NotificationContext);
  const campaignContext = useContext(CampaignContext);
  const {
    academicYear,
    getCampaigns,
    campaigns,
    setAcademicYear,
    currentCampaign,
  } = campaignContext;
  const { setNotification } = notificationContext;

  const handleYearChange = (event) => {
    setAcademicYear(event.target.value);
  };
  /*   useEffect(() => {
    if (error === 'user already exists') {
      setNotification(error, 'error', true);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error]); */
  useEffect(() => {
    loadAdminUser();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getCampaigns();
    // eslint-disable-next-line
  }, []);

  const handleAddStudentPopupOpen = () => {
    setAddStudentPopupOpen(true);
  };

  const handleAddStudentPopupClose = () => {
    setAddStudentPopupOpen(false);
  };
  const handleUploadStudentsFromOpen = () => {
    setUploadStudentsFormOpen(true);
  };
  const handleUploadStudentsFormClose = () => {
    setUploadStudentsFormOpen(false);
  };
  const handleUpdateStudentFromOpen = () => {
    if (checkedStudents.length === 0) {
      setNotification('Please Select At Least One Student', 'error', true);
      return;
    } else if ((checkedStudents.length < 1)){
      setNotification(
        'Please Select One Student At a Time To Update',
        'error',
        true
      );
      return;
    }
    setCurrentStudent(checkedStudents[0]);
    setUpdateStudentFormOpen(true);
  };

  const handleLaunchCampaignFormOpen = () => {
    setLaunchCampaignFormOpen(true);
  };
  const handleLaunchCampaignFormClose = () => {
    setLaunchCampaignFormOpen(false);
  };

  const handleViewCampaignsFormOpen = () => {
    setViewCampaignsFormOpen(true);
  };
  const handleViewCampaignsFormClose = () => {
    setViewCampaignsFormOpen(false);
  };

  const handleUpdateStudentFormClose = () => {
    setUpdateStudentFormOpen(false);
  };

  const handleDeleteStudents = () => {
    if (checkedStudents.length < 1) {
      setNotification('Please Select At Least One Student', 'error', true);
    } else {
      deleteStudents(checkedStudents);
      deleteUsers(checkedStudents);
      clearCheckedStudnts();
    }
  };
console.log(user)
  return (
    <>
      {addStudentPopupOpen && (
        <AddStudentPopup
          handleAddStudentPopupClose={handleAddStudentPopupClose}
          addStudentPopupOpen={addStudentPopupOpen}
        />
      )}
      {updateStudentFormOpen && (
        <UpdateStudentForm
          handleUpdateStudentFormClose={handleUpdateStudentFormClose}
          updateStudentFormOpen={updateStudentFormOpen}
        />
      )}
      {launchCampaignFormOpen && (
        <LaunchCampaignForm
          handleLaunchCampaignFormClose={handleLaunchCampaignFormClose}
          launchCampaignFormOpen={launchCampaignFormOpen}
        />
      )}
      {uploadStudentsFormOpen && (
        <UploadStudentsForm
        handleUploadStudentsFormClose={handleUploadStudentsFormClose}
        uploadStudentsFormOpen={uploadStudentsFormOpen}
        />
      )}
      {viewCampaignsFormOpen && (
        <CampaignListForm
          handleViewCampaignsFormClose={handleViewCampaignsFormClose}
          viewCampaignsFormOpen={viewCampaignsFormOpen}
        />
      )}
      <div className='admin_admin-console'>
        <Paper elevation={3} className={`${paperClasses.paper} ${classes.mb1}`}>
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
              onClick={handleAddStudentPopupOpen}
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
              onClick={handleDeleteStudents}
            >
              Remove
            </Button>

            <Button
              type='button'
              color='primary'
              startIcon={<UploadIcon />}
               onClick={handleUploadStudentsFromOpen}
            >
              Upload a list of students
            </Button>
            <Button
              type='button'
              variant='outlined'
              color='primary'
              endIcon={<AddCampaignIcon />}
              onClick={handleLaunchCampaignFormOpen}
            >
              Launch New Campaign
            </Button>
            <Button
              type='button'
              variant='outlined'
              color='primary'
              endIcon={<VisibilityIcon />}
              onClick={handleViewCampaignsFormOpen}
            >
              View Campaigns
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
