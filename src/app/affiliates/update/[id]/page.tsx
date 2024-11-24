"use client";

import UpdateAffiliateForm from "@/components/update-affiliate-form/UpdateAffiliateForm";
import { use } from "react";

export default function UpdateAffiliatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = use(params); 

  return <div>
    <UpdateAffiliateForm affiliateId={id} />
  </div>
}