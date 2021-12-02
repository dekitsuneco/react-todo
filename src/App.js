import React, { useEffect } from "react";
import Context from "./context";
//import AddTodo from "./Todo/AddTodo";
import TodoList from "./Todo/TodoList";
import Loader from "./Loader";
import Modal from "./Modal/Modal";

const AddTodo = React.lazy(() => import("./Todo/AddTodo"));

function App() {
  const [todos, setTodos] = React.useState([
    /*{ id: 1, title: "Develop Honkai Impact 3rd",  isCompleted: false },
    { id: 2, title: "Develop Honkai: Star Rail",  isCompleted: false },
    { id: 3, title: "Develop Honkai 4rd: Galaxy", isCompleted: false },*/
  ]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=6')
    .then(response => response.json())
    .then(json => {
      // ?SetTimeout is here for simulating data delay.
      setTimeout(() => {
        setTodos(json);
        setLoading(false);
      }, 2000)
    })
  }, []);

  function toggleTodo(id) {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }

      return todo;
    }));
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(todos.concat([{ 
      title,
      id: Date.now(),
      isCompleted: false,
    }]))
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>React learning</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddTodo onCreate={addTodo} />
        </React.Suspense>

        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo} />
          ) : (loading ? null : (
              <p>Nothing to do now..</p>
          ))
        }
      </div>
    </Context.Provider>
  );
}

export default App;
