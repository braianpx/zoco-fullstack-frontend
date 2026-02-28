markdown
# 💻 Prueba Frontend - Zoco User Management (React)

Esta es la interfaz de usuario de la solución **Full Stack** para Zoco. Una Single Page Application (SPA) moderna, enfocada en la experiencia de usuario, seguridad por roles y diseño responsivo de alta fidelidad.

## 🌐 Demo en Vivo
Puedes ver la interfaz funcionando aquí:  
👉 **[Zoco User Management - Vercel](https://zoco-fullstack-frontend.vercel.app)**

> [!IMPORTANT]
> **Nota sobre el Deploy:** La demo actual permite navegar por la interfaz y los componentes de UI. Sin embargo, las funciones de autenticación y gestión de datos (CRUD) requieren que el **Backend (.NET API)** esté en ejecución. Actualmente, el backend no se encuentra desplegado, por lo que las peticiones a la API fallarán en la demo en vivo.

---

## 🛠️ Tecnologías y Librerías

- **React 18 (TypeScript):** Desarrollo robusto con tipado estricto.
- **Vite:** Tooling de última generación para un desarrollo ultra rápido.
- **Tailwind CSS:** Estilizado moderno mediante utilidades y diseño adaptativo.
- **React Router DOM:** Navegación fluida y protección de rutas.
- **Context API:** Gestión del estado global y persistencia de sesión.
- **Axios:** Comunicación con la API mediante interceptores para tokens JWT.
- **Lucide React:** Iconografía minimalista y consistente.

---

## ✨ Funcionalidades Clave

### 🔐 Seguridad y Acceso
- **Rutas Protegidas:** Sistema de guardias que impide el acceso al Dashboard a usuarios no autorizados.
- **RBAC (Role Based Access Control):** Interfaz dinámica que muestra u oculta funciones de Administrador según el perfil.
- **Persistencia de Sesión:** El estado de autenticación se mantiene incluso al refrescar el navegador.

### 📋 Interfaz de Usuario (UI)
**Dashboard de Métricas:** Sección protegida que utiliza un sidebar siempre presente dentro del `MainLayout` para la navegación entre subsecciones.
  - El sidebar gestiona internamente su propio estado (sección activa, apertura en móvil) y la navegación; no requiere props externas.
  - Gestión de perfiles.
  - Historial de Direcciones y Formación Académica.
  - **Session Logs:** Historial de inicios de sesión con estados visuales (Éxito/Fallo).
- **UX Responsiva:** Experiencia optimizada para móviles, tablets y Desktop.

---

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** v18.0 o superior.
- **npm** o **yarn**.

---

## 🚀 Instalación y Ejecución Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 1. Clonar el repositorio
```bash
git clone (https://github.com/braianpx/zoco-fullstack-frontend.git)
cd frontend/Zoco.App
```
Usa el código con precaución.

### 2. Instalar las dependencias
```bash
npm install
```
Usa el código con precaución.

### 3. Configurar Variables de Entorno
Crea un archivo llamado .env en la raíz de la carpeta frontend/Zoco.App y configura la URL de tu API de .NET:
env
```
VITE_API_URL=https://localhost:7054/api
```
Usa el código con precaución.

### 4. Iniciar el servidor de desarrollo
bash
npm run dev
Usa el código con precaución.

La aplicación se abrirá automáticamente en: http://localhost:5173
📂 Estructura del Proyecto
src/components: Componentes de UI reutilizables (Botones, Inputs, Formularios).
src/context: Proveedores de estado global (Autenticación).
src/hooks: Lógica de negocio y llamadas a la API.
src/pages: Vistas principales de la aplicación.
src/types: Definiciones de interfaces de TypeScript para todo el sistema.

## 🏛️ Arquitectura
Se optó por una **arquitectura modular sencilla**, organizada por responsabilidades (hooks, componentes, contexto), ya que la escala actual del proyecto no requería de una estructura más compleja o pesada. Esto permite mantener el código limpio, legible.
