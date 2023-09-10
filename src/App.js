import React, { useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './App.css'; 

function App() {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);

  const graphStyle = {

    width: '80%', 
    height: '500px',
    margin: '0 auto', 
  };

  const fetchData = async () => {
    try {
      const apiKey = 'sk_3da5aecbd63c4d2db6620ae7b811ada0';
      const response = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${apiKey}`
      );

      const stockData = response.data;
      const dates = stockData.map(item => item.date);
      const prices = stockData.map(item => item.close);

      setData([{ x: dates, y: prices, type: 'scatter', mode: 'lines+markers', name: symbol }]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      if (fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
      setFullscreen(!fullscreen);
    }
  };


  return (
    <div  className="App">
      <h1>My Graph Monitor</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        />
        <button onClick={fetchData}>Search</button>
      </div>
      <button className="fullscreen-button" onClick={toggleFullscreen}>
        {fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      </button>
      <div className="Graph" style={graphStyle}>
        {data ? (
          <Plot
            data={data}
            layout={{
              title: `Stock Price for ${symbol}`,
              xaxis: { title: 'Date/Time' },
              yaxis: { title: 'Price (USD)' },
            }}
          />
        ) : null}
      </div>
      <div className='footer-info'>
        <a href='#'>Made by :- Saurabh Shinde</a> " "
        <a href="https://github.com/SSAnalyst">GitHub</a> " "
        <a href="https://www.linkedin.com/in/saurabh-shinde-4b4645192/">LinkedIn</a>
          </div>
    </div>
  );
}

export default App;