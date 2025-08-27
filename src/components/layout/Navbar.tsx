"use client";

import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  
  const { isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        SeControla
      </Link>

      {/* Itens da direita */}
      <div className="flex items-center gap-4">
        {!isAuthenticated ? (
          <>
            <Link href="/register" className="hover:underline text-gray-900 dark:text-gray-100">Registrar</Link>
            <ThemeToggle />
          </>
        ) : (
          <>
            <Link href="/dashboard" className="hover:underline text-gray-900 dark:text-gray-100">Dashboard</Link>
            <button 
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="text-red-500 hover:text-red-700"
            >
              Sair
            </button>
            <ThemeToggle />
          </>
        )}
      </div>
    </nav>
  );
}