import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyAPI, fetchExchangeRates } from '../redux/actions';

const INITIAL_TAG = 'Alimentação';
const INITIAL_METHOD = 'Dinheiro';
const INITIAL_CURRENCY = 'USD';

class WalletForm extends Component {
  state = {
    value: '',
    currency: INITIAL_CURRENCY,
    method: INITIAL_METHOD,
    tag: INITIAL_TAG,
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAPI());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchExchangeRates(this.state));
    this.setState({
      value: '',
      description: '',
      currency: INITIAL_CURRENCY,
      method: INITIAL_METHOD,
      tag: INITIAL_TAG,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, darkMode } = this.props;

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
                className="input is-rounded is-small pay-input"
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
          className={ `button is-medium mt-2
          ${darkMode ? 'expenseBtnDark' : 'expenseBtn'}` }
          type="submit"
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  darkMode: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  darkMode: state.user.darkMode,
});

export default connect(mapStateToProps)(WalletForm);
