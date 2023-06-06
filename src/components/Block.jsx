const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP', 'PLN'];

export const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => (
  <div className="block">
    <ul className="currencies">
      {defaultCurrencies.map((cur) => (
        <li
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? 'active' : ''}
          key={cur}
        >
          {cur}
        </li>
      ))}
    </ul>
    <input
      onChange={(event) => onChangeValue(event.target.value)}
      value={value}
      type="number"
      placeholder={0}
    />
  </div>
);
