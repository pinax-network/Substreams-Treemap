'use client'
import React from 'react';
import { SubstreamTreemap } from '@/components/component/substreamTreemap';

export default function Home() {
  return ( 
    <>
      <main className="overflow-auto" style={{ minHeight: '100vh' }}>
      <div className="flex flex-col items-center justify-center bg-cover bg-center px-10 bg-gray-900"
       style={{ backgroundImage: "url('/blur_blue.svg')", minHeight: '100vh', backgroundSize: 'cover'}}>                 
          <div className="mb-10 " >
            <br></br>
              <SubstreamTreemap /> 
            <br></br>
          </div>
        </div>
      </main>
    </> 
  );
}

