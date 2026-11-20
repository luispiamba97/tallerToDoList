let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

render();

function saveToLocalStorage() {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact() {
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

  contacts.push({
    id: Date.now(),
    name: name,
    lastname: lastname,
    phone: phone,
    city: city
  });

  saveToLocalStorage();
  render();

  nameInput.value = '';
  lastnameInput.value = '';
  phoneInput.value = '';
  cityInput.value = '';
}

function deleteContact(idToDelete) {
  contacts = contacts.filter(function (contact) {
    return contact.id !== idToDelete;
  });

  saveToLocalStorage();
  render();
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

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Eliminar';
    deleteBtn.className = 'btn-delete';
    deleteBtn.onclick = function () {
      deleteContact(contact.id);
    };

    card.appendChild(infoDiv);
    card.appendChild(deleteBtn);
    contactList.appendChild(card);
  });
}