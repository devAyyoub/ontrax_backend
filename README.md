# 📋 OnTrax Backend

Un sistema de API RESTful robusto para gestión de proyectos y tareas construido con Express.js, MongoDB y TypeScript.

## 🚀 Características Principales

- ✅ **Gestión Completa de Proyectos y Tareas** - CRUD completo para proyectos y sus tareas asociadas
- 🔐 **Sistema de Autenticación Completo** - Registro, login, confirmación por email y recuperación de contraseña
- 📧 **Notificaciones por Email** - Confirmación de cuentas y recuperación de contraseñas
- 🛡️ **Validación de Datos** - Middleware robusto para validación de entrada
- 🗄️ **Base de Datos NoSQL** - Almacenamiento persistente con MongoDB
- 📝 **Sistema de Notas** - Funcionalidad adicional para gestión de notas
- 🔒 **Autenticación JWT** - Tokens seguros para autenticación de usuarios

## 🛠️ Tecnologías Utilizadas [1](#0-0) 

- **Express.js** - Framework web para Node.js
- **MongoDB + Mongoose** - Base de datos NoSQL y ODM
- **TypeScript** - JavaScript tipado para mejor desarrollo
- **JWT** - Autenticación basada en tokens
- **bcrypt** - Hash seguro de contraseñas
- **Nodemailer** - Envío de emails
- **Express Validator** - Validación de requests

## 📁 Estructura del Proyecto [2](#0-1) 

```
src/
├── config/          # Configuraciones (DB, CORS, etc.)
├── controllers/     # Lógica de negocio
├── emails/          # Templates y configuración de emails
├── middleware/      # Middleware personalizado
├── models/          # Modelos de datos (Mongoose)
├── routes/          # Definición de rutas
├── utils/           # Utilidades y helpers
├── index.ts         # Punto de entrada
└── server.ts        # Configuración del servidor
```

## 🗄️ Modelos de Datos

### Usuario [3](#0-2) 

### Autenticación Segura [4](#0-3) 

### Proyecto y Tareas
El sistema mantiene una relación padre-hijo entre proyectos y tareas, permitiendo una organización jerárquica clara.

## 🌐 API Endpoints

### Autenticación [5](#0-4) 

```http
POST   /api/auth/create-account      # Crear nueva cuenta
POST   /api/auth/login               # Iniciar sesión
POST   /api/auth/confirm-account     # Confirmar cuenta por email
POST   /api/auth/forgot-password     # Solicitar recuperación de contraseña
```

### Proyectos y Tareas [6](#0-5) 

```http
POST   /api/projects                 # Crear proyecto
GET    /api/projects                 # Obtener todos los proyectos
GET    /api/projects/:id             # Obtener proyecto específico
PUT    /api/projects/:id             # Actualizar proyecto
DELETE /api/projects/:id             # Eliminar proyecto

POST   /api/projects/:id/tasks       # Crear tarea en proyecto
GET    /api/projects/:id/tasks       # Obtener tareas del proyecto
PUT    /api/projects/:id/tasks/:taskId  # Actualizar tarea
DELETE /api/projects/:id/tasks/:taskId  # Eliminar tarea
```

## ⚙️ Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- MongoDB
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/devAyyoub/ontrax_backup.git
cd ontrax_backup

# 2. Instalar dependencias
npm install
```

### 3. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=4000
MONGO_URI=tu_string_de_conexion_mongodb
JWT_SECRET=tu_secreto_jwt_super_seguro
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_contraseña_de_aplicacion
FRONTEND_URL=http://localhost:3000
```

### 4. Ejecutar el Proyecto [7](#0-6) 

```bash
# Desarrollo
npm run dev

# Desarrollo solo API
npm run dev:api

# Construcción
npm run build

# Producción
npm start
```

## 🔧 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo con hot reload
- `npm run dev:api` - Ejecuta solo la API en modo desarrollo
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor en modo producción

## 📝 Uso de la API

### Ejemplo: Crear una cuenta

```http
POST /api/auth/create-account
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "contraseña123",
  "password_confirmation": "contraseña123"
}
```

### Ejemplo: Crear un proyecto

```http
POST /api/projects
Authorization: Bearer tu_jwt_token
Content-Type: application/json

{
  "projectName": "Rediseño Web",
  "clientName": "Empresa ABC",
  "description": "Rediseño completo del sitio web corporativo"
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

**devAyyoub** - [GitHub](https://github.com/devAyyoub)

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!
