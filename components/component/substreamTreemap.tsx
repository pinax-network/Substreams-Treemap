'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import React, { useState } from 'react';
import UnifiedSubstreamsComponent from "./UnifiedSubstreamsComponent";


export function SubstreamTreemap(){
  const [visibleTokens, setVisibleTokens] = useState({
    "Avalanche Token Poly": true,
    "Binance-USD Poly": true,
    "ChainLink Token Poly": true,
    "Uniswap (PoS) Poly": true,
    "SHIBA INU (PoS) Poly": true,
    "Tether USD Poly": true,
    "Avalanche Token Eth": true,
    "Binance-USD Eth": true,
    "ChainLink Token Eth": true,
    "Uniswap (PoS) Eth": true,
    "SHIBA INU (PoS) Eth": true,
    "Tether USD Eth": true,
  });
  
  const toggleTokenVisibility = (tokenKey) => {
    setVisibleTokens((prevTokens) => ({
      ...prevTokens,
      [tokenKey]: !prevTokens[tokenKey],
    }));
  };

  return (
    <Card className="bg-gray-800/80 backdrop-blur-lg border-white/40 px-6 py-6">
      <CardTitle className="text-center text-2xl font-semibold leading-none tracking-tight text-indigo-50 px-4 py-2"> ERC20 Balance Changes for Polygon and Ethereum </CardTitle>
        <UnifiedSubstreamsComponent visibleTokens={visibleTokens} />
        <div className="flex justify-center space-x-2 ">
        <span className= "text-white mt-1" >Polygon : </span>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Tether USD Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Tether USD Poly")}
            style={{ opacity: visibleTokens["Tether USD Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Avalanche"
              className="rounded-lg"
              src="/logos/tether-usdt-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Tether USD
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Avalanche Token Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Avalanche Token Poly")}
            style={{ opacity: visibleTokens["Avalanche Token Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Avalanche"
              className="rounded-lg"
              src="/logos/avalanche-avax-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Avalanche
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Binance-USD Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Binance-USD Poly")}
            style={{ opacity: visibleTokens["Binance-USD Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Binance-USD"
              className="rounded-lg"
              src="/logos/binance-usd-busd-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Binance-USD
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["ChainLink Token Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("ChainLink Token Poly")}
            style={{ opacity: visibleTokens["ChainLink Token Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="ChainLink"
              className="rounded-lg"
              src="/logos/chainlink-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            ChainLink
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Uniswap (PoS) Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Uniswap (PoS) Poly")}
            style={{ opacity: visibleTokens["Uniswap (PoS) Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Uniswap"
              className="rounded-lg"
              src="/logos/uniswap-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Uniswap
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["SHIBA INU (PoS) Poly"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("SHIBA INU (PoS) Poly")}
            style={{ opacity: visibleTokens["SHIBA INU (PoS) Poly"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="SHIBA INU"
              className="rounded-lg"
              src="/logos/shiba-inu-poly.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            SHIBA INU
          </span>
        </Card>
      
        <span className= "text-white mt-1" >Ethereum : </span>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Tether USD Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Tether USD Eth")}
            style={{ opacity: visibleTokens["Tether USD Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Avalanche"
              className="rounded-lg"
              src="/logos/tether-usdt-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Tether USD
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Avalanche Token Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Avalanche Token Eth")}
            style={{ opacity: visibleTokens["Avalanche Token Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Avalanche"
              className="rounded-lg"
              src="/logos/avalanche-avax-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Avalanche
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Binance-USD Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Binance-USD Eth")}
            style={{ opacity: visibleTokens["Binance-USD Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Binance-USD"
              className="rounded-lg"
              src="/logos/binance-usd-busd-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Binance-USD
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["ChainLink Token Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("ChainLink Token Eth")}
            style={{ opacity: visibleTokens["ChainLink Token Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="ChainLink"
              className="rounded-lg"
              src="/logos/chainlink-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            ChainLink
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Uniswap (PoS) Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Uniswap (PoS) Eth")}
            style={{ opacity: visibleTokens["Uniswap (PoS) Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Uniswap"
              className="rounded-lg"
              src="/logos/uniswap-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Uniswap
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["SHIBA INU (PoS) Eth"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("SHIBA INU (PoS) Eth")}
            style={{ opacity: visibleTokens["SHIBA INU (PoS) Eth"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="SHIBA INU"
              className="rounded-lg"
              src="/logos/shiba-inu-eth.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            SHIBA INU
          </span>
        </Card>
      </div>
      <br></br>
    </Card>
    );
}