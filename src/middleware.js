import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const cookieStore = cookies();
  const token = cookieStore.get("__Secure-next-auth.session-token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Call the API route to verify the token
  const res = await fetch(new URL("/api/verifyToken", request.url), {
    method: "POST",
    body: JSON.stringify({ token: token.value }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    const { email, role } = await res.json();
    if (role === "admin") {
      return NextResponse.next(); // Allow access to the dashboard
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export const config = {
  matcher: ["/dashboard"],
};
