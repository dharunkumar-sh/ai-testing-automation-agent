import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("gh_token")?.value;

  // Return whether the user has a GitHub token, without exposing the token itself
  return NextResponse.json({ connected: !!token });
}
