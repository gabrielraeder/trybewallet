import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromWalletAction, editWalletAction } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch, editor, idToEdit, darkMode } = this.props;
    const whiteTheme = 'table is-striped is-hoverable is-bordered is-fullwidth';
    const darkTheme = 'table is-bordered is-fullwidth darkTheme';
    return (
      <div className="tableContainer">
        { expenses.length > 0 && (
          <table className={ darkMode ? darkTheme : whiteTheme }>
            <thead className="table-head">
              <tr>
                <th>Descrição</th>
                <th>Tag</th>
                <th>Método de pagamento</th>
                <th>Valor</th>
                <th>Moeda</th>
                <th>Câmbio utilizado</th>
                <th>Valor convertido</th>
                <th>Moeda de conversão</th>
                <th>Editar/Excluir</th>
              </tr>
            </thead>
            <tbody>
              { expenses.map((exp) => (
                <tr key={ exp.id }>
                  <td>{ exp.description }</td>
                  <td>{ exp.tag }</td>
                  <td>{ exp.method }</td>
                  <td>{ Number(exp.value).toFixed(2) }</td>
                  <td>{ exp.exchangeRates[exp.currency].name }</td>
                  <td>{ Number(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                  <td>
                    {
                      Number(exp.value * exp.exchangeRates[exp.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      className="editButton"
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => dispatch(editWalletAction(exp.id)) }
                    >
                      Editar
                    </button>
                    <button
                      className="delete is-medium has-background-danger excludeBtn"
                      data-testid="delete-btn"
                      type="button"
                      disabled={ editor && idToEdit === exp.id }
                      onClick={ () => dispatch(removeFromWalletAction(exp.id)) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        ) }
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  darkMode: state.user.darkMode,
});

export default connect(mapStateToProps)(Table);
