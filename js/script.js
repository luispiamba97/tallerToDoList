const API_URL = 'http://localhost:3000/api/todos';
let todos = [];

fetchTodos();

async function fetchTodos() {
  const response = await fetch(API_URL);
  todos = await response.json();
  render();
}

async function addTodo() {
  const textbox = document.getElementById('todo-title');
  const title = textbox.value.trim();
  const datePicker = document.getElementById('date-picker');
  const dueDate = datePicker.value;

  if (title === '') {
    alert('Por favor escribe una tarea');
    return;
  }

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate })
  });

  textbox.value = '';
  datePicker.value = '';
  fetchTodos();
}

async function deleteTodo(idToDelete) {
  await fetch(`${API_URL}/${idToDelete}`, { method: 'DELETE' });
  fetchTodos();
}

async function toggleComplete(todo) {
  await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !todo.completed })
  });
  fetchTodos();
}

async function editTodo(todo) {
  const newTitle = prompt('Edita el nombre de la tarea:', todo.title);
  if (newTitle !== null && newTitle.trim() !== '') {
    await fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle.trim() })
    });
    fetchTodos();
  }
}

function render() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.className = 'todo-item';

    const infoDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = () => toggleComplete(todo);

    const textSpan = document.createElement('span');
    textSpan.innerText = ' ' + todo.title + ' (' + (todo.dueDate || 'Sin fecha') + ')';
    if (todo.completed) textSpan.className = 'completed';

    infoDiv.appendChild(checkbox);
    infoDiv.appendChild(textSpan);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.className = 'btn-edit';
    editButton.onclick = () => editTodo(todo);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.className = 'btn-delete';
    deleteButton.onclick = () => deleteTodo(todo.id);

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    element.appendChild(infoDiv);
    element.appendChild(actionsDiv);
    todoList.appendChild(element);
  });
}