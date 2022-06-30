import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/Authentication/PrivateRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>

          <Route path="/home">
            <HomePage></HomePage>
          </Route>

          <Route path="/login">
            <LoginPage></LoginPage>
          </Route>

          <PrivateRoute path="/dashboard">
            <DashboardPage></DashboardPage>
          </PrivateRoute>

          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
