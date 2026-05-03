import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import MobileCallCTA from "@/components/MobileCallCTA"

const GSAPProvider = dynamic(() => import("@/components/GSAPProvider"), {
  ssr: false,
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Yass Valley Electrical | Jack Tilley — Licensed Electrician NSW & ACT",
  description:
    "Licensed electrician serving Yass, Murrumbateman, Canberra and the ACT. Residential, commercial, EV charging, smart home and switchboard upgrades. Call Jack on 0412 999 842.",
  keywords:
    "electrician Yass, electrician Canberra, EV charger installation, switchboard upgrade, licensed electrician NSW ACT",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-x-hidden">
        {/* Flame gradient overlay — GSAP drives --flame-y on <html> */}
        <div id="flame-overlay" aria-hidden="true" />
        <GSAPProvider />
        <Header />
        <main className="relative z-10">{children}</main>
        <Footer />
        <MobileCallCTA />
      </body>
    </html>
  )
}
