import { Router, Switch, Link, Redirect, Route } from 'react-router-dom';
import './App.css';
import history from './history';

import ProtectedRoute from './routes/protectedRoute';
import PrivateRoute from './routes/privateRoute';

import CommonLayout from './layout';

import LoginLayout from './layout/loginLayout';

function App() {
  return (
    <div className='App'>
      <Router history={history}>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/login' />
          </Route>
          <PrivateRoute path='/dashboard' component={CommonLayout} />
          <ProtectedRoute path='/login' component={LoginLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
