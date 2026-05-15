import { db, repositories } from "@/db";
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
