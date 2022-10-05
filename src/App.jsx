import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    const { darkMode } = this.props;
    return (
      <div className={ `fullWidth ${darkMode ? 'darkTheme' : undefined}` }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/carteira" component={ Wallet } />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  darkMode: state.user.darkMode,
});

export default connect(mapStateToProps)(App);
