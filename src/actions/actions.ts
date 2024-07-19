"use server";

import db from "@/db/drizzle";
import { users, todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getUserByClerkId = async (clerkId: string) => {
  const userId = await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.clerkId, clerkId));

  return userId[0].id;
};

export const createTodo = async (
  prevState: {
    text: string;
    dueDate: string | Date;
    groupId: number;
    message: string | null;
  },
  formData: FormData
) => {
  const data = {
    text: formData.get("text"),
    dueDate: formData.get("dueDate"),
    groupId: formData.get("groupId"),
  };

  try {
    const { userId } = auth();
    const currentUserId = await getUserByClerkId(String(userId));

    await db.insert(todos).values({
      text: String(data.text),
      dueDate: data.dueDate ? new Date(String(data.dueDate)) : null,
      userId: Number(currentUserId),
      groupId: Number(data.groupId),
    });

    return {
      text: "",
      dueDate: "",
      groupId: 1,
      message: "success",
    };
  } catch (error) {
    return {
      text: String(data.text),
      dueDate: data.dueDate ? new Date(String(data.dueDate)) : "",
      groupId: Number(data.groupId),
      message: "error",
    };
  } finally {
    revalidatePath("/todo");
  }
};

export const completeTodo = async (
  prevState: { message: string | null },
  todoId: number
) => {
  try {
    if (!todoId) {
      throw new Error("todoId is required");
    }

    const currentTodo = await db
      .select({
        completed: todos.completed,
      })
      .from(todos)
      .where(eq(todos.id, todoId));

    if (!currentTodo) {
      throw new Error("Todo not found");
    }

    const newCompletedStatus = !currentTodo[0].completed;

    await db
      .update(todos)
      .set({
        completed: newCompletedStatus,
      })
      .where(eq(todos.id, todoId));

    return { message: "successs" };
  } catch (error) {
    return { message: "An arror occured while deleting todo" };
  } finally {
    revalidatePath("/todo");
  }
};

export const deleteTodo = async (
  prevState: { message: string | null },
  todoId: number
) => {
  try {
    if (!todoId) {
      throw new Error("todoId is required");
    }

    await db.delete(todos).where(eq(todos.id, Number(todoId)));

    return { message: "successs" };
  } catch (error) {
    return { message: "An arror occured while deleting todo" };
  } finally {
    revalidatePath("/todo");
  }
};
