import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("gh_token")?.value;

    if (!token) {
      console.error("No GitHub token found in cookies");
      return NextResponse.json(
        {
          error:
            "GitHub token not found. Please reconnect your GitHub account.",
        },
        { status: 401 },
      );
    }

    // First, verify the token is still valid by checking the authenticated user
    const userCheck = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!userCheck.ok) {
      console.error(
        `GitHub token validation failed: ${userCheck.status} ${userCheck.statusText}`,
      );

      // If token is invalid/expired, clear the cookie and ask user to re-authenticate
      if (userCheck.status === 401 || userCheck.status === 403) {
        const response = NextResponse.json(
          {
            error:
              "GitHub token expired or revoked. Please reconnect your GitHub account.",
            reconnect: true,
          },
          { status: 401 },
        );
        response.cookies.delete("gh_token");
        return response;
      }

      return NextResponse.json(
        { error: `GitHub API error: ${userCheck.statusText}` },
        { status: userCheck.status },
      );
    }

    const githubUser = await userCheck.json();

    // Fetch all repos with pagination
    const allRepos = [];
    let page = 1;

    while (true) {
      const res = await fetch(
        `https://api.github.com/user/repos?per_page=100&page=${page}&sort=updated&type=all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      if (!res.ok) {
        console.error(
          `GitHub API error on page ${page}: ${res.status} ${res.statusText}`,
        );
        const errorBody = await res.text();
        console.error("GitHub API error body:", errorBody);

        return NextResponse.json(
          { error: `GitHub API error: ${res.statusText}` },
          { status: res.status },
        );
      }

      const repos = await res.json();
      if (!Array.isArray(repos) || repos.length === 0) break;

      allRepos.push(...repos);
      page++;
    }
    return NextResponse.json(
      allRepos.map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        private_: r.private,
        html_url: r.html_url,
        description: r.description,
        updated_at: r.updated_at,
        language: r.language,
        default_branch: r.default_branch,
        owner: r.owner.login,
      })),
    );
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 },
    );
  }
}
