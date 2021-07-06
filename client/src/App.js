import React, { useContext } from 'react';
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
import setAuthToken from './Utils/setAuthToken';

import AdminPrivateRoute from './Components/Routing/AdminPrivateRoute';
import StudentPrivateRoute from './Components/Routing/StudentPrivateRoute';





//load user
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const location = useLocation();
  
  return (
    <AuthState>
      <NotificationState>
        <StudentState>
          <CampaignState>
            <div className='app'>
              <Navbar />
              <Notifications />
              <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route exact path='/login' component={Login} />
                  <StudentPrivateRoute
                    exact
                    path={'/unitSelection'}
                    component={UnitSelection}
                    data={{
                     /*  units, */
                    }}
                  />
                  <StudentPrivateRoute
                    exact
                    path={'/trackSelection'}
                    component={TrackSelection}
                    data={{
                      /* tracks, */
                    }}
                  />
                  <StudentPrivateRoute
                    exact
                    path={'/selectionReport'}
                    component={StudentSelectionReport}
                    data={{
                      /* tracks,
                      units, */
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
                      /* tracks,
                      units, */
                    }}
                  />
                </Switch>
              </AnimatePresence>
              <Footer />
            </div>
          </CampaignState>
        </StudentState>
      </NotificationState>
    </AuthState>
  );
}
export default App;
