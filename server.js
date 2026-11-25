const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Datos iniciales en memoria
let todos = [
  { id: 1, title: 'Estudiar Express', dueDate: '2026-11-25', completed: false },
  { id: 2, title: 'Subir taller a GitHub', dueDate: '2026-11-25', completed: false }
];

let contacts = [
  { id: 1, name: 'Luis', lastname: 'Piamba', phone: '3246033085', city: 'Cali' }
];

// ================= RUTAS TO-DO LIST =================
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title, dueDate } = req.body;
  const newTodo = { id: Date.now(), title, dueDate, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, dueDate, completed } = req.body;
  const todo = todos.find(t => t.id === id);

  if (!todo) return res.status(404).json({ message: 'Tarea no encontrada' });

  if (title !== undefined) todo.title = title;
  if (dueDate !== undefined) todo.dueDate = dueDate;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = Number(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.json({ message: 'Tarea eliminada' });
});

// ================= RUTAS CONTACT LIST =================
app.get('/api/contacts', (req, res) => {
  res.json(contacts);
});

app.post('/api/contacts', (req, res) => {
  const { name, lastname, phone, city } = req.body;
  const newContact = { id: Date.now(), name, lastname, phone, city };
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.put('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, lastname, phone, city } = req.body;
  const contact = contacts.find(c => c.id === id);

  if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });

  if (name !== undefined) contact.name = name;
  if (lastname !== undefined) contact.lastname = lastname;
  if (phone !== undefined) contact.phone = phone;
  if (city !== undefined) contact.city = city;

  res.json(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  res.json({ message: 'Contacto eliminado' });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});