import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAction } from '../redux/actions';

const PASSWORD_LENGTH = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabledButton: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        disabledButton: !this.validateButton(),
      });
    });
  };

  validateEmail = (email) => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]/;
    return regex.test(email);
  };

  validatePassword = (password) => password.length >= PASSWORD_LENGTH;

  validateButton = () => {
    const { email, password } = this.state;
    return this.validateEmail(email) && this.validatePassword(password);
  };

  handleSubmit = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginAction(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabledButton } = this.state;

    return (
      <div className="modal is-active">
        <h1 className="is-size-1">Trybe Wallet</h1>
        <label htmlFor="email" className="field">
          EMAIL:
          <div className="control has-icons-left has-icons-right">
            <input
              data-testid="email-input"
              type="text"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              className="input is-rounded"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
        </label>

        <label htmlFor="password" className="field">
          PASSWORD:
          <div className="control has-icons-left has-icons-right">
            <input
              data-testid="password-input"
              type="text"
              id="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              className="input is-rounded"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-user" />
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check" />
            </span>
          </div>
        </label>
        <br />
        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              onClick={ this.handleSubmit }
              disabled={ disabledButton }
              className="button is-success"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
