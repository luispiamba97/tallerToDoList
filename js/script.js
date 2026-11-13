// Modelo de datos inicial (le agregamos un 'id' y 'completed' para poder manipular cada tarea)
let todos = [
  { id: 1, title: 'Get groceries', dueDate: '2021-10-04', completed: false },
  { id: 2, title: 'Wash car', dueDate: '2021-02-03', completed: false },
  { id: 3, title: 'Make dinner', dueDate: '2021-03-04', completed: false }
];

// Renderizar al cargar la página
render();

// 1. CREAR TAREA
function addTodo() {
  const textbox = document.getElementById('todo-title');
  const title = textbox.value.trim();

  const datePicker = document.getElementById('date-picker');
  const dueDate = datePicker.value;

  if (title === '') {
    alert('Por favor escribe una tarea');
    return;
  }

  todos.push({
    id: Date.now(), // Genera un ID único basado en la hora actual
    title: title,
    dueDate: dueDate,
    completed: false
  });

  // Limpiar los campos después de agregar
  textbox.value = '';
  datePicker.value = '';

  render();
}

// 2. ELIMINAR TAREA
function deleteTodo(idToDelete) {
  todos = todos.filter(function (todo) {
    return todo.id !== idToDelete;
  });
  render();
}

// 3. MARCAR COMO COMPLETADA
function toggleComplete(idToToggle) {
  todos.forEach(function (todo) {
    if (todo.id === idToToggle) {
      todo.completed = !todo.completed;
    }
  });
  render();
}

// 4. EDITAR TAREA
function editTodo(idToEdit) {
  const todo = todos.find(t => t.id === idToEdit);
  const newTitle = prompt('Edita el nombre de la tarea:', todo.title);
  
  if (newTitle !== null && newTitle.trim() !== '') {
    todo.title = newTitle.trim();
    render();
  }
}

// 5. RENDERIZAR EN PANTALLA
function render() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.className = 'todo-item';

    // Contenedor izquierdo (Checkbox + Texto)
    const infoDiv = document.createElement('div');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.onchange = function () {
      toggleComplete(todo.id);
    };

    const textSpan = document.createElement('span');
    textSpan.innerText = ' ' + todo.title + ' (' + (todo.dueDate || 'Sin fecha') + ')';
    if (todo.completed) {
      textSpan.className = 'completed';
    }

    infoDiv.appendChild(checkbox);
    infoDiv.appendChild(textSpan);

    // Contenedor derecho (Botones de Editar y Eliminar)
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const editButton = document.createElement('button');
    editButton.innerText = 'Editar';
    editButton.className = 'btn-edit';
    editButton.onclick = function () {
      editTodo(todo.id);
    };

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Eliminar';
    deleteButton.className = 'btn-delete';
    deleteButton.onclick = function () {
      deleteTodo(todo.id);
    };

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    // Unir todo al elemento principal
    element.appendChild(infoDiv);
    element.appendChild(actionsDiv);
    todoList.appendChild(element);
  });
}