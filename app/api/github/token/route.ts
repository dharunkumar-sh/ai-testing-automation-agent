import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gh_token")?.value;

  if (!token) {
    return NextResponse.json({ connected: false });
  }

  const validation = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!validation.ok) {
    const response = NextResponse.json(
      { connected: false, reconnect: true },
      { status: 401 },
    );
    response.cookies.delete("gh_token");
    return response;
  }

  return NextResponse.json({ connected: true });
}
