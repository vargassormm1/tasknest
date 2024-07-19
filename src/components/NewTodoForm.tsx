"use client";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { createTodo } from "@/actions/actions";

const NewTodoForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const initState = { text: "", dueDate: "", groupId: 1, message: null };
  const [formState, action] = useFormState<
    {
      text: string;
      dueDate: string | Date;
      groupId: number;
      message: string | null;
    },
    FormData
  >(createTodo, initState);

  if (formRef.current && formState.message === "success") {
    formRef.current.reset();
  }

  return (
    <form ref={formRef} action={action} className="w-full flex justify-center">
      <input
        name="text"
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
      />
      <input type="hidden" name="dueDate" value={""} />
      <input type="hidden" name="groupId" value={1} />
      <button type="submit" className="btn btn-success">
        Submit
      </button>
      {formState?.message === "error" && <p>{formState.message}</p>}
    </form>
  );
};

export default NewTodoForm;
