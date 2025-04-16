import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The Plan Ahead App",
  description: "Created by Mohamed Jalloh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="max-w-screen h-screen">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full h-full`}
      >
        {children}
      </body>
    </html>
  );
}
