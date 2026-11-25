# tallerToDoList
# Taller DOM + API REST con Node.js y Express

**Autores:** Luis Fernando Piamba Lugo - Jose Julian Velasquez  
**Asignatura:** Electiva - Desarrollo de aplicaciones web
**Institución:** Institución Universitaria Antonio José Camacho

---

## Descripción del Proyecto

Este repositorio integra dos aplicaciones web interactivas (**To-Do List** y **Contact List**) conectadas a una API RESTful desarrollada en **Node.js** y **Express**. El objetivo principal es demostrar la manipulación dinámica del **DOM** en el cliente y la persistencia y gestión de datos en el servidor mediante peticiones HTTP (`GET`, `POST`, `PUT` y `DELETE`).

---

## Estructura del Repositorio

```text
tallerToDoList/
├── css/
│   └── styles.css           # Estilos de la aplicación To-Do List
├── html/
│   ├── index.html           # Vista principal de To-Do List
│   ├── indexContact.html    # Vista principal de Contact List
│   ├── scriptContact.js     # Lógica DOM y consumo de API para Contact List
│   └── stylesContact.css    # Estilos de la aplicación Contact List
├── js/
│   └── script.js            # Lógica DOM y consumo de API para To-Do List
├── .gitignore               # Exclusión de node_modules
├── package.json             # Dependencias del proyecto (express, cors)
├── package-lock.json
├── README.md                # Documentación del proyecto
└── server.js                # Servidor Express con endpoints CRUD