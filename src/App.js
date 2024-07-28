// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from 'react'
import './styles.css'

const API_URL = 'https://api.frankfurter.app/latest'

export default function App() {
  const [amount, setAmount] = useState(1)
  const [fromCur, setFromCur] = useState('EUR')
  const [toCur, setToCur] = useState('USD')
  const [result, setResult] = useState('')

  useEffect(
    function () {
      async function convert() {
        const res = await fetch(
          `${API_URL}?amount=${amount}&from=${fromCur}&to=${toCur}`
        )
        const data = await res.json()
        console.log(data)
        setResult(data.rates[toCur])
      }

      if (fromCur === toCur) return setResult(amount)
      convert()
    },
    [amount, fromCur, toCur]
  )

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      <input
        type="text"
        value={amount}
        onChange={(e) =>
          setAmount(isNaN(Number(e.target.value)) ? '' : Number(e.target.value))
        }
        onFocus={(e) => e.target.select()}
      />
      <div className="select-wrapper">
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
          <option value="USD">USD (US)</option>
          <option value="GBP">GBP (UK)</option>
          <option value="EUR">EUR (Europe)</option>
          <option value="CAD">CAD (Canada)</option>
        </select>
      </div>
      <div className="select-wrapper">
        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD (US)</option>
          <option value="GBP">GBP (UK)</option>
          <option value="EUR">EUR (Europe)</option>
          <option value="CAD">CAD (Canada)</option>
        </select>
      </div>
      <p>
        {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCur}
      </p>
    </div>
  )
}
