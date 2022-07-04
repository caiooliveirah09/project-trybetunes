import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from './Loading';

class Login extends React.Component {
  render() {
    const { onInputChange, buttonDisabled, saveUser, name, loading, logged } = this.props;
    if (loading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-login">
        <form>
          <input
            id="name"
            data-testid="login-name-input"
            type="text"
            onChange={ onInputChange }
            value={ name }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonDisabled }
            onClick={ saveUser }
          >
            Entrar
          </button>
        </form>
        { logged && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
};

export default Login;
