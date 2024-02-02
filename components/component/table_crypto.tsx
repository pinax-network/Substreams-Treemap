'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import React from 'react';

export function TableCrypto() {
    return (
        <div>
            <Card className="bg-indigo-50/10 backdrop-blur-3xl border-white/40">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-indigo-50">Cryptocurrency</TableHead>
                    <TableHead className=" text-indigo-50">Price</TableHead>
                    <TableHead className=" text-indigo-50">24-Hour Change</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-medium text-indigo-50">Bitcoin</TableCell>
                    <TableCell className="text-indigo-50">$12,345.67</TableCell>
                    <TableCell className="text-green-500">+20.1%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-indigo-50">Ethereum</TableCell>
                    <TableCell className="text-indigo-50">$6,789.01</TableCell>
                    <TableCell className="text-red-500">-18.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-indigo-50">Cardano</TableCell>
                    <TableCell className="text-indigo-50">$3,456.78</TableCell>
                    <TableCell className="text-green-500">+19.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-indigo-50">Tether</TableCell>
                    <TableCell className="text-indigo-50">$5,678.90</TableCell>
                    <TableCell className="text-red-500">-10.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium text-indigo-50">Dogecoin</TableCell>
                    <TableCell className="text-indigo-50">$7,890.12</TableCell>
                    <TableCell className="text-green-500">+5.01%</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </Card>
        </div>
    )
}