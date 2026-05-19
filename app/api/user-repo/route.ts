import { db, repositories } from "@/db";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      repoId,
      userId,
      name,
      full_name,
      private_,
      html_url,
      description,
      language,
      default_branch,
      updated_at,
      owner,
    } = await req.json();

    const parsedUpdatedAt = updated_at ? new Date(updated_at) : null;
    const updatedAtValue =
      parsedUpdatedAt && Number.isNaN(parsedUpdatedAt.getTime())
        ? null
        : parsedUpdatedAt;

    const result = await db
      .insert(repositories)
      .values({
        repoId,
        userId,
        name,
        fullName: full_name,
        private: private_ ? 1 : 0,
        htmlUrl: html_url,
        description,
        language,
        defaultBranch: default_branch,
        updatedAt: updatedAtValue,
        owner,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("Error saving repository:", error);
    return NextResponse.json(
      { error: "Failed to save repository" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const result = await db
    .select()
    .from(repositories)
    .where(eq(repositories.userId, userId ? Number(userId) : 0));

  const cookieStore = await cookies();
  const token = cookieStore.get("gh_token")?.value;

  if (!token) {
    return NextResponse.json(result);
  }

  const enrichedRepos = await Promise.all(
    result.map(async (repo) => {
      if (repo.language && repo.defaultBranch) {
        return repo;
      }

      const githubRepoResponse = await fetch(
        `https://api.github.com/repos/${repo.owner}/${repo.name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        },
      );

      if (!githubRepoResponse.ok) {
        return repo;
      }

      const githubRepo = await githubRepoResponse.json();

      return {
        ...repo,
        language: repo.language ?? githubRepo.language,
        defaultBranch: repo.defaultBranch ?? githubRepo.default_branch,
      };
    }),
  );

  return NextResponse.json(enrichedRepos);
}
