import PaymentChart from "@/components/payments-chart/PaymentChart";

export default function Dashboard() {
    
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto">
      <div className="flex flex-col w-full h-full items-center justify-center m-auto">
        <PaymentChart />
      </div>
    </div>
  );
}