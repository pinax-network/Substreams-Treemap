'use client'
import { Footer } from '@/components/component/footer';
import { Header } from '@/components/component/header';
import { TableCrypto } from '@/components/component/table_crypto';
import { CarteCrypto } from '@/components/component/cards_crypto';
import {Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, Cell, ReferenceLine, ResponsiveContainer, } from 'recharts';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import React from 'react';
import { CarteGraph } from '@/components/component/cards_graph';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-auto">
        <div className="flex flex-col items-center justify-center bg-gradient-to-b from-indigo-950 to-black">
          <div className="mb-10 " >
            <br></br>
            
            <Card className='bg-indigo-50'>
            <div className= "text-sm text-center font-semibold underline">
              This is a Chart (Recharts)
            </div>
              <CustomLineChart /> {/* Recharts chart */}
            </Card>  
            <br></br>

            <Card className='bg-indigo-50'>
            <div className= "text-sm text-center font-semibold underline"> 
              This is the second Chart (Recharts)
            </div>
            <div className='content-center'>
              <PositiveAndNegativeBarChart /> {/* Recharts chart */}
            </div>
            </Card>
            <br></br>

            <CarteCrypto /> {/* v0 components */}
            <br></br>
            <TableCrypto /> {/* v0 components */}
            <br></br>
            <CarteGraph /> {/* v0 components, nivo charts */}
            <br></br>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}



const data = [
  { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];

const data2 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: -3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: -2000,
    pv: -9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: -1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: -3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const dataInvoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
 
const TableDemo = () => {                             {/* Existe Pu */}
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataInvoices.map((dataInvoices) => (
          <TableRow key={dataInvoices.invoice}>
            <TableCell className="font-medium">{dataInvoices.invoice}</TableCell>
            <TableCell>{dataInvoices.paymentStatus}</TableCell>
            <TableCell>{dataInvoices.paymentMethod}</TableCell>
            <TableCell className="text-right">{dataInvoices.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

// CustomLineChart component
const CustomLineChart = () => {
  return (
    <div className="flex justify-center">
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
    </div>
  );
};

// PositiveAndNegativeBarChart component
const PositiveAndNegativeBarChart = () => {
  return (
    <div className="flex justify-center">
    <BarChart
      width={600}
      height={300}
      data={data2}
      style={{ maxWidth: '100%' }}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 27, right: 27 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
    </div>
  );
};
