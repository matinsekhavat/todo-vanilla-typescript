//Dom Selecting
const $ = document;
const todoInput = $.querySelector(".todo-value") as HTMLInputElement;
const addTodoBtn = $.querySelector(".add-todo") as HTMLButtonElement;
const clearAllTodos = $.querySelector(".clear-todos") as HTMLButtonElement;
const todosWrapper = $.querySelector(".todoList") as HTMLUListElement;

//interface
interface Todo {
  id: number;
  query: string;
  isComplete: boolean;
}
// Todos Array
let todosArray: Todo[] = [];

addTodoBtn.addEventListener("click", (e) => {
  submitTodosHandler(e);
});

function submitTodosHandler(e: any) {
  e.preventDefault();
  const todosData: Todo = {
    id: Date.now(),
    query: todoInput.value,
    isComplete: false,
  };

  todosArray = [...todosArray, todosData];
  todoInput.value = "";
  todoInput.focus();

  addTodosToDom(todosArray);
  todosToLocalStorage(todosArray);
}

//Array to Dom handler
function addTodosToDom(todos: Todo[]) {
  todosWrapper.innerHTML = "";
  todos.forEach((todo) => {
    todosWrapper.insertAdjacentHTML(
      "beforeend",
      `
   <li>
          ${todo.query}<span class="icon" onclick="removeTodo('${todo.id}')">
    <i class="fas fa-trash"></i></span>
  
    </li>
  `
    );
  });
}
// localStorage

function todosToLocalStorage(todos: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodo(_id: number) {
  const removedTodo = todosArray.filter((item) => item.id != _id);
  todosArray = removedTodo;
  addTodosToDom(todosArray);
  todosToLocalStorage(todosArray);
}

window.addEventListener("DOMContentLoaded", () => {
  const storedTodosString = localStorage.getItem("todos");
  const storedTodos: Todo[] = storedTodosString
    ? JSON.parse(storedTodosString)
    : [];
  todosArray = storedTodos;
  addTodosToDom(todosArray);
});
