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
import { fetchBlockData } from '@/lib/utils';
import ChartContainer from '@/components/component/table_api';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-auto">
      <div className="flex flex-col items-center justify-center bg-cover bg-center px-10"
       style={{ backgroundImage: "url('/bg_color_splash.jpg')" }}>                   {/* https://4kwallpapers.com/photography/color-burst-splash-colorful-black-background-macos-sierra-1532.html */}
          <div className="mb-10 " >
            <br></br>
            
            <Card className='bg-indigo-50/10 backdrop-blur-lg border-white/40 p-4'>
            <div className= "text-md text-center text-white font-semibold p-1">
              Polygon (30 days) (trace calls)
            </div>
             <ChartContainer />
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
 
