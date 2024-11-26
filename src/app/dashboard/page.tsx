'use client';

import { getStats } from "@/actions/stats-actions";
import PaymentChart from "@/components/payments-chart/PaymentChart";
import Spinner from "@/components/ui/spinner";
import { useState, useEffect, useCallback } from "react";

interface MonthlyStats {
  month: string
  totalAffiliates: number
  affiliatesWithCompletePayments: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<MonthlyStats[]>([] as MonthlyStats[]);
  const [isLoading, seIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const response = await getStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      seIsLoading(false)
    }
  }, [])
    
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);;

  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        {isLoading ? <Spinner /> :
          <PaymentChart stats={stats} />
        }
      </div>
    </div>
  );
}