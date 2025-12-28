import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pesca Chile - SERNAPESCA | NewCooltura Informada",
  description: "Oficinas SERNAPESCA, permisos de pesca, vedas, especies y calculadora de licencias",
  keywords: ["pesca Chile", "SERNAPESCA", "permisos pesca", "vedas", "licencia pesca"],
  openGraph: {
    title: "Pesca Chile - NewCooltura Informada",
    description: "Permisos, vedas y licencias de pesca",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
