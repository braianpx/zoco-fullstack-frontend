v# 💻 Frontend - Zoco User Management (React)

Esta es la interfaz de usuario de la solución **Full Stack** para Zoco. Desarrollada como una Single Page Application (SPA) moderna, enfocada en la experiencia de usuario, la seguridad por roles y el diseño responsivo.

---

## 🛠️ Tecnologías y Librerías
- **React 18 (TypeScript):** Para un desarrollo tipado y seguro.
- **Vite:** Herramienta de construcción ultra rápida.
- **Tailwind CSS:** Framework de estilos para un diseño moderno y Mobile-First.
- **React Router DOM:** Gestión de navegación y protección de rutas.
- **Context API:** Manejo del estado global de autenticación y sesión.
- **Axios:** Cliente HTTP con interceptores para el manejo automático del token JWT.
- **Lucide React:** Set de iconos minimalistas.

---

## ✨ Funcionalidades del Frontend

### 🔐 Seguridad y Acceso
- **Rutas Públicas/Privadas:** Control de acceso que impide a usuarios no logueados entrar al Dashboard.
- **Gestión de Roles:** Interfaz dinámica que oculta o bloquea secciones de Administrador (como gestión de usuarios o logs) a usuarios normales.
- **Persistence:** Almacenamiento seguro de la sesión para evitar cierres al refrescar la página.

### 📋 Interfaz de Usuario (UI)
- **Dashboard Principal:** Panel con métricas y accesos directos según el perfil.
- **Ficha de Usuario Pro:** Modal centrado de alta fidelidad que consolida:
  - Edición de datos personales.
  - Historial de Direcciones (Concatenado: Calle - Ciudad - País).
  - Historial Académico (Título - Instituto - Fechas).
  - Listado de **Session Logs** con estados visuales (Success/Failed).
- **Diseño Responsivo:** Adaptación completa para móviles, tablets y pantallas de escritorio.

---

## ⚙️ Requisitos Previos
- **Node.js** v18.0 o superior.
- **npm** o **yarn**.

---

## 🚀 Instalación y Ejecución Local

### 1. Instalación de dependencias
Desde la raíz de la carpeta `frontend/Zoco.App`:
```bash
npm install
```


### 2. Configuración de Variables de Entorno
Crea un archivo llamado `.env` en la raíz de la carpeta frontend y define la URL donde corre tu backend de .NET:
`env`
```bash
VITE_API_URL=https://localhost:7054/api
```
Usa el código con precaución.

### 3. Ejecución en modo desarrollo
```bash
npm run dev

```
Usa el código con precaución.

La aplicación estará disponible en `vhttp://localhost:5173v.
📂 Estructura de Carpetas
src/components: UI reutilizable (Inputs, Buttons, Modals, Forms).
src/context: Lógica de autenticación y sesión global.
src/hooks: Custom hooks para llamadas a la API y lógica de negocio.
src/pages: Vistas principales (Login, Profile, Users, Dashboard).
src/layouts: Componentes envolventes (MainLayout).
src/types: Definiciones de interfaces de TypeScript para los modelos del sistema.
Desarrollado por Braian - Full Stack Developer
