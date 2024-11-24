"use client";

import UpdatePaymentTypeForm from "@/components/update-payment-type-form/UpdatePaymentTypeForm";
import { use } from "react";

export default function UpdatePaymentTypePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params); 

  return <div>
    <UpdatePaymentTypeForm paymentTypeId={id} />
  </div>
}