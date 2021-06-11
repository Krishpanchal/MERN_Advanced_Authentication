import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Private/PrivateRoute";
import Users from "./screens/Users/Users";

import Login from "./screens/Authentication/Login";
import Signup from "./screens/Authentication/Signup";
import ForgotPassword from "./screens/Authentication/ForgotPassword";
import ResetPassword from "./screens/Authentication/ResetPassword";
import NotFound from "./screens/NotFound";

import "./index.css";
import { isAuthenticated } from "./apiActions/actions";

function App() {
  return (
    <div className='app'>
      <Switch>
        <PrivateRoute path='/' exact Component={Users} />

        <Route path='/login'>
          {isAuthenticated() ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/signup'>
          {isAuthenticated() ? <Redirect to='/' /> : <Signup />}
        </Route>
        <Route path='/forgotPassword'>
          {isAuthenticated() ? <Redirect to='/' /> : <ForgotPassword />}
        </Route>
        <Route path='/resetPassword/:token'>
          {isAuthenticated() ? <Redirect to='/' /> : <ResetPassword />}
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
