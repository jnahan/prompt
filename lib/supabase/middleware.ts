import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { hasEnvVars } from "../utils";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // If the env vars are not set, skip middleware check. You can remove this
  // once you setup the project.
  if (!hasEnvVars) {
    return supabaseResponse;
  }

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/terms"];
  
  // Username routes (single segment like /username) are public
  // IMPORTANT: Check this FIRST before protected routes
  // Example: /promptkit is a username route, not /prompt/kit
  const pathSegments = request.nextUrl.pathname.split("/").filter(Boolean);
  const isUsernameRoute = pathSegments.length === 1 && 
    !request.nextUrl.pathname.startsWith("/auth") &&
    !request.nextUrl.pathname.startsWith("/api");
  
  // List of routes that require authentication
  const protectedRoutes = [
    "/prompts",
    "/prompt/",
    "/saved",
    "/settings",
    "/upgrade",
    "/checkout",
  ];

  // Check if current path is a protected route
  // IMPORTANT: Exclude username routes to prevent false positives
  // Example: /promptkit would match /prompt, but it's a username route
  const isProtectedRoute = !isUsernameRoute && protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname) || isUsernameRoute;

  // Allow public routes and auth pages to pass through
  if (isPublicRoute || request.nextUrl.pathname.startsWith("/auth") || request.nextUrl.pathname.startsWith("/api")) {
    return supabaseResponse;
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
