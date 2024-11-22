import Header from "@/components/header/Header"

export default function PaymentsLayout({
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