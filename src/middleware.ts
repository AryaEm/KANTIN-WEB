// middleware.ts
import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value?.trim();
  const role = request.cookies.get("role")?.value?.trim();
  const { pathname } = request.nextUrl;

  // Jika pengguna belum login
  if (!token || !role) {
    // Proteksi halaman /admin dan /cart: redirect ke /login
    if (pathname.startsWith("/admin") || pathname.startsWith("/cart")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // Izinkan akses ke halaman publik lainnya
    return NextResponse.next();
  }

  // Jika pengguna mencoba mengakses halaman login atau signin
  if (pathname === "/login" || pathname === "/signin") {
    // Redirect berdasarkan peran
    if (role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (role === "Pelanggan") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Proteksi halaman admin: hanya Admin yang boleh mengakses
  if (pathname.startsWith("/admin")) {
    if (role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Proteksi halaman pelanggan: hanya Pelanggan yang boleh mengakses
  if (
    pathname.startsWith("/cart") ||
    pathname.startsWith("/community") ||
    pathname === "/menu" // tambahkan path pelanggan lain jika ada
  ) {
    if (role !== "Pelanggan") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signin",
    "/admin/:path*",
    "/cart/:path*",
    "/community/:path*",
    "/menu", // tambahkan path pelanggan lain jika ada
  ],
};
