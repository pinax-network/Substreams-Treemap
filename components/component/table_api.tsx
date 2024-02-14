import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchBlockData } from '@/lib/utils';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

// Define an interface for your chart data
interface ChartData {
  date: string;
  value: number;
}

const ChartContainer = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [currentChain, setCurrentChain] = useState('polygon'); // Initial chain
  const [timeRange, setTimeRange] = useState('30d'); // Initial time range

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchBlockData(currentChain, timeRange);
      const formattedData = result.values.map((value, index) => ({
        date: new Date(result.timestamps[index] * 1000).toLocaleDateString("en-US"),
        value,
      }));
      setData(formattedData);
    };

    fetchData().catch(console.error);
  }, [currentChain, timeRange]);

   // Button click handler to change the chain
   const handleChangeChain = (chain: string) => {
    setCurrentChain(chain);
  };

  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  const roundDown = value => Math.floor(value / 1000) * 1000;
  const roundUp = value => Math.ceil(value / 1000) * 1000;
  const dataRange = maxValue - minValue;
  let padding = Math.max(1000, dataRange * 0.1);

  const roundedMinValue = Math.max(0, roundDown(minValue - padding)); 
  const roundedMaxValue = roundUp(maxValue + padding);

  const textStyle = { fill: '#ffffff' }; 
  
  return (
  <div>
    <Card className='bg-indigo-50/10 backdrop-blur-lg border-white/40 p-4'>
      <div className= "text-md text-center text-white font-semibold p-1">
        {currentChain.charAt(0).toUpperCase() + currentChain.slice(1)} (30 days)
      </div>
    <div className="flex justify-center p-1">
      <div className="w-full max-w-4xl">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" scale="point" stroke={textStyle.fill} tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}  />
            <YAxis 
              domain={[roundedMinValue, roundedMaxValue]} 
              stroke={textStyle.fill}
              tickFormatter={(value) => `${value / 1000}k`} />
            <CartesianGrid strokeDasharray="3 3" stroke='bg-indigo-50'/>
            <Tooltip contentStyle={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: textStyle.fill }} />
            <Legend align="right"  wrapperStyle={{ color: textStyle.fill }} />"
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth="2" name="Transactions" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col space-y-2 p-1">
        {['7d', '30d', '90d', '1y'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`p-1 rounded-md ${timeRange === range ? 'bg-indigo-500 text-white' : 'bg-indigo-200'}`}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
      <div className="flex justify-center space-x-2">
        <Card className={`${currentChain === 'polygon' ? 'bg-indigo-50/10' : 'bg-indigo-50/80'} backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group`}> 
          <button onClick={() => handleChangeChain('polygon')} className="btn flex items-center justify-center text-white">
            <img
              alt="Polygon"
              className="rounded-lg"
              src="/polygon-logo-black.svg"
              style={{ aspectRatio: "1 / 1", objectFit: "contain", width: "24px", height: "24px" }}
            />
          </button>
          <span className='tooltip rounded shadow-lg bg-indigo-50/10 backdrop-blur-lg border-white/40 p-1 text-white absolute -mt-16 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'>
            Polygon
          </span>
        </Card>
        <Card className={`${currentChain === 'eos' ? 'bg-indigo-50/10' : 'bg-indigo-50/80'} backdrop-blur-lg border-white/40 p-1 hover:bg-muted/50 relative group`}>
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
        </Card>
      </div>
    </Card>
    </div>
  );
};

export default ChartContainer;
