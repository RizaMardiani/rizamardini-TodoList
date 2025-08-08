let todos = [];

const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const todoList = document.getElementById('todoList');
const filter = document.getElementById('filter');
const addBtn = document.getElementById('addBtn');
const deleteAllBtn = document.getElementById('deleteAll');

addBtn.addEventListener('click', addTodo);
filter.addEventListener('change', renderTodos);
deleteAllBtn.addEventListener('click', () => {
  if (todos.length === 0) return alert("No tasks to delete.");
  if (confirm("Delete all tasks?")) {
    todos = [];
    renderTodos();
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  const dueDate = dateInput.value;

  if (!text) return alert("Please enter a task.");

  todos.push({
    id: Date.now(),
    text,
    dueDate,
    completed: false
  });

  todoInput.value = '';
  dateInput.value = '';
  renderTodos();
}

function toggleStatus(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

function renderTodos() {
  const currentFilter = filter.value;
  let filteredTodos = todos;

  if (currentFilter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  } else if (currentFilter === 'pending') {
    filteredTodos = todos.filter(t => !t.completed);
  }

  if (filteredTodos.length === 0) {
    todoList.innerHTML = `<tr><td colspan="4" class="empty">No tasks found.</td></tr>`;
    return;
  }

  todoList.innerHTML = filteredTodos.map(todo => `
    <tr>
      <td>${todo.text}</td>
      <td>${todo.dueDate || '-'}</td>
      <td>
        <span class="status ${todo.completed ? 'completed' : 'pending'}">
          ${todo.completed ? 'Completed' : 'Pending'}
        </span>
      </td>
      <td>
        <button class="action-btn" onclick="toggleStatus(${todo.id})" title="Toggle status">
          ${todo.completed ? '↩' : '✔'}
        </button>
        <button class="action-btn" onclick="deleteTodo(${todo.id})" title="Delete task">🗑️</button>
      </td>
    </tr>
  `).join('');
}

// Optional: handle Enter key to submit
todoInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});

dateInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTodo();
});
