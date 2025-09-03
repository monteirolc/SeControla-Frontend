"use client";

import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";


export default function RegisterPage(){
  const { register, loading, error } = useRegister();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const success = await register(
      name, lastName, age, cpf, email, phone, username, password
    );
    if (success) {
      router.push("/login");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950">
      <div className="w-full max-w-sm p-6 bg-gray-200 dark:bg-gray-700 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-1">
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            label="Primeiro Nome" />
          <Input 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            label="Último Nome" />
          <Input 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            label="Idade" />
          <Input 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
            label="CPF" />
          <Input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            label="E-mail" />
          <Input 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            label="Telefone" />
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            label="Usuário" />
          <Input 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            label="Senha" 
            type="password" />
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirmar Senha"
            type="password"
          />
          {error && <p>{error}</p>}
          <Button 
            type="submit" 
            label={loading ? "Enviando..." : "Registrar"}
            disabled={loading} 
            className="space-y-1"/>
        </form>
      </div>
    </main>
  );
}