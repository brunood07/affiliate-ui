"use client"

import { Bar, BarChart, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PaymentChartProps {
  stats: MonthlyStats[];
}

interface MonthlyStats {
  month: string
  totalAffiliates: number
  affiliatesWithCompletePayments: number
}

export default function PaymentComparisonChart(props: PaymentChartProps) {
  const { stats } = props;
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Informações</h1>
        </div>
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Comparação: Afiliados vs Pagamentos Concluídos por Mês</CardTitle>
          <CardDescription>Número de afiliados em comparação com pagamentos concluídos mensalmente</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              totalAffiliates: {
                label: "Afiliados",
                color: "hsl(var(--chart-1))",
              },
              affiliatesWithCompletePayments: {
                label: "Pagamentos Concluídos",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="totalAffiliates" fill="var(--color-totalAffiliates)" name="Afiliados" />
                <Bar dataKey="affiliatesWithCompletePayments" fill="var(--color-affiliatesWithCompletePayments)" name="Pagamentos Concluídos" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

