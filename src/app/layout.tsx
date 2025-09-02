import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import type { Metadata } from "next";
import Cookies from "js-cookie";

export const metadata: Metadata = {
  title: "SeControla",
  description: "App de controle financeiro",
  icons: {
    icon: "/assets/images/FaviconSeControla.svg", // caminho relativo à pasta /public
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeCookie = Cookies.get("theme") as "light" | "dark" || 'light';

  return (
    <html lang="pt-BR" className={themeCookie}>
      <AuthProvider>
        <body className="bg-white text-black dark:bg-gray-800 dark:text-gray-100">
          <ThemeProvider>
            <Navbar />
            <main>{children}</main>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
