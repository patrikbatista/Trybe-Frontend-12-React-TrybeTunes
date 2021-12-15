import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      loading: true,
    };
  }

  componentDidMount() {
    getUser().then((user) => { this.setState({ user, loading: false }); });
  }

  render() {
    const { user, loading } = this.state;
    const { name } = user;
    console.log(user.name);
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : null}
        <h3 data-testid="header-user-name">
          {name}
        </h3>
        <nav>
          <Link data-testid="link-to-search" to="/search"> Search </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        </nav>

      </header>
    );
  }
}

export default Header;
