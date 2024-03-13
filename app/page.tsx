'use client'
import { Footer } from '@/components/component/footer';
import { Header } from '@/components/component/header';
import { TableCrypto } from '@/components/component/table_crypto';
import { CarteCrypto } from '@/components/component/cards_crypto';
import React, { useEffect, useState } from 'react';
import { CarteGraph } from '@/components/component/cards_graph';
import ChartContainer from '@/components/component/table_api';
//import Treemap from '@/components/component/treemap';
import Output from '@/components/component/output';
import SubstreamsComponent from '@/components/component/substreamComponent';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-auto">
      <div className="flex flex-col items-center justify-center bg-cover bg-center px-10 bg-gray-900"
       style={{ backgroundImage: "url('/blur_blue.svg')" }}>                 
          <div className="mb-10 " >
            <br></br>
            
            <ChartContainer />
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
 
