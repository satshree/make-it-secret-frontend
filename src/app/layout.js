import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Providers } from "./providers";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Make It Secret",
  description: "Encrypt or Decrypt files",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
