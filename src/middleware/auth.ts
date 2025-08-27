import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get("access")?.value; 
  
  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/login", "/register"];

  const isPublic = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se não tiver token e não for rota pública -> redireciona pro login
  if (token && (request.nextUrl.pathname === "/login" || 
                request.nextUrl.pathname === "/register")) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}
