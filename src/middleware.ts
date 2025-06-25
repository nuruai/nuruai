import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Tu peux logger ici si besoin
    // console.log(req.nextUrl.pathname);
    // console.log(req.token);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Autorise toujours l'accès à /admin/login sans token
        if (pathname === "/admin/login" || pathname === "/admin/register") {
          return true;
        }

        // Pour toutes les autres routes sous /admin/, il faut un token
        if (pathname.startsWith("/admin")) {
          return !!token;
        }

        // Par défaut, autorise tout le reste
        return true;
      },
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], // protège toutes les routes sous /admin
};
