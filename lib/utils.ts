import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts
export async function fetchBlockData(chain: string = 'polygon', range: string = '30d'): Promise<{values: number[], timestamps: number[]}> {
  const url = `https://substreams-clock-api-production.up.railway.app/trace_calls?aggregate_function=count&chain=${chain}&range=${range}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const data = await response.json(); // Directly use the JSON response
  return data[0]; // Assuming the response is an array with one object containing 'values' and 'timestamps'
}


