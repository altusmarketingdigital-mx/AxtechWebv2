import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AXTECH INGENIERÍA",
  description: "Ingeniería Especializada en Soluciones Tecnológicas",
};

import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased scroll-smooth">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`}>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
