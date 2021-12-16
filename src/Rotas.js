import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class Rotas extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          path="/search"
          render={ ({ history }) => <Search history={ history } /> }
        />
        <Route
          path="/album/:id"
          render={ ({ match, history }) => <Album match={ match } history={ history } /> }
        />
        <Route
          path="/favorites"
          render={ ({ history }) => <Favorites history={ history } /> }
        />
        <Route
          exact
          path="/profile"
          render={ ({ history }) => <Profile history={ history } /> }
        />
        <Route
          path="/profile/edit"
          render={ ({ history }) => <ProfileEdit history={ history } /> }
        />
        <Route component={ NotFound } />
      </Switch>
    );
  }
}

export default Rotas;
