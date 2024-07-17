import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import db from "@/db/drizzle";
import { users, todos } from "@/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (request: NextRequest) => {
  try {
    const { protect, userId } = auth();
    protect();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const userExists = await db
      .select({
        clerkId: users.clerkId,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (userExists.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const userTodos = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, Number(userId)));

    return NextResponse.json({ data: userTodos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching matches with scores." },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const { protect, userId } = auth();
    protect();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const userExists = await db
      .select({
        clerkId: users.clerkId,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (userExists.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Validate the data
    const data = await request.json();
    if (!data.text || !data.groupId) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newTodo = await db
      .insert(todos)
      .values({
        text: String(data.text),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        userId: Number(userId),
        groupId: Number(data.groupId),
      })
      .returning();

    return NextResponse.json({ data: newTodo });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the todo" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { protect, userId } = auth();
    protect();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const userExists = await db
      .select({
        clerkId: users.clerkId,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (userExists.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const data = await request.json();
    if (!data.todoId || !data.text) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const updatedTodo = await db
      .update(todos)
      .set({
        text: String(data.text),
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      })
      .where(eq(todos.id, data.todoId))
      .returning();

    return NextResponse.json({ data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return NextResponse.json(
      { error: "An error occurred while updating todo." },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { protect, userId } = auth();
    protect();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated." },
        { status: 401 }
      );
    }

    const userExists = await db
      .select({
        clerkId: users.clerkId,
        email: users.email,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (userExists.length === 0) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Validate the data
    const data = await request.json();
    if (!data.todoId) {
      return NextResponse.json({ error: "Invalid todoId." }, { status: 400 });
    }

    const deletedTodo = await db
      .delete(todos)
      .where(eq(todos.id, data.todoId))
      .returning();

    return NextResponse.json({ data: deletedTodo });
  } catch (error) {
    console.error("Error in deleting todo:", error);
    return NextResponse.json(
      { error: "An error occurred while deleting todo." },
      { status: 500 }
    );
  }
};
