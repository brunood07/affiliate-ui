import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/providers/AuthProvider";
import { TanstackQueryProvider } from "@/components/providers/TanstackQueryProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gerenciamento de Afiliados",
  description: "Sistema de Gerenciamento de Afiliados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <TanstackQueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  )
}