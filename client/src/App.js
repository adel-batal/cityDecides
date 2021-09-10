import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
import AdminState from './Context/Admin/AdminState';
import setAuthToken from './Utils/setAuthToken';

import AdminPrivateRoute from './Components/Routing/AdminPrivateRoute';
import StudentPrivateRoute from './Components/Routing/StudentPrivateRoute';
import ConfirmationDialogue from './Components/Layout/ConfirmationDialogue';
//load user
function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  return (
    <AuthState>
      <NotificationState>
        <AdminState>
          <StudentState>
            <CampaignState>
              <SelectionsState>
                <div className='app'>
                  <Navbar />
                  <Notifications />
                  <ConfirmationDialogue />
                  <AnimatePresence exitBeforeEnter>
                    <Switch >
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
        </AdminState>
      </NotificationState>
    </AuthState>
  );
}
export default App;
