import React, { useState } from 'react';
import {
  Switch,
  Route,
  useLocation,
  BrowserRouter as Router,
} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './Components/Auth/Login';
import './Styles/app.css';
import TrackSelection from './Components/StudentViews/TrackSelection';
import UnitSelection from './Components/StudentViews/UnitSelection';
import StudentSelectionReport from './Components/StudentViews/StudentSelectionReport';
import AdminConsole from './Components/AdminConsole/AdminConsole';
import DecisionReport from './Components/AdminConsole/DecisionReport';
import Footer from './Components/Layout/Footer';
import Navbar from './Components/Layout/Navbar';
import Notifications from './Components/Layout/Notifications';
import StudentState from './Context/Student/StudentState';
import AuthState from './Context/Auth/AuthState';
import NotificationState from './Context/Notification/NotificationState';
import setAuthToken from './Utils/setAuthToken';

import PrivateRoute from './Components/Routing/PrivateRoute';
import AdminPrivateRoute from './Components/Routing/AdminPrivateRoute';

//load user

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const location = useLocation();
  const [tracks, updateTracks] = useState(sampleTracks);
  const [units, updateUnits] = useState(sampleUnits);

  return (
    <AuthState>
      <NotificationState>
        <StudentState>
          <div className='app'>
            <Navbar />
            <Notifications />
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path='/login' component={Login} />
                <PrivateRoute
                  exact
                  path={'/unitSelection'}
                  component={UnitSelection}
                  data={{
                    units,
                    updateUnits,
                  }}
                />
                <PrivateRoute
                  exact
                  path={'/trackSelection'}
                  component={TrackSelection}
                  data={{
                    tracks,
                    updateTracks,
                  }}
                />
                <PrivateRoute
                  exact
                  path={'/selectionReport'}
                  component={StudentSelectionReport}
                  data={{
                    tracks,
                    units,
                  }}
                />

                <AdminPrivateRoute
                  path='/adminConsole'
                  component={AdminConsole}
                />

                <AdminPrivateRoute
                  path='/decisionReport'
                  component={DecisionReport}
                  data={{
                    tracks,
                    units,
                  }}
                />
              </Switch>
            </AnimatePresence>
            <Footer />
          </div>
        </StudentState>
      </NotificationState>
    </AuthState>
  );
}
export default App;

const sampleTracks = [
  {
    id: '1',
    name: 'General',
  },
  {
    id: '2',
    name: 'Internet Computing',
  },
  {
    id: '3',
    name: 'Business Informatics',
  },
];

const sampleUnits = [
  {
    id: 1,
    name: 'Software Engineering',
  },
  {
    id: 2,
    name: 'Data Structures and Algorithms',
  },
  {
    id: 3,
    name: 'Web Development',
  },
  {
    id: 4,
    name: 'Operating Systems',
  },
  {
    id: 5,
    name: 'Network Security',
  },
  {
    id: 6,
    name: 'Object Oriented Programming',
  },
];
