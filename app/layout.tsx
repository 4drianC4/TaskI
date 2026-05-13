import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Navbar } from "@/components/shared/navbar";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taski | Fullstack Monolith",
  description: "Arquitectura fullstack profesional con Next.js y Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
