import AddAffiliateForm from "@/components/add-affiliate-form/AddAffiliateForm";

export default function CreateAffiliate() {
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto items-center">
      <p className="w-auto font-bold text-xl my-2">Adicionar Afiliado</p>
      <AddAffiliateForm />
    </div>
  );
}