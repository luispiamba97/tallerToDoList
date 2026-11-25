const API_CONTACTS = 'http://localhost:3000/api/contacts';
let contacts = [];

fetchContacts();

async function fetchContacts() {
  const response = await fetch(API_CONTACTS);
  contacts = await response.json();
  render();
}

async function addContact() {
  const nameInput = document.getElementById('contact-name');
  const lastnameInput = document.getElementById('contact-lastname');
  const phoneInput = document.getElementById('contact-phone');
  const cityInput = document.getElementById('contact-city');

  const name = nameInput.value.trim();
  const lastname = lastnameInput.value.trim();
  const phone = phoneInput.value.trim();
  const city = cityInput.value.trim();

  if (!name || !lastname || !phone || !city) {
    alert('Por favor completa todos los campos.');
    return;
  }

  await fetch(API_CONTACTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, lastname, phone, city })
  });

  nameInput.value = '';
  lastnameInput.value = '';
  phoneInput.value = '';
  cityInput.value = '';
  fetchContacts();
}

async function editContact(contact) {
  const newName = prompt('Nuevo nombre:', contact.name);
  const newLastname = prompt('Nuevo apellido:', contact.lastname);
  const newPhone = prompt('Nuevo teléfono:', contact.phone);
  const newCity = prompt('Nueva ciudad:', contact.city);

  if (newName && newLastname && newPhone && newCity) {
    await fetch(`${API_CONTACTS}/${contact.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newName.trim(),
        lastname: newLastname.trim(),
        phone: newPhone.trim(),
        city: newCity.trim()
      })
    });
    fetchContacts();
  }
}

async function deleteContact(idToDelete) {
  await fetch(`${API_CONTACTS}/${idToDelete}`, { method: 'DELETE' });
  fetchContacts();
}

function render() {
  const contactList = document.getElementById('contact-list');
  contactList.innerHTML = '';

  contacts.forEach(function (contact) {
    const card = document.createElement('div');
    card.className = 'contact-card';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'contact-info';
    infoDiv.innerHTML = `
      <strong>${contact.name} ${contact.lastname}</strong>
      <span>📞 ${contact.phone} | 📍 ${contact.city}</span>
    `;

    const actionsDiv = document.createElement('div');
    actionsDiv.style.display = 'flex';
    actionsDiv.style.gap = '5px';

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Editar';
    editBtn.style.backgroundColor = '#ffc107';
    editBtn.style.color = '#000';
    editBtn.style.padding = '6px 10px';
    editBtn.style.fontSize = '12px';
    editBtn.onclick = () => editContact(contact);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = () => deleteContact(contact.id);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);
    contactList.appendChild(card);
  });
}