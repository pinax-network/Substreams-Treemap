'use client'
import React, { useEffect, useState } from 'react';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import SubstreamsComponent from '@/components/component/substreamComponent';
import { Footer } from '@/components/component/footer';
import { Header } from '@/components/component/header';
import { SubstreamTreemap } from '@/components/component/substreamTreemap';

export default function Home() {
  return ( 
    <>
      <Header />
      <main className="overflow-auto">
      <div className="flex flex-col items-center justify-center bg-cover bg-center px-10 bg-gray-900"
       style={{ backgroundImage: "url('/blur_blue.svg')" }}>                 
          <div className="mb-10 " >
            <br></br>
              <SubstreamTreemap /> 
            <br></br>
          </div>
        </div>
      </main>
      <Footer />
    </> 
  );
}

