import React, { useContext, useState, useEffect } from 'react';

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
import NotificationContext from '../../Context/Notification/NotificationContext';

import AuthContext from '../../Context/Auth/AuthContext';

export default function Login(props) {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const notificationContext = useContext(NotificationContext);
  const { setNotification } = notificationContext;
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    showPassword: false,
  });
  const { user, login, error, clearErrors, isAuthenticated } = authContext;

  const { email, password, showPassword } = loginData;
  //experimental
  useEffect(() => {
    if (isAuthenticated) {
      user && user.role === 'admin'
        ? props.history.push('/adminConsole')
        : props.history.push('/trackSelection')
    }
    if (error === 'invalid credentials') {
      setNotification(error, 'error', true);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

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
    e.preventDefault();
    if (email === '' || password === '') {
      setNotification('Please fill in all fields', 'error', true);
      return;
    }
    login({
      email,
      password,
    });

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
            <div className={`${classes.fullWidth} ${classes.mt1}`}>
              <Button
                className={classes.btnFullWidth}
                variant='outlined'
                color='primary'
                onClick={handleSignIn}
              >
                Login
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </motion.div>
  );
}
