import { FormEvent, useState } from "react";
import useTodos from "../store/todos";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const { handleAddToDo } = useTodos();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("added");
    handleAddToDo(todo);
    setTodo("")
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          name="todo"
        />
        <button type="submit">Add ToDo</button>
      </form>
    </>
  );
};

export default AddTodo;
