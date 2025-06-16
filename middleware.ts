import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl;
                if (
                    pathname === "/api/auth/register" ||
                    pathname === "/api/auth/login" ||
                    pathname.startsWith("/api/auth")
                ) return true;

                if (
                    pathname === "/" ||
                    pathname.startsWith("/api/video")
                ) return true;

                return !!token // !! changes token to boolean value if exist then true otherwise false
            },
        },
    }
);

export const config = {
    matcher: [
        /*
        * Match all request paths except:
        * - _next/static (static files)
        * - _next/images (image optimization files)
        * - favicon.ico (favicon file)
        * - public folder
        */
        "/((?!_next/static|_next/images|favicon.ico|public).)*",
    ],
}