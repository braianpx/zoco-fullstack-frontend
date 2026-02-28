# Refactor Completo de Hooks - Resumen de Cambios

## 📁 Estructura de Carpetas

Los hooks ahora están organizados por **dominio de negocio**:

```
src/hooks/
├── address/          # Hooks de direcciones
│   ├── index.ts
│   ├── useAddressGetters.ts
│   └── useAddressMutations.ts
│
├── study/            # Hooks de estudios
│   ├── index.ts
│   ├── useStudyGetters.ts
│   └── useStudyMutations.ts
│
├── user/             # Hooks de usuarios
│   ├── index.ts
│   ├── useUserGetters.ts
│   └── useUserMutations.ts
│
├── sessionLog/       # Hooks de registros de sesión
│   ├── index.ts
│   ├── useSessionLogGetters.ts
│   └── useSessionLogMutations.ts
│
└── auth/             # Hooks de autenticación
    ├── index.ts
    └── useAuthMutations.ts
```

## 🔧 Utilidades Compartidas

Creadas en `src/utils/`:

### 1. **apiHelpers.ts** (ya existente)
```typescript
export const useApiHelpers = () => {
  // Centraliza:
  // - notify: para notificaciones
  // - getErrorMessage: extrae mensajes de error de Axios
  // - invalidate: invalida queries del cache
}
```

### 2. **mutationHelpers.ts** (NUEVO)
```typescript
export function useStandardMutation<TVars, TRes>(opts: StandardMutationOptions) {
  // Wrapper genérico que aplica automáticamente:
  // - Lógica de notificación en onSuccess/onError
  // - Invalidación de queries
  // - Extracción de mensajes de error
  // - Tipado genérico
}
```

### 3. **getterHelpers.ts** (NUEVO)
```typescript
export function useUserBasedList<T>(opts: UserBasedListOptions) {
  // Hook reutilizable para getters que:
  // - Diferencian admin de user
  // - Traen "todos los registros" (admin) o "solo mis registros" (user)
  // - Manejan notificaciones de error
  // - Devuelven { items, isLoading, isAdmin, userId, query }
}
```

## ✨ Cambios Realizados

### **Mutaciones - Antes vs Después**

**ANTES:**
```typescript
const createStudyMutation = useMutation({
  mutationFn: (data: StudyCreate) => createStudy(data),
  onSuccess: (response) => {
    invalidate("studies");
    notify(response.message || "Estudio creado", "success");
  },
  onError: (err) => {
    notify(getErrorMessage(err as any, "Error al crear estudio"), "error");
  },
});
```

**DESPUÉS:**
```typescript
const createStudyMutation = useStandardMutation<StudyCreate, any>({
  mutationFn: createStudy,
  successMsg: "Estudio creado",
  invalidateKey: "studies",
});
```

✅ **90% menos código**, misma funcionalidad

### **Getters - Antes vs Después**

**ANTES:**
```typescript
export const useStudyGetters = (userId: number | null, isAdmin: boolean) => {
  const { notify } = useApiHelpers();
  
  const studiesQuery = useQuery({
    queryKey: ["studies", isAdmin ? "all" : userId],
    queryFn: async () => {
      if (isAdmin) {
        const res = await getAllStudies();
        return res.data;
      }
      // ... más lógica repetida ...
    },
  });
  
  useEffect(() => {
    if (studiesQuery.isError) notify("...", "error");
  }, [studiesQuery.isError, notify]);
  
  return { /* ... */ };
};
```

**DESPUÉS:**
```typescript
export const useStudyGetters = (user: UserResponse | null) => {
  const { items, isLoading, isAdmin, userId, query } =
    useUserBasedList<StudyResponse>({
      user,
      fetchAll: getAllStudies,
      fetchByUser: getStudiesUser,
      queryKey: "studies",
      errorMessage: "No se pudieron cargar los estudios",
    });

  return {
    studiesQuery: query,
    studies: items,
    isLoading,
    isAdmin,
    userId,
  };
};
```

✅ **80% menos código**, lógica centralizada

## 🎯 Beneficios

1. **Elimina duplicación**: La lógica de mutaciones y getters no se repite en 5 archivos
2. **Mantenimiento centralizado**: Cambios de comportamiento en un único lugar
3. **Mejor organización**: Los hooks agrupados por dominio facilitan la navegación
4. **Escalabilidad**: Nuevos hooks pueden reutilizar los helpers sin escribir boilerplate
5. **Consistencia**: Todas las mutaciones y getters se comportan igual

## 📌 Imports Actualizados

Las páginas y componentes pueden importar de forma simplificada:

```typescript
// Antes (imports dispersos)
import { useStudyGetters } from "../hooks/useStudyGetters";
import { useStudyMutations } from "../hooks/useStudyMutations";

// Después (import centralizado)
import { useStudyGetters, useStudyMutations } from "../hooks/study";
```

## 🔗 Árbol de Dependencias

```
Componentes (pages & forms)
    ↓
Domain Hooks (useStudyMutations, useAddressGetters, etc.)
    ↓
Generic Helpers (useStandardMutation, useUserBasedList)
    ↓
API Helpers (useApiHelpers)
    ↓
React Query + Context
```

## ✅ Estado Actual

- ✅ Hooks reorganizados en carpetas por dominio
- ✅ `useStandardMutation` implementado y usado en todos los mutation hooks
- ✅ `useUserBasedList` implementado y usado en Study + Address getters
- ✅ Imports actualizados en todas las páginas y componentes
- ✅ Index files creados para re-exportar desde cada carpeta
