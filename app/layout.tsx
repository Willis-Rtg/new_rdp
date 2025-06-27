import type { Metadata } from "next";
import "./globals.css";
import { ProductContextProvider } from "./admin/prouct-context";

export const metadata: Metadata = {
  title: "알뜰.편",
  description: "알뜰.편",
  icons: {
    icon: "/shops.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex justify-center items-center h-screen max-w-lg mx-auto">
        {children}
      </body>
    </html>
  );
}
