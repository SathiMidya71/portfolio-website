import type { Metadata } from "next"
import { Figtree, Fraunces } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

// Free stand-ins for the reference site's fonts: Fraunces ≈ Acorn, Figtree ≈ Roobert
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
})

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sathi Midya | Product Designer",
  description:
    "Sathi Midya is a Product Designer in Bangalore who designs research-led experiences for B2B SaaS and healthcare products.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster position="bottom-center" theme="light" />
      </body>
    </html>
  )
}
