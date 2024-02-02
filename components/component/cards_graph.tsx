'use client'
import { CardTitle, CardHeader, CardContent, CardDescription, Card } from "@/components/ui/card"
import { ResponsiveLine } from "@nivo/line"


export function CarteGraph() {
    return ( 
          <div className="grid gap-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Bitcoin (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$2389.00</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
              <Card className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Ethereum (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$345</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
              <Card className="flex flex-col  bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Ripple (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$33.5</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Litecoin (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$3,456</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
              <Card className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Cardano (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$12,345</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
              <Card className="flex flex-col bg-indigo-50/10 backdrop-blur-lg border-white/40">
                <CardHeader>
                  <CardDescription className= "text-indigo-50">Polkadot (nivo line graph) </CardDescription>
                  <CardTitle className= "text-indigo-50">$1.1K</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <LineChart className="aspect-[4/3]" />
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }

    function LineChart(props: any) {
        return (
          <div {...props}>
            <ResponsiveLine
              data={[
                {
                  id: "Desktop",
                  data: [
                    { x: "Jan", y: 43 },
                    { x: "Feb", y: 137 },
                    { x: "Mar", y: 61 },
                    { x: "Apr", y: 145 },
                    { x: "May", y: 26 },
                    { x: "Jun", y: 154 },
                  ],
                },
                {
                  id: "Mobile",
                  data: [
                    { x: "Jan", y: 60 },
                    { x: "Feb", y: 48 },
                    { x: "Mar", y: 177 },
                    { x: "Apr", y: 78 },
                    { x: "May", y: 96 },
                    { x: "Jun", y: 204 },
                  ],
                },
              ]}
              margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
              xScale={{
                type: "point",
              }}
              yScale={{
                type: "linear",
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 0,
                tickPadding: 16,
              }}
              axisLeft={{
                tickSize: 0,
                tickValues: 5,
                tickPadding: 16,
              }}
              colors={["#2563eb", "#e11d48"]}
              pointSize={6}
              useMesh={true}
              gridYValues={6}
              theme={{
                axis: {
                  ticks: {
                    text: {
                      fill: "#ffffff" // White color
                    }
                  }
                },
                tooltip: {
                  chip: {
                    borderRadius: "9999px",
                  },
                  container: {
                    fontSize: "12px",
                    textTransform: "capitalize",
                    borderRadius: "6px",
                  },
                },
                grid: {
                  line: {
                    stroke: "#ffffff",
                  },
                },
              }}
              role="application"
            />
          </div>
        )
      }