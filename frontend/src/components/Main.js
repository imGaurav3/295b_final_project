import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login/Login';

import Signup from './Signup/Signup';

import MusicRecommendation from './Music/MusicRecommendation';
import MovieRecommendation from './Movie/MovieRecommendation';
import SignInQuestionnaire from "./SignInQuestionnaire/SignInQuestionnaire";
import PageOne from './SignUpQuestionnaires/PageOne';
import Dashboard from './Dashboard/Dashboard';

// import Users from './User/User'; 
// import AdminChartsDashboard from './AdminDashboard/AdminChartsDashboard';
// import AdminConsole from './AdminDashboard/AdminConsole';
// import Adminlogin from './Adminlogin/Adminlogin';
// import UserDashboard from './UserDashboard/UserDashboard';
// import DisplayTableComponent from './UserDashboard/DisplayTable';
// import MyActivities from './MyActivities/MyActivities';
// import BookClass from './BookClass/BookClass';

class Main extends PureComponent {
  render() {
    return (
      <div>
        {/* <SignInQuestionnaire/> */}
        <Switch>
          {/* Render Different Component based on Route */}
          <Route exact path='/login' component={Login} />
          
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/signinquestions" component={SignInQuestionnaire} />
          <Route exact path="/signupquestions_a" component={PageOne} />
          <Route exact path='/music' component={MusicRecommendation} />
          <Route exact path='/movie' component={MovieRecommendation} />
          <Route exact path='/dashboard' component={Dashboard} />

          {/* <Route exact path='/' component={Users} /> */}
          {/* <Route
            exact
            path='/admin/dashboard'
            component={AdminChartsDashboard}
          /> */}
          {/* <Route exact path='/adminlogin' component={Adminlogin} /> */}
          {/* <Route exact path='/admin/console' component={AdminConsole} />
          <Route exact path='/userdashboard' component={UserDashboard} /> */}
          {/* <Route exact path='/bookclass' component={BookClass} />
          <Route exact path='/myactivities' component={MyActivities} />
          <Route exact path='/classtable' component={DisplayTableComponent} /> */}

        </Switch>
      </div>
    );
  }
}
// Export The Main Component
export default Main;
