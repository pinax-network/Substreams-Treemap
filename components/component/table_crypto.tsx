'use client'
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"

export function TableCrypto() {
    return (
        <div>
            <Card className="bg-indigo-50">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Cryptocurrency</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>24-Hour Change</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Bitcoin</TableCell>
                    <TableCell>$12,345.67</TableCell>
                    <TableCell className="text-green-500">+20.1%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Ethereum</TableCell>
                    <TableCell>$6,789.01</TableCell>
                    <TableCell className="text-red-500">-18.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Cardano</TableCell>
                    <TableCell>$3,456.78</TableCell>
                    <TableCell className="text-green-500">+19.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Tether</TableCell>
                    <TableCell>$5,678.90</TableCell>
                    <TableCell className="text-red-500">-10.01%</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">Dogecoin</TableCell>
                    <TableCell>$7,890.12</TableCell>
                    <TableCell className="text-green-500">+5.01%</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </Card>
        </div>
    )
}