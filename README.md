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

### Autenticación (#0-10) 

```http
POST   /api/auth/create-account           # Crear nueva cuenta
POST   /api/auth/confirm-account          # Confirmar cuenta por email con token
POST   /api/auth/login                    # Iniciar sesión
POST   /api/auth/request-code             # Solicitar código de confirmación
POST   /api/auth/forgot-password          # Solicitar recuperación de contraseña
POST   /api/auth/validate-token           # Validar token de recuperación
POST   /api/auth/update-password/:token   # Actualizar contraseña con token

GET    /api/auth/user                     # Obtener usuario autenticado

PUT    /api/auth/profile                  # Actualizar perfil (email y nombre)
PUT    /api/auth/update-password          # Actualizar contraseña (autenticado)

POST   /api/auth/check-password           # Verificar si la contraseña actual es correcta
```

### Proyectos y Tareas (#11-15) 

```http
POST   /api/projects                      # Crear proyecto
GET    /api/projects                      # Obtener todos los proyectos
GET    /api/projects/:id                  # Obtener proyecto específico
PUT    /api/projects/:projectId           # Actualizar proyecto
DELETE /api/projects/:projectId           # Eliminar proyecto
```
### Tareas (#16-22)

```http
POST   /api/projects/:projectId/tasks                 # Crear tarea en proyecto
GET    /api/projects/:projectId/tasks                 # Obtener tareas del proyecto
GET    /api/projects/:projectId/tasks/:taskId         # Obtener tarea específica
PUT    /api/projects/:projectId/tasks/:taskId         # Actualizar tarea
DELETE /api/projects/:projectId/tasks/:taskId         # Eliminar tarea
POST   /api/projects/:projectId/tasks/:taskId/status  # Actualizar estado de la tarea
```

### Equipo (#23-26)

```http
POST   /api/projects/:projectId/team/find      # Buscar miembro por email
GET    /api/projects/:projectId/team           # Obtener equipo del proyecto
POST   /api/projects/:projectId/team           # Añadir miembro por ID
DELETE /api/projects/:projectId/team/:userId   # Eliminar miembro del proyecto
```

### ENotas (#27-29)

```http
POST   /api/projects/:projectId/tasks/:taskId/notes           # Crear nota en tarea
GET    /api/projects/:projectId/tasks/:taskId/notes           # Obtener notas de una tarea
DELETE /api/projects/:projectId/tasks/:taskId/notes/:noteId   # Eliminar nota
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
