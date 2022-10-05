import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { darkModeAction } from '../redux/actions';
import '../App.css';

class Header extends Component {
  totalExpenses = (expenses) => (
    expenses.reduce((acc, curr) => {
      const { currency } = curr;
      return acc + (curr.value * curr.exchangeRates[currency].ask);
    }, 0)
  );

  render() {
    const { email, expenses, dispatch, darkMode } = this.props;
    const total = this.totalExpenses(expenses);
    const headClass = darkMode ? 'header-containerDark' : 'header-container';

    return (
      <div className={ `${headClass} is-justify-content-space-between` }>
        <h1 className="is-size-2 has-text-weight-semibold">TRYBEWALLET</h1>
        <button
          type="button"
          onClick={ () => dispatch(darkModeAction()) }
          className={ darkMode ? 'themeBtnDark' : 'themeBtnLight' }
        >
          <p className={ darkMode ? 'darkMode' : 'lightMode' }>Light mode</p>
          <p className="iconTheme">{!darkMode ? '🌞' : '🌛'}</p>
          <p className={ !darkMode ? 'darkMode' : undefined }>Dark mode</p>
        </button>
        <div className="is-flex email-total-container">
          <h4 data-testid="email-field" className="header-items">{ email }</h4>
          <div className="is-flex valueContainer">
            <h3
              data-testid="total-field"
              className="header-items mx-0"
            >
              { total.toFixed(2) }
            </h3>
            <h3 data-testid="header-currency-field" className="header-items mx-1">BRL</h3>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  darkMode: state.user.darkMode,
});

export default connect(mapStateToProps)(Header);
