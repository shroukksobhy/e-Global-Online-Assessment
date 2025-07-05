import React from "react";
import "./index.css";

export default function StockData() {
  let [date, setDate] = React.useState("");
  let [stockData, setStockData] = React.useState([]);
  let [$message, setMessage] = React.useState([""]);
  function handleDateChange(event) {
    setDate(event.target.value);
  }
  function handleFetchStockData() {
    if(!date) {
      document.getElementById("no-result").innerText = "Please enter a date.";
      document.getElementById("no-result").style.display = "block";
      return;
    }
    setStockData([]); 

    fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${date}`)
      .then(response => response.json())
      .then(data => {
        console.log("Response data:", data);
        if (data.data[0]&& data.data.length > 0) {
          setStockData(data.data[0]); // Assuming the first item contains the stock data
          console.log("Stock data fetched successfully:", data);
          document.getElementById("no-result").style.display = "none";
        } else {
          setStockData([]);
          console.log("No stock data found for the selected date.");
          setMessage("No stock data found for the selected date.");
        }
      })
      .catch(error => {
        console.error("Error fetching stock data:", error);
        setStockData([]);
    
        setMessage("Error fetching stock data.");
      });
  }
  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="text" className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input"
          value={date} 
          onChange={handleDateChange} 
        />
        <button className="" id="submit-button" data-testid="submit-button"
          onClick={handleFetchStockData} 
        >Search</button>
      </section>
      {stockData&&
        <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          <li className="py-10">Open: ${stockData.open}</li>
          <li className="py-10">Close: ${stockData.close}</li>
          <li className="py-10">High: ${stockData.high}</li>
          <li className="py-10">Low: ${stockData.low}</li>
        </ul>
      }

      <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">{$message}</div>
    </div>
  );
}
