"use client"

import { Bar, BarChart, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { month: "Janeiro", numberOfAffiliates: 120, completedPayments: 120 },
  { month: "Fevereiro", numberOfAffiliates: 130, completedPayments: 50 },
  { month: "Março", numberOfAffiliates: 140, completedPayments: 70 },
  { month: "Abril", numberOfAffiliates: 150, completedPayments: 80 },
  { month: "Maio", numberOfAffiliates: 160, completedPayments: 100 },
  { month: "Junho", numberOfAffiliates: 170, completedPayments: 400 },
]

export default function PaymentComparisonChart() {
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
              numberOfAffiliates: {
                label: "Afiliados",
                color: "hsl(var(--chart-1))",
              },
              completedPayments: {
                label: "Pagamentos Concluídos",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="numberOfAffiliates" fill="var(--color-numberOfAffiliates)" name="Afiliados" />
                <Bar dataKey="completedPayments" fill="var(--color-completedPayments)" name="Pagamentos Concluídos" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

