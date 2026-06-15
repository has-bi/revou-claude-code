import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistem Bikin Materi Ngajar — Belajar Bekerja",
  description: "Dari brief sampai slides jadi, beberapa menit. NotebookLM → Claude Code Space → Review via HP.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable} style={{ colorScheme: "light" }}>
      <body className="font-sans antialiased bg-white text-neutral-800">
        {children}
      </body>
    </html>
  );
}
