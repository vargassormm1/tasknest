"use client";
import { useFormState } from "react-dom";
import { deleteTodo, completeTodo } from "@/actions/actions";
import { Square, SquareCheckBig } from "lucide-react";

const Todo = (props: {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    dueDate: Date | null;
    createdAt: Date | null;
    userId: number | null;
    groupId: number;
  };
}) => {
  const initState = { message: null };
  const { todo } = props;

  const [formState, action] = useFormState<{ message: string | null }, number>(
    deleteTodo,
    initState
  );

  const [completeState, completeAction] = useFormState<
    { message: string | null },
    number
  >(completeTodo, initState);

  return (
    <div className="flex justify-between my-4">
      {todo.completed ? (
        <SquareCheckBig
          onClick={() => {
            completeAction(todo.id);
          }}
        />
      ) : (
        <Square
          onClick={() => {
            completeAction(todo.id);
          }}
        />
      )}
      <p>{todo.text}</p>
      <div>
        <button
          onClick={() => {
            action(todo.id);
          }}
          type="submit"
          className="btn btn-error btn-sm mx-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
