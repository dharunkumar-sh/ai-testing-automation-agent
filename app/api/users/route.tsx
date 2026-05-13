import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { users } from "@/db/schema";

export async function POST(req: NextRequest) {
  const user = await currentUser();

  try {
    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, user?.primaryEmailAddress?.emailAddress ?? ""));

    if (userResult.length == 0) {
      const newUser = await db
        .insert(users)
        .values({
          email: user?.primaryEmailAddress?.emailAddress ?? "",
          name: user?.fullName ?? "New User",
        })
        .returning();  // Return the created user

      return NextResponse.json({ user: newUser[0] });
    }

    return NextResponse.json({ user: userResult[0] });
  } catch (e) {
    console.log("Error Creating User", e);
    return NextResponse.json({ error: "Failed to create new user" }, { status: 500 });
  }
}
