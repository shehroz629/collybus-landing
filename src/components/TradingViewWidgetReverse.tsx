"use client";
import React, { useEffect, useRef, memo } from 'react';
import '../styles/tradingview.css';

function TradingViewWidgetReverse() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "BINANCE:BTCUSDT",
              "title": "BTC"
            },
            {
              "proName": "BINANCE:ETHUSDT",
              "title": "ETH"
            },
            {
              "proName": "BINANCE:SOLUSDT",
              "title": "SOL"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR/USD"
            },
            {
              "proName": "FX_IDC:USDJPY",
              "title": "USD/JPY"
            },
            {
              "proName": "FX_IDC:GBPUSD",
              "title": "GBP/USD"
            }
          ],
          "colorTheme": "dark",
          "isTransparent": true,
          "displayMode": "regular",
          "locale": "en",
          "largeChartUrl": "",
          "showSymbolLogo": false,
          "width": "100%",
          "height": 44,
          "scrollDirection": "ltr"
        }`;
      if (container.current) {
        container.current.appendChild(script);
      }
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/markets/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Ticker tape</span>
        </a>
        <span className="trademark"> by TradingView</span>
      </div>
    </div>
  );
}

export default memo(TradingViewWidgetReverse);