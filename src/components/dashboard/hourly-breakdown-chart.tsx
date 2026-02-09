"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartConfig
} from "@/components/ui/chart"

type HourlyBreakdownChartProps = {
    data: { hour: string; minutes: number }[];
}

const chartConfig = {
    minutes: {
        label: "Minuti",
    },
    '00-03': { label: '00-03', color: 'hsl(var(--chart-1))' },
    '03-06': { label: '03-06', color: 'hsl(var(--chart-2))' },
    '06-09': { label: '06-09', color: 'hsl(var(--chart-3))' },
    '09-12': { label: '09-12', color: 'hsl(var(--chart-4))' },
    '12-15': { label: '12-15', color: 'hsl(var(--chart-5))' },
    '15-18': { label: '15-18', color: 'hsl(var(--chart-1))' },
    '18-21': { label: '18-21', color: 'hsl(var(--chart-2))' },
    '21-24': { label: '21-24', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig

export function HourlyBreakdownChart({ data }: HourlyBreakdownChartProps) {
  const totalMinutes = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.minutes, 0)
  }, [data])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-headline">Ripartizione Oraria</CardTitle>
        <CardDescription>Analisi delle fasce orarie di guida</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="minutes"
              nameKey="hour"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalMinutes.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Minuti
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
