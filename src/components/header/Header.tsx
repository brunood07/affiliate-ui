
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-screen h-20 bg-green-800">
      <div className="flex w-[1080px] justify-end items-center gap-4 m-auto font-semibold text-amber-200">
        <Link href="/dashboard" className="hover:opacity-60 hover:underline">Inicio</Link>
        <Link href="/affiliates" className="hover:opacity-60 hover:underline">Afiliados</Link>
        <Link href="/payment-types" className="hover:opacity-60 hover:underline">Tipos de Pagamento</Link>
        <Link href="/info" className="hover:opacity-60 hover:underline">Informações</Link>
      </div>
    </header>
  )
}