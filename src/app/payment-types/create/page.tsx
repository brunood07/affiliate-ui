import AddPaymentTypeForm from "@/components/add-payment-type-form/AddPaymentTypeForm";

export default function CreatePaymentType() {
  return (
    <div className="flex flex-col w-[1080px] h-full my-2 m-auto items-center">
      <p className="w-auto font-bold text-xl my-2">Adicionar Tipo de Pagamento</p>
      <AddPaymentTypeForm />
    </div>
  );
}