import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Autoriser l'accès aux pages d'authentification
    if (req.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next()
    }

    // Vérifier si l'utilisateur est authentifié
    const token = req.nextauth.token
    
    // Rediriger vers la page de connexion si non authentifié
    if (!token) {
      const url = new URL("/", req.nextUrl.origin)
      url.searchParams.set("callbackUrl", req.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    // Vérifier les rôles si nécessaire
    // Exemple: Si la route commence par /admin, vérifier si l'utilisateur est admin
    if (req.nextUrl.pathname.startsWith("/admin") && token.role !== "USER") {
      return NextResponse.rewrite(new URL("/unauthorized", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Autoriser l'accès aux pages publiques
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    // Toutes les routes sauf les fichiers statiques et les pages d'authentification
    '/((?!_next/static|_next/image|favicon.ico|auth/).*)',
  ],
}