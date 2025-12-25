import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Select, Modal, message } from "antd";
import "./App.css";
import "animate.css";


function App() {
  //Hookslar
  const [rates, setRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("AZN");
  const [amount, setAmount] = useState("0");
  const [convertedAmount, setConvertedAmount] = useState("0");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRates();
  }, []);

  const API_URL =
    "https://v6.exchangerate-api.com/v6/830c6d13ea14f7c7ad325357/latest/USD";
  //API Cekme
  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setRates(response.data.conversion_rates);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch exchange rates");
    }
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  const currencyOptions = Object.keys(rates).map((currency) => ({
    label: currency,
    value: currency,
  }));

  const swapCurrencies = ()=>{
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  //Hesablama Hissesi
  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const result = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(result.toFixed(3));
    }
  });

  return (
    <div className="container">
      <h1 className="animate__animated animate__fadeIn ">Currency Convertor</h1>
      {loading && (
        <div class="coin ">
          <span class="engraving">$</span>
        </div>
      )}
      <div className="box animate__animated animate__fadeInUp ">
        <div className="buttons-group">
          <Select
            showSearch
            size="large"
            style={{ width: 120 }}
            value={fromCurrency}
            options={currencyOptions}
            onChange={(value) => setFromCurrency(value)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
          <Button type="primary" shape="circle" icon={<i className="fa-solid fa-right-left"></i>} size="large" onClick={swapCurrencies} />
          <Select
            showSearch
            size="large"
            style={{ width: 120 }}
            value={toCurrency}
            options={currencyOptions}
            onChange={(value) => setToCurrency(value)}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
          />
        </div>
        <input
          className="amount-input"
          placeholder="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="result-group">
          <h3>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
