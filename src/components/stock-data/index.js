import React, {useState} from 'react'
import "./index.css";

const fetchStockData = async (date) => {
  const response = await fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`)
  return response.json()
}

const ORDERED_KEYS = [
  'open', 'close', 'high', 'low'
]

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function StockData() {
  const [stockData, setStockData] = useState(null);
  const handleOnSubmit = async e => {
    e.preventDefault()
    const input = document.getElementById('app-input').value;
    const { data } = await fetchStockData(input)
    console.log(`data =>`, data)
    setStockData(data)
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <form onSubmit={handleOnSubmit} className="mr-20">
          <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input"/>
          <button className="" id="submit-button" data-testid="submit-button" type="submit" disabled={false}>Search</button>
        </form>
      </section>
      {stockData && <ul className="mt-50 slide-up-fade-in styled" id="stockData"
           data-testid="stock-data">
        {
          !stockData?.length ?
            <div className="mt-50 slide-up-fade-in" id="no-result"
                 data-testid="no-result">No Results Found</div> :
            stockData?.reduce((acc, item, index) => [
              ...acc,
              ...(ORDERED_KEYS.map(key => <li
                key={`${key}-${index}`}>{`${capitalizeFirstLetter(key)}: ${item[key]}`}</li>))
            ], [])
        }
      </ul>}
    </div>
  );
}
