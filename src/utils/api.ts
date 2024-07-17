const createUrl = (path: string) => {
  return window.location.origin + path;
};

export const getTodos = async () => {
  try {
    const res = await fetch(createUrl(`/api/todo`), {
      method: "GET",
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in getRankings:", error);
    throw error;
  }
};

export const createTodo = async (content: {
  text: string;
  dueDate?: string;
  groupId: number;
}) => {
  try {
    const res = await fetch(createUrl(`/api/todo`), {
      method: "POST",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in createTodo:", error);
    throw error;
  }
};

export const editTodo = async (content: {
  todoId: number;
  text: string;
  dueDate?: string;
}) => {
  try {
    const res = await fetch(createUrl(`/api/todo`), {
      method: "PUT",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in editTodo:", error);
    throw error;
  }
};

export const deleteTodo = async (todoId: number) => {
  try {
    const res = await fetch(createUrl(`/api/todo`), {
      method: "DELETE",
      body: JSON.stringify({ todoId }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error in deleteTodo:", error);
    throw error;
  }
};
