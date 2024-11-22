import Header from "@/components/header/Header"

export default function AffiliatesLayout({
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