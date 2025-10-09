import React from "react";
import "../styles/tradingview.css";

const symbols = [
  { title: "BTC/USDT", price: "64,120", change: "+0.8%", icon: "btc" },
  { title: "ETH/USDT", price: "3,420", change: "-1.2%", icon: "ethereum" },
  { title: "SOL/USDT", price: "189", change: "+2.1%", icon: "solana" },
  { title: "DOGE/USDT", price: "0.099", change: "+0.02%", icon: "dogecoin" },
  { title: "SHIB/USDT", price: "0.00001195", change: "-6.81%", icon: "shiba-inu" },
  { title: "WLD/USDT", price: "1.191", change: "-6.81%", icon: "worldcoin" },
  { title: "LTC/USDT", price: "72.5", change: "+1.2%", icon: "litecoin" },
  { title: "RPL/USDT", price: "22.1", change: "-0.5%", icon: "rocket-pool" },
  { title: "SUI/USDT", price: "0.45", change: "+0.3%", icon: "sui" },
  { title: "WLFI/USDT", price: "0.12", change: "+0.1%", icon: "usdt" },
];

export default function CustomBottomTicker() {
  return (
    <div className="custom-ticker-container">
      <div className="custom-ticker-marquee">
        {[...symbols, ...symbols].map((s, i) => (
          <span key={i} className="custom-ticker-item">
            <img
              src={`https://cryptologos.cc/logos/${s.icon}-logo.png?v=029`}
              alt={s.title}
              style={{ width: "1.5em", height: "1.5em", marginRight: "0.5em", verticalAlign: "middle" }}
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="custom-ticker-title">{s.title}</span>
            <span className="custom-ticker-price">{s.price}</span>
            <span className={`custom-ticker-change ${s.change.startsWith("-") ? "down" : "up"}`}>{s.change}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
