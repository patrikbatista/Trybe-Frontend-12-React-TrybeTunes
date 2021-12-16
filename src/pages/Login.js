import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
// import Header from './components/Header';
import Loading from './components/Loading';
import logotrybe from '../images/trybe-tunes.svg';
import '../styles/login.css';

const MIN_CHARACTERS = 3;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeButton = this.handleChangeButton.bind(this);

    this.state = {
      name: '',
      loading: false,
      logIn: false,
    };
  }

  // Captura e muda o estado digitado pelo usuário no campo de input
  handleChangeInput({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  // funcao que altera o estado do loading e login
  handleChangeButton() {
    const { name } = this.state;
    this.setState({ loading: true });
    const user = { name };
    createUser(user).then(() => this.setState({ loading: false, logIn: true }));
  }

  render() {
    const { name, loading, logIn } = this.state;
    return (
      <div>
        <div>
          {loading === false ? null : <Loading /> }
          {logIn ? <Redirect to="/search" /> : null}
        </div>
        <div data-testid="page-login" className="container-login ">
          <Form action="" className="formulario">
            <div>
              <img
                src={ logotrybe }
                width="90"
                height="90"
                // className="d-inline-block align-top"
                alt="trybeTunes logo"
              />
            </div>
            <Form.Label htmlFor="inputText">
              <Form.Control
                className="input"
                size="sm"
                data-testid="login-name-input"
                type="text"
                value={ name }
                name="name"
                onChange={ this.handleChangeInput }
              />
            </Form.Label>
            <Button
              className="button"
              size="sm"
              variant="success"
              type="button"
              data-testid="login-submit-button"
              onClick={ this.handleChangeButton }
              disabled={ name.length < MIN_CHARACTERS }
            >
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
