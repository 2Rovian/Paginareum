import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

const latoFont = Lato({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: "Paginare",
  description: "Paginare, your place to read only the very best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${latoFont.className}`}
      >
        {children}
        <Toaster
          position="bottom-right"
          
        />


      </body>
    </html>
  );
}
