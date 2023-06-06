import { useEffect, useState } from 'react';
import { useDebounce } from 'ahooks';
import axios from 'axios';
import { Block } from './components/Block';

function App() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [fromPrice, setFromPrice] = useState(1);
  const [toPrice, setToPrice] = useState(0);

  const FromPriceDebouncedValue = useDebounce(fromPrice, { wait: 500 });

  const fetchPairConversation = async () => {
    try {
      const result = await axios(
        `https://v6.exchangerate-api.com/v6/d4c504b87a075845c1ff4635/pair/${fromCurrency}/${toCurrency}/${fromPrice}`
      );
      setToPrice(result.data.conversion_result);
    } catch (error) {
      console.error('Error: ', error.message);
    }
  };

  useEffect(() => {
    fetchPairConversation();
  }, [fromCurrency, toCurrency, FromPriceDebouncedValue]);

  function onChangeFromCurrency(cur) {
    setFromCurrency(cur);
  }
  function onChangeToCurrency(cur) {
    setToCurrency(cur);
  }

  function onChangeFromPrice(value) {
    setFromPrice(value);
  }
  function onChangeToPrice(value) {
    setToPrice(value);
  }

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={onChangeFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={onChangeToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
