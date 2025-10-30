import './styles.css'
import { useEffect, useState } from 'react'

const API_URL = 'https://api.frankfurter.app/latest'

function App() {
  return (
    <div className="App">
      <CurrencyConverter />
    </div>
  )
}

function CurrencyConverter() {
  const [amount, setAmount] = useState('')
  const [fromCur, setFromCur] = useState('EUR')
  const [toCur, setToCur] = useState('USD')
  const [result, setResult] = useState(null)
  const [rate, setRate] = useState(null)

  useEffect(
    function () {
      async function convert() {
        try {
          const res = await fetch(
            `${API_URL}?amount=${amount}&from=${fromCur}&to=${toCur}`
          )
          const data = await res.json()
          
          if (!res.ok || !data || !data.rates || data.rates[toCur] === undefined) {
            setResult(null)
            setRate(null)
            return
          }
          setResult(data.rates[toCur])
          setRate((data.rates[toCur] / amount).toFixed(4))
        } catch (err) {
          console.error(err)
          setResult(null)
          setRate(null)
        }
      }

      if (!amount || amount <= 0) {
        setResult(null)
        setRate(null)
        return
      }

      if (fromCur === toCur) {
        setResult(amount)
        setRate(1)
        return
      }

      convert()
    },
    [amount, fromCur, toCur]
  )

  function handleReset() {
    setAmount('')
    setFromCur('EUR')
    setToCur('USD')
    setResult(null)
    setRate(null)
  }

  return (
    <div className="converter-container">
      <div className="header">
        <h1>Currency Converter</h1>
        <p className="subtitle">Convert currencies with live exchange rates</p>
      </div>
      
      <div className="input-section">
        <AmountInput amount={amount} onSetAmount={setAmount} />
        <FromCurrencySelect currency={fromCur} onSelect={setFromCur} />
        <ToCurrencySelect currency={toCur} onSelect={setToCur} />
      </div>

      {result !== null && amount > 0 && (
        <div className="results-section">
          <Output 
            amount={amount} 
            fromCur={fromCur} 
            result={result} 
            toCur={toCur}
            rate={rate}
          />
          <Reset onReset={handleReset} />
        </div>
      )}
    </div>
  )
}

function AmountInput({ amount, onSetAmount }) {
  return (
    <div className="input-group">
      <label>Amount</label>
      <input
        type="number"
        inputMode="decimal"
        step="any"
        min="0"
        placeholder="0.00"
        value={amount}
        onChange={(e) => onSetAmount(e.target.value === '' ? '' : parseFloat(e.target.value))}
      />
    </div>
  )
}

function FromCurrencySelect({ currency, onSelect }) {
  return (
    <div className="input-group">
      <label>From Currency</label>
      <div className="select-wrapper">
        <select
          value={currency}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </div>
    </div>
  )
}

function ToCurrencySelect({ currency, onSelect }) {
  return (
    <div className="input-group">
      <label>To Currency</label>
      <div className="select-wrapper">
        <select
          value={currency}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
        </select>
      </div>
    </div>
  )
}

function Output({ amount, fromCur, result, toCur, rate }) {
  return (
    <div className="output">
      <div className="output-row">
        <span className="output-label">Original Amount:</span>
        <span className="output-value">{amount.toFixed(2)} {fromCur}</span>
      </div>
      <div className="output-row converted">
        <span className="output-label">Converted Amount:</span>
        <span className="output-value">{result.toFixed(2)} {toCur}</span>
      </div>
      {rate && (
        <div className="output-row rate">
          <span className="output-label">Exchange Rate:</span>
          <span className="output-value">1 {fromCur} = {rate} {toCur}</span>
        </div>
      )}
    </div>
  )
}

function Reset({ onReset }) {
  return <button onClick={onReset}>Reset</button>
}

export default App
