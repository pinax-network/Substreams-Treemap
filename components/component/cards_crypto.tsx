'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import React from 'react';

export function CarteCrypto() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm text-white font-medium">Total Balance</CardTitle>
              <DollarSignIcon className="w-4 h-4 text-white dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">$12,345.67</div>
              <p className="text-xs text-white dark:text-gray-400">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-indigo-50/10 backdrop-blur-lg border-white/40">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm text-white font-medium">Transactions</CardTitle>
              <UsersIcon className="w-4 h-4 text-white dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl text-white font-bold">+2350</div>
              <p className="text-xs text-white dark:text-gray-400">+180.1% from last month</p>
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