import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { editor } = this.props;
    return (
      <div>
        <div className="header-form">
          <Header />
          { editor ? <EditForm /> : <WalletForm />}
        </div>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Wallet);
