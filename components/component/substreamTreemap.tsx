'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import SubstreamsComponent from '@/components/component/substreamComponent';
import {Treemap} from '@/components/component/treemap';

export function SubstreamTreemap(){
return (
    <Card className="bg-gray-800/70 backdrop-blur-lg border-white/40">
        <SubstreamsComponent />
        <div className="flex justify-center space-x-2">
        <Card className="backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group"> 
          <button className="btn flex items-center justify-center text-white">
            <img
              alt="Polygon"
              className="rounded-lg"
              src="/logos/avalanche-avax-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Avanlanche
          </span>
        </Card>
        <Card className="backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group"> 
          <button className="btn flex items-center justify-center text-white">
            <img
              alt="Binance_USD"
              className="rounded-lg"
              src="/logos/binance-usd-busd-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Binance USD
          </span>
        </Card>
        <Card className="backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group"> 
          <button className="btn flex items-center justify-center text-white">
            <img
              alt="Binance_USD"
              className="rounded-lg"
              src="/logos/chainlink-link-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            ChainLink
          </span>
        </Card>
        <Card className="backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group"> 
          <button className="btn flex items-center justify-center text-white">
            <img
              alt="Binance_USD"
              className="rounded-lg"
              src="/logos/uniswap-uni-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Uniswap
          </span>
        </Card>
        <Card className="backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group"> 
          <button className="btn flex items-center justify-center text-white">
            <img
              alt="Binance_USD"
              className="rounded-lg"
              src="/logos/shiba-inu-shib-logo.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            SHIBA INU
          </span>
        </Card>
        {/* <Card className={`${currentChain === 'eos' ? 'bg-indigo-50/10' : 'bg-indigo-50/80'} backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group`}>
        <button onClick={() => handleChangeChain('eos')} className="btn flex items-center justify-center text-white">
            <img
              alt="EOS"
              className="rounded-lg"
              src="/eos-logo-black.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            EOS
          </span>
        </Card>
        <Card className={`${currentChain === 'eth' ? 'bg-indigo-50/0' : 'bg-indigo-50/80'} backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group`}>
          <button onClick={() => handleChangeChain('eth')} className="btn flex items-center justify-center text-white">
            <img
              alt="Ethereum"
              className="rounded-lg"
              src="/eth-logo-black.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Ethereum
          </span>
        </Card> */}
        
      </div>
    </Card>
    );
}