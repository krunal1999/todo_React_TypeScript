import useTodos from "../store/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const { todos, toggleToDoAsCompleted, handleDelete } = useTodos();

  let [searchParams] = useSearchParams();
  let todosData = searchParams.get("todos");

  let filterData = todos;

  if (todosData === "active") {
    filterData = filterData.filter((task) => !task.completed);
  }
  if (todosData === "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

  return (
    <ul className="main-task">
      {filterData.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              name="check"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleToDoAsCompleted(todo.id)}
            />
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {todo.completed && (
              <button type="button" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
