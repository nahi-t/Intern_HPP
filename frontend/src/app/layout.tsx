// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Harari Prison Police Commission",
  description: "Official website of the Harari Regional State Prison Police Commission - Fostering Security, Justice, and Rehabilitation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;   // ✅ explicit type (not any)
}) {
  console.log('🌟 Root layout rendered');
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Navbar />    
         
          {children}
           <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}