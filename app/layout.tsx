import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Local Legend",
  description: "Your local shopping and services platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
