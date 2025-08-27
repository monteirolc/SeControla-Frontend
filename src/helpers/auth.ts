export function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access");
  }
  return null;
}

export function isAuthenticated() {
  const token = getTokenFromLocalStorage();
  return !!token; // true se tiver token
}