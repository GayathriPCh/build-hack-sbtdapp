import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from './components/Sidebar';
import ConnectWallet from './components/ConnectWallet';

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
  title: "SBT Certification System",
  description: "Decentralized Certification System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="layout-container">
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
          <ConnectWallet />
        </div>
      </body>
    </html>
  );
}