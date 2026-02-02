const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const filtersContainer = document.querySelector(".todo-filters");
const filterBtns = document.querySelectorAll(".filter-btn");

const STORAGE_KEY = "todos";

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.error("Помилка завантаження:", error);
    return [];
  }
}

let todos = loadTodos();

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date(),
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  saveTodos();
  renderTodos();
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;

  if (todo.completed) {
    li.classList.add("completed");
  }

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", function () {
    toggleTodo(todo.id);
  });

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "todo-delete";
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", function () {
    deleteTodo(todo.id);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

let filterStatus = "all";

function getFilteredTodos() {
  if (filterStatus === "all") {
    return todos;
  } else if (filterStatus === "active") {
    return todos.filter((todo) => !todo.completed);
  } else {
    return todos.filter((todo) => todo.completed);
  }
}

filtersContainer.addEventListener("click", function (event) {
  if (!event.target.classList.contains("filter-btn")) {
    return;
  }

  filterBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
  event.target.classList.add("active");
  filterStatus = event.target.dataset.filter;
  renderTodos();
});

function getEmptyMessage() {
  if (filterStatus === "active") {
    return "Всі завдання виконані! 🎉";
  }

  if (filterStatus === "completed") {
    return "Немає виконаних завдань.";
  }

  return "Немає завдань. Додайте нове!";
}
function renderTodos() {
  todoList.innerHTML = "";
  const filteredTodos = getFilteredTodos();

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<li class="message">${getEmptyMessage()}</li>`;
    return;
  }

  filteredTodos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    alert("Введіть завдання!");
    return;
  }
  addTodo(text);

  todoInput.value = "";

  todoInput.focus();
});
renderTodos();
