import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
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
import CampaignState from './Context/Campaign/CampaignState';
import SelectionsState from './Context/Selections/SelectionsState';
import setAuthToken from './Utils/setAuthToken';

import AdminPrivateRoute from './Components/Routing/AdminPrivateRoute';
import StudentPrivateRoute from './Components/Routing/StudentPrivateRoute';

//load user
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  /* const location = useLocation() */;

  return (
    <AuthState>
      <NotificationState>
        <StudentState>
          <CampaignState>
            <SelectionsState>
              <div className='app'>
                <Navbar />
                <Notifications />
                <AnimatePresence exitBeforeEnter>
                  <Switch /* location={location} key={location.pathname} */>
                    <StudentPrivateRoute
                      exact
                      path={'/unitSelection'}
                      component={UnitSelection}
                    />
                    <StudentPrivateRoute
                      exact
                      path={'/trackSelection'}
                      component={TrackSelection}
                    />
                    <StudentPrivateRoute
                      exact
                      path={'/selectionReport'}
                      component={StudentSelectionReport}
                    />
                    <AdminPrivateRoute
                      path='/adminConsole'
                      component={AdminConsole}
                    />

                    <AdminPrivateRoute
                      path='/decisionReport'
                      component={DecisionReport}
                    />
                    <Route exact path='/' component={Login} />
                  </Switch>
                </AnimatePresence>
                <Footer />
              </div>
            </SelectionsState>
          </CampaignState>
        </StudentState>
      </NotificationState>
    </AuthState>
  );
}
export default App;
