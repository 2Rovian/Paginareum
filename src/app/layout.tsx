import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'

const latoFont = Lato({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: "Paginareum",
  description: "Paginareum, your place to read only the very best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${latoFont.className} selection:bg-[#b03a2e] selection:text-[#f6f1e7]`}
      >
        {children}
        <Toaster
          position="bottom-right"
          
        />


      </body>
    </html>
  );
}
