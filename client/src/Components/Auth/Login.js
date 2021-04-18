import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import {
  Grid,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { motion } from 'framer-motion';

import { useStyles } from '../../Hooks/StylesHook';
import { SlideInOut } from '../../Animations/SlideAnimation';
import cityLogo from '../../Images/city-logo.png';
import axios from 'axios';
import NotificationContext from '../../Context/Notification/NotificationContext';

export default function Login() {
  const classes = useStyles();
  const notificationContext = useContext(NotificationContext);
  const { setNotification } = notificationContext;
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const { email, password, showPassword } = loginData;
  const [clickedLoginBtn, setClickedLoginButton] = useState('');

  const handleChange = (prop) => (e) => {
    setLoginData({ ...loginData, [prop]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setLoginData({ ...loginData, showPassword: !showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleSignIn = (e) => {
    if (email === '' || password === '') {
      setNotification('Please enter all fields', 'error', true);
      return;
    }
    if (clickedLoginBtn === 'studentLogin') {
      const signedInStudent = {
        email: email,
        password: password,
      };

      axios
        .post('http://localhost:5000/students/studentLogin', signedInStudent)
        .then((res) => console.log(res.data));
    } else if (clickedLoginBtn === 'adminLogin') {
      const signedInAdmin = {
        email: email,
        password: password,
      };

      axios
        .post('http/localhost:5000/admins/adminLogin', signedInAdmin)
        .then((res) => console.log(res.data));
    }
    setLoginData({ email: '', password: '' });
  };
  return (
    <motion.div initial='initial' animate='in' exit='out' variants={SlideInOut}>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
        className='centered-container standard-container'
      >
        <img src={cityLogo} alt='city-logo' width='150px' />
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={handleSignIn}
        >
          <Grid
            container
            direction='column'
            justify='space-between'
            alignItems='center'
          >
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
            >
              <InputLabel htmlFor='email'>Email</InputLabel>
              <OutlinedInput
                name='email'
                label='email'
                autoComplete='email'
                id='email'
                value={email}
                onChange={handleChange('email')}
                autoFocus
                required
              />
              <FormHelperText id='component-helper-text'>
                Some important helper text
              </FormHelperText>
            </FormControl>

            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant='outlined'
            >
              <InputLabel htmlFor='password'>Password</InputLabel>
              <OutlinedInput
                autoComplete='current-password'
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handleChange('password')}
                required
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
          </Grid>
          <Grid container direction='row' justify='center' alignItems='center'>
            <div className={classes.root}>
              <Link to='/trackSelection'>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleSignIn}
                  onMouseOver={() => setClickedLoginButton('studentLogin')}
                >
                  Student Login
                </Button>
              </Link>
              <Link to='/adminConsole'>
                <Button
                  variant='outlined'
                  color='primary'
                  onClick={handleSignIn}
                  onMouseOver={() => setClickedLoginButton('adminLogin')}
                >
                  Admin Login
                </Button>
              </Link>
            </div>
          </Grid>
        </form>
      </Grid>
    </motion.div>
  );
}
