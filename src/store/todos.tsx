import { createContext, ReactNode, useContext, useState } from "react";

export type TodoProviderProps = {
  children: ReactNode;
};

export type ToDo = {
  id: string;
  task: string;
  completed: boolean;
  createAt: Date;
};

export type TodosContext = {
  todos: ToDo[];
  handleAddToDo: (task: string) => void;
  toggleToDoAsCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const todoContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<ToDo[]>(() => {
    try {
      const newTodo = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodo) as ToDo[];
    } catch (error) {
      console.log(error);
      return [];
    }
  });

  
  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodo: ToDo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createAt: new Date(),
        },
        ...prev,
      ];

      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  const toggleToDoAsCompleted = (id: string) => {
    setTodos((prev) => {
      let newTodo = prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => {
      let newTodo = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(newTodo));
      return newTodo;
    });
  };

  return (
    <todoContext.Provider
      value={{ todos, handleAddToDo, toggleToDoAsCompleted, handleDelete }}
    >
      {children}
    </todoContext.Provider>
  );
};

export default function useTodos() {
  const todosConsumer = useContext(todoContext);
  if (!todosConsumer) {
    throw new Error("UseTodos used outside of provider");
  }

  return todosConsumer;
}
