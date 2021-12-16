import PropTypes from 'prop-types';
import React from 'react';
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../../services/userAPI';

import logotrybe from '../../images/trybe-tunes.svg';
import avatar from '../../images/default-avatar.svg';

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
    const { history } = this.props;
    const { name } = user;
    console.log(user.name);
    return (
      <header className="sticky-top">
        {loading ? <Loading /> : null}
        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand>
              <img
                onClick={ () => history.push('/') }
                src={ logotrybe }
                width="50"
                height="50"
                // className="d-inline-block align-top"
                alt="trybeTunes logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={ { maxHeight: '100px' } }
                navbarScroll
              />
              <Badge pill bg="light" text="dark">
                <img

                  src={ avatar }
                  width="20"
                  height="20"
                  alt="avatar logo"
                />
                {name}
              </Badge>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Navbar bg="dark">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={ { maxHeight: '100px' } }
                navbarScroll
              />
              <div className="d-flex flex-fill">
                <Button
                  className="p-2 flex-fill"
                  size="sm"
                  variant="outline-success"
                  onClick={ () => history.push('/search') }
                >
                  Pesquisar

                </Button>

                <Button
                  className="p-2 flex-fill"
                  size="sm"
                  variant="outline-success"
                  onClick={ () => history.push('/favorites') }
                >
                  Favoritos

                </Button>
                <Button
                  className="p-2 flex-fill"
                  size="sm"
                  variant="outline-success"
                  onClick={ () => history.push('/profile') }
                >
                  Perfil

                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
    );
  }
}

Header.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
