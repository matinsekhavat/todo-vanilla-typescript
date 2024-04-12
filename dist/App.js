"use strict";
//Dom Selecting
const $ = document;
const todoInput = $.querySelector(".todo-value");
const addTodoBtn = $.querySelector(".add-todo");
const clearAllTodos = $.querySelector(".clear-todos");
const todosWrapper = $.querySelector(".todoList");
// Todos Array
let todosArray = [];
addTodoBtn.addEventListener("click", (e) => {
    submitTodosHandler(e);
});
function submitTodosHandler(e) {
    e.preventDefault();
    const todosData = {
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
function addTodosToDom(todos) {
    todosWrapper.innerHTML = "";
    todos.forEach((todo) => {
        todosWrapper.insertAdjacentHTML("beforeend", `
   <li>
          ${todo.query}<span class="icon" onclick="removeTodo('${todo.id}')">
    <i class="fas fa-trash"></i></span>
  
    </li>
  `);
    });
}
// localStorage
function todosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removeTodo(_id) {
    const removedTodo = todosArray.filter((item) => item.id != _id);
    todosArray = removedTodo;
    addTodosToDom(todosArray);
    todosToLocalStorage(todosArray);
}
window.addEventListener("DOMContentLoaded", () => {
    const storedTodosString = localStorage.getItem("todos");
    const storedTodos = storedTodosString
        ? JSON.parse(storedTodosString)
        : [];
    todosArray = storedTodos;
    addTodosToDom(todosArray);
});
