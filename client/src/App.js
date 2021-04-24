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
        <div className='app'>
          <Navbar />
          <Notifications />
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.pathname}>
              <Route
                path='/unitSelection'
                render={(props) => (
                  <UnitSelection
                    {...props}
                    units={units}
                    updateUnits={updateUnits}
                  />
                )}
              />
              <Route
                path='/trackSelection'
                render={(props) => (
                  <TrackSelection
                    {...props}
                    tracks={tracks}
                    updateTracks={updateTracks}
                  />
                )}
              />
              <Route
                path='/selectionReport'
                render={(props) => (
                  <StudentSelectionReport
                    {...props}
                    tracks={tracks}
                    units={units}
                  />
                )}
              />

              <Route exact path='/' component={Login} />
              <StudentState>
                <Route path='/adminConsole' component={AdminConsole} />

                <Route path='/decisionReport' component={DecisionReport} />
              </StudentState>
            </Switch>
          </AnimatePresence>
          <Footer />
        </div>
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
    id: '1',
    name: 'Data Structures and Algorithms',
  },
  {
    id: '2',
    name: 'Object Oriented Programming',
  },
  {
    id: '3',
    name: 'Web Development',
  },
  {
    id: '4',
    name: 'Operating Systems',
  },
  {
    id: '5',
    name: 'Software Engineering',
  },
  {
    id: '6',
    name: 'Network Security',
  },
];
