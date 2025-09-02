"use client";

import Link from "next/link";
import Image from "next/image"
import { useAuthContext } from "@/context/AuthContext";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";

export default function Navbar() {
  
  const { isAuthenticated, logout } = useAuthContext();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-3 bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Link href="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
        <Image src="/assets/images/SeControlaLogo01.svg" width={150} height={100} alt="SeControla Logo"/>
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
            <Link href="/dashboard" className="hover:underline text-gray-900 dark:text-gray-100"><House size={20}/></Link>
            <Link href="/Receitas" className="hover:underline text-gray-900 dark:text-gray-100">Receitas</Link>
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