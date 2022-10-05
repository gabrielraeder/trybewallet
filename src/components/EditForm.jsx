import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { finishEditAction } from '../redux/actions';

class EditForm extends Component {
  state = {
    value: '',
    currency: '',
    method: '',
    tag: '',
    description: '',
  };

  componentDidMount() {
    const { expenses, idToEdit } = this.props;
    const expToEdit = expenses[idToEdit];
    this.setState({
      value: expToEdit.value,
      currency: expToEdit.currency,
      method: expToEdit.method,
      tag: expToEdit.tag,
      description: expToEdit.description,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { state } = this;
    dispatch(finishEditAction(state));
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const methodArray = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagArray = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form
        className="form"
        onSubmit={ this.onSubmitHandler }
      >
        <label htmlFor="value-input">
          Valor:
          <div className="control">
            <input
              className="input is-rounded is-small small-input"
              placeholder="Valor"
              type="text"
              data-testid="value-input"
              id="value-input"
              name="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </div>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            className="input is-rounded is-small"
            placeholder="Descrição"
            type="text"
            data-testid="description-input"
            id="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <div className="control">
            <div className="select">
              <select
                className="input is-rounded is-small smaller-input"
                data-testid="currency-input"
                name="currency"
                id="currencies"
                value={ currency }
                onChange={ this.handleChange }
              >
                { currencies.map((curr) => (
                  <option key={ curr } value={ curr }>{ curr }</option>
                ))}
              </select>
            </div>
          </div>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <div className="control">
            <div className="select">
              <select
                className="input is-rounded is-small medium-input"
                data-testid="method-input"
                id="method"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                { methodArray.map((curr) => (
                  <option key={ curr } value={ curr }>{ curr }</option>
                ))}
              </select>
            </div>
          </div>
        </label>

        <label htmlFor="tag">
          Categoria:
          <div className="control">
            <div className="select">
              <select
                className="input is-rounded is-small medium-input"
                data-testid="tag-input"
                id="tag"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                { tagArray.map((currTag) => (
                  <option key={ currTag } value={ currTag }>{ currTag }</option>
                ))}
              </select>
            </div>
          </div>
        </label>
        <button
          className="button is-medium is-success mt-1 expenseBtn"
          type="submit"
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

EditForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(EditForm);
