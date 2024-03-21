'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import SubstreamsComponent from '@/components/component/substreamComponent';
import {Treemap} from '@/components/component/treemap';
import React, { useState } from 'react';


export function SubstreamTreemap(){
  const [visibleTokens, setVisibleTokens] = useState({
    "Avalanche Token": true,
    "Binance-USD": true,
    "ChainLink Token": true,
    "Uniswap (PoS)": true,
    "SHIBA INU (PoS)": true,
  });
  
  const toggleTokenVisibility = (tokenKey) => {
    setVisibleTokens((prevTokens) => ({
      ...prevTokens,
      [tokenKey]: !prevTokens[tokenKey],
    }));
  };

  return (
    <Card className="bg-gray-800/70 backdrop-blur-lg border-white/40">
        <SubstreamsComponent visibleTokens={visibleTokens} />
        <div className="flex justify-center space-x-2">
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Avalanche Token"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Avalanche Token")}
            style={{ opacity: visibleTokens["Avalanche Token"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Avalanche"
              className="rounded-lg"
              src="/logos/avalanche-avax-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Avalanche
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Binance-USD"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Binance-USD")}
            style={{ opacity: visibleTokens["Binance-USD"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Binance-USD"
              className="rounded-lg"
              src="/logos/binance-usd-busd-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Binance-USD
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["ChainLink Token"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("ChainLink Token")}
            style={{ opacity: visibleTokens["ChainLink Token"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="ChainLink"
              className="rounded-lg"
              src="/logos/chainlink-link-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            ChainLink
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["Uniswap (PoS)"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("Uniswap (PoS)")}
            style={{ opacity: visibleTokens["Uniswap (PoS)"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="Uniswap"
              className="rounded-lg"
              src="/logos/uniswap-uni-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Uniswap
          </span>
        </Card>
        <Card className={`backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group ${!visibleTokens["SHIBA INU (PoS)"] ? 'bg-gray-400' : ''}`}>
          <button
            className="btn flex items-center justify-center text-white"
            onClick={() => toggleTokenVisibility("SHIBA INU (PoS)")}
            style={{ opacity: visibleTokens["SHIBA INU (PoS)"] ? 1 : 0.2 }} // Adjust opacity based on visibility
          >
            <img
              alt="SHIBA INU"
              className="rounded-lg"
              src="/logos/shiba-inu-shib-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-20 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            SHIBA INU
          </span>
        </Card>
      </div>
    </Card>
    );
}