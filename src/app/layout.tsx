import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CssBaseline from '@mui/material/CssBaseline';
import AuthWrapper from "@/components/auth/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Description of your app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <AuthWrapper>{children}</AuthWrapper>
      </body>
    </html>
  );
}
