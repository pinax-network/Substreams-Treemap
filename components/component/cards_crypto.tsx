'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import React, { useEffect, useState } from 'react';
import { fetchBlockData } from '@/lib/utils';


export function CarteCrypto() {
  interface ChartData {
    date: string;
    value: number;
  }  

  const [data, setData] = useState<ChartData[]>([]);
  const [currentChain, setCurrentChain] = useState('polygon'); // Initial chain
  const [timeRange, setTimeRange] = useState('24h'); // Initial time range
  const [firstDayTransactions, setFirstDayTransactions] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [difference, setDifference] = useState(0);

  useEffect(() => {

    // Fetch and calculate data for the last 30 days
    const fetchData30d = async () => {
      const result30d = await fetchBlockData('polygon', '30d');
      const firstDayTransactions = result30d[0].values[0]; // Assuming this is the most recent 24h transactions
      const lastDayTransactions = result30d[0].values[result30d[0].values.length - 1];

      const difference = lastDayTransactions - firstDayTransactions;
      const percentageChange = (difference / firstDayTransactions) * 100;

      setFirstDayTransactions(firstDayTransactions); // Use lastDayValue for the most recent 24h transactions
      setPercentageChange(percentageChange);
      setDifference(difference);
    };

    const fetchData = async () => {
      const result = await fetchBlockData(currentChain, timeRange);
      const formattedData = result.values.map((value, index) => ({
        date: new Date(result.timestamps[index] * 1000).toLocaleDateString("en-US"),
        value,
      }));
      setData(formattedData);
    };

    fetchData30d().catch(console.error);
    fetchData().catch(console.error);
  }, [currentChain, timeRange]);

    // Button click handler to change the chain
    const handleChangeChain = (chain: string) => {
    setCurrentChain(chain);
  };  
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm text-white font-medium">Daily Transactions</CardTitle>
          <DollarSignIcon className="w-4 h-4 text-white dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-white font-bold">{firstDayTransactions}</div> {/* daily transactions */}
        </CardContent>
      </Card>
      <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm text-white font-medium">Transactions</CardTitle>
          <UsersIcon className="w-4 h-4 text-white dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-white font-bold">+{difference}</div>
          <p className="text-xs text-white dark:text-gray-400">+{percentageChange}% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm text-white font-medium">Active Now</CardTitle>
          <CreditCardIcon className="w-4 h-4 text-white dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-white font-bold">+12,234</div>
          <p className="text-xs text-white dark:text-gray-400">+19% from last month</p>
        </CardContent>
      </Card>
      <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm text-white font-medium">Active Now</CardTitle>
          <ActivityIcon className="w-4 h-4 text-white dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-white font-bold">+573</div>
          <p className="text-xs text-white dark:text-gray-400">+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
    )
  }

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    )
  }
      
      
function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}


function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}