import type { Metadata } from "next";
import { Geist } from "next/font/google"
import { Jockey_One } from "next/font/google";;
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jockeyOne = Jockey_One({
  variable: "--font-jockey",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Project Recruit",
  // description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jockeyOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
