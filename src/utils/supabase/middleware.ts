import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/chat",
  "/home",
  "/scraps",
  "/profile",
  "/signup",
  "/signup-done",
];

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    const isProtectedRoute = protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    );

    if (isProtectedRoute && error) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (user?.id) {
      response.cookies.set("userId", user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }

    if (
      request.nextUrl.pathname === "/home" &&
      user?.user_metadata?.is_super_admin
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (request.nextUrl.pathname === "/" && user?.user_metadata?.complete) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (
      (request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname === "/home") &&
      user &&
      !user.user_metadata.complete
    ) {
      return NextResponse.redirect(new URL("/signup/nickname", request.url));
    }

    if (
      request.nextUrl.pathname === "/admin" &&
      user &&
      !user.user_metadata.is_super_admin
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return response;
  } catch {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
