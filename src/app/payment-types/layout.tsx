import Header from "@/components/header/Header"

export default function PaymentTypesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header />
 
      {children}
    </section>
  )
}