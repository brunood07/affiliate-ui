"use client";

import AddPaymentForm from "@/components/add-payment-form/AddPaymentForm";
import { use } from "react";

export default function CreatePaymentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params); 

  return (
    <div>
      <AddPaymentForm affiliateId={id} />
    </div>
    )
}