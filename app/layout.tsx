import type { Metadata } from "next";
import "./globals.css";
import SideNav from "@/components/SideNav";
import { BookingModalProvider } from "@/components/providers/BookingModalProvider";

export const metadata: Metadata = {
  title: "Offset Studio",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <BookingModalProvider>
          <SideNav />
          {children}
        </BookingModalProvider>
      </body>
    </html>
  );
}


