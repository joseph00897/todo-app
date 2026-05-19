const todoInput = document.getElementById("todo-input");

const addBtn = document.getElementById("add-btn");

const todoList = document.getElementById("todo-list");

const filterButtons = document.querySelectorAll("[data-filter]");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";

/* Save To Local Storage */

function saveTodos() {

  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );

}

/* Render Todos */

function renderTodos() {

  todoList.innerHTML = "";

  let filteredTodos = todos.filter(todo => {

    if (currentFilter === "active") {

      return !todo.completed;

    }

    if (currentFilter === "completed") {

      return todo.completed;

    }

    return true;

  });

  filteredTodos.forEach(todo => {

    const li = document.createElement("li");

    li.classList.add("todo-item");

    if (todo.completed) {

      li.classList.add("completed");

    }

    li.innerHTML = `
      <span>${todo.text}</span>

      <div class="todo-actions">

        <button class="complete-btn" data-id="${todo.id}">
          ✓
        </button>

        <button class="edit-btn" data-id="${todo.id}">
          Edit
        </button>

        <button class="delete-btn" data-id="${todo.id}">
          Delete
        </button>

      </div>
    `;

    todoList.appendChild(li);

  });

}

/* Add Todo */

addBtn.addEventListener("click", () => {

  const text = todoInput.value.trim();

  if (text === "") return;

  todos.push({

    id: Date.now(),

    text,

    completed: false

  });

  saveTodos();

  renderTodos();

  todoInput.value = "";

});

/* Event Delegation */

todoList.addEventListener("click", (e) => {

  const id = Number(e.target.dataset.id);

  /* Delete */

  if (e.target.classList.contains("delete-btn")) {

    todos = todos.filter(todo => todo.id !== id);

  }

  /* Complete */

  if (e.target.classList.contains("complete-btn")) {

    todos = todos.map(todo => {

      if (todo.id === id) {

        todo.completed = !todo.completed;

      }

      return todo;

    });

  }

  /* Edit */

  if (e.target.classList.contains("edit-btn")) {

    const newText = prompt("Edit task:");

    if (newText !== null && newText.trim() !== "") {

      todos = todos.map(todo => {

        if (todo.id === id) {

          todo.text = newText;

        }

        return todo;

      });

    }

  }

  saveTodos();

  renderTodos();

});

/* Filter Buttons */

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    currentFilter = button.dataset.filter;

    renderTodos();

  });

});

/* Initial Render */

renderTodos();
