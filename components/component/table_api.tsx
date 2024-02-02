import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchBlockData } from '@/lib/utils';

// Define an interface for your chart data
interface ChartData {
  date: string;
  value: number;
}

const ChartContainer = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchBlockData('polygon', '30d');
      const formattedData = result.values.map((value, index) => ({
        date: new Date(result.timestamps[index] * 1000).toLocaleDateString("en-US"),
        value,
      }));
      setData(formattedData);
    };

    fetchData().catch(console.error);
  }, []);

  const minValue = Math.min(...data.map(item => item.value));
  const maxValue = Math.max(...data.map(item => item.value));
  const roundDown = value => Math.floor(value / 1000) * 1000;
  const roundUp = value => Math.ceil(value / 1000) * 1000;

  const roundedMinValue = roundDown(minValue - 10000);
  const roundedMaxValue = roundUp(maxValue + 10000);

  const textStyle = { fill: '#ffffff' }; 
  return (
    <div className="flex justify-center p-1">
      <div className="w-full max-w-4xl">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" scale="point" stroke={textStyle.fill} />
            <YAxis domain={[roundedMinValue, roundedMaxValue]} stroke={textStyle.fill} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip contentStyle={{ color: textStyle.fill }} />
            <Legend wrapperStyle={{ color: textStyle.fill }} />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
