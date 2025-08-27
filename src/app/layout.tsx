import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Cookies from "js-cookie";

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
