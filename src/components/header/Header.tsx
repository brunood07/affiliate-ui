import Link from "next/link";
import { Home, Users, CreditCard, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-green-800 text-amber-200 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">Logo</span>
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-4">
              <li>
                <Button asChild variant="ghost" className="text-amber-200 hover:text-amber-100 hover:bg-green-700">
                  <Link href="/dashboard" className="flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Inicio
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" className="text-amber-200 hover:text-amber-100 hover:bg-green-700">
                  <Link href="/affiliates" className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Afiliados
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" className="text-amber-200 hover:text-amber-100 hover:bg-green-700">
                  <Link href="/payment-types" className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Tipos de Pagamento
                  </Link>
                </Button>
              </li>
              <li>
                <Button asChild variant="ghost" className="text-amber-200 hover:text-amber-100 hover:bg-green-700">
                  <Link href="/info" className="flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Informações
                  </Link>
                </Button>
              </li>
            </ul>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" className="text-amber-200 hover:text-amber-100 hover:bg-green-700">
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

