"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import type { DailyStat } from "@/lib/types"

type DailyUsageChartProps = {
    data: DailyStat[];
}

const chartConfig = {
  distance: {
    label: "Distanza (km)",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function DailyUsageChart({ data }: DailyUsageChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Utilizzo Giornaliero (ultimi 30gg)</CardTitle>
        <CardDescription>Distanza percorsa ogni giorno.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={data} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString("it-IT", { day: 'numeric', month: 'short' })}
            />
             <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value} km`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar dataKey="distance" fill="var(--color-distance)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
