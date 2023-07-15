import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Generate Google Token | @truethari",
  description:
    "GenerateGoogleToken is an open-source project designed to simplify the process of generating and managing Google API tokens. By leveraging the power of the Google Cloud Platform, this project provides developers with an intuitive interface and efficient workflows to obtain access tokens for various Google APIs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
