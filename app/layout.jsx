import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "AuthEngine | @truethari",
  description:
    "AuthEngine is an open-source project designed to simplify the process of generating and managing API tokens. This project provides developers with an intuitive interface and efficient workflows to obtain access tokens for various APIs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <div className="md:mt-0 sm:mt-[75px]">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
