import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Testify AI - Test Automation Agent",
  description:
    "Testify AI is an AI-powered test automation agent that helps you create and run tests faster and more efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <body className="min-h-screen w-full bg-background font-sans">
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
