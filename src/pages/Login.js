import React from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

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
      <div data-testid="page-login">
        <Header />
        {loading === false ? null : <Loading /> }
        {logIn ? <Redirect to="/search" /> : null}
        <form action="">
          <label htmlFor="inputText">
            <input
              data-testid="login-name-input"
              type="text"
              value={ name }
              name="name"
              onChange={ this.handleChangeInput }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleChangeButton }
            disabled={ name.length < MIN_CHARACTERS }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
