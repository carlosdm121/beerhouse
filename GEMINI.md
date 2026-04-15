# 🧠 GEMINI.md — Reglas de Proyecto Next.js + React + TypeScript + Tailwind

> Este archivo es la fuente de verdad para el asistente de IA en este proyecto.
> Seguir estas reglas **siempre**, sin excepciones, a menos que el usuario lo indique explícitamente.

---

## 📦 Stack Tecnológico

| Categoría       | Tecnología                          |
|-----------------|-------------------------------------|
| Framework       | Next.js (App Router)                |
| UI Library      | React + React DOM                   |
| Lenguaje        | TypeScript (strict mode)            |
| Estilos         | Tailwind CSS v4                     |
| PostCSS         | @tailwindcss/postcss                |
| Linting         | ESLint + eslint-config-next         |
| Tipos           | @types/node, @types/react, @types/react-dom |

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── layout.tsx          # Root layout (obligatorio)
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globales + Tailwind directives
│   └── (routes)/           # Grupos de rutas
├── components/
│   ├── ui/                 # Componentes base reutilizables
│   └── features/           # Componentes de negocio
├── lib/                    # Utilidades, helpers, configuraciones
├── hooks/                  # Custom hooks
├── types/                  # Tipos e interfaces globales
├── constants/              # Constantes de la app
└── services/               # Llamadas a APIs externas
```

---

## ⚙️ Reglas TypeScript

- Usar **`strict: true`** siempre en `tsconfig.json`
- **NUNCA** usar `any`. Preferir `unknown` y hacer type narrowing
- Tipar **todos** los props de componentes con `interface` o `type`
- Usar `type` para uniones/intersecciones, `interface` para formas de objetos
- Exportar tipos desde `types/index.ts` cuando sean compartidos
- Usar **generics** en vez de duplicar tipos
- Preferir `satisfies` sobre `as` para validar tipos

```ts
// ✅ Correcto
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// ❌ Incorrecto
const Button = (props: any) => { ... }
```

---

## ⚛️ Reglas React

- **Solo componentes funcionales** — sin class components
- Usar `React.FC` o tipado directo de props (preferir tipado directo)
- Nombrar componentes en **PascalCase**
- Un componente por archivo; el archivo lleva el mismo nombre
- Extraer lógica compleja a **custom hooks** (`use` prefix)
- Usar **`memo`** solo cuando haya evidencia de re-renders costosos
- **`useCallback`** y **`useMemo`** con criterio, no por defecto
- Evitar efectos secundarios fuera de `useEffect`
- Limpiar siempre los side effects en el return de `useEffect`

```tsx
// ✅ Correcto
interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  return (
    <div className="rounded-xl p-4">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

---

## 🚀 Reglas Next.js (App Router)

- Usar **Server Components por defecto** — agregar `'use client'` solo cuando sea necesario
- `'use client'` es necesario cuando se usan: hooks, eventos del browser, state local
- Usar **`loading.tsx`** y **`error.tsx`** en cada segmento de ruta relevante
- **Metadata**: exportar `metadata` o `generateMetadata` en cada `page.tsx`
- **Layouts**: compartir UI entre rutas con `layout.tsx`, nunca con props drilling
- **Server Actions**: usar para mutaciones del lado del servidor (`'use server'`)
- **`next/image`**: usar **siempre** para imágenes (nunca `<img>` nativo)
- **`next/link`**: usar **siempre** para navegación interna (nunca `<a>` nativo)
- **`next/font`**: usar para cargar fuentes (nunca importar desde CDN externos)
- Rutas dinámicas con `[param]`, catch-all con `[...param]`

```tsx
// ✅ Server Component (por defecto)
export default async function Page() {
  const data = await fetchData(); // fetch directo en servidor
  return <Component data={data} />;
}

// ✅ Client Component (solo cuando sea necesario)
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

## 🎨 Reglas Tailwind CSS v4

- Usar **utility classes** de Tailwind siempre; evitar CSS personalizado salvo excepciones
- Usar **`cn()`** (clsx + tailwind-merge) para clases condicionales
- Definir design tokens en `@theme` dentro de `globals.css`
- Usar **variantes responsivas** mobile-first: `sm:`, `md:`, `lg:`, `xl:`
- Agrupar clases por categoría: layout → spacing → typography → color → effects
- Evitar `@apply` salvo para abstracciones de componentes base muy reutilizables
- Usar **`dark:`** para soporte de modo oscuro

```tsx
// ✅ Correcto con cn()
import { cn } from '@/lib/utils';

<div className={cn(
  'flex items-center rounded-lg p-4',
  'text-sm font-medium text-gray-900',
  isActive && 'bg-blue-50 text-blue-700',
  className
)} />
```

---

## 📁 Convenciones de Nomenclatura

| Elemento            | Convención          | Ejemplo                        |
|---------------------|---------------------|--------------------------------|
| Componentes         | PascalCase          | `UserCard.tsx`                 |
| Hooks               | camelCase + `use`   | `useUserData.ts`               |
| Utilidades          | camelCase           | `formatDate.ts`                |
| Constantes          | SCREAMING_SNAKE     | `MAX_RETRIES = 3`              |
| Tipos/Interfaces    | PascalCase          | `UserProfile`, `ApiResponse`   |
| Rutas/carpetas      | kebab-case          | `user-profile/`                |
| Variables           | camelCase           | `isLoading`, `userData`        |
| Archivos de barril  | `index.ts`          | `components/ui/index.ts`       |

---

## 🔍 Reglas ESLint

Configuración base con `eslint-config-next`. Reglas adicionales recomendadas:

```json
{
  "rules": {
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "error",
    "react/self-closing-comp": "error",
    "react/jsx-sort-props": ["warn", { "callbacksLast": true, "shorthandFirst": true }]
  }
}
```

---

## 🧪 Patrones Recomendados

### Fetching de datos (Server Component)
```tsx
async function getData(id: string) {
  const res = await fetch(`/api/items/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json() as Promise<Item>;
}
```

### Custom Hook
```ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (value: T) => {
    setValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setStoredValue] as const;
}
```

### Server Action
```ts
'use server';
import { revalidatePath } from 'next/cache';

export async function createItem(formData: FormData) {
  const name = formData.get('name') as string;
  await db.items.create({ data: { name } });
  revalidatePath('/items');
}
```

---

## 🚫 Anti-Patrones — NUNCA Hacer

- ❌ `any` en TypeScript
- ❌ `<img>` en lugar de `next/image`
- ❌ `<a href>` en lugar de `next/link`
- ❌ `useEffect` para fetching en Client Components (usar React Query o Server Components)
- ❌ Lógica de negocio dentro de componentes UI
- ❌ Props drilling más de 2 niveles (usar Context, Zustand, o Server Components)
- ❌ Importar desde rutas relativas largas (usar alias `@/`)
- ❌ Archivos de componente mayores a ~200 líneas sin dividir
- ❌ Estilos inline con `style={{}}` salvo valores dinámicos imposibles con Tailwind
- ❌ `default export` en utilidades y hooks (solo en componentes de página y layouts)

---

## ✅ Checklist antes de cada respuesta

- [ ] ¿Usa TypeScript estricto sin `any`?
- [ ] ¿El componente es Server Component cuando no necesita interactividad?
- [ ] ¿Las imágenes usan `next/image`?
- [ ] ¿La navegación usa `next/link`?
- [ ] ¿Las clases Tailwind están ordenadas y usan `cn()` para condicionales?
- [ ] ¿Hay manejo de errores y estados de carga?
- [ ] ¿Los tipos están exportados correctamente?
- [ ] ¿El código es accesible (aria, roles, alt texts)?

---

## 💡 Principio General

> **Escribir código como si el siguiente desarrollador fuera un senior que no tolera hacks.**
> Claridad sobre cleverness. Composición sobre herencia. Servidor sobre cliente.
