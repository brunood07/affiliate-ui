'use client';

import { getStats } from "@/actions/stats-actions";
import PaymentChart from "@/components/payments-chart/PaymentChart";
import { useState, useEffect, useCallback } from "react";

interface MonthlyStats {
  month: string
  totalAffiliates: number
  affiliatesWithCompletePayments: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<MonthlyStats[]>([] as MonthlyStats[]);

  const fetchStats = useCallback(async () => {
    try {
      const response = await getStats();
      setStats(response);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }, [])
    
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);;

  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <PaymentChart stats={stats} />
      </div>
    </div>
  );
}