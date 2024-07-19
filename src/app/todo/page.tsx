import NewTodoForm from "@/components/NewTodoForm";
import Todo from "@/components/Todo";
import db from "@/db/drizzle";
import { todos, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const getUserByClerkId = async (clerkId: string) => {
  return await db
    .select({
      id: users.id,
    })
    .from(users)
    .where(eq(users.clerkId, clerkId));
};

const getUserTodos = async (userId: string) => {
  return await db
    .select()
    .from(todos)
    .where(eq(todos.userId, Number(userId)));
};

const TodoPage = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const currentUserId = await getUserByClerkId(userId);
  const todos = await getUserTodos(String(currentUserId[0].id));

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className="text-lg">Todays Todo</h1>
      <NewTodoForm />
      <div className="card bg-neutral shadow-xl w-2/4 mt-5 text-white">
        <div className="card-body">
          <div>
            {todos.map((todo, id) => {
              return <Todo key={id} todo={todo} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
