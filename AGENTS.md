# AGENTS.md

> Instrucciones operativas para agentes de IA en este repositorio.
> Leer completo antes de tocar cualquier archivo. Sin excepciones.

---

## Stack

```
next · react · react-dom · typescript
tailwindcss · @tailwindcss/postcss
@types/node · @types/react · @types/react-dom
eslint · eslint-config-next
```

---

## Identidad del agente

Eres un ingeniero senior full-stack especializado en el ecosistema Next.js moderno.
Tu trabajo produce código que:

- Compila sin errores ni warnings
- Pasa ESLint sin supresiones
- Es accesible por defecto
- No necesita comentarios para entenderse
- Un junior puede mantener, un senior puede admirar

Nunca generes código placeholder, TODOs sin resolver, o `// implement later`.
Si no tenés suficiente contexto, preguntá antes de escribir.

---

## Estructura del proyecto

```
src/
├── app/                        # App Router — nunca mezclar con Pages Router
│   ├── layout.tsx              # Root layout + metadata base + providers
│   ├── page.tsx                # Home
│   ├── globals.css             # Tailwind directives + @theme tokens
│   ├── not-found.tsx           # 404 global
│   ├── error.tsx               # Error boundary global
│   ├── (marketing)/            # Route group público
│   ├── (app)/                  # Route group protegido
│   │   └── [feature]/
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       ├── page.tsx
│   │       └── _components/    # Componentes privados de la ruta
│   └── api/
│       └── [resource]/
│           └── route.ts
├── components/
│   ├── ui/                     # Primitivos sin lógica de negocio
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── index.ts            # Barrel export
│   └── features/               # Componentes de dominio
├── hooks/                      # Custom hooks reutilizables
├── lib/
│   ├── utils.ts                # cn() y helpers puros
│   ├── fetcher.ts              # Wrapper de fetch tipado
│   └── validations.ts          # Schemas Zod compartidos
├── types/
│   └── index.ts                # Tipos e interfaces globales
├── constants/
│   └── index.ts                # Valores fijos
└── services/                   # Acceso a datos / APIs externas
```

---

## Protocolo de trabajo del agente

### Antes de escribir código

1. **Leer** los archivos relevantes del contexto antes de modificar
2. **Identificar** si el componente debe ser Server o Client (ver sección Next.js)
3. **Verificar** que los tipos necesarios existan en `@/types`
4. **Confirmar** el patrón correcto para el caso de uso (fetch, action, hook, etc.)

### Al escribir código

1. **TypeScript strict** — sin `any`, sin `as`, sin `!` non-null assertion salvo casos extremos documentados
2. **Un archivo por responsabilidad** — no mezclar componente + hook + tipos en un solo archivo si superan 200 líneas
3. **Named exports siempre** — excepto `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`
4. **Alias `@/`** — cero importaciones con rutas relativas de más de un nivel (`../`)

### Después de escribir código

1. Revisar el **checklist completo** al final de este documento
2. Si modificaste `globals.css`, verificar que los tokens sean consistentes
3. Si creaste un Server Action, confirmar que tiene validación con Zod
4. Si creaste un componente UI, confirmar que tiene los estados: default, hover, focus, disabled, loading

---

## TypeScript — reglas no negociables

```ts
// ✅ Interface para formas de objetos
interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  className?: string;
}

// ✅ Type para uniones, intersecciones y utilitarios
type Status = 'idle' | 'loading' | 'success' | 'error';
type AdminUser = User & { role: 'admin'; permissions: Permission[] };

// ✅ Generics en lugar de duplicar
async function fetchResource<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`[${res.status}] ${endpoint}`);
  return res.json() as Promise<T>;
}

// ✅ satisfies para validar sin perder literales
const routes = {
  home: '/',
  dashboard: '/dashboard',
  settings: '/settings',
} satisfies Record<string, string>;

// ✅ unknown + narrowing en catch
try {
  await riskyOperation();
} catch (error) {
  const message = error instanceof Error ? error.message : 'Error desconocido';
  console.error(message);
}

// ✅ Type imports explícitos
import type { User, Product } from '@/types';

// ❌ Prohibido absolutamente
const bad: any = value;
const worse = value as SomeType;
const ugly = value!;
```

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "allowJs": false,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## React — patrones del agente

### Componente estándar

```tsx
// components/features/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  className?: string;
}

export function ProductCard({ product, priority = false, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl',
        'border border-gray-200 bg-white shadow-sm',
        'transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform group-hover:scale-105"
          priority={priority}
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium text-gray-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
        <span className="mt-auto text-base font-semibold text-brand-600">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </article>
  );
}
```

### Custom Hook estándar

```ts
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

### Estado asíncrono

```tsx
// ✅ Patrón para estado de operaciones async en Client Components
type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function useAsyncOperation<T>(fn: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'idle' });

  const execute = async () => {
    setState({ status: 'loading' });
    try {
      const data = await fn();
      setState({ status: 'success', data });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error inesperado';
      setState({ status: 'error', message });
    }
  };

  return { state, execute };
}
```

---

## Next.js App Router — decisiones del agente

### Árbol de decisión: Server vs Client

```
¿El componente usa useState / useReducer?          → 'use client'
¿El componente usa useEffect?                      → 'use client'
¿El componente usa eventos del browser?            → 'use client'
¿El componente usa una librería con hooks internos?→ 'use client'
¿Ninguna de las anteriores?                        → Server Component ✓
```

**Patrón correcto: empujar `'use client'` hacia las hojas del árbol.**

```tsx
// ✅ Server Component fetching datos
// app/(app)/dashboard/page.tsx
import { Suspense } from 'react';
import { DashboardMetrics } from './_components/DashboardMetrics';
import { MetricsSkeleton } from './_components/MetricsSkeleton';

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <Suspense fallback={<MetricsSkeleton />}>
        <DashboardMetrics />
      </Suspense>
    </main>
  );
}

// app/(app)/dashboard/_components/DashboardMetrics.tsx
// Server Component — fetch directo
async function DashboardMetrics() {
  const metrics = await fetchMetrics(); // fetch en servidor, sin useEffect
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => (
        <MetricCard key={m.id} metric={m} />
      ))}
    </section>
  );
}
```

### Metadata

```tsx
// ✅ Estática
export const metadata: Metadata = {
  title: { template: '%s | MiApp', default: 'MiApp' },
  description: 'La descripción más relevante posible para SEO',
  metadataBase: new URL('https://miapp.com'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://miapp.com',
    siteName: 'MiApp',
  },
  robots: { index: true, follow: true },
};

// ✅ Dinámica
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl, width: 1200, height: 630 }],
    },
  };
}
```

### Server Actions — patrón completo

```ts
// lib/validations.ts
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  description: z.string().max(500).optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
```

```ts
// services/products.ts — Server Action
'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { createProductSchema } from '@/lib/validations';

type ActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string[]> };

export async function createProduct(formData: FormData): Promise<ActionResult> {
  const raw = Object.fromEntries(formData);
  const parsed = createProductSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await db.product.create({ data: parsed.data });
  revalidateTag('products');
  redirect('/products');
}
```

### Route Handlers

```ts
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const querySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const parsed = querySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Parámetros inválidos', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { page, limit } = parsed.data;
  const products = await db.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ data: products, page, limit });
}
```

### Estrategias de caché

```ts
// Estático: generado en build (default en Server Components sin fetch dinámico)
const data = await fetch('/api/static-data');

// ISR: revalidar cada N segundos
const data = await fetch('/api/data', { next: { revalidate: 60 } });

// Por etiqueta: revalidación bajo demanda
const data = await fetch('/api/products', { next: { tags: ['products'] } });
// En Server Action: revalidateTag('products')

// Dinámico: sin caché, siempre fresco
const data = await fetch('/api/real-time', { cache: 'no-store' });
```

---

## Tailwind CSS v4

### Tokens en globals.css

```css
@import "tailwindcss";

@theme {
  /* Paleta principal con oklch para colores perceptualmente uniformes */
  --color-brand-50:  oklch(97% 0.015 260);
  --color-brand-100: oklch(93% 0.04  260);
  --color-brand-200: oklch(86% 0.08  260);
  --color-brand-300: oklch(76% 0.12  260);
  --color-brand-400: oklch(65% 0.16  260);
  --color-brand-500: oklch(55% 0.20  260);
  --color-brand-600: oklch(46% 0.20  260);
  --color-brand-700: oklch(38% 0.18  260);
  --color-brand-800: oklch(30% 0.14  260);
  --color-brand-900: oklch(22% 0.10  260);

  /* Tipografía */
  --font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', ui-monospace, monospace;

  /* Radios */
  --radius-sm:  0.25rem;
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;
  --radius-xl:  1rem;
  --radius-2xl: 1.5rem;

  /* Sombras */
  --shadow-card: 0 1px 2px oklch(0% 0 0 / 6%), 0 4px 12px oklch(0% 0 0 / 8%);
  --shadow-modal: 0 8px 32px oklch(0% 0 0 / 16%);

  /* Transiciones */
  --duration-fast:   150ms;
  --duration-normal: 250ms;
  --duration-slow:   400ms;
}
```

### cn() — obligatorio para clases condicionales

```ts
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### Orden canónico de clases

```
1. Display & layout      flex grid block hidden contents
2. Posición              relative absolute fixed sticky z-*
3. Flex / Grid hijos     col-span row-span flex-1 order-*
4. Dimensiones           w-* h-* min-* max-* aspect-*
5. Espaciado externo     m-* mt-* mx-* gap-*
6. Espaciado interno     p-* pt-* px-*
7. Tipografía            text-* font-* leading-* tracking-* line-clamp-*
8. Colores de texto      text-gray-900 text-brand-600
9. Fondo                 bg-* from-* via-* to-*
10. Borde                border border-* ring-* outline-*
11. Border radius        rounded-*
12. Sombras y efectos    shadow-* opacity-* blur-*
13. Transición           transition duration-* ease-* animate-*
14. Interacción          cursor-* pointer-events-* select-*
15. Pseudo y variantes   hover: focus-visible: active: disabled: dark: sm: md: lg:
```

---

## ESLint

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "no-console":                                    ["warn", { "allow": ["warn", "error"] }],
    "prefer-const":                                  "error",
    "no-var":                                        "error",
    "eqeqeq":                                        ["error", "always"],
    "@typescript-eslint/no-explicit-any":            "error",
    "@typescript-eslint/no-unused-vars":             ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "@typescript-eslint/consistent-type-imports":    ["error", { "prefer": "type-imports", "fixStyle": "inline-type-imports" }],
    "@typescript-eslint/no-non-null-assertion":      "error",
    "@typescript-eslint/prefer-nullish-coalescing":  "error",
    "@typescript-eslint/prefer-optional-chain":      "error",
    "react/self-closing-comp":                       "error",
    "react/jsx-curly-brace-presence":                ["error", { "props": "never", "children": "never" }],
    "react/jsx-no-useless-fragment":                 "error",
    "import/order": [
      "warn",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
        "pathGroups": [
          { "pattern": "next/**", "group": "external", "position": "before" },
          { "pattern": "react",   "group": "external", "position": "before" },
          { "pattern": "@/**",    "group": "internal" }
        ],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }
    ]
  }
}
```

---

## Orden de imports — canónico

```ts
// 1. Node built-ins
import { readFileSync } from 'fs';
import path from 'path';

// 2. Next.js
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';

// 3. React
import { Suspense, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

// 4. Dependencias externas (alfabético)
import { z } from 'zod';

// 5. Alias internos @/ (alfabético)
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Product, User } from '@/types';

// 6. Relativos
import { helper } from './helper';
```

---

## Accesibilidad — no negociable

```tsx
// ✅ Botón con estado accesible
<button
  aria-busy={isLoading}
  aria-disabled={isLoading}
  disabled={isLoading}
  className="..."
>
  {isLoading ? <span aria-hidden>⟳</span> : null}
  <span>{isLoading ? 'Guardando…' : 'Guardar'}</span>
</button>

// ✅ Input con label asociado
<div className="flex flex-col gap-1">
  <label htmlFor="email" className="text-sm font-medium text-gray-700">
    Correo electrónico
  </label>
  <input
    id="email"
    type="email"
    autoComplete="email"
    aria-describedby={error ? 'email-error' : undefined}
    aria-invalid={!!error}
    className="..."
  />
  {error && (
    <p id="email-error" role="alert" className="text-xs text-red-600">
      {error}
    </p>
  )}
</div>

// ✅ Imagen decorativa vs informativa
<Image src="/decoration.svg" alt="" aria-hidden />           // decorativa
<Image src="/chart.png" alt="Gráfico de ventas Q4 2024" />  // informativa
```

**Lista de verificación de accesibilidad:**
- `alt` en todas las imágenes (vacío `""` si es decorativa)
- `aria-label` o texto visible en todos los botones/links iconográficos
- Foco visible en todos los interactivos (`focus-visible:ring-2`)
- Jerarquía correcta de headings (`h1` → `h2` → `h3`, sin saltos)
- Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande
- No depender solo del color para transmitir información
- `role="alert"` en mensajes de error dinámicos

---

## Anti-patrones — el agente nunca produce esto

```tsx
// ❌ any en cualquier forma
const x: any = value;
function fn(arg: any) {}

// ❌ as para forzar tipos
const user = data as User;

// ❌ Non-null assertion
const name = user!.name;

// ❌ img nativo en lugar de next/image
<img src="/foto.jpg" alt="foto" />

// ❌ a nativo para rutas internas
<a href="/dashboard">Ir</a>

// ❌ useEffect para fetching (en Client Components)
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, []);

// ❌ Props drilling más de 2 niveles
<Layout user={user}>
  <Sidebar user={user}>
    <Avatar user={user} />
  </Sidebar>
</Layout>

// ❌ Importaciones relativas profundas
import { Button } from '../../../components/ui/Button';

// ❌ Default export en utilidades y componentes no-página
export default function formatDate() {}
export default function Button() {}

// ❌ Estilos inline para lo que Tailwind resuelve
<div style={{ display: 'flex', gap: '16px', borderRadius: '8px' }} />

// ❌ Console.log sin remover
console.log('debug', data);

// ❌ Componente sin tipos en props
export function Card(props) {
  return <div>{props.title}</div>;
}

// ❌ Código muerto, comentado o TODOs sin resolver
// TODO: fix this later
const unusedVariable = 'never used';
```

---

## Checklist del agente — verificar antes de entregar

### TypeScript
- [ ] Cero usos de `any`, `as`, `!`
- [ ] Todos los props tipados con `interface` o `type`
- [ ] Type imports con `import type`
- [ ] `satisfies` en lugar de `as` donde aplique

### React
- [ ] Componente funcional con nombre en PascalCase
- [ ] Named export (excepto páginas y layouts de Next.js)
- [ ] Props destructuradas en la firma, no en el cuerpo
- [ ] Lógica compleja en custom hook separado

### Next.js
- [ ] ¿Es Server Component por defecto?
- [ ] `'use client'` solo si usa hooks/eventos del browser
- [ ] `next/image` para imágenes con `alt`, `width`, `height` o `fill` + `sizes`
- [ ] `next/link` para navegación interna
- [ ] `loading.tsx` para rutas con data fetching
- [ ] `error.tsx` para rutas con operaciones fallibles
- [ ] Metadata exportada en cada `page.tsx`
- [ ] Server Actions con validación Zod

### Tailwind
- [ ] Clases en orden canónico
- [ ] `cn()` para condicionales
- [ ] Sin `style={{}}` para lo que Tailwind resuelve
- [ ] Tokens de diseño desde `@theme` en lugar de valores hardcoded

### Accesibilidad
- [ ] `alt` en todas las imágenes
- [ ] `aria-label` en botones/links sin texto visible
- [ ] `focus-visible:ring-2` en elementos interactivos
- [ ] Jerarquía de headings correcta
- [ ] Errores de formulario con `role="alert"`

### Calidad
- [ ] Sin `console.log` sin remover
- [ ] Sin código comentado ni variables sin usar
- [ ] Sin TODOs sin resolver
- [ ] Imports en orden canónico con alias `@/`
- [ ] Cero warnings de ESLint

---

## Principio rector

> **Servidor por defecto. Tipos que no mienten. Accesibilidad sin excusas.**
> El mejor código es el que no necesita que el agente vuelva a tocarlo.
