import type { Metadata } from "next";
import "./globals.css";
// import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "KantIn",
  description: "a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* <ToastContainer /> */}
      </body>
    </html>
  );
}
