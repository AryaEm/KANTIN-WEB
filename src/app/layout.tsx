import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const metadata: Metadata = {
  title: "KantIn",
  description: "Dev by Arya M.",
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
        <ToastContainer
          containerId="toastLogin"
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />    
        <ToastContainer
          containerId="toastRegisterStan"
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />    
        <ToastContainer
          containerId="toastAddMenu"
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />    
        <ToastContainer
          containerId="toastAddDiscount"
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />    
      </body>
    </html>
  );
}
