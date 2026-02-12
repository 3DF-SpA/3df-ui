# @3df/ui

Librería de componentes UI para Vue 3, construida con Tailwind CSS v4 y [class-variance-authority](https://cva.style). Inspirada en [shadcn/ui](https://ui.shadcn.com) — componentes minimalistas, accesibles y completamente personalizables a través de design tokens.

## Características

- **Vue 3.5+** con `<script setup>` y TypeScript
- **Tailwind CSS v4** con sistema de tokens vía `@theme`
- **Tree-shakeable** — solo pagas por lo que importas
- **Dark mode** integrado vía clase `.dark`
- **Polimórfico** — renderiza como `<button>`, `<a>`, o cualquier componente
- **Override de clases** — sobrescribe cualquier estilo con Tailwind gracias a `tailwind-merge`
- **Tipos incluidos** — `.d.ts` generados automáticamente
- **Accesible** — roles ARIA, `tabindex`, navegación por teclado (`Enter`/`Space`/`Arrow`) en todos los componentes interactivos
- **Type-safe provide/inject** — todos los componentes compuestos usan `InjectionKey<T>` con `Symbol()` para seguridad de tipos completa
- **Rendimiento optimizado** — listeners globales (`document.addEventListener`) solo activos cuando el componente lo requiere (ej: menú abierto)
- **i18n-ready** — sin texto hardcodeado en el DOM; todos los aria-labels en inglés neutral, overrideable vía props o slots

---

## Tabla de contenidos

- [Instalación](#instalación)
- [Integración por framework](#integración-por-framework)
- [Dark mode](#dark-mode)
- **Componentes**
  - [Button](#button)
  - [Badge](#badge)
  - [Formularios](#formularios)
    - [Label](#label)
    - [Input](#input)
    - [Textarea](#textarea)
    - [Select](#select)
    - [Checkbox](#checkbox)
    - [Radio](#radio)
    - [Switch](#switch)
  - [Card](#card)
  - [Dropdown Menu](#dropdown-menu)
  - [Popover](#popover)
  - [Sonner (Toast)](#sonner-toast)
  - [Alert](#alert)
  - [Tooltip](#tooltip)
  - [Toggle](#toggle)
  - [Table](#table)
  - [Slider](#slider)
  - [Skeleton](#skeleton)
  - [Sidebar](#sidebar)
  - [Sheet](#sheet)
  - [Separator](#separator)
  - [Scroll Area](#scroll-area)
  - [Progress](#progress)
  - [Pagination](#pagination)
  - [Navigation Menu](#navigation-menu)
  - [Menubar](#menubar)
  - [Kbd](#kbd)
  - [Item](#item)
  - [Input OTP](#input-otp)
  - [Hover Card](#hover-card)
  - [Empty State](#empty-state)
  - [Drawer](#drawer)
  - [Dialog](#dialog)
  - [Calendar](#calendar)
  - [DatePicker](#datepicker)
  - [Context Menu](#context-menu)
  - [Command](#command)
  - [Combobox](#combobox)
  - [Collapsible](#collapsible)
  - [Carousel](#carousel)
  - [Breadcrumb](#breadcrumb)
  - [Avatar](#avatar)
  - [Alert Dialog](#alert-dialog)
  - [Accordion](#accordion)
  - [Logo Cloud & Marquee](#logo-cloud--marquee)
- **Charts** (`@3df/charts`)
  - [Instalación Charts](#instalación-charts)
  - [Bar Chart](#bar-chart)
  - [Line Chart](#line-chart)
  - [Pie Chart](#pie-chart)
  - [Radar Chart](#radar-chart)
  - [Scatter Chart](#scatter-chart)
  - [Gauge Chart](#gauge-chart)
- [Utilidades](#utilidades)
- [Personalización del tema](#personalización-del-tema)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts de desarrollo](#scripts-de-desarrollo)
- [Contribución interna](#contribución-interna)
- [Buenas prácticas](#buenas-prácticas)
- [Peer dependencies](#peer-dependencies)

---

## Instalación

### 1. Instalar el paquete y sus peer dependencies

```bash
pnpm add @3df/ui class-variance-authority clsx tailwind-merge
```

> `vue` ya debe estar instalado en tu proyecto.

### 2. Configurar el CSS

En tu archivo CSS principal (por ejemplo `src/assets/main.css` o `src/styles/global.css`):

```css
@import 'tailwindcss';
@import '@3df/ui/theme.css';
@source '@3df/ui';
```

| Línea                         | Qué hace                                                            |
| ----------------------------- | ------------------------------------------------------------------- |
| `@import "tailwindcss"`       | Carga Tailwind CSS v4                                               |
| `@import "@3df/ui/theme.css"` | Importa los design tokens (colores, radios, dark mode)              |
| `@source "@3df/ui"`           | Le dice a Tailwind que escanee las clases usadas dentro del paquete |

### 3. Importar el CSS en tu app

**Vue** — en `main.ts`:

```ts
import './assets/main.css';
```

**Astro** — en tu layout principal:

```astro
---
import '../styles/global.css';
---
```

> Astro extrae el CSS automáticamente al `<head>` como render-blocking. En Vue + Vite, el build de producción hace lo mismo.

---

## Integración por framework

### Vue

```vue
<script setup lang="ts">
import { Button } from '@3df/ui';
</script>

<template>
  <Button variant="outline">Click me</Button>
</template>
```

### Astro

```astro
---
import { Button } from '@3df/ui';
---

<Button client:load variant="destructive">
  Eliminar
</Button>
```

> En Astro necesitas `client:load` (o `client:visible`, `client:idle`) para que el componente Vue sea interactivo.

---

## Dark mode

El tema soporta light y dark mode a través de la clase `dark` en el elemento `<html>`:

```html
<!-- Light mode (por defecto) -->
<html lang="es">
  <!-- Dark mode -->
  <html class="dark" lang="es"></html>
</html>
```

Para toggle dinámico con persistencia:

```ts
// Leer preferencia guardada o del sistema
const theme =
  localStorage.getItem('theme') ??
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.classList.toggle('dark', theme === 'dark');

// Guardar al cambiar
function setTheme(value: 'light' | 'dark') {
  localStorage.setItem('theme', value);
  document.documentElement.classList.toggle('dark', value === 'dark');
}
```

---

## Componentes

### Button

Botón versátil con variantes, tamaños y renderizado polimórfico.

#### Importación

```ts
import { Button } from '@3df/ui';
```

#### Props

| Prop      | Tipo                                                                          | Default     | Descripción                        |
| --------- | ----------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive' \| 'link'` | `'default'` | Estilo visual del botón            |
| `size`    | `'default' \| 'xs' \| 'sm' \| 'lg' \| 'icon'`                                 | `'default'` | Tamaño del botón                   |
| `as`      | `string \| Component`                                                         | `'button'`  | Elemento o componente a renderizar |

> Además acepta todos los atributos nativos del elemento (`type`, `disabled`, `href`, `target`, etc.) vía `$attrs`.

---

#### Variantes

```vue
<template>
  <Button>Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</template>
```

| Variante      | Uso recomendado                                                                      |
| ------------- | ------------------------------------------------------------------------------------ |
| `default`     | Acción principal (CTA). Fondo sólido, alto contraste.                                |
| `secondary`   | Acción secundaria. Fondo sutil.                                                      |
| `outline`     | Acción terciaria. Borde visible, fondo transparente.                                 |
| `ghost`       | Acciones dentro de toolbars, menús, o áreas con poco espacio. Sin borde ni fondo.    |
| `destructive` | Acciones peligrosas (eliminar, desconectar). Rojo.                                   |
| `link`        | Navegación inline que se comporta como un enlace. Sin fondo, con subrayado en hover. |

---

#### Tamaños

```vue
<template>
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon">
    <MyIcon name="settings" />
  </Button>
</template>
```

| Tamaño    | Altura        | Uso                                           |
| --------- | ------------- | --------------------------------------------- |
| `xs`      | `h-7` (28px)  | Acciones compactas, tags, badges interactivos |
| `sm`      | `h-9` (36px)  | Formularios densos, toolbars                  |
| `default` | `h-10` (40px) | Uso general                                   |
| `lg`      | `h-11` (44px) | CTAs prominentes, hero sections               |
| `icon`    | `h-10 w-10`   | Botones de solo icono (cuadrado)              |

---

#### Estado disabled

```vue
<template>
  <Button disabled>No puedes hacer click</Button>
  <Button variant="destructive" disabled>Eliminar</Button>
</template>
```

Los botones deshabilitados aplican `opacity: 0.5` y `pointer-events: none` automáticamente.

---

#### Como enlace

Usa la prop `as` para renderizar como `<a>`:

```vue
<template>
  <Button as="a" href="https://example.com" target="_blank"> Visitar sitio </Button>

  <Button as="a" href="/docs" variant="outline"> Documentación </Button>
</template>
```

#### Con componente de router

```vue
<script setup lang="ts">
import { Button } from '@3df/ui';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Button :as="RouterLink" to="/dashboard"> Ir al dashboard </Button>
</template>
```

---

#### Con iconos

```vue
<template>
  <!-- Icono a la izquierda -->
  <Button>
    <MyIcon name="plus" :size="16" />
    Crear nuevo
  </Button>

  <!-- Icono a la derecha -->
  <Button variant="outline">
    Siguiente
    <MyIcon name="arrow-right" :size="16" />
  </Button>

  <!-- Solo icono -->
  <Button size="icon" variant="ghost">
    <MyIcon name="settings" />
  </Button>
</template>
```

> El componente incluye `gap-2` por defecto, así que los iconos y el texto se separan automáticamente.

---

#### Ancho completo

```vue
<template>
  <Button class="w-full">Confirmar pedido</Button>
</template>
```

---

#### Override de estilos

Puedes sobrescribir cualquier clase de Tailwind pasando `class`. Gracias a `tailwind-merge`, tus clases ganan sobre las del componente sin conflictos:

```vue
<template>
  <!-- Bordes redondeados completos -->
  <Button class="rounded-full">Pill button</Button>

  <!-- Color personalizado -->
  <Button class="bg-indigo-600 hover:bg-indigo-700">Custom color</Button>

  <!-- Tamaño personalizado -->
  <Button class="h-14 px-8 text-lg">Extra grande</Button>
</template>
```

---

#### Acceso a las variantes (headless)

Si necesitas los estilos del botón sin el componente (por ejemplo para un `<a>` nativo o un componente de otra librería):

```ts
import { buttonVariants } from '@3df/ui';

const classes = buttonVariants({ variant: 'outline', size: 'sm' });
// → "inline-flex items-center justify-center ... border border-border ..."
```

```vue
<template>
  <a :class="buttonVariants({ variant: 'link' })" href="/docs"> Ver documentación </a>
</template>
```

---

### Badge

Etiqueta compacta para estados, conteos y categorías.

#### Importación

```ts
import { Badge } from '@3df/ui';
```

#### Props

| Prop      | Tipo                                                                                                                                                                                           | Default     | Descripción                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| `variant` | `'default' \| 'secondary' \| 'outline' \| 'destructive' \| 'success' \| 'warning' \| 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'indigo' \| 'purple' \| 'pink' \| 'gray'` | `'default'` | Estilo visual del badge            |
| `size`    | `'default' \| 'sm' \| 'lg'`                                                                                                                                                                    | `'default'` | Tamaño del badge                   |
| `as`      | `string \| Component`                                                                                                                                                                          | `'span'`    | Elemento o componente a renderizar |

> Acepta todos los atributos nativos del elemento (`href`, `target`, etc.) vía `$attrs`. Los SVG dentro del badge se redimensionan automáticamente a `size-3`.
>
> **Los badges no tienen hover por defecto** — son etiquetas estáticas. Si necesitas interactividad (links, tags clickeables), agrega hover manualmente vía `class`.

---

#### Variantes

```vue
<template>
  <Badge>Default</Badge>
  <Badge variant="secondary">Secondary</Badge>
  <Badge variant="outline">Outline</Badge>
  <Badge variant="destructive">Destructive</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
</template>
```

| Variante      | Uso recomendado                                             |
| ------------- | ----------------------------------------------------------- |
| `default`     | Estado principal o categoría activa. Fondo sólido primario. |
| `secondary`   | Información complementaria, metadata.                       |
| `outline`     | Etiquetas neutrales con borde. Fondo transparente.          |
| `destructive` | Errores, estados críticos, rechazos. Rojo.                  |
| `success`     | Operación exitosa, estado activo, aprobado. Verde.          |
| `warning`     | Advertencias, pendientes, mantenimiento programado. Ámbar.  |

---

#### Colores

Además de las variantes semánticas, hay 10 variantes de color directo para etiquetas, categorías o tags con colores específicos:

```vue
<template>
  <Badge variant="red">Red</Badge>
  <Badge variant="orange">Orange</Badge>
  <Badge variant="yellow">Yellow</Badge>
  <Badge variant="green">Green</Badge>
  <Badge variant="teal">Teal</Badge>
  <Badge variant="blue">Blue</Badge>
  <Badge variant="indigo">Indigo</Badge>
  <Badge variant="purple">Purple</Badge>
  <Badge variant="pink">Pink</Badge>
  <Badge variant="gray">Gray</Badge>
</template>
```

| Color    | Light           | Dark            |
| -------- | --------------- | --------------- |
| `red`    | `bg-red-600`    | `bg-red-500`    |
| `orange` | `bg-orange-500` | `bg-orange-400` |
| `yellow` | `bg-yellow-400` | `bg-yellow-300` |
| `green`  | `bg-green-600`  | `bg-green-500`  |
| `teal`   | `bg-teal-600`   | `bg-teal-500`   |
| `blue`   | `bg-blue-600`   | `bg-blue-500`   |
| `indigo` | `bg-indigo-600` | `bg-indigo-500` |
| `purple` | `bg-purple-600` | `bg-purple-500` |
| `pink`   | `bg-pink-600`   | `bg-pink-500`   |
| `gray`   | `bg-gray-500`   | `bg-gray-400`   |

> Los colores `yellow`, `orange` y `gray` usan `text-black` en dark mode para mantener el contraste.

---

#### Tamaños

```vue
<template>
  <Badge size="sm">Small</Badge>
  <Badge>Default</Badge>
  <Badge size="lg">Large</Badge>
</template>
```

| Tamaño    | Padding         | Uso                                            |
| --------- | --------------- | ---------------------------------------------- |
| `sm`      | `px-2 py-px`    | Contadores dentro de botones, tablas compactas |
| `default` | `px-2.5 py-0.5` | Uso general                                    |
| `lg`      | `px-3 py-1`     | Badges prominentes, hero sections              |

---

#### Con iconos

Los SVG dentro del badge se redimensionan automáticamente a `12px` (`size-3`) gracias al selector `[&>svg]:size-3`:

```vue
<template>
  <Badge variant="success">
    <MyIcon name="check" />
    Aprobado
  </Badge>

  <Badge variant="destructive">
    <MyIcon name="x-mark" />
    Rechazado
  </Badge>

  <Badge variant="warning">
    <MyIcon name="alert" />
    Pendiente
  </Badge>
</template>
```

> El componente incluye `gap-1` por defecto para separar icono y texto.

---

#### Forma pill

Usa `class` para override del border-radius:

```vue
<template>
  <Badge class="rounded-full">Default pill</Badge>
  <Badge variant="success" class="rounded-full">Success pill</Badge>
  <Badge variant="destructive" class="rounded-full">Error pill</Badge>
</template>
```

---

#### Como enlace

Usa la prop `as` para renderizar como `<a>`. Como los badges son estáticos por defecto, agrega `cursor-pointer` y el hover manualmente vía `class`:

```vue
<template>
  <Badge
    as="a"
    href="/tags/vue"
    class="hover:bg-primary/85 cursor-pointer transition-[background-color] duration-200"
  >
    Vue
  </Badge>

  <Badge
    as="a"
    href="/status"
    variant="outline"
    class="hover:bg-accent cursor-pointer transition-[background-color] duration-200"
  >
    Ver estado
  </Badge>

  <Badge
    as="a"
    href="/releases"
    variant="blue"
    class="cursor-pointer transition-[background-color] duration-200 hover:bg-blue-700"
  >
    v2.1.0
  </Badge>
</template>
```

> **Patrón recomendado para badges interactivos:** `cursor-pointer transition-[background-color] duration-200 hover:bg-{color}`

#### Con componente de router

```vue
<script setup lang="ts">
import { Badge } from '@3df/ui';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Badge :as="RouterLink" to="/tags/vue" class="cursor-pointer">Vue</Badge>
</template>
```

---

#### En contexto

Los badges combinan naturalmente con otros componentes:

```vue
<template>
  <!-- Contador dentro de un botón -->
  <Button>
    Inbox
    <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
  </Button>

  <Button variant="outline">
    Notificaciones
    <Badge variant="destructive" size="sm" class="rounded-full">3</Badge>
  </Button>

  <!-- Indicador de estado -->
  <div class="flex items-center gap-2">
    <span class="text-sm font-medium">Estado del servidor</span>
    <Badge variant="success" size="sm">Online</Badge>
  </div>

  <div class="flex items-center gap-2">
    <span class="text-sm font-medium">Mantenimiento</span>
    <Badge variant="warning" size="sm">Programado</Badge>
  </div>
</template>
```

---

#### Acceso a las variantes (headless)

Si necesitas los estilos del badge sin el componente:

```ts
import { badgeVariants } from '@3df/ui';

const classes = badgeVariants({ variant: 'success', size: 'sm' });
// → "inline-flex items-center gap-1 ... bg-emerald-600 text-white ..."
```

```vue
<template>
  <span :class="badgeVariants({ variant: 'outline' })">Etiqueta plain</span>
</template>
```

---

### Formularios

`@3df/ui` incluye un sistema completo de componentes de formulario: **Label**, **Input**, **Textarea**, **Select**, **Checkbox**, **Radio** y **Switch**. Todos comparten el mismo lenguaje visual, respetan los design tokens del tema y soportan dark mode.

#### Importación general

```ts
import { Checkbox, Input, Label, Radio, Select, SelectItem, Switch, Textarea } from '@3df/ui';
```

---

### Label

Etiqueta semántica `<label>` con soporte para estado disabled.

#### Importación

```ts
import { Label } from '@3df/ui';
```

#### Props

| Prop       | Tipo      | Default | Descripción                                         |
| ---------- | --------- | ------- | --------------------------------------------------- |
| `disabled` | `boolean` | `false` | Aplica estilos de deshabilitado (opacidad + cursor) |

> Acepta todos los atributos nativos de `<label>` (`for`, etc.) vía `$attrs`.

#### Uso

```vue
<template>
  <!-- Conectar con un input vía `for` -->
  <Label for="email">Correo electrónico</Label>
  <Input id="email" type="email" placeholder="tu@email.com" />

  <!-- Disabled (label sin input deshabilitado) -->
  <Label :disabled="true">Campo no disponible</Label>

  <!-- Auto-disabled con peer -->
  <!-- Cuando el input tiene `disabled`, el label se atenúa automáticamente
       gracias a `peer-disabled:opacity-70` -->
  <Checkbox id="terms" disabled />
  <Label for="terms">Acepto los términos</Label>
</template>
```

---

### Input

Input de texto versátil con 3 tamaños, validación visual y soporte para `v-model`.

#### Importación

```ts
import { Input } from '@3df/ui';
// Si necesitas los estilos sin el componente:
import { inputVariants } from '@3df/ui';
```

#### Props

| Prop         | Tipo                        | Default     | Descripción              |
| ------------ | --------------------------- | ----------- | ------------------------ |
| `size`       | `'default' \| 'sm' \| 'lg'` | `'default'` | Tamaño del input         |
| `modelValue` | `string \| number`          | —           | Valor reactivo (v-model) |

> Acepta todos los atributos nativos de `<input>` (`type`, `placeholder`, `disabled`, `aria-invalid`, etc.) vía `$attrs`.

#### Tamaños

```vue
<template>
  <Input size="sm" placeholder="Small" />
  <Input placeholder="Default" />
  <Input size="lg" placeholder="Large" />
</template>
```

| Tamaño    | Altura        | Uso                          |
| --------- | ------------- | ---------------------------- |
| `sm`      | `h-9` (36px)  | Formularios densos, toolbars |
| `default` | `h-10` (40px) | Uso general                  |
| `lg`      | `h-11` (44px) | Formularios amplios          |

#### Tipos de input

```vue
<template>
  <Input type="text" placeholder="Nombre" />
  <Input type="email" placeholder="correo@ejemplo.com" />
  <Input type="password" placeholder="••••••••" />
  <Input type="file" />
</template>
```

> El input incluye estilos específicos para `file:` (borde y fondo transparentes, tipografía medium).

#### Estado de error

Usa `aria-invalid="true"` para activar los estilos de error:

```vue
<template>
  <Input aria-invalid="true" placeholder="Campo inválido" />
  <p class="text-destructive text-xs">Por favor ingresa un valor válido.</p>
</template>
```

El borde cambia a `border-destructive` y el focus ring a `ring-destructive/30`.

#### Estado disabled

```vue
<template>
  <Input disabled value="No puedes editar esto" />
</template>
```

#### Con botón

```vue
<template>
  <div class="flex gap-2">
    <Input placeholder="tu@email.com" type="email" class="flex-1" />
    <Button>Suscribir</Button>
  </div>
</template>
```

#### Con v-model

```vue
<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
</script>

<template>
  <Input v-model="name" placeholder="Tu nombre" />
  <p>Hola, {{ name }}</p>
</template>
```

#### Acceso a las variantes (headless)

```ts
import { inputVariants } from '@3df/ui';

const classes = inputVariants({ size: 'sm' });
// → "flex w-full rounded-md ... h-9 px-3 py-1 text-xs"
```

---

### Textarea

Área de texto con altura mínima, redimensionamiento vertical y soporte para `v-model`.

#### Importación

```ts
import { Textarea } from '@3df/ui';
```

#### Props

| Prop         | Tipo     | Default | Descripción              |
| ------------ | -------- | ------- | ------------------------ |
| `modelValue` | `string` | —       | Valor reactivo (v-model) |

> Acepta todos los atributos nativos de `<textarea>` (`rows`, `placeholder`, `disabled`, `aria-invalid`, etc.) vía `$attrs`.

#### Uso

```vue
<template>
  <!-- Básico -->
  <Label for="bio">Biografía</Label>
  <Textarea id="bio" v-model="bio" placeholder="Cuéntanos sobre ti..." />

  <!-- Con error -->
  <Textarea aria-invalid="true" placeholder="Campo requerido" />
  <p class="text-destructive text-xs">Este campo es obligatorio.</p>

  <!-- Disabled -->
  <Textarea disabled model-value="No puedes editar esto." />

  <!-- Override de altura -->
  <Textarea class="min-h-[200px]" placeholder="Texto largo..." />
</template>
```

> El componente incluye `resize-y` por defecto, permitiendo al usuario ajustar la altura verticalmente. La altura mínima es `80px`.

---

### Select

Select personalizado con dropdown estilizado, navegación por teclado completa y animaciones. **No usa el `<select>` nativo** — el dropdown se renderiza con divs para control total del diseño.

#### Importación

```ts
import { Select, SelectItem } from '@3df/ui';
```

#### Props — Select

| Prop          | Tipo      | Default                   | Descripción                   |
| ------------- | --------- | ------------------------- | ----------------------------- |
| `modelValue`  | `string`  | `''`                  | Valor seleccionado (v-model)  |
| `placeholder` | `string`  | `'Select an option'`  | Texto cuando no hay selección |
| `disabled`    | `boolean` | `false`               | Deshabilita el select         |

#### Props — SelectItem

| Prop       | Tipo      | Default | Descripción                   |
| ---------- | --------- | ------- | ----------------------------- |
| `value`    | `string`  | —       | Valor de la opción (required) |
| `disabled` | `boolean` | `false` | Deshabilita la opción         |

> El contenido del `<SelectItem>` se usa como label visible. Acepta `aria-invalid` en el Select para estilos de error.

#### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

const country = ref('');
</script>

<template>
  <Label for="country">País</Label>
  <Select id="country" v-model="country" placeholder="Selecciona un país">
    <SelectItem value="mx">México</SelectItem>
    <SelectItem value="ar">Argentina</SelectItem>
    <SelectItem value="co">Colombia</SelectItem>
    <SelectItem value="es">España</SelectItem>
  </Select>
</template>
```

#### Estado de error

```vue
<template>
  <Select aria-invalid="true" placeholder="Selecciona una opción">
    <SelectItem value="a">Opción A</SelectItem>
    <SelectItem value="b">Opción B</SelectItem>
  </Select>
  <p class="text-destructive text-xs">Debes seleccionar una opción.</p>
</template>
```

#### Opciones deshabilitadas

```vue
<template>
  <Select v-model="plan" placeholder="Selecciona un plan">
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="enterprise" :disabled="true">Enterprise (próximamente)</SelectItem>
  </Select>
</template>
```

#### Navegación por teclado

| Tecla             | Acción                                   |
| ----------------- | ---------------------------------------- |
| `↓` / `↑`         | Abre el dropdown y navega entre opciones |
| `Enter` / `Space` | Abre el dropdown o selecciona la opción  |
| `Escape`          | Cierra el dropdown                       |
| `Home` / `End`    | Salta a la primera / última opción       |
| `Tab`             | Cierra el dropdown y mueve el foco       |

#### Diseño del dropdown

- El dropdown se posiciona **sobre** el trigger (lo cubre), similar a los selects nativos de macOS.
- Los ítems tienen hover redondeado con margen interior (estilo menú de macOS).
- El ítem seleccionado muestra un checkmark ✓ a la derecha.
- Animación de escala sutil al abrir/cerrar.
- Click fuera para cerrar.

---

### Checkbox

Checkbox animado con SVG real, efecto de "stroke draw" y escala suave al activarse.

#### Importación

```ts
import { Checkbox } from '@3df/ui';
```

#### Props

| Prop            | Tipo      | Default | Descripción                    |
| --------------- | --------- | ------- | ------------------------------ |
| `modelValue`    | `boolean` | `false` | Estado checked (v-model)       |
| `indeterminate` | `boolean` | `false` | Estado indeterminado (parcial) |

> Acepta todos los atributos nativos de `<input type="checkbox">` (`id`, `disabled`, `name`, etc.) vía `$attrs`.
>
> Cuando `indeterminate` es `true` y `modelValue` es `false`, el input nativo recibe `aria-checked="mixed"` para lectores de pantalla.

#### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

const terms = ref(false);
const newsletter = ref(true);
</script>

<template>
  <div class="flex items-center gap-2">
    <Checkbox id="terms" v-model="terms" />
    <Label for="terms">Acepto los términos y condiciones</Label>
  </div>

  <div class="flex items-center gap-2">
    <Checkbox id="newsletter" v-model="newsletter" />
    <Label for="newsletter">Recibir newsletter semanal</Label>
  </div>
</template>
```

#### Estado disabled

```vue
<template>
  <div class="flex items-center gap-2">
    <Checkbox id="cb-off" disabled :model-value="false" />
    <Label for="cb-off" :disabled="true">Deshabilitado (unchecked)</Label>
  </div>

  <div class="flex items-center gap-2">
    <Checkbox id="cb-on" disabled :model-value="true" />
    <Label for="cb-on" :disabled="true">Deshabilitado (checked)</Label>
  </div>
</template>
```

#### Animación

El checkbox incluye dos efectos combinados al activarse:

1. **Scale** — El ícono del check hace una transición `scale-0 → scale-100` (150ms).
2. **Stroke draw** — El trazo del checkmark se "dibuja" con `stroke-dashoffset` (200ms), dando la ilusión de que se traza de izquierda a derecha.

> El check es un SVG real posicionado sobre el input, no un `background-image`. Esto permite animaciones fluidas y accesibilidad completa.

---

### Radio

Radio button con efecto de relleno central y soporte para grupos vía `v-model`.

#### Importación

```ts
import { Radio } from '@3df/ui';
```

#### Props

| Prop         | Tipo     | Default | Descripción                     |
| ------------ | -------- | ------- | ------------------------------- |
| `modelValue` | `string` | —       | Valor seleccionado del grupo    |
| `value`      | `string` | —       | Valor de esta opción (required) |

> Acepta todos los atributos nativos de `<input type="radio">` (`name`, `id`, `disabled`, etc.) vía `$attrs`. Los radios del mismo grupo deben compartir el mismo `name`.

#### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

const plan = ref('pro');
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-2">
      <Radio id="plan-free" v-model="plan" value="free" name="plan" />
      <Label for="plan-free">Free</Label>
    </div>
    <div class="flex items-center gap-2">
      <Radio id="plan-pro" v-model="plan" value="pro" name="plan" />
      <Label for="plan-pro">Pro — $9/mes</Label>
    </div>
    <div class="flex items-center gap-2">
      <Radio id="plan-enterprise" v-model="plan" value="enterprise" name="plan" />
      <Label for="plan-enterprise">Enterprise — $29/mes</Label>
    </div>
  </div>
</template>
```

#### Estado disabled

```vue
<template>
  <div class="flex items-center gap-2">
    <Radio id="plan-custom" value="custom" name="plan" disabled />
    <Label for="plan-custom" :disabled="true">Custom (no disponible)</Label>
  </div>
</template>
```

#### Múltiples grupos

Cada grupo se identifica por su `name`. Usa un `v-model` diferente por grupo:

```vue
<script setup lang="ts">
import { ref } from 'vue';

const plan = ref('pro');
const contact = ref('email');
</script>

<template>
  <!-- Grupo 1: Plan -->
  <Radio v-model="plan" value="free" name="plan" />
  <Radio v-model="plan" value="pro" name="plan" />

  <!-- Grupo 2: Contacto -->
  <Radio v-model="contact" value="email" name="contact" />
  <Radio v-model="contact" value="phone" name="contact" />
</template>
```

#### Estilo visual

El radio usa un efecto de relleno vía `border-width`: cuando está seleccionado, el borde crece a `5px` creando un punto sólido central con el color `primary`. La transición es suave a 200ms.

---

### Switch

Toggle switch accesible con animación de knob y soporte para `v-model`.

#### Importación

```ts
import { Switch } from '@3df/ui';
```

#### Props

| Prop         | Tipo      | Default | Descripción             |
| ------------ | --------- | ------- | ----------------------- |
| `modelValue` | `boolean` | `false` | Estado on/off (v-model) |

> Acepta todos los atributos nativos de `<button>` (`id`, `disabled`, etc.) vía `$attrs`. Incluye `role="switch"` y `aria-checked` automáticamente.

#### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

const notifications = ref(true);
const darkMode = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch id="notifications" v-model="notifications" />
    <Label for="notifications">Notificaciones</Label>
  </div>

  <div class="flex items-center gap-2">
    <Switch id="dark-mode" v-model="darkMode" />
    <Label for="dark-mode">Modo oscuro</Label>
  </div>
</template>
```

#### Estado disabled

```vue
<template>
  <div class="flex items-center gap-2">
    <Switch id="sw-off" disabled :model-value="false" />
    <Label for="sw-off" :disabled="true">Deshabilitado (off)</Label>
  </div>

  <div class="flex items-center gap-2">
    <Switch id="sw-on" disabled :model-value="true" />
    <Label for="sw-on" :disabled="true">Deshabilitado (on)</Label>
  </div>
</template>
```

#### Estilo visual

- **Track**: `44px × 24px`, fondo `bg-input` (off) → `bg-primary` (on).
- **Knob**: `20px × 20px`, blanco con sombra, se desplaza con `translate-x` a 200ms.
- Semántica: usa `<button role="switch" aria-checked>` para accesibilidad.

---

#### Formulario completo (ejemplo)

Todos los componentes de formulario combinados:

```vue
<script setup lang="ts">
import { ref } from 'vue';

import {
  Button,
  Checkbox,
  Input,
  Label,
  Radio,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@3df/ui';

const name = ref('');
const email = ref('');
const bio = ref('');
const country = ref('');
const plan = ref('pro');
const terms = ref(false);
const marketing = ref(true);
const notifications = ref(true);
</script>

<template>
  <form class="flex max-w-md flex-col gap-4">
    <div class="flex flex-col gap-2">
      <Label for="name">Nombre</Label>
      <Input id="name" v-model="name" placeholder="Tu nombre completo" />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="email">Email</Label>
      <Input id="email" v-model="email" type="email" placeholder="correo@ejemplo.com" />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="bio">Biografía</Label>
      <Textarea id="bio" v-model="bio" placeholder="Cuéntanos sobre ti..." />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="country">País</Label>
      <Select id="country" v-model="country" placeholder="Selecciona un país">
        <SelectItem value="mx">México</SelectItem>
        <SelectItem value="ar">Argentina</SelectItem>
        <SelectItem value="co">Colombia</SelectItem>
      </Select>
    </div>

    <fieldset class="flex flex-col gap-3">
      <legend class="text-sm font-medium">Plan</legend>
      <div class="flex items-center gap-2">
        <Radio id="f-free" v-model="plan" value="free" name="f-plan" />
        <Label for="f-free">Free</Label>
      </div>
      <div class="flex items-center gap-2">
        <Radio id="f-pro" v-model="plan" value="pro" name="f-plan" />
        <Label for="f-pro">Pro</Label>
      </div>
    </fieldset>

    <div class="flex items-center gap-2">
      <Checkbox id="f-terms" v-model="terms" />
      <Label for="f-terms">Acepto los términos</Label>
    </div>

    <div class="flex items-center gap-2">
      <Checkbox id="f-marketing" v-model="marketing" />
      <Label for="f-marketing">Recibir emails de marketing</Label>
    </div>

    <div class="flex items-center gap-2">
      <Switch id="f-notif" v-model="notifications" />
      <Label for="f-notif">Notificaciones push</Label>
    </div>

    <Button class="mt-2 w-full">Guardar perfil</Button>
  </form>
</template>
```

---

### Card

Sistema de cards compuesto por 6 sub-componentes que se combinan libremente para crear tarjetas de contenido, pricing, productos, dashboards, etc.

#### Importación

```ts
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@3df/ui';
```

#### Sub-componentes

| Componente        | Elemento por defecto | Descripción                                         |
| ----------------- | -------------------- | --------------------------------------------------- |
| `Card`            | `<div>`              | Contenedor principal — fondo, borde, sombra, radio  |
| `CardHeader`      | `<div>`              | Zona superior — padding `p-6`, flex column          |
| `CardTitle`       | `<h3>`               | Título — `text-lg font-semibold`, tracking tight    |
| `CardDescription` | `<p>`                | Subtítulo — `text-sm text-muted-foreground`         |
| `CardContent`     | `<div>`              | Contenido principal — `p-6 pt-0`                    |
| `CardFooter`      | `<div>`              | Zona inferior — `p-6 pt-0`, flex con `items-center` |

> `Card` y `CardTitle` son **polimórficos** — usa la prop `as` para cambiar el elemento renderizado (ej: `as="article"`, `as="a"`, `as="h2"`).
>
> Todos aceptan `class` para override de estilos vía `cn()` / `tailwind-merge`.

---

#### Uso básico

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>Título de la card</CardTitle>
      <CardDescription>Una descripción breve del contenido.</CardDescription>
    </CardHeader>
    <CardContent>
      <p class="text-sm">Contenido principal de la card.</p>
    </CardContent>
    <CardFooter>
      <Button size="sm">Acción</Button>
    </CardFooter>
  </Card>
</template>
```

---

#### Card con formulario

```vue
<template>
  <Card>
    <CardHeader>
      <CardTitle>Crear proyecto</CardTitle>
      <CardDescription>Configura tu nuevo proyecto en un click.</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="name">Nombre</Label>
          <Input id="name" placeholder="Mi proyecto" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="fw">Framework</Label>
          <Select id="fw" v-model="framework" placeholder="Selecciona">
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="react">React</SelectItem>
          </Select>
        </div>
      </form>
    </CardContent>
    <CardFooter class="justify-between">
      <Button variant="ghost">Cancelar</Button>
      <Button>Crear</Button>
    </CardFooter>
  </Card>
</template>
```

---

#### Cards de dashboard (métricas)

Usa `CardTitle` con `as="h4"` y `class="text-base"` para títulos más compactos:

```vue
<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <Card>
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle as="h4" class="text-base">Ingresos</CardTitle>
          <!-- icono -->
        </div>
      </CardHeader>
      <CardContent>
        <p class="text-2xl font-bold">$45,231.89</p>
        <p class="text-muted-foreground text-xs">+20.1% respecto al mes pasado</p>
      </CardContent>
    </Card>
    <!-- más cards... -->
  </div>
</template>
```

---

#### Cards de pricing (planes)

Destaca el plan recomendado con `border-primary border-2` y un badge posicionado arriba:

```vue
<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <!-- Free -->
    <Card>
      <CardHeader>
        <CardTitle>Free</CardTitle>
        <CardDescription>Para proyectos personales.</CardDescription>
        <div class="mt-2">
          <span class="text-3xl font-bold">$0</span>
          <span class="text-muted-foreground text-sm">/mes</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="flex flex-col gap-3 text-sm">
          <li class="flex items-center gap-2">✓ 1 proyecto</li>
          <li class="flex items-center gap-2">✓ 100 MB</li>
          <li class="text-muted-foreground">✗ Dominio custom</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button variant="outline" class="w-full">Empezar gratis</Button>
      </CardFooter>
    </Card>

    <!-- Pro (destacado) -->
    <Card class="border-primary relative border-2">
      <div class="absolute -top-3 left-1/2 -translate-x-1/2">
        <Badge>Más popular</Badge>
      </div>
      <CardHeader>
        <CardTitle>Pro</CardTitle>
        <CardDescription>Para equipos pequeños.</CardDescription>
        <div class="mt-2">
          <span class="text-3xl font-bold">$19</span>
          <span class="text-muted-foreground text-sm">/mes</span>
        </div>
      </CardHeader>
      <CardContent>
        <ul class="flex flex-col gap-3 text-sm">
          <li class="flex items-center gap-2">✓ 10 proyectos</li>
          <li class="flex items-center gap-2">✓ 10 GB</li>
          <li class="flex items-center gap-2">✓ Dominio custom</li>
        </ul>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Suscribirse</Button>
      </CardFooter>
    </Card>

    <!-- Enterprise -->
    <Card>
      <!-- ... -->
    </Card>
  </div>
</template>
```

---

#### Cards de producto (con imagen)

Usa `overflow-hidden` en la Card para que la imagen respete el `border-radius`:

```vue
<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <Card class="overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop"
        alt="Reloj"
        class="aspect-[3/2] w-full object-cover"
      />
      <CardHeader>
        <div class="flex items-center justify-between">
          <CardTitle class="text-base">Reloj Classic</CardTitle>
          <Badge variant="secondary" size="sm">Nuevo</Badge>
        </div>
        <CardDescription>Reloj minimalista con correa de cuero.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold">$129.00</span>
          <span class="text-muted-foreground text-sm line-through">$159.00</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" size="sm">Agregar al carrito</Button>
      </CardFooter>
    </Card>
  </div>
</template>
```

---

#### Card de producto horizontal

Usa `flex-row` para layout horizontal (apilable en móvil):

```vue
<template>
  <Card class="flex flex-col overflow-hidden sm:flex-row">
    <img
      src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
      alt="Cámara"
      class="aspect-square w-full object-cover sm:w-48"
    />
    <div class="flex flex-1 flex-col">
      <CardHeader>
        <div class="flex items-center gap-2">
          <CardTitle class="text-base">Cámara Instant</CardTitle>
          <Badge variant="orange" size="sm">Oferta</Badge>
        </div>
        <CardDescription>Cámara instantánea con flash integrado.</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-bold">$69.00</span>
          <span class="text-muted-foreground text-sm line-through">$99.00</span>
        </div>
      </CardContent>
      <CardFooter class="mt-auto gap-2">
        <Button size="sm">Comprar ahora</Button>
        <Button variant="outline" size="sm">Ver detalles</Button>
      </CardFooter>
    </div>
  </Card>
</template>
```

> **Tip:** Usa `mt-auto` en el CardFooter para empujar los botones al fondo cuando la card tiene altura variable.

---

#### Card interactiva (hover)

Agrega hover manualmente vía `class`:

```vue
<template>
  <Card class="cursor-pointer transition-shadow duration-200 hover:shadow-md">
    <CardHeader>
      <CardTitle>Documentación</CardTitle>
      <CardDescription>Guías y ejemplos interactivos.</CardDescription>
    </CardHeader>
  </Card>
</template>
```

---

#### Card solo contenido

Si no usas `CardHeader`, agrega `pt-6` al `CardContent` para compensar el padding:

```vue
<template>
  <Card>
    <CardContent class="pt-6">
      <p class="text-sm">Card sin header ni footer.</p>
    </CardContent>
  </Card>
</template>
```

---

#### Override de estilos

```vue
<template>
  <!-- Sin sombra -->
  <Card class="shadow-none">...</Card>

  <!-- Borde más grueso y color custom -->
  <Card class="border-primary border-2">...</Card>

  <!-- Sin borde -->
  <Card class="border-0">...</Card>

  <!-- Fondo custom -->
  <Card class="bg-muted">...</Card>

  <!-- Como artículo semántico -->
  <Card as="article">...</Card>
</template>
```

---

#### Cards tipo feature (landing page)

Cards estilo marketing/landing con fondo de color sutil, sin borde ni sombra, y una "mini UI" decorativa arriba con título y descripción abajo:

```vue
<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <Card class="border-0 bg-amber-50 shadow-none dark:bg-amber-950/30">
      <CardContent class="pt-6">
        <!-- Mini UI decorativa -->
        <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
          <!-- Tu ilustración, screenshot o mockup aquí -->
        </div>
      </CardContent>
      <CardHeader class="pt-0">
        <CardTitle class="text-xl font-bold">Analiza interacciones en segundos.</CardTitle>
        <CardDescription>
          Visualiza el panorama completo de cada interacción de un vistazo.
        </CardDescription>
      </CardHeader>
    </Card>

    <Card class="border-0 bg-teal-50 shadow-none dark:bg-teal-950/30">
      <CardContent class="pt-6">
        <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
          <!-- Mockup de training plan -->
        </div>
      </CardContent>
      <CardHeader class="pt-0">
        <CardTitle class="text-xl font-bold">Genera entrenamientos personalizados.</CardTitle>
        <CardDescription>
          Entrena agentes con simulaciones IA que replican escenarios reales.
        </CardDescription>
      </CardHeader>
    </Card>

    <Card class="border-0 bg-emerald-50 shadow-none dark:bg-emerald-950/30">
      <CardContent class="pt-6">
        <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
          <!-- Gráfico de barras decorativo -->
        </div>
      </CardContent>
      <CardHeader class="pt-0">
        <CardTitle class="text-xl font-bold">Observa la satisfacción crecer.</CardTitle>
        <CardDescription>
          QA y entrenamiento trabajan juntos para mejorar cada conversación.
        </CardDescription>
      </CardHeader>
    </Card>
  </div>
</template>
```

**Patrón clave:**

- `border-0 shadow-none` — elimina borde y sombra de la card base.
- `bg-{color}-50 dark:bg-{color}-950/30` — fondo sutil de color que funciona en light y dark.
- `CardContent` va **antes** de `CardHeader` — la ilustración arriba, el texto abajo.
- `pt-0` en `CardHeader` y `pt-6` en `CardContent` — invierte el padding predeterminado.
- El panel blanco interior (`bg-white rounded-lg shadow-sm`) crea la ilusión de una "mini interfaz" flotante.

---

### Dropdown Menu

Sistema compound de menú desplegable con navegación por teclado completa, accesibilidad WAI-ARIA, posicionamiento inteligente (auto-flip + viewport clamping), y `Teleport` al `<body>` para evitar recortes por `overflow: hidden`.

#### Importación

```ts
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@3df/ui';
```

#### Sub-componentes

| Componente              | Descripción                                               |
| ----------------------- | --------------------------------------------------------- |
| `DropdownMenu`          | Contenedor raíz. Provee estado via `provide`/`inject`     |
| `DropdownMenuTrigger`   | Wrapper del elemento que abre/cierra el menú              |
| `DropdownMenuContent`   | Panel flotante (`position: fixed` + `Teleport to="body"`) |
| `DropdownMenuItem`      | Opción clickeable dentro del menú                         |
| `DropdownMenuSeparator` | Línea divisoria entre secciones                           |
| `DropdownMenuLabel`     | Encabezado de sección (no interactivo)                    |
| `DropdownMenuShortcut`  | Texto de atajo de teclado (alineado a la derecha)         |

#### Props

**DropdownMenuContent:**

| Prop              | Tipo                           | Default    | Descripción                                  |
| ----------------- | ------------------------------ | ---------- | -------------------------------------------- |
| `align`           | `'start' \| 'center' \| 'end'` | `'start'`  | Alineación horizontal del panel              |
| `side`            | `'top' \| 'bottom'`            | `'bottom'` | Dirección de apertura preferida              |
| `sideOffset`      | `number`                       | `4`        | Gap en px entre el trigger y el panel        |
| `viewportPadding` | `number`                       | `8`        | Distancia mínima al borde del viewport en px |
| `class`           | `string`                       | —          | Clases CSS adicionales                       |

**DropdownMenuItem:**

| Prop          | Tipo      | Default | Descripción                          |
| ------------- | --------- | ------- | ------------------------------------ |
| `disabled`    | `boolean` | `false` | Deshabilita la opción                |
| `destructive` | `boolean` | `false` | Estilo rojo para acciones peligrosas |

**DropdownMenuLabel:**

| Prop    | Tipo      | Default | Descripción                            |
| ------- | --------- | ------- | -------------------------------------- |
| `inset` | `boolean` | `false` | Agrega padding-left (`pl-8`) adicional |

#### Eventos

| Componente         | Evento    | Descripción                       |
| ------------------ | --------- | --------------------------------- |
| `DropdownMenuItem` | `@select` | Se emite al seleccionar la opción |

#### Scoped slot

`DropdownMenuTrigger` expone un scoped slot con `{ open: boolean }` para personalizar el trigger según el estado:

```vue
<DropdownMenuTrigger v-slot="{ open }">
  <Button>{{ open ? 'Cerrar' : 'Abrir' }}</Button>
</DropdownMenuTrigger>
```

#### Navegación por teclado

| Tecla             | Acción                                           |
| ----------------- | ------------------------------------------------ |
| `↓`               | Abre el menú / Mueve foco al siguiente item      |
| `↑`               | Abre el menú / Mueve foco al item anterior       |
| `Enter` / `Space` | Abre el menú / Ejecuta la acción del item focado |
| `Escape`          | Cierra el menú y regresa el foco al trigger      |
| `Tab`             | Cierra el menú                                   |
| `Home`            | Mueve foco al primer item habilitado             |
| `End`             | Mueve foco al último item habilitado             |

#### Comportamiento automático

| Comportamiento              | Descripción                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------- |
| **Auto-flip vertical**      | Si no cabe abajo, se abre arriba (y viceversa)                                          |
| **Auto-flip horizontal**    | Si `align="start"` se sale por la derecha, cambia a `end` (y viceversa)                 |
| **Viewport clamping**       | Después del flip, se desplaza los px necesarios para no salirse del viewport            |
| **Cierre al scroll**        | El menú se cierra automáticamente al hacer scroll                                       |
| **Cierre al click outside** | Se cierra al hacer clic fuera del menú o el trigger                                     |
| **Teleport al body**        | El panel se renderiza fuera del DOM del padre — nunca se recorta por `overflow: hidden` |
| **Reposición al resize**    | Se recalcula la posición al redimensionar la ventana                                    |

#### Accesibilidad

- `role="button"` + `tabindex="0"` en el trigger
- `aria-haspopup="menu"` + `aria-expanded` en el trigger
- `role="menu"` + `aria-labelledby` en el content (vinculado al trigger)
- `role="menuitem"` + `aria-disabled` en cada item
- `role="separator"` en los separadores
- Navegación completa por teclado (ver tabla arriba)

#### Uso básico

```vue
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Opciones</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem @select="handleEdit">Editar</DropdownMenuItem>
    <DropdownMenuItem @select="handleDuplicate">Duplicar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :destructive="true" @select="handleDelete">
      Eliminar
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Con labels, iconos y shortcuts

```vue
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="outline">Mi cuenta</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent class="w-56">
    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <UserIcon />
      Perfil
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SettingsIcon />
      Configuración
      <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :disabled="true">
      Ayuda (próximamente)
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :destructive="true">
      Cerrar sesión
      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

#### Alineación y dirección

```vue
<!-- Alineado al final -->
<DropdownMenuContent align="end">
  <!-- ... -->
</DropdownMenuContent>

<!-- Abre hacia arriba (si hay espacio, si no auto-flips) -->
<DropdownMenuContent side="top">
  <!-- ... -->
</DropdownMenuContent>

<!-- Combinado con offset personalizado -->
<DropdownMenuContent align="end" side="top" :side-offset="8">
  <!-- ... -->
</DropdownMenuContent>
```

#### Menú de acciones (botón icono)

Ideal para tablas — el dropdown se renderiza sobre cualquier contenedor sin recortarse:

```vue
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="icon">
      <MoreVerticalIcon />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuItem>Duplicar</DropdownMenuItem>
    <DropdownMenuItem>Compartir</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem :destructive="true">
      Eliminar
      <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Popover

Panel flotante genérico para mostrar contenido contextual: formularios, información adicional, perfiles, tooltips ricos, etc. Usa `position: fixed` + `Teleport` al `<body>` con auto-positioning inteligente (misma lógica que DropdownMenu).

#### Importación

```ts
import { Popover, PopoverContent, PopoverTrigger } from '@3df/ui';
```

#### Sub-componentes

| Componente       | Descripción                                               |
| ---------------- | --------------------------------------------------------- |
| `Popover`        | Contenedor raíz. Provee estado via `provide`/`inject`     |
| `PopoverTrigger` | Wrapper del elemento que abre/cierra el popover           |
| `PopoverContent` | Panel flotante (`position: fixed` + `Teleport to="body"`) |

#### Props

**PopoverContent:**

| Prop              | Tipo                           | Default    | Descripción                                  |
| ----------------- | ------------------------------ | ---------- | -------------------------------------------- |
| `align`           | `'start' \| 'center' \| 'end'` | `'center'` | Alineación horizontal respecto al trigger    |
| `side`            | `'top' \| 'bottom'`            | `'bottom'` | Dirección de apertura preferida              |
| `sideOffset`      | `number`                       | `4`        | Gap en px entre trigger y panel              |
| `viewportPadding` | `number`                       | `8`        | Distancia mínima al borde del viewport en px |
| `class`           | `string`                       | —          | Clases CSS adicionales (ancho, etc.)         |

#### Scoped slot

`PopoverTrigger` expone `{ open: boolean }` para personalizar el trigger:

```vue
<PopoverTrigger v-slot="{ open }">
  <Button :variant="open ? 'secondary' : 'outline'">
    {{ open ? 'Cerrar' : 'Abrir' }}
  </Button>
</PopoverTrigger>
```

#### Comportamiento

- **Auto-flip**: si no cabe abajo se abre arriba (y viceversa)
- **Viewport clamping**: se desplaza para no salirse del viewport
- **Cierre al scroll**: se cierra al hacer scroll de la página (no del contenido propio)
- **Cierre al click outside**: se cierra al hacer clic fuera
- **Escape**: cierra y devuelve el foco al trigger
- **Teleport al body**: nunca se recorta por `overflow: hidden` de ancestros

#### Accesibilidad

- `aria-haspopup="dialog"` + `aria-expanded` en el trigger
- `role="dialog"` + `aria-labelledby` en el content
- Cierre con `Escape`

#### Uso básico

```vue
<Popover>
  <PopoverTrigger>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h3 class="text-sm font-medium">Título</h3>
    <p class="text-muted-foreground text-sm">Contenido del popover.</p>
  </PopoverContent>
</Popover>
```

#### Con formulario

```vue
<Popover>
  <PopoverTrigger>
    <Button variant="outline">Configuración</Button>
  </PopoverTrigger>
  <PopoverContent class="w-80">
    <div class="flex flex-col gap-4">
      <div>
        <h3 class="text-sm font-medium">Dimensiones</h3>
        <p class="text-muted-foreground text-sm">Configura las dimensiones.</p>
      </div>
      <div class="grid gap-3">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label class="text-right">Ancho</Label>
          <Input class="col-span-2 h-8" value="100%" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label class="text-right">Alto</Label>
          <Input class="col-span-2 h-8" value="25px" />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

#### Popover vs DropdownMenu

| Característica     | Popover                          | DropdownMenu                       |
| ------------------ | -------------------------------- | ---------------------------------- |
| Propósito          | Contenido genérico (forms, info) | Lista de acciones/opciones         |
| ARIA role          | `dialog`                         | `menu` + `menuitem`                |
| Keyboard nav       | Solo `Escape`                    | ↑↓ Enter Space Escape Tab Home End |
| Ancho default      | `w-72` (288px)                   | `min-w-[8rem]` (128px)             |
| Alineación default | `center`                         | `start`                            |

---

## Sonner (Toast)

Sistema de notificaciones tipo toast inspirado en [Sonner](https://sonner.emilkowal.dev). Los toasts se **cierran solos** después de un tiempo configurable (4s por defecto) y se apilan en una esquina de la pantalla.

### Instalación

Coloca `<Toaster />` una sola vez en tu layout raíz (normalmente `App.vue`):

```vue
<script setup>
import { Toaster } from '@3df/ui';
</script>

<template>
  <RouterView />
  <Toaster />
</template>
```

Luego usa la función `toast()` desde cualquier parte de tu app:

```vue
<script setup>
import { Button, toast } from '@3df/ui';
</script>

<template>
  <Button @click="toast('Guardado correctamente')">Guardar</Button>
</template>
```

### Componentes exportados

| Componente | Descripción                                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `Toaster`  | Contenedor global. Se renderiza con `<Teleport to="body">`. Colócalo una vez en el layout raíz. |

### Función `toast()`

Función reactiva global que crea notificaciones. No requiere provide/inject.

```ts
import { toast } from '@3df/ui';

// Uso simple — solo descripción
toast('Archivo guardado');

// Variantes
toast.success('Operación completada');
toast.error('Algo salió mal');
toast.warning('Ten cuidado con esta acción');
toast.info('Aquí tienes información útil');

// Con opciones completas
toast.success({
  title: 'Guardado',
  description: 'Tus cambios han sido guardados correctamente.',
  duration: 5000,
});

// Control programático
const id = toast('Procesando...');
toast.dismiss(id); // Cierra uno específico
toast.dismissAll(); // Cierra todos
```

### Opciones de `toast()`

| Opción        | Tipo                                     | Default | Descripción                                          |
| ------------- | ---------------------------------------- | ------- | ---------------------------------------------------- |
| `title`       | `string`                                 | —       | Título en negrita del toast                          |
| `description` | `string`                                 | —       | Texto descriptivo                                    |
| `duration`    | `number`                                 | `4000`  | Tiempo en ms antes de auto-cerrar. `0` = persistente |
| `dismissible` | `boolean`                                | `true`  | Muestra/oculta el botón ✕                            |
| `action`      | `{ label: string; onClick: () => void }` | —       | Botón de acción dentro del toast                     |
| `onDismiss`   | `() => void`                             | —       | Callback al cerrarse                                 |

### Variantes

| Variante  | Icono | Colores                             |
| --------- | ----- | ----------------------------------- |
| `default` | —     | `bg-background` / `text-foreground` |
| `success` | ✓     | Emerald (fondo claro, texto oscuro) |
| `error`   | ✕     | Red (fondo claro, texto oscuro)     |
| `warning` | ⚠     | Amber (fondo claro, texto oscuro)   |
| `info`    | ℹ     | Blue (fondo claro, texto oscuro)    |

Todas las variantes soportan **dark mode** automáticamente.

### Props de `<Toaster>`

| Prop         | Tipo            | Default          | Descripción                        |
| ------------ | --------------- | ---------------- | ---------------------------------- |
| `position`   | `ToastPosition` | `'bottom-right'` | Posición en la pantalla            |
| `maxVisible` | `number`        | `5`              | Máximo de toasts visibles a la vez |
| `class`      | `string`        | —                | Clases adicionales al contenedor   |

**Posiciones disponibles:**

`top-left` · `top-center` · `top-right` · `bottom-left` · `bottom-center` · `bottom-right`

### Comportamiento

| Característica       | Comportamiento                                         |
| -------------------- | ------------------------------------------------------ |
| Auto-cierre          | Sí, después de `duration` ms (default 4s)              |
| Hover pausa          | Al pasar el mouse, el temporizador se pausa            |
| Persistente          | `duration: 0` — solo se cierra manualmente             |
| Animación            | Entrada/salida con translate + opacity + scale (300ms) |
| Stacking             | Se apilan con gap, máximo `maxVisible`                 |
| Dismiss programático | `toast.dismiss(id)` o `toast.dismissAll()`             |

### Accesibilidad

- `role="status"` y `aria-live="polite"` en cada toast
- `aria-atomic="true"` para lectores de pantalla
- `aria-label="Notificaciones"` en el contenedor
- Botón de cerrar con `aria-label="Cerrar notificación"`

### Ejemplo con acción

```vue
<Button
  @click="
    toast.error({
      title: 'Archivo eliminado',
      description: 'El archivo ha sido eliminado permanentemente.',
      action: {
        label: 'Deshacer',
        onClick: () => toast.success('Archivo restaurado'),
      },
    })
  "
>
  Eliminar archivo
</Button>
```

### Ejemplo persistente

```vue
<Button
  @click="
    toast({
      title: 'Procesando...',
      description: 'Solo se cierra manualmente.',
      duration: 0,
    })
  "
>
  Toast persistente
</Button>
```

### Tipos exportados

```ts
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
  dismissible: boolean;
  action?: { label: string; onClick: () => void };
  onDismiss?: () => void;
  createdAt: number;
}

export type ToastInput = Partial<Omit<Toast, 'id' | 'createdAt' | 'variant'>> & {
  title?: string;
  description?: string;
};
```

---

## Alert

Componente estático inline para mostrar mensajes importantes al usuario. A diferencia de los toasts (Sonner), las alerts **no se cierran solas** — permanecen visibles hasta que el usuario las descarta o el componente se desmonta.

### Importación

```ts
import { Alert, AlertDescription, AlertTitle } from '@3df/ui';
```

### Componentes

| Componente         | Descripción                           |
| ------------------ | ------------------------------------- |
| `Alert`            | Contenedor principal (`role="alert"`) |
| `AlertTitle`       | Título (`<h5>`)                       |
| `AlertDescription` | Contenido descriptivo                 |

### Uso básico

```vue
<Alert variant="success">
  <svg><!-- icono opcional --></svg>
  <AlertTitle>¡Éxito!</AlertTitle>
  <AlertDescription>
    La operación se completó correctamente.
  </AlertDescription>
</Alert>
```

### Props de `<Alert>`

| Prop      | Tipo           | Default     | Descripción             |
| --------- | -------------- | ----------- | ----------------------- |
| `variant` | `AlertVariant` | `'default'` | Estilo visual del alert |
| `class`   | `string`       | —           | Clases adicionales      |

### Variantes

| Variante      | Colores                                               |
| ------------- | ----------------------------------------------------- |
| `default`     | `bg-background` / `text-foreground` / `border-border` |
| `destructive` | Red — fondo claro, texto oscuro, icono rojo           |
| `success`     | Emerald — fondo claro, texto oscuro, icono verde      |
| `warning`     | Amber — fondo claro, texto oscuro, icono ámbar        |
| `info`        | Blue — fondo claro, texto oscuro, icono azul          |

Todas las variantes soportan **dark mode** automáticamente.

### Iconos

Los iconos se posicionan automáticamente con CSS (`[&>svg]`). Coloca un `<svg>` como primer hijo del `<Alert>` y el contenido se desplazará a la derecha:

```vue
<Alert variant="warning">
  <svg xmlns="http://www.w3.org/2000/svg" class="size-4" viewBox="0 0 24 24" ...>
    <!-- icono -->
  </svg>
  <AlertTitle>Advertencia</AlertTitle>
  <AlertDescription>Ten cuidado con esta acción.</AlertDescription>
</Alert>
```

Si no se incluye un `<svg>`, el alert se renderiza sin padding izquierdo extra.

### Contenido rico

El `<AlertDescription>` acepta cualquier contenido HTML:

```vue
<Alert variant="destructive">
  <AlertTitle>Errores de validación</AlertTitle>
  <AlertDescription>
    <p>Se encontraron los siguientes errores:</p>
    <ul class="mt-2 list-inside list-disc space-y-1">
      <li>El campo email es requerido</li>
      <li>La contraseña debe tener al menos 8 caracteres</li>
    </ul>
  </AlertDescription>
</Alert>
```

### Accesibilidad

- `role="alert"` en el contenedor principal
- Compatible con lectores de pantalla
- Los iconos usan `text-current` para heredar el color de la variante

### Alert vs Sonner (Toast)

| Característica | Alert                               | Sonner (Toast)                  |
| -------------- | ----------------------------------- | ------------------------------- |
| Persistencia   | **No se cierra sola**               | Se cierra sola (4s default)     |
| Posición       | **Inline** — fluye con el contenido | Flotante en esquina de pantalla |
| Uso            | Validaciones, mensajes estáticos    | Notificaciones temporales       |
| Interactividad | Solo lectura                        | Dismiss, acción, hover pausa    |

---

## Tooltip

Tooltip flotante que aparece al pasar el mouse o al hacer focus sobre un elemento. A diferencia del Popover, el tooltip se activa por **hover/focus** (no por click), se posiciona por defecto **arriba**, y soporta las 4 direcciones.

### Importación

```ts
import { Tooltip, TooltipContent, TooltipTrigger } from '@3df/ui';
```

### Componentes

| Componente       | Descripción                                          |
| ---------------- | ---------------------------------------------------- |
| `Tooltip`        | Contenedor raíz (provide/inject). Controla delay.    |
| `TooltipTrigger` | Elemento que activa el tooltip (hover + focus).      |
| `TooltipContent` | Panel flotante (`role="tooltip"`, Teleport + fixed). |

### Uso básico

```vue
<Tooltip>
  <TooltipTrigger>
    <Button variant="outline">Hover sobre mí</Button>
  </TooltipTrigger>
  <TooltipContent>
    Este es un tooltip básico
  </TooltipContent>
</Tooltip>
```

### Props de `<Tooltip>`

| Prop         | Tipo     | Default | Descripción                  |
| ------------ | -------- | ------- | ---------------------------- |
| `delay`      | `number` | `300`   | Delay en ms antes de mostrar |
| `closeDelay` | `number` | `150`   | Delay en ms antes de cerrar  |

### Props de `<TooltipContent>`

| Prop              | Tipo                                     | Default    | Descripción                         |
| ----------------- | ---------------------------------------- | ---------- | ----------------------------------- |
| `side`            | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'`    | Dirección preferida                 |
| `align`           | `'start' \| 'center' \| 'end'`           | `'center'` | Alineación respecto al trigger      |
| `sideOffset`      | `number`                                 | `6`        | Separación del trigger (px)         |
| `viewportPadding` | `number`                                 | `8`        | Margen mínimo al borde del viewport |
| `class`           | `string`                                 | —          | Clases adicionales                  |

### Comportamiento

| Característica      | Descripción                                                |
| ------------------- | ---------------------------------------------------------- |
| Activación          | `mouseenter` / `focusin` en el trigger                     |
| Cierre              | `mouseleave` / `focusout` en el trigger                    |
| Hover sobre tooltip | Cancela el cierre (puedes pasar el mouse al contenido)     |
| Auto-flip           | Cambia de lado si no hay espacio en la dirección preferida |
| Viewport clamping   | Se reposiciona para no salirse de la pantalla              |
| Cierre en scroll    | Se cierra al hacer scroll                                  |
| Delay               | Configurable: `delay` para abrir, `closeDelay` para cerrar |

### Accesibilidad

- `role="tooltip"` en el contenido
- `aria-describedby` en el trigger, vinculado al ID del tooltip
- Se activa por **focus** además de hover (navegación por teclado)

### Tooltip vs Popover

| Característica     | Tooltip                        | Popover                             |
| ------------------ | ------------------------------ | ----------------------------------- |
| Activación         | **Hover + focus**              | Click                               |
| Propósito          | Texto de ayuda, atajos         | Contenido interactivo (forms, info) |
| Side default       | `top`                          | `bottom`                            |
| Direcciones        | **4** (top/bottom/left/right)  | 2 (top/bottom)                      |
| ARIA role          | `tooltip` + `aria-describedby` | `dialog` + `aria-labelledby`        |
| Delay              | 300ms (configurable)           | Instantáneo                         |
| Hover en contenido | Cancela cierre                 | —                                   |

### Ejemplo con delay instantáneo

```vue
<Tooltip :delay="0">
  <TooltipTrigger>
    <Button variant="outline">Instantáneo</Button>
  </TooltipTrigger>
  <TooltipContent>¡Aparezco al instante!</TooltipContent>
</Tooltip>
```

### Ejemplo con contenido rico

```vue
<Tooltip>
  <TooltipTrigger>
    <Button variant="outline" size="icon">⌘</Button>
  </TooltipTrigger>
  <TooltipContent class="max-w-xs">
    <p class="font-semibold">Atajo de teclado</p>
    <p class="text-xs text-muted-foreground">
      Presiona <kbd>Ctrl+S</kbd> para guardar.
    </p>
  </TooltipContent>
</Tooltip>
```

---

## Toggle

Botón con estado activado/desactivado. Similar a un checkbox pero con apariencia de botón. Ideal para toolbars, opciones de formato, y preferencias on/off.

### Importación

```ts
import { Toggle, toggleVariants } from '@3df/ui';
```

### Uso básico

```vue
<script setup>
import { ref } from 'vue';

import { Toggle } from '@3df/ui';

const bold = ref(false);
</script>

<template>
  <Toggle v-model:pressed="bold">
    <BoldIcon />
  </Toggle>
</template>
```

### Props

| Prop       | Tipo            | Default     | Descripción                     |
| ---------- | --------------- | ----------- | ------------------------------- |
| `pressed`  | `boolean`       | `false`     | Estado actual (v-model:pressed) |
| `variant`  | `ToggleVariant` | `'default'` | Estilo visual                   |
| `size`     | `ToggleSize`    | `'default'` | Tamaño del toggle               |
| `disabled` | `boolean`       | `false`     | Desactiva la interacción        |
| `class`    | `string`        | —           | Clases adicionales              |

### Eventos

| Evento           | Payload   | Descripción                   |
| ---------------- | --------- | ----------------------------- |
| `update:pressed` | `boolean` | Se emite al cambiar el estado |

### Variantes

| Variante  | Descripción                                               |
| --------- | --------------------------------------------------------- |
| `default` | Fondo transparente, se resalta con `bg-accent` al activar |
| `outline` | Con borde, fondo transparente, `bg-accent` al activar     |

### Tamaños

| Tamaño    | Altura | Padding  |
| --------- | ------ | -------- |
| `sm`      | `h-9`  | `px-2.5` |
| `default` | `h-10` | `px-3`   |
| `lg`      | `h-11` | `px-5`   |

### Scoped slot

El slot expone `{ pressed }` para renderizado condicional:

```vue
<Toggle v-model:pressed="muted">
  <template #default="{ pressed }">
    <VolumeIcon v-if="!pressed" />
    <VolumeOffIcon v-else />
    {{ pressed ? 'Muted' : 'Sound' }}
  </template>
</Toggle>
```

### Grupo de toggles (toolbar)

Puedes componer toggles en un grupo estilo toolbar usando clases de Tailwind:

```vue
<div class="flex">
  <Toggle :pressed="left" variant="outline" class="rounded-r-none border-r-0"
    @update:pressed="setAlign('left')">
    <AlignLeftIcon />
  </Toggle>
  <Toggle :pressed="center" variant="outline" class="rounded-none border-r-0"
    @update:pressed="setAlign('center')">
    <AlignCenterIcon />
  </Toggle>
  <Toggle :pressed="right" variant="outline" class="rounded-l-none"
    @update:pressed="setAlign('right')">
    <AlignRightIcon />
  </Toggle>
</div>
```

### Accesibilidad

- `aria-pressed` refleja el estado actual
- `data-state="on"` / `data-state="off"` para estilos via atributo
- Activable con `Enter` y `Space`
- Soporta `disabled`

---

## Table

Sistema de primitivas de tabla compuesto por 9 sub-componentes estilizados que se combinan libremente. Inspirado en la [Table de shadcn/ui](https://ui.shadcn.com/docs/components/table) — elementos HTML nativos (`<table>`, `<thead>`, `<tr>`, `<th>`, `<td>`, etc.) con estilos consistentes del design system, dark mode, hover en filas, estado de selección y scroll horizontal responsivo.

Las primitivas son **la base** para construir cualquier tabla: estática, con sorting, filtrable, paginada, con selección, etc. La lógica de datos (sorting, filtros, paginación) se implementa en el consumidor usando `computed` — las primitivas solo se ocupan de la presentación.

### Importación

```ts
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@3df/ui';
```

### Sub-componentes

| Componente     | Elemento HTML | Descripción                                                              |
| -------------- | ------------- | ------------------------------------------------------------------------ |
| `Table`        | `<table>`     | Contenedor principal — ancho completo, `caption-bottom`, scroll wrapper  |
| `TableHeader`  | `<thead>`     | Grupo de filas de encabezado — borde inferior en filas hijas             |
| `TableBody`    | `<tbody>`     | Grupo de filas de datos — sin borde en la última fila                    |
| `TableFooter`  | `<tfoot>`     | Grupo de filas de pie — fondo `muted/50`, borde superior                 |
| `TableRow`     | `<tr>`        | Fila — borde inferior, hover `muted/50`, soporte `data-state="selected"` |
| `TableHead`    | `<th>`        | Celda de encabezado — `h-12`, texto `muted-foreground`, font medium      |
| `TableCell`    | `<td>`        | Celda de datos — `p-4`, alineación vertical media                        |
| `TableCaption` | `<caption>`   | Leyenda de la tabla — `mt-4`, texto `muted-foreground`                   |
| `TableEmpty`   | `<tr>` + `<td>` | Fila de estado vacío — centrada, altura `h-24`, texto por defecto      |

> Todos los sub-componentes aceptan `class` para override de estilos vía `cn()` / `tailwind-merge`. Todos usan `inheritAttrs: false` y pasan los attrs restantes al elemento nativo.

---

### Uso básico

```vue
<template>
  <Table>
    <TableCaption>Lista de facturas recientes.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">Factura</TableHead>
        <TableHead>Estado</TableHead>
        <TableHead>Método</TableHead>
        <TableHead class="text-right">Monto</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="inv in invoices" :key="inv.id">
        <TableCell class="font-medium">{{ inv.id }}</TableCell>
        <TableCell>{{ inv.status }}</TableCell>
        <TableCell>{{ inv.method }}</TableCell>
        <TableCell class="text-right">{{ formatCurrency(inv.amount) }}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colspan="3">Total</TableCell>
        <TableCell class="text-right">{{ formatCurrency(total) }}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</template>
```

---

### Props

**TableEmpty:**

| Prop      | Tipo     | Default | Descripción                                |
| --------- | -------- | ------- | ------------------------------------------ |
| `colspan` | `number` | `1`     | Número de columnas que ocupa la celda vacía |

El slot por defecto muestra `"No hay resultados."`. Pasa contenido personalizado para override:

```vue
<TableEmpty :colspan="4">No se encontraron facturas.</TableEmpty>
```

Los demás sub-componentes no tienen props propias — toda la personalización es vía `class` y attrs nativos.

---

### Estado vacío

Usa `TableEmpty` dentro de `TableBody` para mostrar un mensaje cuando no hay datos:

```vue
<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nombre</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Rol</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="users.length">
        <TableRow v-for="user in users" :key="user.id">
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.role }}</TableCell>
        </TableRow>
      </template>
      <TableEmpty v-else :colspan="3" />
    </TableBody>
  </Table>
</template>
```

---

### Filas seleccionadas

Usa `data-state="selected"` en `TableRow` para aplicar fondo `bg-muted`:

```vue
<TableRow
  v-for="row in rows"
  :key="row.id"
  :data-state="selectedIds.has(row.id) ? 'selected' : undefined"
>
  <TableCell>
    <Checkbox
      :model-value="selectedIds.has(row.id)"
      @update:model-value="toggleRow(row.id)"
    />
  </TableCell>
  <TableCell>{{ row.name }}</TableCell>
</TableRow>
```

> El estilo `data-[state=selected]:bg-muted` está incluido en `TableRow` por defecto.

---

### Tabla striped

Usa `class` condicional para alternar fondos:

```vue
<TableRow
  v-for="(person, i) in people"
  :key="person.id"
  :class="i % 2 === 0 ? 'bg-muted/30' : ''"
>
  <!-- ... -->
</TableRow>
```

---

### Data Table (sorting + filtros + paginación + selección)

Las primitivas de tabla son la base para construir data tables completas. La lógica de datos se implementa en tu componente usando `computed` de Vue — las primitivas solo renderizan.

#### Ejemplo completo

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

import {
  Badge,
  Button,
  Checkbox,
  Input,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@3df/ui';

interface Invoice {
  id: string;
  status: 'paid' | 'pending' | 'unpaid';
  email: string;
  amount: number;
}

const data: Invoice[] = [/* ... */];

// ─── Sorting ──────────────────────────────────────
type SortKey = keyof Invoice;
const sortKey = ref<SortKey>('id');
const sortDir = ref<'asc' | 'desc'>('asc');

function toggleSort(key: SortKey) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
}

// ─── Filtering ────────────────────────────────────
const search = ref('');

// ─── Pagination ───────────────────────────────────
const page = ref(1);
const pageSize = 5;

// ─── Selection ────────────────────────────────────
const selectedIds = ref<Set<string>>(new Set());

function toggleRow(id: string) {
  const next = new Set(selectedIds.value);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  selectedIds.value = next;
}

// ─── Computed pipeline ───────────────────────────
const filtered = computed(() => {
  if (!search.value) return data;
  const q = search.value.toLowerCase();
  return data.filter((r) => r.email.toLowerCase().includes(q));
});

const sorted = computed(() => {
  const rows = [...filtered.value];
  const dir = sortDir.value === 'asc' ? 1 : -1;
  rows.sort((a, b) => {
    const va = a[sortKey.value];
    const vb = b[sortKey.value];
    if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
    return String(va).localeCompare(String(vb)) * dir;
  });
  return rows;
});

const totalPages = computed(() => Math.ceil(sorted.value.length / pageSize));
const paginated = computed(() => {
  const start = (page.value - 1) * pageSize;
  return sorted.value.slice(start, start + pageSize);
});

const allSelected = computed(() =>
  paginated.value.length > 0 && paginated.value.every((r) => selectedIds.value.has(r.id)),
);

function toggleAll(checked: boolean) {
  const next = new Set(selectedIds.value);
  for (const row of paginated.value) {
    if (checked) next.add(row.id);
    else next.delete(row.id);
  }
  selectedIds.value = next;
}
</script>

<template>
  <!-- Toolbar -->
  <div class="flex items-center gap-3">
    <Input v-model="search" placeholder="Buscar por email..." class="max-w-xs" />
    <span v-if="selectedIds.size" class="text-muted-foreground ml-auto text-sm">
      {{ selectedIds.size }} seleccionado(s)
    </span>
  </div>

  <!-- Tabla -->
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[40px]">
          <Checkbox :model-value="allSelected" @update:model-value="toggleAll" />
        </TableHead>
        <TableHead class="cursor-pointer select-none" @click="toggleSort('id')">
          Factura
        </TableHead>
        <TableHead class="cursor-pointer select-none" @click="toggleSort('status')">
          Estado
        </TableHead>
        <TableHead class="cursor-pointer select-none" @click="toggleSort('email')">
          Email
        </TableHead>
        <TableHead
          class="cursor-pointer select-none text-right"
          @click="toggleSort('amount')"
        >
          Monto
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="paginated.length">
        <TableRow
          v-for="inv in paginated"
          :key="inv.id"
          :data-state="selectedIds.has(inv.id) ? 'selected' : undefined"
        >
          <TableCell>
            <Checkbox
              :model-value="selectedIds.has(inv.id)"
              @update:model-value="toggleRow(inv.id)"
            />
          </TableCell>
          <TableCell class="font-medium">{{ inv.id }}</TableCell>
          <TableCell>
            <Badge :variant="inv.status === 'paid' ? 'success' : 'warning'" size="sm">
              {{ inv.status }}
            </Badge>
          </TableCell>
          <TableCell>{{ inv.email }}</TableCell>
          <TableCell class="text-right">${{ inv.amount.toFixed(2) }}</TableCell>
        </TableRow>
      </template>
      <TableEmpty v-else :colspan="5">No se encontraron resultados.</TableEmpty>
    </TableBody>
  </Table>

  <!-- Paginación -->
  <div class="flex items-center justify-between">
    <p class="text-muted-foreground text-sm">
      Página {{ page }} de {{ totalPages }}
    </p>
    <div class="flex gap-2">
      <Button variant="outline" size="sm" :disabled="page <= 1" @click="page--">
        Anterior
      </Button>
      <Button variant="outline" size="sm" :disabled="page >= totalPages" @click="page++">
        Siguiente
      </Button>
    </div>
  </div>
</template>
```

**Patrón clave:**

- **Sorting**: `toggleSort()` alterna dirección; `sorted` ordena con `Array.sort()`.
- **Filtrado**: `filtered` filtra con `Array.filter()` antes del sort.
- **Paginación**: `paginated` usa `Array.slice()` sobre el resultado ordenado.
- **Selección**: `Set<string>` de IDs + `data-state="selected"` en cada `TableRow`.
- **Select-all**: opera solo sobre la página visible.

---

### Override de estilos

```vue
<template>
  <!-- Sin hover en filas -->
  <TableRow class="hover:bg-transparent">...</TableRow>

  <!-- Borde más grueso en header -->
  <TableHeader class="[&_tr]:border-b-2">...</TableHeader>

  <!-- Celdas compactas -->
  <TableCell class="p-2 text-xs">...</TableCell>

  <!-- Tabla con borde exterior -->
  <Table class="border border-border rounded-lg">...</Table>

  <!-- Tabla dentro de Card -->
  <Card>
    <CardHeader>
      <CardTitle>Usuarios</CardTitle>
    </CardHeader>
    <CardContent class="p-0">
      <Table>...</Table>
    </CardContent>
  </Card>
</template>
```

---

### Scroll horizontal responsivo

`Table` incluye un wrapper `<div class="relative w-full overflow-auto">` automáticamente. En pantallas pequeñas, la tabla hace scroll horizontal sin romper el layout:

```vue
<template>
  <!-- No necesitas envolver manualmente — el scroll wrapper está incluido -->
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Col 1</TableHead>
        <TableHead>Col 2</TableHead>
        <TableHead>Col 3</TableHead>
        <TableHead>Col 4</TableHead>
        <TableHead>Col 5</TableHead>
        <TableHead>Col 6</TableHead>
        <TableHead>Col 7</TableHead>
      </TableRow>
    </TableHeader>
    <!-- ... -->
  </Table>
</template>
```

---

### Table vs Card

| Característica | Table                              | Card                               |
| -------------- | ---------------------------------- | ---------------------------------- |
| Layout         | Tabular (filas × columnas)         | Apilado vertical (secciones)       |
| Datos          | Múltiples registros homogéneos     | Un solo item o resumen             |
| Responsivo     | Scroll horizontal                  | Apila verticalmente                |
| Selección      | `data-state="selected"` por fila   | Hover/click manual                 |
| Uso            | Listados, reportes, admin panels   | Pricing, productos, dashboards     |

---

## Slider

Slider interactivo accesible para seleccionar un valor numérico dentro de un rango. Soporta arrastre con pointer, navegación completa por teclado, step personalizable, y dark mode. No usa dependencias externas — implementado con Pointer Events nativos.

### Importación

```ts
import { Slider } from '@3df/ui';
```

### Props

| Prop         | Tipo      | Default | Descripción                        |
| ------------ | --------- | ------- | ---------------------------------- |
| `modelValue` | `number`  | `0`     | Valor actual del slider (v-model)  |
| `min`        | `number`  | `0`     | Valor mínimo del rango             |
| `max`        | `number`  | `100`   | Valor máximo del rango             |
| `step`       | `number`  | `1`     | Incremento entre valores           |
| `disabled`   | `boolean` | `false` | Deshabilita la interacción         |

> Acepta todos los atributos nativos vía `$attrs`. Usa `inheritAttrs: false` y maneja attrs manualmente.

### Eventos

| Evento            | Payload  | Descripción                     |
| ----------------- | -------- | ------------------------------- |
| `update:modelValue` | `number` | Se emite al cambiar el valor    |

---

### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';

import { Slider } from '@3df/ui';

const value = ref(50);
</script>

<template>
  <Slider v-model="value" />
  <p>Valor: {{ value }}</p>
</template>
```

---

### Con label

```vue
<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <Label>Volumen</Label>
      <span class="text-muted-foreground text-sm">{{ volume }}%</span>
    </div>
    <Slider v-model="volume" />
  </div>
</template>
```

---

### Con step

Usa `step` para limitar los valores seleccionables:

```vue
<template>
  <Slider v-model="progress" :step="25" />
  <div class="text-muted-foreground flex justify-between text-xs">
    <span>0%</span>
    <span>25%</span>
    <span>50%</span>
    <span>75%</span>
    <span>100%</span>
  </div>
</template>
```

---

### Rango personalizado

```vue
<template>
  <div class="flex items-center justify-between">
    <Label>Precio máximo</Label>
    <span class="text-muted-foreground text-sm">${{ price }}</span>
  </div>
  <Slider v-model="price" :min="0" :max="1000" :step="50" />
</template>
```

---

### Estado disabled

```vue
<template>
  <Slider v-model="value" :disabled="true" />
</template>
```

Los sliders deshabilitados aplican `opacity: 0.5` y `pointer-events: none` automáticamente.

---

### Navegación por teclado

| Tecla                | Acción                                   |
| -------------------- | ---------------------------------------- |
| `→` / `↑`            | Incrementa en un `step`                  |
| `←` / `↓`            | Decrementa en un `step`                  |
| `Page Up`            | Incrementa en 10% del rango              |
| `Page Down`          | Decrementa en 10% del rango              |
| `Home`               | Salta al valor mínimo                    |
| `End`                | Salta al valor máximo                    |

---

### Estilo visual

- **Track**: `h-1.5`, fondo `bg-secondary`, bordes redondeados completos.
- **Range**: Porción llenada con `bg-primary`, transición suave de ancho.
- **Thumb**: `size-4` (16px), borde sutil `border-primary/60`, fondo `bg-background`, sombra ligera. En hover escala a `110%` y el borde se intensifica a `border-primary`.
- **Arrastre**: Ring suave `ring-ring/40` de `3px`, escala `110%` y sombra `shadow-md`.
- Se adapta automáticamente a dark mode a través de los design tokens.

---

### Override de estilos

```vue
<template>
  <!-- Track más grueso -->
  <Slider v-model="value" class="h-3" />

  <!-- Ancho fijo -->
  <Slider v-model="value" class="w-64" />
</template>
```

---

### En contexto

El slider combina naturalmente con otros componentes:

```vue
<template>
  <!-- Dentro de un formulario -->
  <div class="flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <Label for="opacity">Opacidad</Label>
      <span class="text-muted-foreground text-sm">{{ opacity }}%</span>
    </div>
    <Slider v-model="opacity" />
  </div>

  <!-- Dentro de una Card -->
  <Card>
    <CardHeader>
      <CardTitle>Configuración de audio</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <span class="text-muted-foreground w-16 text-right text-xs">Volumen</span>
          <Slider v-model="volume" class="flex-1" />
          <span class="text-muted-foreground w-8 text-xs">{{ volume }}%</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
```

---

### Accesibilidad

- `role="slider"` en el elemento raíz
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` reflejan el estado actual
- `aria-disabled` cuando está deshabilitado
- `tabindex="0"` para navegación por teclado (se desactiva cuando `disabled`)
- Navegación completa por teclado (ver tabla arriba)
- Pointer capture para arrastre fluido fuera del elemento

---

### Slider vs Switch

| Característica | Slider                              | Switch                   |
| -------------- | ----------------------------------- | ------------------------ |
| Tipo de valor  | Numérico continuo (rango)           | Booleano (on/off)        |
| Interacción    | Arrastre + teclado                  | Click/tap                |
| Caso de uso    | Volumen, brillo, precio, progreso   | Activar/desactivar       |
| ARIA role      | `slider`                            | `switch`                 |

---

## Skeleton

Componente de marcador de posición visual para contenido que aún está cargando. Muestra una animación de pulso sutil que indica al usuario que el contenido se está obteniendo.

### Importación

```ts
import { Skeleton } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <!-- Línea de texto -->
  <Skeleton class="h-4 w-[250px]" />

  <!-- Círculo (avatar) -->
  <Skeleton class="size-12 rounded-full" />

  <!-- Bloque rectangular -->
  <Skeleton class="h-20 w-full" />
</template>
```

### Card skeleton

Se combina con `Card` y sus sub-componentes para crear estados de carga realistas:

```vue
<template>
  <Card class="w-full max-w-sm">
    <CardHeader>
      <div class="flex items-center gap-4">
        <Skeleton class="size-10 rounded-full" />
        <div class="flex flex-col gap-2">
          <Skeleton class="h-4 w-[150px]" />
          <Skeleton class="h-3 w-[100px]" />
        </div>
      </div>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-full" />
      <Skeleton class="h-4 w-3/4" />
    </CardContent>
    <CardFooter class="gap-2">
      <Skeleton class="h-9 w-20 rounded-md" />
      <Skeleton class="h-9 w-20 rounded-md" />
    </CardFooter>
  </Card>
</template>
```

### Tabla skeleton

```vue
<template>
  <div class="w-full">
    <div class="flex gap-4 border-b border-border pb-3">
      <Skeleton class="h-4 w-[80px]" />
      <Skeleton class="h-4 w-[120px]" />
      <Skeleton class="h-4 flex-1" />
    </div>
    <div v-for="i in 5" :key="i" class="flex items-center gap-4 border-b border-border py-4">
      <Skeleton class="h-4 w-[80px]" />
      <Skeleton class="h-4 w-[120px]" />
      <Skeleton class="h-4 flex-1" />
    </div>
  </div>
</template>
```

### Props

`Skeleton` no define props propias. Al usar `inheritAttrs: false` con `v-bind="restAttrs"`, todos los atributos nativos del `<div>` (incluido `class`) se pasan directamente.

### Estilo visual

| Propiedad    | Valor                 |
| ------------ | --------------------- |
| Background   | `bg-muted`            |
| Animación    | `animate-pulse`       |
| Border-radius | `rounded-md` (default) |

La forma y tamaño se controlan desde el consumidor mediante clases de utilidad de Tailwind (`h-*`, `w-*`, `rounded-full`, etc.).

### Formas comunes

| Forma       | Clases                             |
| ----------- | ---------------------------------- |
| Línea texto | `h-4 w-[200px]`                   |
| Avatar      | `size-12 rounded-full`             |
| Botón       | `h-9 w-20 rounded-md`             |
| Imagen      | `aspect-[3/2] w-full rounded-none` |
| Input       | `h-10 w-full rounded-md`          |
| Checkbox    | `size-4 rounded-sm`               |

### Accesibilidad

- Usa `aria-hidden="true"` o `role="status"` con `aria-label="Cargando…"` en el contenedor padre si el skeleton reemplaza contenido significativo.
- El componente es puramente decorativo y no recibe foco.

---

## Sidebar

Sistema de navegación lateral completo con soporte para múltiples variantes, colapso animado, modo icon-only, sub-menús colapsables, badges, action buttons, skeleton de carga, posicionamiento izquierda/derecha y drawer móvil automático. Todos los componentes usan design tokens específicos (`sidebar-*`) para estilización independiente.

### Arquitectura

El Sidebar utiliza el patrón **Provider → Consumer** vía `provide/inject`:

```
SidebarProvider              ← Estado global (open, side, variant...) + v-model:open
├── Sidebar                  ← Panel lateral (desktop + mobile drawer)
│   ├── SidebarHeader        ← Logo / título (border-b automático)
│   ├── SidebarContent       ← Zona scrollable (scrollbar customizado)
│   │   └── SidebarGroup
│   │       ├── SidebarGroupLabel       ← uppercase, tracking-wider
│   │       └── SidebarGroupContent
│   │           └── SidebarMenu
│   │               └── SidebarMenuItem
│   │                   ├── SidebarMenuButton    ← Botón interactivo + aria-current
│   │                   ├── SidebarMenuBadge     ← Contador/badge (oculto en icon mode)
│   │                   ├── SidebarMenuAction    ← Botón acción (+, ...) con showOnHover
│   │                   └── SidebarMenuSub       ← Sub-menú colapsable animado
│   │                       └── SidebarMenuSubItem
│   │                           └── SidebarMenuSubButton
│   ├── SidebarSeparator
│   ├── SidebarFooter        ← Usuario / acciones (border-t automático)
│   └── SidebarRail          ← Borde interactivo para toggle
└── SidebarInset             ← Contenido principal
    └── SidebarTrigger       ← Botón hamburguesa
```

### Importación

```ts
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuSkeleton,
  SidebarSeparator,
  SidebarRail,
  SidebarInset,
  useSidebar,
} from '@3df/ui';
```

### Uso básico — Sidebar izquierdo

```vue
<template>
  <SidebarProvider>
    <Sidebar>
      <SidebarHeader>
        <span class="text-sm font-semibold">Mi App</span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton is-active>
                  <HomeIcon class="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <span class="text-xs">v1.0.0</span>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>

    <SidebarInset>
      <header class="flex h-12 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <span>Contenido</span>
      </header>
      <main class="p-6">...</main>
    </SidebarInset>
  </SidebarProvider>
</template>
```

### Sidebar derecho

```vue
<template>
  <SidebarProvider side="right">
    <SidebarInset>
      <header class="flex h-12 items-center justify-between px-4">
        <span>Panel principal</span>
        <SidebarTrigger />
      </header>
    </SidebarInset>

    <Sidebar side="right">
      <SidebarHeader>Propiedades</SidebarHeader>
      <SidebarContent>...</SidebarContent>
    </Sidebar>
  </SidebarProvider>
</template>
```

### Modo Icon collapse

Al colapsar, el sidebar se reduce a `3rem` mostrando solo los íconos:

```vue
<template>
  <SidebarProvider collapsible="icon">
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Nav</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard">
                  <HomeIcon class="size-4" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
    <SidebarInset>...</SidebarInset>
  </SidebarProvider>
</template>
```

Clase utilitaria para ocultar elementos en modo icon:

```
group-data-[collapsible=icon]/sidebar-wrapper:hidden
```

### Variantes visuales

| Variante  | Descripción                                              |
| --------- | -------------------------------------------------------- |
| `sidebar` | Adherido al borde, sin bordes redondeados (default)       |
| `floating`| Flota sobre el contenido con `shadow-lg` y `rounded-lg`  |
| `inset`   | Contenido principal empotrado con padding y `rounded-xl`  |

### Composable `useSidebar()`

Accede al estado del sidebar desde cualquier componente descendiente:

```ts
const { state, open, isMobile, toggleSidebar, setOpen } = useSidebar();
```

| Propiedad      | Tipo                                | Descripción                       |
| -------------- | ----------------------------------- | --------------------------------- |
| `state`        | `Ref<'expanded' \| 'collapsed'>`   | Estado computado                  |
| `open`         | `Ref<boolean>`                      | Estado de apertura (desktop)      |
| `isMobile`     | `Ref<boolean>`                      | ¿Viewport < 768px?               |
| `openMobile`   | `Ref<boolean>`                      | Estado de apertura (mobile)       |
| `side`         | `Ref<'left' \| 'right'>`           | Lado del sidebar                  |
| `variant`      | `Ref<'sidebar' \| 'floating' \| 'inset'>` | Variante visual          |
| `collapsible`  | `Ref<'offcanvas' \| 'icon' \| 'none'>` | Modo de colapso               |
| `toggleSidebar`| `() => void`                        | Toggle desktop/mobile             |
| `setOpen`      | `(v: boolean) => void`              | Setter directo desktop            |
| `setOpenMobile`| `(v: boolean) => void`              | Setter directo mobile             |

### Props de SidebarProvider

| Prop          | Tipo                                  | Default      |
| ------------- | ------------------------------------- | ------------ |
| `defaultOpen` | `boolean`                             | `true`       |
| `open`        | `boolean`                             | —            |
| `side`        | `'left' \| 'right'`                  | `'left'`     |
| `variant`     | `'sidebar' \| 'floating' \| 'inset'` | `'sidebar'`  |
| `collapsible` | `'offcanvas' \| 'icon' \| 'none'`    | `'offcanvas'` |

**Soporte `v-model:open`**: Permite control bidireccional del estado del sidebar:

```vue
<template>
  <SidebarProvider v-model:open="sidebarOpen">
    <!-- ... -->
  </SidebarProvider>
  <button @click="sidebarOpen = !sidebarOpen">Toggle externo</button>
</template>
```

### Props de SidebarMenuButton

| Prop       | Tipo                    | Default     | Descripción            |
| ---------- | ----------------------- | ----------- | ---------------------- |
| `as`       | `string \| Component`  | `'button'`  | Elemento/componente    |
| `isActive` | `boolean`               | `false`     | Marca como activo      |
| `size`     | `'sm' \| 'default' \| 'lg'` | `'default'` | Tamaño           |
| `tooltip`  | `string`                | —           | Title en modo icon     |
| `disabled` | `boolean`               | `false`     | Deshabilitado          |

> Cuando `isActive` es `true`, el botón recibe automáticamente `aria-current="page"`.

### Sub-menús colapsables

Usa `SidebarMenuSub` para secciones de navegación anidadas con animación de expand/collapse:

```vue
<template>
  <SidebarMenuItem>
    <SidebarMenuButton @click="open = !open">
      <FolderIcon class="size-4" />
      <span>Proyectos</span>
      <ChevronIcon class="ml-auto size-4 transition-transform" :class="open && 'rotate-90'" />
    </SidebarMenuButton>

    <SidebarMenuSub :open="open">
      <SidebarMenuSubItem>
        <SidebarMenuSubButton is-active>Todos</SidebarMenuSubButton>
      </SidebarMenuSubItem>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>Recientes</SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</template>
```

**Props de SidebarMenuSub:**

| Prop   | Tipo      | Default | Descripción                                      |
| ------ | --------- | ------- | ------------------------------------------------ |
| `open` | `boolean` | `false` | Controla si el sub-menú está expandido. Soporta `v-model:open` |

**Props de SidebarMenuSubButton:**

| Prop       | Tipo                   | Default     | Descripción              |
| ---------- | ---------------------- | ----------- | ------------------------ |
| `as`       | `string \| Component` | `'a'`       | Elemento/componente      |
| `isActive` | `boolean`              | `false`     | Marca como activo (+ aria-current) |
| `size`     | `'sm' \| 'default'`   | `'default'` | `sm` = h-6, `default` = h-7 |

> En modo icon-collapse los sub-menús se ocultan automáticamente.

### Badges de menú

`SidebarMenuBadge` muestra un contador o indicador junto al botón del menú:

```vue
<SidebarMenuItem>
  <SidebarMenuButton>
    <InboxIcon class="size-4" />
    <span>Bandeja</span>
  </SidebarMenuButton>
  <SidebarMenuBadge>28</SidebarMenuBadge>
</SidebarMenuItem>
```

- Posición absoluta a la derecha del item
- Usa tokens `bg-sidebar-primary` / `text-sidebar-primary-foreground`
- Se oculta automáticamente en modo icon-collapse
- Usa `tabular-nums` para alineación consistente de números

### Botones de acción

`SidebarMenuAction` agrega un botón de acción ("+", "×", "…") junto al item, opcionalmente visible solo al hover:

```vue
<SidebarMenuItem>
  <SidebarMenuButton>
    <FolderIcon class="size-4" />
    <span>Proyectos</span>
  </SidebarMenuButton>
  <SidebarMenuAction show-on-hover title="Crear proyecto">
    <PlusIcon class="size-4" />
  </SidebarMenuAction>
</SidebarMenuItem>
```

**Props:**

| Prop         | Tipo      | Default | Descripción                         |
| ------------ | --------- | ------- | ----------------------------------- |
| `showOnHover`| `boolean` | `false` | Solo visible al hover del item (md+)|

### Skeleton de menú

`SidebarMenuSkeleton` renderiza un placeholder animado para estados de carga:

```vue
<SidebarMenu>
  <SidebarMenuItem v-for="i in 5" :key="i">
    <SidebarMenuSkeleton show-icon />
  </SidebarMenuItem>
</SidebarMenu>
```

**Props:**

| Prop       | Tipo      | Default | Descripción                        |
| ---------- | --------- | ------- | ---------------------------------- |
| `showIcon` | `boolean` | `false` | Muestra un skeleton circular de icono |

> Los anchos del texto se aleatorizan para dar aspecto natural.

### Responsive (Mobile)

- En viewports < `768px`, el sidebar se oculta automáticamente.
- Se muestra como drawer/sheet deslizante al pulsar `SidebarTrigger`.
- Overlay con `backdrop-blur` y click para cerrar.
- Botón de cierre (×) integrado.
- Se bloquea `body` scroll cuando el drawer está abierto y se libera correctamente al cerrar o desmontar el componente.

### Animaciones

Todas las transiciones usan `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint) para un movimiento suave y natural:

| Elemento  | Transición                                                             |
| --------- | ---------------------------------------------------------------------- |
| Desktop   | `transition-[left,right,width,padding] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]` |
| Spacer    | `transition-[width] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`  |
| Overlay   | `opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`             |
| Sheet     | `transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]` (open) / `duration-300` (close) |
| Labels    | `transition-[margin,opacity,padding] duration-400`                     |

### Atajo de teclado

`Ctrl+B` (Windows/Linux) o `⌘+B` (macOS) para toggle rápido.

### Accesibilidad

- `SidebarTrigger` incluye `aria-label` dinámico ("Abrir/Cerrar sidebar").
- `SidebarMenuAction` incluye `aria-label` automático (usa `title`, `aria-label` del consumidor, o fallback "Acción").
- `SidebarRail` tiene `role="button"`, `tabindex="0"` y responde a `Enter`/`Space`.
- Mobile drawer: botón de cierre con `aria-label`, overlay clickable.
- `SidebarMenuButton` establece `aria-current="page"` cuando `isActive` es `true`.

### Design tokens del sidebar

```css
@theme {
  --color-sidebar: hsl(0 0% 98%);
  --color-sidebar-foreground: hsl(0 0% 0%);
  --color-sidebar-primary: hsl(0 0% 0%);
  --color-sidebar-primary-foreground: hsl(0 0% 100%);
  --color-sidebar-accent: hsl(0 0% 92%);
  --color-sidebar-accent-foreground: hsl(0 0% 0%);
  --color-sidebar-border: hsl(0 0% 85%);
  --color-sidebar-ring: hsl(0 0% 25%);
}
```

---

## Sheet

Panel deslizante (slide-out drawer) que se posiciona sobre el contenido desde cualquiera de los 4 lados. Ideal para formularios de edición, detalles, filtros y navegación contextual. Incluye overlay, focus trap, bloqueo de scroll y cierre con `Escape`.

### Arquitectura

```
Sheet                        ← Proveedor de estado (v-model:open)
├── SheetTrigger             ← Botón que abre/cierra
└── SheetContent             ← Panel deslizante (Teleport to body)
    ├── SheetHeader          ← Zona de título y descripción
    │   ├── SheetTitle       ← Título accesible (aria-labelledby)
    │   └── SheetDescription ← Descripción accesible (aria-describedby)
    ├── (contenido libre)
    ├── SheetFooter          ← Zona de acciones
    │   └── SheetClose       ← Botón que cierra el sheet
    └── botón × (automático) ← Cierre visual (showClose)
```

### Importación

```ts
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="outline">Abrir Sheet</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Editar perfil</SheetTitle>
        <SheetDescription>
          Realiza cambios en tu perfil aquí.
        </SheetDescription>
      </SheetHeader>
      <div class="flex flex-col gap-4 py-4">
        <Label for="name">Nombre</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <SheetFooter>
        <SheetClose>
          <Button variant="outline">Cancelar</Button>
        </SheetClose>
        <SheetClose>
          <Button>Guardar cambios</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
```

### Posiciones — 4 lados

Usa la prop `side` en `SheetContent` para controlar desde dónde se desliza:

```vue
<template>
  <Sheet>
    <SheetTrigger><Button>Desde arriba</Button></SheetTrigger>
    <SheetContent side="top">...</SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger><Button>Desde abajo</Button></SheetTrigger>
    <SheetContent side="bottom">...</SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger><Button>Desde izquierda</Button></SheetTrigger>
    <SheetContent side="left">...</SheetContent>
  </Sheet>

  <Sheet>
    <SheetTrigger><Button>Desde derecha</Button></SheetTrigger>
    <SheetContent side="right">...</SheetContent>
  </Sheet>
</template>
```

| Side     | Estilo                                          |
| -------- | ----------------------------------------------- |
| `top`    | `inset-x-0 top-0 border-b` — ancho completo    |
| `bottom` | `inset-x-0 bottom-0 border-t` — ancho completo |
| `left`   | `inset-y-0 left-0 w-3/4 sm:max-w-sm border-r`  |
| `right`  | `inset-y-0 right-0 w-3/4 sm:max-w-sm border-l` |

### Control externo (v-model:open)

```vue
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger>
      <Button>Abrir</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Controlado</SheetTitle>
        <SheetDescription>Estado: {{ isOpen }}</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>

  <Button variant="ghost" @click="isOpen = !isOpen">Toggle externo</Button>
</template>
```

### Sin botón de cierre (×)

```vue
<SheetContent :show-close="false">
  <!-- Solo se cierra con Escape, overlay click, o SheetClose -->
</SheetContent>
```

### Ancho personalizado

Sobrescribe el `max-width` por defecto con clases de Tailwind:

```vue
<!-- Ancho lg -->
<SheetContent class="sm:max-w-lg">...</SheetContent>

<!-- Ancho 2xl -->
<SheetContent class="sm:max-w-2xl">...</SheetContent>

<!-- Ancho fijo -->
<SheetContent class="sm:max-w-[600px]">...</SheetContent>
```

### Contenido scrollable

Agrega `overflow-y-auto` al `SheetContent`:

```vue
<SheetContent class="overflow-y-auto">
  <!-- Contenido largo que necesita scroll -->
</SheetContent>
```

### Props de Sheet

| Prop          | Tipo      | Default | Descripción                                     |
| ------------- | --------- | ------- | ----------------------------------------------- |
| `open`        | `boolean` | —       | Estado controlado (v-model:open)                |
| `defaultOpen` | `boolean` | `false` | Estado inicial cuando no se usa v-model         |

### Props de SheetContent

| Prop        | Tipo                                       | Default   | Descripción                          |
| ----------- | ------------------------------------------ | --------- | ------------------------------------ |
| `side`      | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` | Lado desde donde se desliza el panel |
| `showClose` | `boolean`                                  | `true`    | Mostrar botón × de cierre            |

### Props de SheetTitle

| Prop | Tipo                   | Default | Descripción                        |
| ---- | ---------------------- | ------- | ---------------------------------- |
| `as` | `string \| Component` | `'h2'`  | Elemento o componente a renderizar |

### Animaciones

Todas las transiciones usan la curva de la librería:

| Elemento | Transición                                                                 |
| -------- | -------------------------------------------------------------------------- |
| Panel    | `transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`    |
| Overlay  | `transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]`      |

### Accesibilidad

- `role="dialog"` + `aria-modal="true"` en el panel.
- `aria-labelledby` vinculado automáticamente a `SheetTitle`.
- `aria-describedby` vinculado automáticamente a `SheetDescription`.
- **Focus trap**: el foco queda atrapado dentro del panel (Tab/Shift+Tab ciclan).
- **Escape**: cierra el sheet y devuelve el foco al trigger.
- **Overlay click**: cierra el sheet.
- **Body scroll lock**: se bloquea el scroll del body mientras está abierto y se libera al cerrar o desmontar.
- Botón × tiene `aria-label="Cerrar"` + texto `sr-only`.

### Variantes headless

Si necesitas los estilos del panel sin el componente:

```ts
import { sheetVariants } from '@3df/ui';

const classes = sheetVariants({ side: 'left' });
```

---

## Separator

Divisor visual para separar secciones de contenido. Soporta orientación horizontal y vertical, uso semántico y decorativo.

### Importación

```ts
import { Separator } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <div class="space-y-1">
    <h3 class="text-sm font-medium">Radix Primitives</h3>
    <p class="text-muted-foreground text-sm">
      Componentes UI accesibles y sin estilos.
    </p>
  </div>
  <Separator class="my-4" />
  <div class="flex h-5 items-center gap-4 text-sm">
    <span>Blog</span>
    <Separator orientation="vertical" />
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Source</span>
  </div>
</template>
```

### Orientación

| Orientación    | Clases resultantes | Uso                                  |
| -------------- | ------------------ | ------------------------------------ |
| `horizontal`   | `h-px w-full`      | Separar secciones verticalmente      |
| `vertical`     | `h-full w-px`      | Separar elementos en línea (inline)  |

### Decorativo vs Semántico

- **Semántico** (default): renderiza con `role="separator"` y `aria-orientation`. Apropiado cuando el separador marca una división lógica del contenido.
- **Decorativo** (`decorative`): renderiza con `role="none"`. Apropiado cuando es puramente visual y no aporta información al usuario de lector de pantalla.

```vue
<template>
  <!-- Semántico (accesible para screen readers) -->
  <Separator />

  <!-- Decorativo (ignorado por screen readers) -->
  <Separator decorative />
</template>
```

### Props

| Prop          | Tipo                              | Default        | Descripción                                  |
| ------------- | --------------------------------- | -------------- | -------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'`    | `'horizontal'` | Dirección del separador                      |
| `decorative`  | `boolean`                         | `false`        | Si es `true`, usa `role="none"` en vez de `role="separator"` |

> Acepta todos los atributos nativos de `<div>` vía `$attrs`, incluyendo `class` para override de estilos.

### Estilo visual

| Propiedad    | Valor              |
| ------------ | ------------------ |
| Background   | `bg-border`        |
| Horizontal   | `h-px w-full`      |
| Vertical     | `h-full w-px`      |

### Override de estilos

```vue
<template>
  <!-- Más grueso -->
  <Separator class="h-0.5" />

  <!-- Color personalizado -->
  <Separator class="bg-primary" />

  <!-- Dashed -->
  <Separator class="h-0 border-t border-dashed border-border bg-transparent" />
</template>
```

### Accesibilidad

- `role="separator"` por defecto (semántico).
- `aria-orientation` refleja la orientación actual.
- `role="none"` cuando `decorative` es `true` (ignorado por lectores de pantalla).
- `data-orientation` siempre presente para targeting CSS.

---

## Scroll Area

Área de scroll personalizada que oculta las scrollbars nativas del SO y las reemplaza con barras estilizadas que se integran con el tema. Consistente en todos los navegadores.

### Importación

```ts
import { ScrollArea } from '@3df/ui';
```

### Uso básico — Scroll vertical

```vue
<template>
  <ScrollArea class="h-72 w-48 rounded-md border">
    <div class="p-4">
      <h4 class="mb-4 text-sm font-medium">Tags</h4>
      <div v-for="tag in tags" :key="tag" class="text-sm">
        {{ tag }}
      </div>
    </div>
  </ScrollArea>
</template>
```

### Scroll horizontal

```vue
<template>
  <ScrollArea orientation="horizontal" class="w-full max-w-xl rounded-md border">
    <div class="flex gap-4 p-4">
      <div v-for="item in items" :key="item" class="w-36 shrink-0 rounded-md border p-3">
        {{ item }}
      </div>
    </div>
  </ScrollArea>
</template>
```

### Ambas direcciones

```vue
<template>
  <ScrollArea orientation="both" class="h-64 w-80 rounded-md border">
    <div class="w-[600px] p-4">
      <!-- Contenido más ancho y alto que el contenedor -->
    </div>
  </ScrollArea>
</template>
```

### Tipos de scrollbar

| Tipo     | Comportamiento                                               |
| -------- | ------------------------------------------------------------ |
| `hover`  | Visible al hacer hover sobre el área (default)               |
| `scroll` | Visible solo mientras se scrollea                            |
| `always` | Siempre visible mientras haya overflow                       |
| `auto`   | Siempre visible mientras haya overflow (alias de `always`)   |

### Props

| Prop          | Tipo                                          | Default      | Descripción                      |
| ------------- | --------------------------------------------- | ------------ | -------------------------------- |
| `type`        | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'`    | Cuándo mostrar la scrollbar      |
| `orientation` | `'vertical' \| 'horizontal' \| 'both'`      | `'vertical'` | Ejes de scroll habilitados       |

> Acepta todos los atributos nativos de `<div>` vía `$attrs`, incluyendo `class` para override de estilos.

### Estilo visual

| Elemento  | Clases                                                    |
| --------- | --------------------------------------------------------- |
| Track     | `w-2.5` (vertical) / `h-2.5` (horizontal), transparente  |
| Thumb     | `bg-border`, `rounded-full`, hover → `bg-border/80`      |
| Container | `overflow-hidden`, hereda `rounded` del padre             |

Las scrollbars nativas se ocultan con `scrollbar-width: none` (Firefox) y `::-webkit-scrollbar { display: none }` (Chromium/Safari).

### Interacción

- **Drag**: arrastra el thumb para scrollear proporcionalmente.
- **Track click**: clic en el track salta a esa posición.
- **Mouse wheel**: funciona normalmente dentro del viewport.
- **ResizeObserver**: recalcula automáticamente al cambiar el tamaño del contenido.

### Accesibilidad

- El viewport mantiene la navegación nativa por teclado (Tab, flechas, Page Up/Down).
- Los thumbs usan pointer capture para arrastre fluido fuera del elemento.
- El componente es transparente para screen readers (las scrollbars custom son decorativas).

---

## Progress

Barra de progreso que muestra el avance de una operación. Soporta estados determinados (0–100%) e indeterminados con animación continua. Basado en el primitivo Radix UI Progress.

### Importación

```ts
import { Progress } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Progress :model-value="33" />
</template>
```

### Estado indeterminado

Si no se pasa `modelValue` (o se pasa `undefined`), el componente entra en modo indeterminado con animación continua:

```vue
<template>
  <Progress />
</template>
```

### Max personalizado

```vue
<template>
  <!-- 150 de 200 = 75% -->
  <Progress :model-value="150" :max="200" />
</template>
```

### Tamaños

Ajusta la altura con clases de Tailwind en el contenedor raíz:

```vue
<template>
  <Progress :model-value="60" class="h-1" />  <!-- Thin -->
  <Progress :model-value="60" class="h-2" />  <!-- Small -->
  <Progress :model-value="60" />                <!-- Default h-4 -->
  <Progress :model-value="60" class="h-6" />  <!-- Large -->
</template>
```

### Colores personalizados

Usa el atributo `indicatorClass` para cambiar el color del indicador:

```vue
<template>
  <Progress :model-value="72" indicator-class="bg-green-500" />
  <Progress :model-value="72" indicator-class="bg-red-500" />
  <Progress :model-value="72" indicator-class="bg-yellow-500" />
</template>
```

### Props

| Prop             | Tipo                      | Default     | Descripción                                    |
| ---------------- | ------------------------- | ----------- | ---------------------------------------------- |
| `modelValue`     | `number \| undefined`    | `undefined` | Valor actual (0–max). `undefined` = indeterminado |
| `max`            | `number`                  | `100`       | Valor máximo de la barra                       |
| `class`          | `ClassValue`              | —           | Clases CSS del contenedor raíz                 |
| `indicatorClass` | `ClassValue`              | —           | Clases CSS del indicador de progreso           |

### Data Attributes

| Atributo      | Valores                          | Descripción                    |
| ------------- | -------------------------------- | ------------------------------ |
| `data-state`  | `'determinate' \| 'indeterminate'` | Estado actual del progreso  |
| `data-value`  | `number \| undefined`           | Valor actual                   |
| `data-max`    | `number`                         | Valor máximo                   |

### Estilo visual

| Elemento   | Clases                                                              |
| ---------- | ------------------------------------------------------------------- |
| Root       | `relative h-4 w-full overflow-hidden rounded-full bg-secondary`    |
| Indicator  | `bg-primary rounded-full transition-transform duration-400`         |

La transición usa `translateX` para un rendimiento óptimo (GPU-accelerated). El estado indeterminado usa una animación `@keyframes` con `cubic-bezier(0.65, 0, 0.35, 1)`.

### Accesibilidad

- `role="progressbar"` con `aria-valuemin`, `aria-valuemax` y `aria-valuenow`.
- En modo indeterminado, `aria-valuenow` se omite según la especificación WAI-ARIA.
- Totalmente accesible para screen readers sin configuración adicional.

---

## Pagination

Sistema de paginación con patrón compound component. Estructura semántica `<nav>` con accesibilidad ARIA completa.

### Importación

```ts
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious @click="page--" :disabled="page <= 1" />
      </PaginationItem>

      <PaginationItem v-for="p in 5" :key="p">
        <PaginationLink :is-active="page === p" @click="page = p">
          {{ p }}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem>
        <PaginationNext @click="page++" :disabled="page >= 5" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
```

### Con Ellipsis

Para conjuntos grandes de páginas, usa `PaginationEllipsis` para indicar páginas ocultas:

```vue
<template>
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious :disabled="page <= 1" @click="page--" />
      </PaginationItem>

      <PaginationItem>
        <PaginationLink :is-active="page === 1" @click="page = 1">1</PaginationLink>
      </PaginationItem>

      <PaginationItem v-if="page > 3">
        <PaginationEllipsis />
      </PaginationItem>

      <!-- Ventana dinámica -->
      <PaginationItem v-for="p in windowPages" :key="p">
        <PaginationLink :is-active="page === p" @click="page = p">
          {{ p }}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem v-if="page < totalPages - 2">
        <PaginationEllipsis />
      </PaginationItem>

      <PaginationItem>
        <PaginationLink :is-active="page === totalPages" @click="page = totalPages">
          {{ totalPages }}
        </PaginationLink>
      </PaginationItem>

      <PaginationItem>
        <PaginationNext :disabled="page >= totalPages" @click="page++" />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
```

### Componente `as` polimórfico

`PaginationLink`, `PaginationPrevious` y `PaginationNext` aceptan la prop `as` para renderizar como `<a>` o un componente de router:

```vue
<PaginationLink as="a" href="/page/2">2</PaginationLink>
<PaginationPrevious as="RouterLink" :to="{ query: { page: page - 1 } }" />
```

### Componentes

| Componente           | Elemento  | Props                          | Descripción                              |
| -------------------- | --------- | ------------------------------ | ---------------------------------------- |
| `Pagination`         | `<nav>`   | `class`                        | Wrapper con `role="navigation"`, `aria-label="pagination"` |
| `PaginationContent`  | `<ul>`    | `class`                        | Lista contenedora, layout flex con gap   |
| `PaginationItem`     | `<li>`    | `class`                        | Elemento individual de la lista          |
| `PaginationLink`     | `<button>`| `isActive`, `as`, `disabled`, `class` | Botón de página, `aria-current="page"` cuando activo |
| `PaginationPrevious` | `<button>`| `as`, `disabled`, `class`      | Botón «Anterior» con icono chevron-left  |
| `PaginationNext`     | `<button>`| `as`, `disabled`, `class`      | Botón «Siguiente» con icono chevron-right|
| `PaginationEllipsis` | `<span>`  | `class`                        | Indicador «…» con `aria-hidden` y `sr-only` |

### Props detalladas — PaginationLink

| Prop       | Tipo                     | Default    | Descripción                              |
| ---------- | ------------------------ | ---------- | ---------------------------------------- |
| `isActive` | `boolean`                | `false`    | Marca como página actual                 |
| `as`       | `string \| Component`   | `'button'` | Elemento o componente a renderizar       |
| `disabled` | `boolean`                | `false`    | Deshabilita la interacción               |

### Props detalladas — PaginationPrevious / PaginationNext

| Prop       | Tipo                     | Default    | Descripción                              |
| ---------- | ------------------------ | ---------- | ---------------------------------------- |
| `as`       | `string \| Component`   | `'button'` | Elemento o componente a renderizar       |
| `disabled` | `boolean`                | `false`    | Deshabilita la interacción               |

### Estilo visual

| Elemento         | Clases clave                                                     |
| ---------------- | ---------------------------------------------------------------- |
| Link (default)   | `h-10 w-10 rounded-md`, hover → `bg-accent text-accent-foreground` |
| Link (active)    | `border border-border bg-background shadow-sm`                   |
| Previous / Next  | `h-10 px-3.5 gap-1`, icono SVG chevron 16×16                    |
| Ellipsis         | `h-10 w-10`, icono «more-horizontal» SVG                        |
| Focus ring       | `ring-[3.2px] ring-ring`                                         |

### Accesibilidad

- `<nav>` con `role="navigation"` y `aria-label="pagination"`.
- `aria-current="page"` en el link activo.
- `PaginationEllipsis` usa `aria-hidden="true"` con texto `sr-only` para lectores de pantalla.
- Previous/Next incluyen `aria-label` descriptivos.
- Estados `disabled` eliminan la interacción con `pointer-events-none` y `opacity-50`.

---

## Navigation Menu

Menú de navegación horizontal con paneles desplegables, transiciones suaves y soporte de teclado. Patrón compound component con `provide/inject`, hover con delays inteligentes, click-outside y animaciones de entrada/salida.

### Importación

```ts
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem value="getting-started">
        <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
        <NavigationMenuContent class="w-[400px]">
          <NavigationMenuLink href="/docs/intro">
            <div class="text-sm font-medium">Introducción</div>
            <p class="text-sm text-muted-foreground">Componentes Vue 3.</p>
          </NavigationMenuLink>
          <NavigationMenuLink href="/docs/install">
            <div class="text-sm font-medium">Instalación</div>
            <p class="text-sm text-muted-foreground">Cómo configurar tu proyecto.</p>
          </NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>

      <!-- Link directo (sin trigger/content) -->
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/docs"
          class="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium"
        >
          Documentación
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>

    <NavigationMenuViewport />
  </NavigationMenu>
</template>
```

### Con Grid de componentes

Combina múltiples triggers con layouts de grid para paneles ricos:

```vue
<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem value="components">
        <NavigationMenuTrigger>Components</NavigationMenuTrigger>
        <NavigationMenuContent class="w-[500px]">
          <ul class="grid gap-3 md:grid-cols-2">
            <li v-for="comp in components" :key="comp.title">
              <NavigationMenuLink :href="comp.href">
                <div class="text-sm font-medium">{{ comp.title }}</div>
                <p class="text-sm text-muted-foreground">{{ comp.description }}</p>
              </NavigationMenuLink>
            </li>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
    <NavigationMenuViewport />
  </NavigationMenu>
</template>
```

### Componentes

| Componente                | Elemento    | Props           | Descripción                                              |
| ------------------------- | ----------- | --------------- | -------------------------------------------------------- |
| `NavigationMenu`          | `<nav>`     | `class`         | Root provider. Gestiona estado activo, hover delays y click-outside |
| `NavigationMenuList`      | `<ul>`      | `class`         | Contenedor flex para los ítems del menú                  |
| `NavigationMenuItem`      | `<li>`      | `value`, `class` | Envuelve un trigger+content. `value` identifica el ítem |
| `NavigationMenuTrigger`   | `<button>`  | `class`         | Botón con chevron que abre el panel al hover o click     |
| `NavigationMenuContent`   | `<div>`     | `class`         | Panel desplegable con animación. Se teleporta al viewport|
| `NavigationMenuLink`      | `<a>`       | `as`, `active`, `class` | Link estilizado. Cierra el menú al hacer click   |
| `NavigationMenuViewport`  | `<div>`     | `class`         | Contenedor posicionado donde se renderizan los paneles   |

### Props detalladas — NavigationMenuItem

| Prop    | Tipo     | Default       | Descripción                                    |
| ------- | -------- | ------------- | ---------------------------------------------- |
| `value` | `string` | auto-generado | Identificador único del ítem en el menú        |

### Props detalladas — NavigationMenuLink

| Prop     | Tipo                   | Default | Descripción                              |
| -------- | ---------------------- | ------- | ---------------------------------------- |
| `as`     | `string \| Component` | `'a'`   | Elemento o componente a renderizar       |
| `active` | `boolean`              | `false` | Marca el link como activo (resaltado)    |

### Interacción y teclado

| Acción         | Comportamiento                                              |
| -------------- | ----------------------------------------------------------- |
| Hover trigger  | Abre el panel tras 200ms. Sin delay si ya hay otro abierto  |
| Hover content  | Mantiene el panel abierto. Cierra 300ms después de salir    |
| Click trigger  | Abre/cierra el panel inmediatamente                         |
| Click outside  | Cierra cualquier panel abierto                              |
| Enter / Space  | Abre/cierra el panel del trigger enfocado                   |
| Arrow Down     | Abre el panel del trigger enfocado                          |
| Escape         | Cierra el panel abierto desde cualquier parte del menú      |

### Accesibilidad

- `<nav>` con `aria-label="Main"`.
- Triggers con `aria-expanded` y `data-state` dinámicos.
- Chevron decorativo con `aria-hidden="true"`.
- Focus ring visible en triggers: `ring-[3.2px] ring-ring`.
- Escape cierra el menú desde cualquier punto (trigger o content).
- Links cierran el menú automáticamente al hacer click.

---

## Menubar

Barra de menú estilo aplicación desktop con sub-componentes compound. Soporte completo de teclado (navegación entre menús con flechas), checkboxes, radio groups, sub-menús anidados y atajos de teclado. Sigue el patrón WAI-ARIA menubar.

### Importación

```ts
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Menubar>
    <MenubarMenu value="file">
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem @select="onNewTab">
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem @select="onNewWindow">
          New Window <MenubarShortcut>⌘N</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>New Incognito Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem @select="onPrint">
          Print… <MenubarShortcut>⌘P</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu value="edit">
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Undo <MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
        <MenubarItem>Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

### Con sub-menús, checkboxes y radio groups

```vue
<script setup lang="ts">
import { ref } from 'vue';
const showBookmarks = ref(true);
const showFullUrls = ref(false);
const selectedProfile = ref('benoit');
</script>

<template>
  <Menubar>
    <!-- Menú con sub-menú anidado -->
    <MenubarMenu value="file">
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>New Tab <MenubarShortcut>⌘T</MenubarShortcut></MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Share</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Email Link</MenubarItem>
            <MenubarItem>Messages</MenubarItem>
            <MenubarItem>Notes</MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarSeparator />
        <MenubarItem>Print… <MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <!-- Menú con checkbox items -->
    <MenubarMenu value="view">
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem v-model:checked="showBookmarks">
          Always Show Bookmarks Bar
        </MenubarCheckboxItem>
        <MenubarCheckboxItem v-model:checked="showFullUrls">
          Always Show Full URLs
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarItem inset>Reload <MenubarShortcut>⌘R</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <!-- Menú con radio group -->
    <MenubarMenu value="profiles">
      <MenubarTrigger>Profiles</MenubarTrigger>
      <MenubarContent>
        <MenubarRadioGroup v-model="selectedProfile">
          <MenubarLabel inset>People</MenubarLabel>
          <MenubarSeparator />
          <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
          <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
          <MenubarRadioItem value="luis">Luis</MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset>Edit… <MenubarShortcut>⌘E</MenubarShortcut></MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

### Componentes

| Componente             | Elemento   | Props                           | Descripción                                          |
| ---------------------- | ---------- | ------------------------------- | ---------------------------------------------------- |
| `Menubar`              | `<div>`    | `class`                         | Root wrapper. role="menubar", gestiona menú activo     |
| `MenubarMenu`          | `<div>`    | `value`, `class`                | Envuelve trigger + content. Registra menú con el root |
| `MenubarTrigger`       | `<button>` | `class`                         | Botón en la barra. Hover switching inteligente        |
| `MenubarContent`       | `<div>`    | `align`, `side`, `sideOffset`   | Panel flotante (Teleport + fixed positioning)         |
| `MenubarItem`          | `<div>`    | `disabled`, `inset`, `class`    | Ítem clickeable. Emite `select`                       |
| `MenubarCheckboxItem`  | `<div>`    | `checked`, `disabled`, `class`  | Ítem toggle con icono check. `v-model:checked`        |
| `MenubarRadioGroup`    | `<div>`    | `modelValue`, `class`           | Grupo radio. `v-model` para selección                 |
| `MenubarRadioItem`     | `<div>`    | `value`, `disabled`, `class`    | Opción radio con indicador circular                   |
| `MenubarSub`           | `<div>`    | —                               | Wrapper para sub-menú anidado                         |
| `MenubarSubTrigger`    | `<div>`    | `disabled`, `inset`, `class`    | Abre sub-menú al hover o ➡️. Muestra chevron          |
| `MenubarSubContent`    | `<div>`    | `sideOffset`, `class`           | Panel del sub-menú (posición lateral)                 |
| `MenubarSeparator`     | `<div>`    | `class`                         | Línea divisoria horizontal                            |
| `MenubarLabel`         | `<div>`    | `inset`, `class`                | Encabezado de sección (no interactivo)                |
| `MenubarShortcut`      | `<span>`   | `class`                         | Texto de atajo alineado a la derecha                  |

### Props detalladas — MenubarContent

| Prop              | Tipo                       | Default    | Descripción                                |
| ----------------- | -------------------------- | ---------- | ------------------------------------------ |
| `align`           | `'start' \| 'center' \| 'end'` | `'start'`  | Alineación horizontal respecto al trigger   |
| `side`            | `'top' \| 'bottom'`        | `'bottom'` | Lado preferido (auto-flip si no hay espacio)|
| `sideOffset`      | `number`                   | `4`        | Gap en px entre trigger y content           |
| `viewportPadding` | `number`                   | `8`        | Distancia mínima del borde del viewport     |

### Interacción y teclado

| Acción                | Comportamiento                                                 |
| --------------------- | -------------------------------------------------------------- |
| Click trigger         | Abre/cierra el menú correspondiente                            |
| Hover trigger (abierto)| Si otro menú está abierto, cambia al menú hover              |
| Arrow Down / Up       | Navega entre los ítems del menú actual                         |
| Arrow Right           | Si el ítem es sub-trigger: abre sub-menú. Si no: siguiente menú|
| Arrow Left            | Si en sub-menú: cierra sub. Si no: menú anterior               |
| Enter / Space         | Activa el ítem enfocado (o abre sub-menú)                      |
| Escape                | Cierra el menú (o sub-menú si está abierto)                    |
| Home / End            | Salta al primer/último ítem habilitado                         |
| Click outside         | Cierra todos los menús                                         |

### Accesibilidad

- Root con `role="menubar"`.
- Triggers con `role="menuitem"`, `aria-expanded`, `aria-haspopup="menu"`, `data-state`.
- Content con `role="menu"`, `aria-labelledby` apuntando al trigger.
- Ítems con `role="menuitem"`, `aria-disabled` cuando deshabilitados.
- Checkbox items con `role="menuitemcheckbox"`, `aria-checked`.
- Radio items con `role="menuitemradio"`, `aria-checked`.
- Sub-triggers con `aria-haspopup="menu"`, `aria-expanded`.
- Navegación completa por teclado sin necesidad de mouse.
- Focus ring visible en triggers.

---

## Kbd

Componente semántico `<kbd>` para representar teclas y atajos de teclado. Estilo de tecla física con bordes, sombra de profundidad, fuente monoespaciada y colores muted para integración sutil. Soporta variantes de tamaño y override completo de clases.

### Importación

```ts
import { Kbd, kbdVariants } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <p>
    Presiona <Kbd>⌘</Kbd> + <Kbd>K</Kbd> para buscar.
  </p>
</template>
```

### Combinación de teclas compleja

```vue
<template>
  <div class="flex items-center gap-1.5">
    <Kbd>⌘</Kbd>
    <span class="text-muted-foreground text-sm">+</span>
    <Kbd>⇧</Kbd>
    <span class="text-muted-foreground text-sm">+</span>
    <Kbd>P</Kbd>
    <span class="text-muted-foreground ml-3 text-sm">Paleta de comandos</span>
  </div>
</template>
```

### Tamaños

```vue
<template>
  <Kbd size="xs">⌘</Kbd>
  <Kbd size="sm">⌘</Kbd>
  <Kbd>⌘</Kbd>          <!-- default -->
  <Kbd size="lg">⌘</Kbd>
</template>
```

### Props

| Prop   | Tipo                                     | Default     | Descripción          |
| ------ | ---------------------------------------- | ----------- | -------------------- |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg'` | `'default'` | Tamaño de la tecla   |

### Variantes CVA

`kbdVariants()` permite usar el estilo de tecla sin el componente Vue:

```vue
<span :class="kbdVariants({ size: 'sm' })">⌘</span>
```

### Estilo

El componente usa:
- Etiqueta semántica `<kbd>` para accesibilidad.
- `font-mono` para fuente monoespaciada.
- `bg-muted text-muted-foreground` para integración con el tema.
- `shadow-[0_2px_0_0] shadow-border` para efecto de profundidad tipo tecla física.
- `border border-border` para contorno definido.
- `select-none` para evitar selección accidental.

---

## Item

Componente genérico de fila reutilizable para listas, menús de configuración o elementos de navegación. Layout flexible con Flexbox que soporta contenido al inicio (iconos), contenido principal (label + descripción) y contenido al final (chevron, switch, badge). Polimórfico: renderiza como `<div>`, `<button>`, `<a>` o cualquier componente.

### Importación

```ts
import { Item, ItemLabel, ItemDescription, itemVariants } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Item as="button" @click="onAction">
    <ItemLabel>Profile</ItemLabel>
    <ItemDescription>Manage your account settings</ItemDescription>
  </Item>
</template>
```

### Con icono y chevron (navegación)

```vue
<template>
  <Item as="button" @click="goToProfile">
    <template #start>
      <UserIcon class="h-5 w-5" />
    </template>
    <ItemLabel>Profile</ItemLabel>
    <ItemDescription>Manage your account settings</ItemDescription>
    <template #end>
      <ChevronRightIcon class="h-4 w-4 text-muted-foreground" />
    </template>
  </Item>
</template>
```

### Settings con Switch

```vue
<script setup lang="ts">
import { ref } from 'vue';
const wifiEnabled = ref(true);
</script>

<template>
  <Item>
    <template #start>
      <WifiIcon class="h-5 w-5" />
    </template>
    <ItemLabel>Wi-Fi</ItemLabel>
    <ItemDescription>{{ wifiEnabled ? 'Connected' : 'Off' }}</ItemDescription>
    <template #end>
      <Switch v-model="wifiEnabled" />
    </template>
  </Item>
</template>
```

### Como enlace

```vue
<template>
  <Item as="a" href="https://vuejs.org" target="_blank">
    <template #start>
      <ExternalLinkIcon class="h-5 w-5" />
    </template>
    <ItemLabel>Vue.js Documentation</ItemLabel>
    <ItemDescription>vuejs.org — opens in new tab</ItemDescription>
  </Item>
</template>
```

### Con RouterLink

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <Item :as="RouterLink" to="/settings">
    <ItemLabel>Settings</ItemLabel>
  </Item>
</template>
```

### Componentes

| Componente        | Elemento          | Props                                    | Descripción                                   |
| ----------------- | ----------------- | ---------------------------------------- | --------------------------------------------- |
| `Item`            | polimórfico       | `as`, `variant`, `size`, `disabled`      | Contenedor flex con slots start/default/end   |
| `ItemLabel`       | `<span>`          | `class`                                  | Texto principal truncado con `font-medium`    |
| `ItemDescription` | `<span>`          | `class`                                  | Texto secundario `text-muted-foreground text-xs` |

### Props — Item

| Prop       | Tipo                                             | Default     | Descripción                                |
| ---------- | ------------------------------------------------ | ----------- | ------------------------------------------ |
| `as`       | `string \| Component`                           | `'div'`     | Elemento o componente a renderizar         |
| `variant`  | `'default' \| 'ghost' \| 'muted' \| 'destructive'` | `'default'` | Variante visual                            |
| `size`     | `'sm' \| 'default' \| 'lg'`                    | `'default'` | Tamaño (afecta padding, gap, font-size)    |
| `disabled` | `boolean`                                        | `false`     | Deshabilitado (opacity + pointer-events)   |

### Slots — Item

| Slot      | Descripción                                       |
| --------- | ------------------------------------------------- |
| `start`   | Contenido al inicio (icono, avatar)               |
| `default` | Contenido principal (ItemLabel + ItemDescription)  |
| `end`     | Contenido al final (chevron, switch, badge)        |

### Variantes CVA

`itemVariants()` permite usar el estilo sin el componente Vue:

```vue
<div :class="itemVariants({ variant: 'muted', size: 'lg' })">
  Custom item
</div>
```

### Accesibilidad

- Cuando `as="button"`, aplica `disabled` nativo.
- `aria-disabled` se añade automáticamente cuando `disabled=true`.
- `focus-visible` con estilos `bg-accent` para navegación por teclado.
- `cursor-pointer` automático cuando se renderiza como `<button>` o `<a>`.

---

## Input OTP

Componente de entrada OTP (One-Time Password) para códigos de verificación y 2FA. Implementación pura Vue sin dependencias externas, con soporte completo de navegación por teclado, pegado (paste), validación por patrón y auto-submit.

### Importación

```ts
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@3df/ui';
```

### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';
const otp = ref('');
</script>

<template>
  <InputOTP v-model="otp" :length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Con separador

```vue
<template>
  <InputOTP v-model="otp" :length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot :index="3" />
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Separador personalizado

```vue
<template>
  <InputOTP v-model="otp" :length="6">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
    </InputOTPGroup>
    <InputOTPSeparator>
      <span class="px-1">-</span>
    </InputOTPSeparator>
    <InputOTPGroup>
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
    </InputOTPGroup>
    <InputOTPSeparator>
      <span class="px-1">-</span>
    </InputOTPSeparator>
    <InputOTPGroup>
      <InputOTPSlot :index="4" />
      <InputOTPSlot :index="5" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Patrón alfanumérico

```vue
<template>
  <InputOTP v-model="code" :length="4" pattern="alphanumeric">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Auto-submit

```vue
<script setup lang="ts">
import { ref } from 'vue';
const code = ref('');

function onComplete(value: string) {
  console.log('Código completo:', value);
}
</script>

<template>
  <InputOTP v-model="code" :length="4" auto-submit @complete="onComplete">
    <InputOTPGroup>
      <InputOTPSlot :index="0" />
      <InputOTPSlot :index="1" />
      <InputOTPSlot :index="2" />
      <InputOTPSlot :index="3" />
    </InputOTPGroup>
  </InputOTP>
</template>
```

### Componentes

| Componente          | Elemento | Descripción                                                |
| ------------------- | -------- | ---------------------------------------------------------- |
| `InputOTP`          | `<div>`  | Contenedor raíz — provide del contexto OTP                 |
| `InputOTPGroup`     | `<div>`  | Agrupación visual de slots (flex sin gap)                  |
| `InputOTPSlot`      | `<div>`  | Slot individual con input oculto, caret falso y estilos    |
| `InputOTPSeparator` | `<div>`  | Separador visual entre grupos (dot SVG por defecto)        |

### Props — InputOTP

| Prop         | Tipo                                    | Default     | Descripción                                       |
| ------------ | --------------------------------------- | ----------- | ------------------------------------------------- |
| `modelValue` | `string`                                | `''`        | Valor del OTP (v-model)                           |
| `length`     | `number`                                | `6`         | Número de dígitos/caracteres                      |
| `disabled`   | `boolean`                               | `false`     | Deshabilita todos los slots                       |
| `pattern`    | `'numeric' \| 'alphanumeric' \| 'alpha' \| RegExp` | `'numeric'` | Patrón de validación por carácter    |
| `autoSubmit` | `boolean`                               | `false`     | Emite `complete` al llenar todos los slots        |

### Props — InputOTPSlot

| Prop    | Tipo     | Requerido | Descripción                       |
| ------- | -------- | --------- | --------------------------------- |
| `index` | `number` | Sí        | Índice del slot (base 0)          |

### Eventos — InputOTP

| Evento              | Payload  | Descripción                                    |
| ------------------- | -------- | ---------------------------------------------- |
| `update:modelValue` | `string` | Se emite cuando cambia el valor                |
| `complete`          | `string` | Se emite cuando todos los slots están llenos   |

### Navegación por teclado

| Tecla        | Acción                                |
| ------------ | ------------------------------------- |
| `←` / `→`    | Mover foco entre slots                |
| `Backspace`  | Borrar actual, retroceder si vacío    |
| `Delete`     | Borrar slot actual                    |
| `Home`       | Ir al primer slot                     |
| `End`        | Ir al último slot                     |
| `Ctrl+V`     | Pegar código desde portapapeles       |

### Patrones disponibles

| Nombre          | RegExp        | Descripción              |
| --------------- | ------------- | ------------------------ |
| `numeric`       | `/^[0-9]$/`   | Solo dígitos             |
| `alphanumeric`  | `/^[a-zA-Z0-9]$/` | Letras y números    |
| `alpha`         | `/^[a-zA-Z]$/` | Solo letras             |

> También acepta un `RegExp` personalizado para validación de caracter individual.

### Accesibilidad

- `role="group"` en el contenedor raíz con `aria-label="One-time password"`.
- Cada slot tiene `aria-label="Digit N"` para lectores de pantalla.
- `autocomplete="one-time-code"` y `inputmode="numeric"` para teclados móviles.
- Caret falso animado cuando el slot tiene foco sin valor.
- `focus-visible` con ring para navegación por teclado.

---

## Hover Card

Componente de tarjeta flotante que aparece al pasar el cursor sobre un trigger. Ideal para vistas previas de perfiles de usuario, descripciones de enlaces o cualquier contenido enriquecido. Implementación pura Vue con posicionamiento automático, auto-flip, delays configurables y animaciones suaves de fade-in + zoom-in.

### Importación

```ts
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@3df/ui';
```

### Uso básico — perfil de usuario

```vue
<script setup lang="ts">
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@3df/ui';
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>
      <a href="https://github.com/vuejs" class="text-sm font-medium underline">
        @vuejs
      </a>
    </HoverCardTrigger>
    <HoverCardContent>
      <div class="flex justify-between space-x-4">
        <div class="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
          V
        </div>
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">@vuejs</h4>
          <p class="text-sm text-muted-foreground">
            The Progressive JavaScript Framework.
          </p>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>
```

### Alineación y posición

```vue
<!-- Alinear al inicio -->
<HoverCardContent align="start">…</HoverCardContent>

<!-- Alinear al final -->
<HoverCardContent align="end">…</HoverCardContent>

<!-- Posición superior -->
<HoverCardContent side="top">…</HoverCardContent>

<!-- Posición lateral -->
<HoverCardContent side="right" :side-offset="12">…</HoverCardContent>
```

### Delays personalizados

```vue
<!-- Respuesta rápida -->
<HoverCard :open-delay="200" :close-delay="100">
  <HoverCardTrigger>…</HoverCardTrigger>
  <HoverCardContent>…</HoverCardContent>
</HoverCard>
```

### Componentes

| Componente          | Elemento | Descripción                                             |
| ------------------- | -------- | ------------------------------------------------------- |
| `HoverCard`         | `<div>`  | Contenedor raíz — provide del contexto, gestión de delays |
| `HoverCardTrigger`  | `<div>`  | Zona de activación (hover + focus)                      |
| `HoverCardContent`  | `<div>`  | Panel flotante con posicionamiento automático (Teleport) |

### Props — HoverCard

| Prop         | Tipo     | Default | Descripción                                    |
| ------------ | -------- | ------- | ---------------------------------------------- |
| `openDelay`  | `number` | `700`   | Delay en ms antes de abrir                     |
| `closeDelay` | `number` | `300`   | Delay en ms antes de cerrar                    |

### Props — HoverCardContent

| Prop              | Tipo                                      | Default    | Descripción                              |
| ----------------- | ----------------------------------------- | ---------- | ---------------------------------------- |
| `align`           | `'start' \| 'center' \| 'end'`           | `'center'` | Alineación respecto al trigger           |
| `side`            | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Lado preferido de aparición              |
| `sideOffset`      | `number`                                  | `8`        | Separación en px del trigger             |
| `viewportPadding` | `number`                                  | `8`        | Margen mínimo respecto al viewport       |

### Características

- **Posicionamiento inteligente**: auto-flip cuando no hay espacio en el lado preferido.
- **Viewport clamping**: nunca se sale de la pantalla.
- **Animación suave**: fade-in + scale + translate-y en entrada, reversa en salida.
- **Anti-flickering**: `openDelay=700ms` previene aperturas accidentales; `closeDelay=300ms` permite mover el cursor al contenido.
- **Hover persistente**: el card permanece abierto mientras el cursor esté encima.

### Accesibilidad

- `role="tooltip"` en el contenido con `id` único vinculado.
- Se cierra automáticamente en scroll para evitar contenido desplazado.
- Soporta activación por `focusin`/`focusout` para navegación por teclado.

---

## Empty State

Componente reutilizable para estados vacíos. Layout centrado vertical y horizontalmente con slots para icono, título, descripción y acciones (botones). Ideal para "sin resultados", "carrito vacío", "sin datos", etc.

### Importación

```ts
import { EmptyState } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <EmptyState
    title="No se encontraron resultados"
    description="Intenta ajustar los filtros o crea un nuevo elemento."
  >
    <template #icon>
      <SearchIcon class="size-12" />
    </template>
    <Button variant="outline" size="sm">Limpiar filtros</Button>
    <Button size="sm">Crear nuevo</Button>
  </EmptyState>
</template>
```

### Props — EmptyState

| Prop          | Tipo     | Default     | Descripción                      |
| ------------- | -------- | ----------- | -------------------------------- |
| `title`       | `string` | `undefined` | Texto del encabezado             |
| `description` | `string` | `undefined` | Texto descriptivo (muted)        |

### Slots — EmptyState

| Slot          | Descripción                                          |
| ------------- | ---------------------------------------------------- |
| `icon`        | Icono grande centrado (se aplica `size-12` al SVG)   |
| `title`       | Contenido personalizado del título                   |
| `description` | Contenido personalizado de la descripción            |
| `default`     | Acciones (botones) renderizados debajo               |

---

## Drawer

Componente bottom-sheet arrastrable para acciones contextuales, especialmente útil como alternativa móvil a Dialogs. Implementación pura Vue con gestos de pointer (drag-to-close), snap threshold configurable, overlay, focus trap y animaciones suaves.

### Importación

```ts
import {
  Drawer, DrawerTrigger, DrawerContent,
  DrawerHeader, DrawerFooter,
  DrawerTitle, DrawerDescription,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Drawer>
    <DrawerTrigger>
      <Button variant="outline">Abrir Drawer</Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Editar perfil</DrawerTitle>
        <DrawerDescription>Realiza cambios en tu perfil.</DrawerDescription>
      </DrawerHeader>
      <div class="p-4">Contenido del drawer</div>
      <DrawerFooter>
        <Button>Guardar cambios</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```

### Controlado (v-model)

```vue
<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <Button @click="open = true">Abrir</Button>
  <Drawer v-model:open="open">
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Controlado</DrawerTitle>
      </DrawerHeader>
    </DrawerContent>
  </Drawer>
</template>
```

### Componentes

| Componente          | Elemento | Descripción                                              |
| ------------------- | -------- | -------------------------------------------------------- |
| `Drawer`            | slot     | Provider de estado (v-model:open, Escape)                |
| `DrawerTrigger`     | `<div>`  | Abre/cierra el drawer                                    |
| `DrawerContent`     | `<div>`  | Panel inferior (Teleport, drag, overlay, focus trap)     |
| `DrawerHeader`      | `<div>`  | Zona de título/descripción (`grid gap-1.5 p-4`)          |
| `DrawerFooter`      | `<div>`  | Zona de acciones (`mt-auto flex flex-col gap-2`)         |
| `DrawerTitle`       | `<h2>`   | Título accesible (aria-labelledby)                       |
| `DrawerDescription` | `<p>`    | Descripción accesible (aria-describedby)                 |

### Props — DrawerContent

| Prop                 | Tipo      | Default | Descripción                                  |
| -------------------- | --------- | ------- | -------------------------------------------- |
| `showClose`          | `boolean` | `true`  | Mostrar botón de cierre (×)                  |
| `dragCloseThreshold` | `number`  | `0.4`   | Porcentaje de drag necesario para cerrar (0-1) |

### Accesibilidad

- `role="dialog"` con `aria-modal="true"`.
- `aria-labelledby` / `aria-describedby` vinculados automáticamente.
- Focus trap con Tab/Shift+Tab.
- Cierre con Escape.
- Drag handle visible con `cursor-grab` / `cursor-grabbing`.
- Restaura el foco al trigger al cerrar.

---

## Dialog

Componente modal centrado con overlay con blur de fondo. Implementación pura Vue con focus trap, cierre por Escape y overlay click, animaciones scale+fade, y sub-componentes composables.

### Importación

```ts
import {
  Dialog, DialogTrigger, DialogContent,
  DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, DialogClose,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="outline">Editar perfil</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar perfil</DialogTitle>
        <DialogDescription>Realiza cambios en tu perfil aquí.</DialogDescription>
      </DialogHeader>
      <div class="py-4">Contenido del dialog</div>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button>Guardar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Confirmación destructiva

```vue
<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="destructive">Eliminar</Button>
    </DialogTrigger>
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>¿Estás seguro?</DialogTitle>
        <DialogDescription>
          Esta acción no se puede deshacer.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose><Button variant="outline">Cancelar</Button></DialogClose>
        <Button variant="destructive">Eliminar</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

### Componentes

| Componente          | Elemento | Descripción                                           |
| ------------------- | -------- | ----------------------------------------------------- |
| `Dialog`            | slot     | Provider de estado (v-model:open, Escape)             |
| `DialogTrigger`     | `<div>`  | Abre/cierra el dialog                                 |
| `DialogContent`     | `<div>`  | Panel centrado (Teleport, overlay blur, focus trap)   |
| `DialogHeader`      | `<div>`  | Zona de título/descripción                            |
| `DialogFooter`      | `<div>`  | Zona de acciones (responsive: col en mobile, row en desktop) |
| `DialogTitle`       | `<h2>`   | Título accesible (aria-labelledby)                    |
| `DialogDescription` | `<p>`    | Descripción accesible (aria-describedby)              |
| `DialogClose`       | `<div>`  | Cierra el dialog al hacer click en su contenido       |

### Props — DialogContent

| Prop             | Tipo      | Default | Descripción                                |
| ---------------- | --------- | ------- | ------------------------------------------ |
| `showClose`      | `boolean` | `true`  | Mostrar botón de cierre (×)                |
| `closeOnOverlay` | `boolean` | `true`  | Cerrar al hacer click en el overlay        |

### Accesibilidad

- `role="dialog"` con `aria-modal="true"`.
- Overlay con `backdrop-blur-sm` para separación visual.
- Focus trap completo con Tab/Shift+Tab.
- Cierre con Escape (capture phase, `stopPropagation`).
- `aria-labelledby` / `aria-describedby` vinculados automáticamente.
- Restaura el foco al trigger al cerrar.
- Animación `scale-95 opacity-0` → `scale-100 opacity-100`.

---

## Calendar

Componente de calendario puro Vue para selección de fechas (modo simple o rango). Usa `date-fns` para manipulación de fechas. Soporta navegación por mes, días de semanas configurables, fechas deshabilitadas y localización.

### Importación

```ts
import { Calendar } from '@3df/ui';
import type { DateRange, CalendarMode } from '@3df/ui';
```

### Uso básico — Fecha simple

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Calendar } from '@3df/ui';

const date = ref<Date>();
</script>

<template>
  <Calendar v-model="date" />
</template>
```

### Uso — Rango de fechas

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Calendar } from '@3df/ui';
import type { DateRange } from '@3df/ui';

const range = ref<DateRange>();
</script>

<template>
  <Calendar v-model="range" mode="range" :number-of-months="2" />
</template>
```

### Props — Calendar

| Prop              | Tipo                           | Default      | Descripción                                    |
| ----------------- | ------------------------------ | ------------ | ---------------------------------------------- |
| `mode`            | `'single' \| 'range'`         | `'single'`   | Modo de selección                              |
| `modelValue`      | `Date \| DateRange`           | `undefined`  | Valor seleccionado (v-model)                   |
| `defaultMonth`    | `Date`                         | `new Date()` | Mes inicial a mostrar                          |
| `numberOfMonths`  | `number`                       | `1`          | Cantidad de meses visibles                     |
| `weekStartsOn`    | `0-6`                          | `1` (Lunes)  | Día de inicio de semana                        |
| `showOutsideDays` | `boolean`                      | `true`       | Mostrar días de meses adyacentes               |
| `fixedWeeks`      | `boolean`                      | `true`       | Siempre mostrar 6 filas (42 días)              |
| `disabled`        | `(date: Date) => boolean`      | `undefined`  | Función para deshabilitar fechas               |
| `locale`          | `Locale`                       | `undefined`  | Locale de date-fns para internacionalización   |

### Accesibilidad

- Botones de día con `aria-selected` para la fecha seleccionada.
- `data-today` en el día actual.
- `data-outside` en días fuera del mes actual.
- Botones de navegación con `aria-label` descriptivo.
- Días deshabilitados con `disabled` nativo.

---

## DatePicker

Componente de selección de fecha que compone Calendar + Popover. Incluye un trigger tipo input con icono de calendario y formato automático con `date-fns`. Disponible en variantes de fecha simple y rango.

### Importación

```ts
import { DatePicker, DateRangePicker } from '@3df/ui';
import type { DateRange } from '@3df/ui';
```

### Uso — Fecha simple

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@3df/ui';

const date = ref<Date>();
</script>

<template>
  <DatePicker v-model="date" placeholder="Pick a date" />
</template>
```

### Uso — Rango de fechas

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DateRangePicker } from '@3df/ui';
import type { DateRange } from '@3df/ui';

const range = ref<DateRange>();
</script>

<template>
  <DateRangePicker v-model="range" :number-of-months="2" />
</template>
```

### Uso — Con locale español

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { DatePicker } from '@3df/ui';
import { es } from 'date-fns/locale';

const date = ref<Date>();
</script>

<template>
  <DatePicker v-model="date" :locale="es" placeholder="Selecciona fecha" />
</template>
```

### Componentes

| Componente        | Descripción                                              |
| ----------------- | -------------------------------------------------------- |
| `DatePicker`      | Selector de fecha simple (Calendar + Popover)            |
| `DateRangePicker` | Selector de rango de fechas (Calendar range + Popover)   |

### Props — DatePicker

| Prop           | Tipo                      | Default        | Descripción                              |
| -------------- | ------------------------- | -------------- | ---------------------------------------- |
| `modelValue`   | `Date`                    | `undefined`    | Fecha seleccionada (v-model)             |
| `placeholder`  | `string`                  | `'Pick a date'`| Texto cuando no hay selección            |
| `formatStr`    | `string`                  | `'PPP'`        | Formato de date-fns para mostrar         |
| `locale`       | `Locale`                  | `undefined`    | Locale de date-fns                       |
| `disabled`     | `(date: Date) => boolean` | `undefined`    | Función para deshabilitar fechas         |
| `weekStartsOn` | `0-6`                     | `1`            | Día de inicio de semana                  |

### Props — DateRangePicker

| Prop             | Tipo                      | Default              | Descripción                          |
| ---------------- | ------------------------- | -------------------- | ------------------------------------ |
| `modelValue`     | `DateRange`               | `undefined`          | Rango seleccionado (v-model)         |
| `placeholder`    | `string`                  | `'Pick a date range'`| Texto placeholder                    |
| `formatStr`      | `string`                  | `'PP'`               | Formato de date-fns                  |
| `locale`         | `Locale`                  | `undefined`          | Locale de date-fns                   |
| `disabled`       | `(date: Date) => boolean` | `undefined`          | Función para deshabilitar fechas     |
| `weekStartsOn`   | `0-6`                     | `1`                  | Día de inicio de semana              |
| `numberOfMonths` | `number`                  | `2`                  | Meses visibles simultáneamente       |

### Dependencia

Requiere `date-fns` como peer dependency:

```bash
pnpm add date-fns
```

---

## Context Menu

Menú contextual activado por clic derecho. Implementación pura Vue con posicionamiento en coordenadas del cursor, navegación por teclado completa, sub-menús, checkbox items, radio items y atajos de teclado. Estilo consistente con Dropdown Menu y Menubar.

### Importación

```ts
import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuCheckboxItem,
  ContextMenuRadioGroup, ContextMenuRadioItem,
  ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed">
        Clic derecho aquí
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent class="w-64">
      <ContextMenuItem>Editar <ContextMenuShortcut>⌘E</ContextMenuShortcut></ContextMenuItem>
      <ContextMenuItem>Duplicar</ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem destructive>Eliminar <ContextMenuShortcut>⌘⌫</ContextMenuShortcut></ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

### Con sub-menú

```vue
<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="h-[150px] w-full border border-dashed rounded-md flex items-center justify-center">
        Clic derecho
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Copiar</ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>Compartir</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Email</ContextMenuItem>
          <ContextMenuItem>Mensaje</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

### Componentes

| Componente                   | Elemento | Descripción                                         |
| ---------------------------- | -------- | --------------------------------------------------- |
| `ContextMenu`                | slot     | Provider raíz (estado, keyboard nav, click outside) |
| `ContextMenuTrigger`         | `<div>`  | Zona de clic derecho (contextmenu event)            |
| `ContextMenuContent`         | `<div>`  | Panel flotante (Teleport, posición en cursor)       |
| `ContextMenuItem`            | `<div>`  | Opción clickeable (role="menuitem")                  |
| `ContextMenuCheckboxItem`    | `<div>`  | Opción tipo checkbox (v-model:checked)              |
| `ContextMenuRadioGroup`      | `<div>`  | Contenedor de grupo radio (v-model)                 |
| `ContextMenuRadioItem`       | `<div>`  | Opción radio (role="menuitemradio")                  |
| `ContextMenuLabel`           | `<div>`  | Encabezado de sección (no interactivo)              |
| `ContextMenuSeparator`       | `<div>`  | Dividor visual (role="separator")                    |
| `ContextMenuShortcut`        | `<span>` | Texto de atajo de teclado                           |
| `ContextMenuSub`             | `<div>`  | Wrapper de sub-menú                                 |
| `ContextMenuSubTrigger`      | `<div>`  | Trigger de sub-menú (hover/click/ArrowRight)        |
| `ContextMenuSubContent`      | `<div>`  | Panel de sub-menú (Teleport, posición lateral)      |

### Props — ContextMenuItem

| Prop          | Tipo      | Default | Descripción                    |
| ------------- | --------- | ------- | ------------------------------ |
| `disabled`    | `boolean` | `false` | Deshabilita la opción          |
| `destructive` | `boolean` | `false` | Estilo destructivo (rojo)      |
| `inset`       | `boolean` | `false` | Indentación izquierda (pl-8)   |

### Accesibilidad

- Solo se activa con clic derecho (secondary click / `contextmenu` event).
- `role="menu"` en el contenido, `role="menuitem"` / `menuitemcheckbox` / `menuitemradio` en ítems.
- Navegación completa con Arrow keys, Home/End, Enter/Space.
- `aria-checked` para checkbox y radio items.
- `aria-expanded` y `aria-haspopup="menu"` en sub-triggers.
- Cierre con Escape o Tab.
- `aria-disabled` en ítems deshabilitados.

---

## Command

Paleta de comandos estilo cmdk/Spotlight. Implementación pura Vue con filtrado por búsqueda, navegación por teclado completa (Arrow, Home/End, Enter), registro dinámico de items y soporte para keywords adicionales de búsqueda. Incluye versión Dialog con atajo global ⌘K/Ctrl+K.

### Importación

```ts
import {
  Command, CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
  CommandShortcut, CommandSeparator,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Command class="rounded-lg border shadow-md">
    <CommandInput placeholder="Escribe un comando..." />
    <CommandList>
      <CommandEmpty>No se encontraron resultados.</CommandEmpty>
      <CommandGroup heading="Sugerencias">
        <CommandItem value="Calendario">Calendario</CommandItem>
        <CommandItem value="Buscar emoji" :keywords="['emoticon']">Buscar emoji</CommandItem>
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Configuración">
        <CommandItem value="Perfil">
          Perfil
          <CommandShortcut>⌘P</CommandShortcut>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

### Command Dialog

```vue
<script setup lang="ts">
import { ref } from 'vue';
const open = ref(false);
</script>

<template>
  <button @click="open = true">Buscar...</button>
  <CommandDialog v-model:open="open">
    <CommandInput placeholder="Escribe un comando..." />
    <CommandList>
      <CommandEmpty>Sin resultados.</CommandEmpty>
      <CommandGroup heading="Acciones">
        <CommandItem value="Nuevo archivo">Nuevo archivo</CommandItem>
        <CommandItem value="Abrir proyecto">Abrir proyecto</CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>
```

### Componentes

| Componente         | Elemento  | Descripción                                          |
| ------------------ | --------- | ---------------------------------------------------- |
| `Command`          | `<div>`   | Provider raíz (filtrado, keyboard nav, registro)     |
| `CommandDialog`    | Dialog    | Wrapper modal (Dialog + Command, ⌘K/Ctrl+K)         |
| `CommandInput`     | `<input>` | Campo de búsqueda con icono lupa (autofocus)         |
| `CommandList`      | `<div>`   | Contenedor scrollable (role="listbox")               |
| `CommandEmpty`     | `<div>`   | Mensaje cuando no hay resultados visibles            |
| `CommandGroup`     | `<div>`   | Grupo con heading opcional (role="group")            |
| `CommandItem`      | `<div>`   | Ítem seleccionable (role="option", auto-hide)        |
| `CommandShortcut`  | `<span>`  | Texto de atajo de teclado (derecha, muted)           |
| `CommandSeparator` | `<div>`   | Divisor visual (role="separator")                    |

### Props — CommandItem

| Prop       | Tipo       | Default     | Descripción                          |
| ---------- | ---------- | ----------- | ------------------------------------ |
| `value`    | `string`   | (requerido) | Valor de identificación y filtrado   |
| `keywords` | `string[]` | `undefined` | Palabras extra para ampliar búsqueda |
| `disabled` | `boolean`  | `false`     | Deshabilita el ítem                  |

### Props — CommandDialog

| Prop          | Tipo      | Default | Descripción                      |
| ------------- | --------- | ------- | -------------------------------- |
| `open`        | `boolean` | `false` | Estado v-model del diálogo       |
| `defaultOpen` | `boolean` | `false` | Abierto por defecto (no control) |

### Accesibilidad

- `role="combobox"` en el input, `role="listbox"` en la lista.
- `role="option"` con `aria-selected` en cada ítem.
- Navegación: ↑/↓ (ciclo), Enter (seleccionar), Home/End.
- `aria-disabled` en ítems deshabilitados.
- Items se ocultan automáticamente cuando no coinciden con la búsqueda.

---

## Combobox

Select con búsqueda integrada. Patrón de composición que combina Popover + Command internamente. Muestra checkmark en la opción seleccionada y filtra en tiempo real.

### Importación

```ts
import { Combobox } from '@3df/ui';
```

### Uso básico

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Combobox } from '@3df/ui';

const selected = ref('');
const frameworks = [
  { value: 'next', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
];
</script>

<template>
  <Combobox
    v-model="selected"
    :options="frameworks"
    placeholder="Selecciona un framework..."
    search-placeholder="Buscar framework..."
    empty-message="No se encontró ningún framework."
  />
</template>
```

### Props

| Prop                | Tipo                                           | Default                | Descripción                      |
| ------------------- | ---------------------------------------------- | ---------------------- | -------------------------------- |
| `modelValue`        | `string`                                       | `''`                   | Valor seleccionado (v-model)     |
| `options`           | `{ value: string; label: string; disabled?: boolean }[]` | (requerido)  | Lista de opciones                |
| `placeholder`       | `string`                                       | `'Select option...'`   | Placeholder del trigger          |
| `searchPlaceholder` | `string`                                       | `'Search...'`          | Placeholder del input de búsqueda|
| `emptyMessage`      | `string`                                       | `'No results found.'`  | Mensaje cuando no hay resultados |

### Accesibilidad

- `role="combobox"` con `aria-expanded` en el trigger.
- Hereda toda la accesibilidad de Command (keyboard nav, roles).
- Toggle de selección: seleccionar de nuevo deselecciona.

---

## Collapsible

Secciones expandibles/contraíbles con animación de altura. Soporta modo controlado (`v-model:open`) y no controlado (`defaultOpen`). Animación CSS suave con `transition-[height]`.

### Importación

```ts
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Collapsible class="space-y-2">
    <div class="flex items-center justify-between">
      <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
      <CollapsibleTrigger>
        <Button variant="ghost" size="sm">Toggle</Button>
      </CollapsibleTrigger>
    </div>
    <div class="rounded-md border px-4 py-3 text-sm">@radix-ui/primitives</div>
    <CollapsibleContent class="space-y-2">
      <div class="rounded-md border px-4 py-3 text-sm">@radix-ui/colors</div>
      <div class="rounded-md border px-4 py-3 text-sm">@stitches/react</div>
    </CollapsibleContent>
  </Collapsible>
</template>
```

### Controlado con v-model

```vue
<script setup lang="ts">
import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <button @click="isOpen = !isOpen">{{ isOpen ? 'Close' : 'Open' }}</button>
  <Collapsible v-model:open="isOpen">
    <CollapsibleTrigger>
      <Button variant="ghost">Toggle</Button>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <p>Contenido controlado externamente.</p>
    </CollapsibleContent>
  </Collapsible>
</template>
```

### Componentes

| Componente            | Elemento   | Descripción                                    |
| --------------------- | ---------- | ---------------------------------------------- |
| `Collapsible`         | `<div>`    | Provider raíz (estado open, disabled)          |
| `CollapsibleTrigger`  | `<button>` | Botón toggle (aria-expanded)                   |
| `CollapsibleContent`  | `<div>`    | Contenido animado (height transition, role=region) |

### Props — Collapsible

| Prop          | Tipo      | Default | Descripción                        |
| ------------- | --------- | ------- | ---------------------------------- |
| `open`        | `boolean` | —       | Estado controlado (v-model:open)   |
| `defaultOpen` | `boolean` | `false` | Abierto por defecto (no controlado)|
| `disabled`    | `boolean` | `false` | Deshabilita la interacción         |

### Accesibilidad

- `aria-expanded` en el trigger refleja el estado.
- `aria-controls` en el trigger vinculado al `id` del contenido — permite que lectores de pantalla salten directamente al panel.
- `role="region"` en el contenido.
- `data-state="open"` / `data-state="closed"` para estilizado condicional.
- `data-disabled` y atributo `disabled` cuando está deshabilitado.
- Animación de altura con `transition-[height]` y `overflow: hidden` durante la transición.

---

## Carousel

Carousel/slider basado en [Embla Carousel](https://www.embla-carousel.com/) como motor subyacente. Soporta orientación horizontal y vertical, múltiples slides visibles (breakpoints responsive), loop infinito y control programático vía API.

### Importación

```ts
import {
  Carousel, CarouselContent, CarouselItem,
  CarouselPrevious, CarouselNext,
} from '@3df/ui';
```

### Uso básico (Image Slider)

```vue
<template>
  <Carousel class="w-full max-w-xs">
    <CarouselContent>
      <CarouselItem v-for="i in 5" :key="i">
        <Card>
          <CardContent class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">{{ i }}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

### Testimonial Carousel (múltiples slides)

```vue
<template>
  <Carousel :opts="{ align: 'start' }">
    <CarouselContent>
      <CarouselItem v-for="i in 8" :key="i" class="md:basis-1/2 lg:basis-1/3">
        <Card>
          <CardContent class="flex aspect-square items-center justify-center p-6">
            {{ i }}
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

### Orientación vertical

```vue
<Carousel orientation="vertical" :opts="{ align: 'start' }">
  <CarouselContent class="-mt-1 h-[200px]">
    <CarouselItem v-for="i in 5" :key="i" class="pt-1 md:basis-1/2">
      <!-- contenido -->
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

### Control programático (setApi)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { EmblaCarouselType } from 'embla-carousel';

const api = ref<EmblaCarouselType>();

function onSetApi(embla: EmblaCarouselType) {
  api.value = embla;
  embla.on('select', () => {
    console.log('Slide actual:', embla.selectedScrollSnap());
  });
}
</script>

<template>
  <Carousel @set-api="onSetApi" :opts="{ loop: true }">
    <!-- ... -->
  </Carousel>
  <button @click="api?.scrollTo(2)">Ir al slide 3</button>
</template>
```

### Componentes

| Componente         | Elemento   | Descripción                                       |
| ------------------ | ---------- | ------------------------------------------------- |
| `Carousel`         | `<div>`    | Provider raíz (Embla init, keyboard nav, API)     |
| `CarouselContent`  | `<div>`    | Contenedor flex de slides (overflow hidden)       |
| `CarouselItem`     | `<div>`    | Slide individual (role="group", aria-roledescription) |
| `CarouselPrevious` | `<button>` | Botón anterior (auto-disable, posición absoluta)  |
| `CarouselNext`     | `<button>` | Botón siguiente (auto-disable, posición absoluta) |

### Props — Carousel

| Prop          | Tipo                    | Default        | Descripción                             |
| ------------- | ----------------------- | -------------- | --------------------------------------- |
| `opts`        | `EmblaOptionsType`      | `undefined`    | Opciones de Embla (loop, align, etc.)   |
| `orientation` | `'horizontal'\|'vertical'` | `'horizontal'` | Dirección del scroll                 |

### Eventos

| Evento    | Payload              | Descripción                        |
| --------- | -------------------- | ---------------------------------- |
| `set-api` | `EmblaCarouselType`  | Emitido cuando la API está lista   |

### Accesibilidad

- `role="region"` con `aria-roledescription="carousel"` en el contenedor.
- `role="group"` con `aria-roledescription="slide"` en cada ítem.
- Navegación con Arrow keys (←/→ horizontal, ↑/↓ vertical).
- Botones prev/next con `aria-label` y auto-disable cuando no hay scroll.

---

## Breadcrumb

Navegación de ruta con semántica `<nav>` y `aria-label="breadcrumb"`. Soporta separadores personalizados (chevron, slash, iconos), ellipsis para rutas largas, y diferenciación visual entre links activos y la página actual.

### Importación

```ts
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage,
  BreadcrumbSeparator, BreadcrumbEllipsis,
} from '@3df/ui';
```

### Uso básico

```vue
<template>
  <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/componentes">Componentes</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
</template>
```

### Con ellipsis

```vue
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/config">Configuración</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Perfil</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Componentes

| Componente             | Elemento  | Descripción                                        |
| ---------------------- | --------- | -------------------------------------------------- |
| `Breadcrumb`           | `<nav>`   | Wrapper semántico (aria-label="breadcrumb")        |
| `BreadcrumbList`       | `<ol>`    | Lista ordenada con gap responsive                  |
| `BreadcrumbItem`       | `<li>`    | Ítem contenedor                                    |
| `BreadcrumbLink`       | `<a>`     | Link navegable (hover → foreground). Prop `as`     |
| `BreadcrumbPage`       | `<span>`  | Página actual (aria-current="page", color distinto)|
| `BreadcrumbSeparator`  | `<li>`    | Separador (chevron por defecto, slot para custom)  |
| `BreadcrumbEllipsis`   | `<span>`  | Indicador de rutas omitidas (· · ·)                |

### Props — BreadcrumbLink

| Prop   | Tipo     | Default     | Descripción                            |
| ------ | -------- | ----------- | -------------------------------------- |
| `href` | `string` | `undefined` | URL del enlace                         |
| `as`   | `string` | `undefined` | Renderizar como otro elemento/componente|

### Accesibilidad

- `<nav aria-label="breadcrumb">` para navegación semántica.
- `aria-current="page"` en `BreadcrumbPage` para la página actual.
- Separadores con `role="presentation"` y `aria-hidden="true"`.
- `BreadcrumbPage` usa `text-foreground` vs `text-muted-foreground` en los links.

---

## Avatar

Imagen de perfil circular con fallback automático a iniciales o icono cuando la imagen no carga. Detección inteligente de carga/error de imagen y soporte para múltiples tamaños.

### Importación

```ts
import { Avatar, AvatarImage, AvatarFallback } from '@3df/ui';
```

### Uso básico — User Profile

```vue
<template>
  <div class="flex items-center gap-4">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <p class="text-sm font-medium">shadcn</p>
      <p class="text-muted-foreground text-sm">m@example.com</p>
    </div>
  </div>
</template>
```

### Team Members (stacked)

```vue
<template>
  <div class="flex -space-x-3">
    <Avatar v-for="member in members" :key="member.name" class="border-2 border-background">
      <AvatarImage :src="member.src" :alt="member.name" />
      <AvatarFallback>{{ member.initials }}</AvatarFallback>
    </Avatar>
  </div>
</template>
```

### Fallback con icono

```vue
<Avatar size="lg">
  <AvatarFallback>
    <UserIcon class="h-6 w-6" />
  </AvatarFallback>
</Avatar>
```

### Componentes

| Componente       | Elemento  | Descripción                                        |
| ---------------- | --------- | -------------------------------------------------- |
| `Avatar`         | `<span>`  | Contenedor raíz circular con overflow hidden       |
| `AvatarImage`    | `<img>`   | Imagen con detección de carga/error                |
| `AvatarFallback` | `<span>`  | Contenido mostrado si la imagen no carga (bg-muted)|

### Props — Avatar

| Prop   | Tipo                                   | Default | Descripción      |
| ------ | -------------------------------------- | ------- | ---------------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Tamaño del avatar |

### Props — AvatarImage

| Prop  | Tipo     | Default     | Descripción          |
| ----- | -------- | ----------- | -------------------- |
| `src` | `string` | `undefined` | URL de la imagen     |
| `alt` | `string` | `undefined` | Texto alternativo    |

### Tamaños

| Size | Clases           |
| ---- | ---------------- |
| `xs` | `h-6 w-6 text-xs`  |
| `sm` | `h-8 w-8 text-xs`  |
| `md` | `h-10 w-10 text-sm`|
| `lg` | `h-12 w-12 text-base`|
| `xl` | `h-16 w-16 text-lg`|

### Accesibilidad

- La imagen incluye `alt` descriptivo.
- El fallback se muestra inmediatamente si `src` está vacío o la imagen falla.
- Usa `bg-muted` para distinguir visualmente el fallback del contenido.

---

## Alert Dialog

Modal de confirmación para acciones destructivas o irreversibles. A diferencia de Dialog, el Alert Dialog **no se cierra al hacer clic en el overlay** y **foca el botón "Cancelar" por defecto** para prevenir acciones accidentales. Usa `role="alertdialog"` para accesibilidad.

### Importación

```ts
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from '@3df/ui';
```

### Uso básico — Delete Confirmation

```vue
<template>
  <AlertDialog>
    <AlertDialogTrigger>
      <Button variant="destructive">Eliminar cuenta</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
        <AlertDialogDescription>
          Esta acción no se puede deshacer. Esto eliminará permanentemente
          tu cuenta y removerá todos tus datos de nuestros servidores.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Sí, eliminar</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

### Controlado (v-model)

```vue
<script setup>
const open = ref(false);
</script>

<template>
  <Button @click="open = true">Abrir</Button>
  <AlertDialog v-model:open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Sesión expirada</AlertDialogTitle>
        <AlertDialogDescription>
          Tu sesión ha expirado. Serás redirigido al login.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction>Iniciar sesión</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

### Componentes

| Componente                 | Elemento   | Descripción                                         |
| -------------------------- | ---------- | --------------------------------------------------- |
| `AlertDialog`              | renderless | Proveedor de estado (provide/inject)                |
| `AlertDialogTrigger`       | `<div>`    | Envuelve el elemento que abre el dialog             |
| `AlertDialogContent`       | `<div>`    | Panel modal con overlay (role=alertdialog)           |
| `AlertDialogHeader`        | `<div>`    | Contenedor del título y descripción                 |
| `AlertDialogFooter`        | `<div>`    | Contenedor de acciones (responsive layout)          |
| `AlertDialogTitle`         | `<h2>`     | Título del dialog (aria-labelledby)                 |
| `AlertDialogDescription`   | `<p>`      | Descripción del dialog (aria-describedby)           |
| `AlertDialogAction`        | `<button>` | Botón de confirmación (soporta variant destructive) |
| `AlertDialogCancel`        | `<button>` | Botón de cancelación (recibe foco inicial)          |

### Props — AlertDialog

| Prop          | Tipo      | Default     | Descripción                          |
| ------------- | --------- | ----------- | ------------------------------------ |
| `open`        | `boolean` | `undefined` | Estado controlado (v-model:open)     |
| `defaultOpen` | `boolean` | `false`     | Estado inicial no-controlado         |

### Props — AlertDialogAction

| Prop      | Tipo                           | Default     | Descripción                    |
| --------- | ------------------------------ | ----------- | ------------------------------ |
| `variant` | `'default' \| 'destructive'`   | `'default'` | Estilo visual del botón        |

### Diferencias con Dialog

| Característica           | Dialog         | Alert Dialog        |
| ------------------------ | -------------- | ------------------- |
| Cierre por overlay       | ✅ Sí          | ❌ No               |
| Foco inicial             | Primer elemento | Botón Cancel        |
| Botón cerrar (×)         | ✅ Incluido    | ❌ No incluido      |
| `role`                   | `dialog`       | `alertdialog`       |
| Uso                      | General        | Confirmaciones      |

### Accesibilidad

- `role="alertdialog"` + `aria-modal="true"` para lectores de pantalla.
- `aria-labelledby` apunta a `AlertDialogTitle`.
- `aria-describedby` apunta a `AlertDialogDescription`.
- Focus trap completo (Tab/Shift+Tab no sale del dialog).
- Foco inicial en `AlertDialogCancel` (data-alert-dialog-cancel) para seguridad.
- Escape cierra el dialog y restaura foco al trigger.

---

## Accordion

Componente colapsable con animación suave para mostrar/ocultar secciones de contenido. Soporta modo single (un item a la vez) y multiple (varios abiertos simultáneamente), items deshabilitados y control externo via `v-model`.

### Importación

```ts
import {
  Accordion, AccordionItem,
  AccordionTrigger, AccordionContent,
} from '@3df/ui';
```

### Uso básico — FAQ

```vue
<template>
  <Accordion type="single" collapsible default-value="item-1">
    <AccordionItem value="item-1">
      <AccordionTrigger>¿Es accesible?</AccordionTrigger>
      <AccordionContent>
        Sí. Sigue los patrones WAI-ARIA para acordeones.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>¿Es estilizable?</AccordionTrigger>
      <AccordionContent>
        Sí. Puedes sobrescribir cualquier clase con Tailwind.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
```

### Multiple (varios abiertos)

```vue
<Accordion type="multiple" :default-value="['item-1', 'item-3']">
  <AccordionItem value="item-1">
    <AccordionTrigger>Primer item</AccordionTrigger>
    <AccordionContent>Contenido del primer item.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Segundo item</AccordionTrigger>
    <AccordionContent>Contenido del segundo item.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlado (v-model)

```vue
<script setup>
const value = ref('item-1');
</script>

<Accordion type="single" collapsible v-model="value">
  <!-- items -->
</Accordion>
```

### Componentes

| Componente         | Elemento   | Descripción                                        |
| ------------------ | ---------- | -------------------------------------------------- |
| `Accordion`        | `<div>`    | Contenedor raíz, provee estado (provide/inject)    |
| `AccordionItem`    | `<div>`    | Contenedor de cada sección (border-b por defecto)  |
| `AccordionTrigger` | `<button>` | Botón que expande/colapsa con chevron animado       |
| `AccordionContent` | `<div>`    | Contenido colapsable con animación de altura        |

### Props — Accordion

| Prop           | Tipo                       | Default     | Descripción                                |
| -------------- | -------------------------- | ----------- | ------------------------------------------ |
| `type`         | `'single' \| 'multiple'`   | `'single'`  | Modo de apertura                           |
| `modelValue`   | `string \| string[]`       | `undefined` | Estado controlado (v-model)                |
| `defaultValue` | `string \| string[]`       | `undefined` | Estado inicial no-controlado               |
| `collapsible`  | `boolean`                  | `false`     | Permite cerrar todos en modo single        |
| `disabled`     | `boolean`                  | `false`     | Deshabilita todos los items                |

### Props — AccordionItem

| Prop       | Tipo      | Default | Descripción                     |
| ---------- | --------- | ------- | ------------------------------- |
| `value`    | `string`  | —       | Identificador único (requerido) |
| `disabled` | `boolean` | `false` | Deshabilita solo este item      |

### Accesibilidad

- Trigger usa `aria-expanded` y `aria-controls` vinculado al contenido.
- Content usa `role="region"` y `aria-labelledby` vinculado al trigger.
- `data-state="open" | "closed"` en todos los elementos.
- Items deshabilitados usan `disabled` + `data-disabled`.
- Chevron rota 180° al expandir via `[data-state=open]>svg`.

---

## Logo Cloud & Marquee

Componentes para mostrar logos de sponsors, partners o tecnologías. **Logo Cloud** es un grid estático responsivo, y **Logo Marquee** es un scroll infinito con efecto hover-to-slow.

### Importación

```ts
import { LogoCloud, LogoMarquee, type LogoItem, type MarqueeDirection } from '@3df/ui';
```

### Tipo `LogoItem`

```ts
interface LogoItem {
  name: string;   // Nombre del logo (para alt y label)
  src: string;    // URL de la imagen
  href?: string;  // Link opcional (abre en nueva pestaña)
  alt?: string;   // Texto alternativo personalizado
}
```

### Logo Cloud — Grid estático

Grid responsivo que muestra logos de forma estática. Opcionalmente en grayscale con color on hover.

```vue
<script setup lang="ts">
import { LogoCloud, type LogoItem } from '@3df/ui';

const logos: LogoItem[] = [
  { name: 'Vue.js', src: '/logos/vue.svg', href: 'https://vuejs.org' },
  { name: 'TypeScript', src: '/logos/ts.svg' },
  { name: 'Tailwind', src: '/logos/tw.svg' },
  { name: 'Vite', src: '/logos/vite.svg' },
];
</script>

<template>
  <LogoCloud
    :logos="logos"
    heading="Tecnologías que usamos"
    :columns="4"
    :show-names="true"
    :logo-height="44"
  />
</template>
```

#### Props — LogoCloud

| Prop         | Tipo                  | Default | Descripción                               |
| ------------ | --------------------- | ------- | ----------------------------------------- |
| `logos`      | `LogoItem[]`          | —       | Array de logos a mostrar                  |
| `columns`    | `3 \| 4 \| 5 \| 6`  | `4`     | Columnas en pantalla grande (lg:)         |
| `showNames`  | `boolean`             | `false` | Mostrar nombre debajo del logo            |
| `logoHeight` | `number`              | `40`    | Altura de los logos en px                 |
| `grayscale`  | `boolean`             | `true`  | Logos en grayscale, color al hover        |
| `heading`    | `string`              | —       | Título centrado sobre el grid             |

#### Características

- **Grid responsivo** — 2 cols → sm:3 → lg:N columnas
- **Grayscale → color** — transición suave al hacer hover individual
- **Links opcionales** — logos con `href` renderizan como `<a target="_blank">`
- **Lazy loading** — imágenes con `loading="lazy"`
- **Slot heading** — título opcional centrado con estilo sutil

---

### Logo Marquee — Scroll infinito

Scroll infinito horizontal con efecto hover-to-slow usando la **Web Animations API**. Al hacer hover, la animación se desacelera suavemente via `updatePlaybackRate()` — sin saltos de posición, sin jitter, todo en el compositor GPU del navegador.

```vue
<script setup lang="ts">
import { LogoMarquee, type LogoItem } from '@3df/ui';

const logos: LogoItem[] = [
  { name: 'Vue.js', src: '/logos/vue.svg' },
  { name: 'React', src: '/logos/react.svg' },
  { name: 'Svelte', src: '/logos/svelte.svg' },
  // ...más logos
];
</script>

<template>
  <!-- Hover-to-slow (default) -->
  <LogoMarquee
    :logos="logos"
    heading="Trusted by leading companies"
    :duration="25"
    :hover-duration="70"
    :logo-height="44"
  />

  <!-- Dos filas opuestas -->
  <LogoMarquee
    :logos="logos"
    :reverse="true"
    :duration="20"
    heading="Our Partners"
  />

  <!-- Pausa completa al hover -->
  <LogoMarquee
    :logos="logos"
    direction="right"
    :pause-on-hover="true"
    :grayscale="false"
    :show-names="true"
  />
</template>
```

#### Props — LogoMarquee

| Prop            | Tipo                    | Default   | Descripción                                           |
| --------------- | ----------------------- | --------- | ----------------------------------------------------- |
| `logos`         | `LogoItem[]`            | —         | Array de logos a mostrar                              |
| `direction`     | `'left' \| 'right'`   | `'left'`  | Dirección de scroll                                   |
| `duration`      | `number`                | `30`      | Duración de un ciclo completo (segundos)              |
| `hoverDuration` | `number`                | `80`      | Duración al hacer hover (segundos, mayor = más lento) |
| `logoHeight`    | `number`                | `40`      | Altura de los logos en px                             |
| `gap`           | `number`                | `48`      | Espacio entre logos en px                             |
| `grayscale`     | `boolean`               | `true`    | Logos en grayscale (estático, sin transición)          |
| `fadeMask`      | `boolean`               | `true`    | Máscara de desvanecimiento en los bordes              |
| `pauseOnHover`  | `boolean`               | `false`   | Pausar completamente en vez de desacelerar            |
| `showNames`     | `boolean`               | `false`   | Mostrar nombre debajo del logo                        |
| `heading`       | `string`                | —         | Título centrado sobre el marquee                      |
| `reverse`       | `boolean`               | `false`   | Agregar segunda fila en dirección opuesta             |

#### Características

- **Web Animations API** — `element.animate()` corre en el compositor thread del GPU, no en el main thread. Cero jitter.
- **Hover-to-slow** — `animation.updatePlaybackRate(ratio)` cambia la velocidad sin salto de posición ni recálculo del timeline
- **Pause on hover** — `animation.pause()` / `animation.play()` como alternativa a desacelerar
- **Loop perfecto** — exactamente 2 copias del set + `translateX(-50%)` asegura que el loop no tenga salto visible
- **Fade mask** — `mask-image` gradient en los bordes (fade-in/out)
- **Dual row** — `reverse` agrega una segunda fila moviéndose en dirección contraria
- **Puramente decorativo** — logos con `pointer-events: none`, sin interacciones individuales

### Componentes

| Componente    | Archivo             | Descripción                                                  |
| ------------- | ------------------- | ------------------------------------------------------------ |
| `LogoCloud`   | `UiLogoCloud.vue`   | Grid estático responsivo (2→sm:3→lg:N cols) con grayscale opcional |
| `LogoMarquee` | `UiLogoMarquee.vue` | Scroll infinito (Web Animations API) con hover-to-slow       |

### Tipos exportados

| Tipo               | Descripción                                   |
| ------------------ | --------------------------------------------- |
| `LogoItem`         | `{ name, src, href?, alt? }` — datos de un logo |
| `MarqueeDirection` | `'left' \| 'right'` — dirección del marquee   |

---

## Charts (`@3df/charts`)

Paquete separado de visualización de datos — 100% SVG, cero dependencias externas. Comparte el sistema de tokens de `@3df/ui` para colores y dark mode.

### Instalación Charts

```bash
pnpm add @3df/charts
```

> Peer dependency: `vue ^3.0.0`.
> Los colores se toman de los tokens `--color-chart-1` a `--color-chart-5` definidos en `@3df/ui/theme.css`.

### Características comunes

- **SVG puro** — sin Canvas, sin recharts, sin chart.js
- **Responsivo** — `ResizeObserver` + SVG viewBox
- **Dot grid** en vez de líneas punteadas tradicionales
- **Tooltip glassmorphism** — `backdrop-blur-xl`, fondo translúcido, animación de escala
- **Legend interactiva** — click para toggle series, pills con glow dots
- **Animación de entrada** — elementos crecen/aparecen desde la baseline
- **Glow en hover** — filtro SVG `feGaussianBlur` en elementos activos
- **Crosshair** — línea punteada vertical/horizontal al hacer hover
- **Paleta pastel/oscura** — grises azulados, salvia, mauve, lavanda (no arcoíris primarios)

### Tipos compartidos

```ts
import type {
  ChartConfig,
  ChartSeriesConfig,
  ChartDataRow,
  ChartOrientation,
  ChartStackMode,
  ChartTooltipData,
} from '@3df/charts';

// ChartConfig mapea cada serie a su label y color
const config: ChartConfig = {
  revenue:  { label: 'Revenue',  color: 'var(--color-chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
};

// ChartDataRow es un Record con index (string) + valores numéricos
const data: ChartDataRow[] = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
];
```

---

### Bar Chart

Gráfico de barras con soporte vertical/horizontal, agrupado/apilado.

```vue
<script setup lang="ts">
import { UiChartBar, type ChartConfig, type ChartDataRow } from '@3df/charts';

const data: ChartDataRow[] = [
  { month: 'Jan', revenue: 4200, expenses: 2800 },
  { month: 'Feb', revenue: 3800, expenses: 2600 },
  { month: 'Mar', revenue: 5100, expenses: 3400 },
  { month: 'Apr', revenue: 4600, expenses: 3100 },
  { month: 'May', revenue: 6200, expenses: 3900 },
  { month: 'Jun', revenue: 5800, expenses: 4200 },
];

const config: ChartConfig = {
  revenue:  { label: 'Revenue',  color: 'var(--color-chart-1)' },
  expenses: { label: 'Expenses', color: 'var(--color-chart-2)' },
};
</script>

<template>
  <!-- Vertical grouped (default) -->
  <UiChartBar :config="config" :data="data" index="month" />

  <!-- Horizontal -->
  <UiChartBar :config="config" :data="data" index="month" orientation="horizontal" />

  <!-- Stacked -->
  <UiChartBar :config="config" :data="data" index="month" mode="stacked" />

  <!-- Custom formatter, no grid, no animation -->
  <UiChartBar
    :config="config"
    :data="data"
    index="month"
    :show-grid="false"
    :animate="false"
    :value-formatter="(v) => `$${(v / 1000).toFixed(1)}K`"
    :radius="10"
  />
</template>
```

#### Props

| Prop                | Tipo                                    | Default      | Descripción                                    |
| ------------------- | --------------------------------------- | ------------ | ---------------------------------------------- |
| `config`            | `ChartConfig`                           | **required** | Mapa de series → label + color                 |
| `data`              | `ChartDataRow[]`                        | **required** | Array de filas de datos                        |
| `index`             | `string`                                | **required** | Key del campo índice (categoría)               |
| `orientation`       | `'vertical' \| 'horizontal'`           | `'vertical'` | Orientación del gráfico                        |
| `mode`              | `'grouped' \| 'stacked'`               | `'grouped'`  | Modo de apilado                                |
| `showTooltip`       | `boolean`                               | `true`       | Mostrar tooltip on hover                       |
| `showLegend`        | `boolean`                               | `true`       | Mostrar legend interactiva                     |
| `showGrid`          | `boolean`                               | `true`       | Mostrar dot grid                               |
| `showXAxis`         | `boolean`                               | `true`       | Mostrar labels del eje X                       |
| `showYAxis`         | `boolean`                               | `true`       | Mostrar labels del eje Y                       |
| `tickCount`         | `number`                                | `5`          | Número aproximado de ticks                     |
| `valueFormatter`    | `(value: number) => string`             | compact fmt  | Formateador del eje de valores                 |
| `categoryFormatter` | `(value: string \| number) => string`  | `String()`   | Formateador del eje de categorías              |
| `tooltipFormatter`  | `(value: number, key: string) => string`| —            | Formateador personalizado del tooltip          |
| `radius`            | `number`                                | `6`          | Border radius de las barras                    |
| `barGap`            | `number`                                | `0.15`       | Espacio entre barras (fracción)                |
| `categoryGap`       | `number`                                | `0.25`       | Espacio entre categorías (fracción)            |
| `minHeight`         | `number`                                | `350`        | Altura mínima en px                            |
| `animate`           | `boolean`                               | `true`       | Habilitar animación de entrada                 |

#### Visuales

- **Gradient bars** — gradiente vertical de opacidad 1 → 0.6
- **Glow on hover** — filtro SVG con `feGaussianBlur`
- **Crosshair** — línea punteada en la categoría activa
- **Hover highlight** — fondo sutil detrás de la categoría
- **Dimming** — barras no-hover bajan a 25% opacidad
- **Bouncy animation** — `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

### Line Chart

Gráfico de líneas con curvas monotone, linear o step.

```vue
<script setup lang="ts">
import { UiChartLine, type ChartConfig, type ChartDataRow } from '@3df/charts';

const data: ChartDataRow[] = [
  { month: 'Jan', online: 3200, store: 1800 },
  { month: 'Feb', online: 2800, store: 2100 },
  { month: 'Mar', online: 4100, store: 2400 },
  { month: 'Apr', online: 3600, store: 2000 },
  { month: 'May', online: 5200, store: 2900 },
  { month: 'Jun', online: 4800, store: 3200 },
];

const config: ChartConfig = {
  online: { label: 'Online',   color: 'var(--color-chart-1)' },
  store:  { label: 'In-Store', color: 'var(--color-chart-2)' },
};
</script>

<template>
  <!-- Monotone smooth (default) -->
  <UiChartLine :config="config" :data="data" index="month" />

  <!-- Linear, no area, with dots -->
  <UiChartLine
    :config="config"
    :data="data"
    index="month"
    curve-type="linear"
    :show-area="false"
    :show-dots="true"
  />

  <!-- Step interpolation -->
  <UiChartLine
    :config="config"
    :data="data"
    index="month"
    curve-type="step"
    :show-legend="false"
  />

  <!-- Custom formatter -->
  <UiChartLine
    :config="config"
    :data="data"
    index="month"
    :value-formatter="(v) => `$${(v / 1000).toFixed(1)}K`"
    :show-dots="true"
  />
</template>
```

#### Props

| Prop                | Tipo                                    | Default      | Descripción                                    |
| ------------------- | --------------------------------------- | ------------ | ---------------------------------------------- |
| `config`            | `ChartConfig`                           | **required** | Mapa de series → label + color                 |
| `data`              | `ChartDataRow[]`                        | **required** | Array de filas de datos                        |
| `index`             | `string`                                | **required** | Key del campo índice (categoría)               |
| `curveType`         | `'monotone' \| 'linear' \| 'step'`    | `'monotone'` | Tipo de interpolación de la curva              |
| `showTooltip`       | `boolean`                               | `true`       | Mostrar tooltip on hover                       |
| `showLegend`        | `boolean`                               | `true`       | Mostrar legend interactiva                     |
| `showGrid`          | `boolean`                               | `true`       | Mostrar dot grid                               |
| `showXAxis`         | `boolean`                               | `true`       | Mostrar labels del eje X                       |
| `showYAxis`         | `boolean`                               | `true`       | Mostrar labels del eje Y                       |
| `showDots`          | `boolean`                               | `false`      | Mostrar puntos en cada dato                    |
| `mode`              | `'none' \| 'stacked' \| 'expanded'`  | `'none'`     | Modo de apilamiento de áreas                   |
| `showArea`          | `boolean`                               | `true`       | Mostrar relleno degradado bajo las líneas      |
| `showLine`          | `boolean`                               | `true`       | Mostrar trazo de línea sobre el área           |
| `fillOpacity`       | `number`                                | `0.25`       | Opacidad del gradiente de relleno              |
| `tickCount`         | `number`                                | `5`          | Número aproximado de ticks                     |
| `valueFormatter`    | `(value: number) => string`             | compact fmt  | Formateador del eje de valores                 |
| `categoryFormatter` | `(value: string \| number) => string`  | `String()`   | Formateador del eje de categorías              |
| `tooltipFormatter`  | `(value: number, key: string) => string`| —            | Formateador personalizado del tooltip          |
| `strokeWidth`       | `number`                                | `2.5`        | Grosor de la línea                             |
| `dotRadius`         | `number`                                | `4`          | Radio de los puntos                            |
| `minHeight`         | `number`                                | `350`        | Altura mínima en px                            |
| `animate`           | `boolean`                               | `true`       | Habilitar animación de entrada                 |

#### Tipos de curva

- **`monotone`** — Spline cúbico monotónico (Catmull-Rom). Curvas suaves que pasan por cada punto sin overshooting.
- **`linear`** — Segmentos rectos entre puntos.
- **`step`** — Escalones (cambio abrupto a mitad de camino entre puntos).

#### Visuales

- **Area gradient** — relleno degradado de 25% → 2% opacidad bajo cada línea
- **Glow on hover** — filtro SVG aplicado a las líneas cuando hay hover
- **Hover dots** — puntos grandes con borde + `drop-shadow` en la posición hover
- **Static dots** — puntos pequeños opcionales (`showDots`) en cada dato
- **Crosshair** — línea vertical punteada en la posición hover
- **Bouncy animation** — líneas crecen desde la baseline

#### Modos de apilamiento (Area Chart)

Cuando se usa `mode`, el Line Chart actúa como Area Chart con áreas apiladas:

```vue
<!-- Stacked: áreas acumulativas -->
<UiChartLine :config="config" :data="data" index="month" mode="stacked" />

<!-- Expanded: normalizado a 100% -->
<UiChartLine :config="config" :data="data" index="month" mode="expanded" />
```

- **`none`** (default) — cada serie independiente desde baseline (line chart clásico)
- **`stacked`** — áreas apiladas, cada serie se suma a la anterior
- **`expanded`** — normalizado a 100%, eje Y auto-formatea como porcentajes

---

### Pie Chart

Gráfico circular con soporte pie completo y donut. Slices animadas, explode on hover, legend interactiva.

```vue
<script setup lang="ts">
import { UiChartPie, type ChartConfig, type ChartDataRow } from '@3df/charts';

// Modo valueKey: cada fila es un slice
const data: ChartDataRow[] = [
  { browser: 'Chrome', share: 63 },
  { browser: 'Safari', share: 19 },
  { browser: 'Firefox', share: 7 },
  { browser: 'Edge', share: 6 },
  { browser: 'Other', share: 5 },
];

const config: ChartConfig = {
  Chrome:  { label: 'Chrome',  color: 'var(--color-chart-1)' },
  Safari:  { label: 'Safari',  color: 'var(--color-chart-2)' },
  Firefox: { label: 'Firefox', color: 'var(--color-chart-3)' },
  Edge:    { label: 'Edge',    color: 'var(--color-chart-4)' },
  Other:   { label: 'Other',   color: 'var(--color-chart-5)' },
};
</script>

<template>
  <!-- Full pie con labels de porcentaje -->
  <UiChartPie
    :config="config"
    :data="data"
    index="browser"
    value-key="share"
    :show-labels="true"
    label-type="percent"
  />

  <!-- Donut con total centrado -->
  <UiChartPie
    :config="config"
    :data="data"
    index="browser"
    value-key="share"
    :inner-radius="70"
  />

  <!-- Sin animación, labels de valor -->
  <UiChartPie
    :config="config"
    :data="data"
    index="browser"
    value-key="share"
    :inner-radius="50"
    :animate="false"
    :show-labels="true"
    label-type="value"
  />
</template>
```

#### Modos de datos

- **`valueKey` mode** — cada fila del array es un slice. El campo `index` identifica la categoría, el campo `valueKey` tiene el valor numérico. Las keys del `config` deben coincidir con los valores de `data[index]`.
- **Multi-key mode** — sin `valueKey`. Las keys del `config` son los campos numéricos directamente. Si hay una sola fila, cada key es un slice. Si hay múltiples filas, se suman los valores por key.

#### Props

| Prop                | Tipo                                    | Default      | Descripción                                    |
| ------------------- | --------------------------------------- | ------------ | ---------------------------------------------- |
| `config`            | `ChartConfig`                           | **required** | Mapa de slices → label + color                 |
| `data`              | `ChartDataRow[]`                        | **required** | Array de filas de datos                        |
| `index`             | `string`                                | **required** | Key del campo índice (categoría)               |
| `valueKey`          | `string`                                | —            | Key del campo numérico (modo valueKey)         |
| `innerRadius`       | `number`                                | `0`          | Radio interno (0 = pie, >0 = donut)            |
| `radiusFraction`    | `number`                                | `0.85`       | Fracción del espacio disponible (0-1)          |
| `padAngle`          | `number`                                | `1.5`        | Ángulo de separación entre slices (grados)     |
| `cornerRadius`      | `number`                                | `3`          | Radio de esquinas de los slices                |
| `showTooltip`       | `boolean`                               | `true`       | Mostrar tooltip on hover                       |
| `showLegend`        | `boolean`                               | `true`       | Mostrar legend interactiva                     |
| `showLabels`        | `boolean`                               | `false`      | Mostrar labels sobre los slices                |
| `labelType`         | `'percent' \| 'value' \| 'name'`      | `'percent'`  | Tipo de label a mostrar                        |
| `minHeight`         | `number`                                | `350`        | Altura mínima en px                            |
| `tooltipFormatter`  | `(value: number, key: string) => string`| —            | Formateador personalizado del tooltip          |
| `valueFormatter`    | `(value: number) => string`             | compact fmt  | Formateador de valores                         |
| `animate`           | `boolean`                               | `true`       | Habilitar animación de entrada                 |
| `startAngle`        | `number`                                | `-90`        | Ángulo inicial en grados (−90 = 12 en punto)   |

#### Visuales

- **Radial gradient** — cada slice tiene un gradiente radial sutil para profundidad
- **Explode on hover** — el slice activo se desplaza hacia afuera 6px en dirección de su ángulo medio
- **Drop shadow** — sombra en el slice hover para efecto de elevación
- **Dimming** — slices no activas bajan a 35% opacidad
- **Donut center** — cuando `innerRadius > 0`, muestra el total formateado + label "Total"
- **Bouncy animation** — slices crecen desde 0° con `cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Pad angle** — separación de 1.5° entre slices (configurable)

---

### Radar Chart

Componente de gráfico radar/araña con cuadrículas poligonales o circulares, relleno con gradiente radial y animación de entrada.

```vue
<script setup lang="ts">
import { UiChartRadar, type ChartConfig } from '@3df/charts';

const config: ChartConfig = {
  alice: { label: 'Alice', color: 'var(--color-chart-1)' },
  bob:   { label: 'Bob',   color: 'var(--color-chart-4)' },
};

const data = [
  { skill: 'Vue',     alice: 9, bob: 7 },
  { skill: 'Node',    alice: 7, bob: 8 },
  { skill: 'CSS',     alice: 8, bob: 5 },
  { skill: 'Testing', alice: 6, bob: 9 },
  { skill: 'DevOps',  alice: 5, bob: 7 },
];
</script>

<template>
  <UiChartRadar :config="config" :data="data" index="skill" />
</template>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `config` | `ChartConfig` | — | Configuración de series (color, label) |
| `data` | `Record<string, unknown>[]` | — | Array de datos, una fila por eje |
| `index` | `string` | — | Key del campo de etiqueta de eje |
| `variant` | `'polygon' \| 'circle'` | `'polygon'` | Forma de la cuadrícula |
| `levels` | `number` | `5` | Número de anillos concéntricos |
| `showFill` | `boolean` | `true` | Mostrar relleno con gradiente |
| `fillOpacity` | `number` | `0.2` | Opacidad del relleno |
| `showDots` | `boolean` | `true` | Mostrar puntos en vértices |
| `showAxisLabels` | `boolean` | `true` | Mostrar etiquetas de ejes |
| `showTooltip` | `boolean` | `true` | Mostrar tooltip al hover |
| `showLegend` | `boolean` | `true` | Mostrar leyenda interactiva |
| `strokeWidth` | `number` | `2` | Ancho de línea de series |
| `dotRadius` | `number` | `4` | Radio de los puntos |
| `minHeight` | `number` | `400` | Altura mínima en px |
| `animate` | `boolean` | `true` | Animación de entrada |
| `valueFormatter` | `(v: number) => string` | — | Formatear valores en tooltip |
| `tooltipFormatter` | `(key, value, label, data) => string` | — | Tooltip personalizado |

#### Características

- **Polygon / Circle grid** — dos variantes de cuadrícula para distintos estilos
- **Radial gradient fill** — cada serie tiene un gradiente radial sutil
- **Glow on hover** — puntos brillan al pasar el mouse
- **Entrance animation** — las formas crecen desde el centro con transición suave
- **Interactive legend** — clic en la leyenda para ocultar/mostrar series
- **Auto text-anchor** — las etiquetas de ejes se alinean según su posición angular

---

### Scatter Chart

Gráfico de dispersión / burbujas con formas circle/square/diamond, tamaño por variable y leyenda interactiva.

```vue
<script setup lang="ts">
import { UiChartScatter, type ScatterConfig } from '@3df/charts';

const config: ScatterConfig = {
  team: {
    label: 'Team',
    color: 'var(--color-chart-1)',
    xKey: 'hours',
    yKey: 'bugs',
  },
};

const data = [
  { hours: 10, bugs: 3 },
  { hours: 20, bugs: 7 },
  { hours: 35, bugs: 5 },
  { hours: 50, bugs: 12 },
];
</script>

<template>
  <UiChartScatter :config="config" :data="data" />
</template>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `config` | `ScatterConfig` | — | Configuración de series (`xKey`, `yKey`, `sizeKey?`, `shape?`) |
| `data` | `Record<string, unknown>[]` | — | Array de datos |
| `showTooltip` | `boolean` | `true` | Tooltip al hover |
| `showLegend` | `boolean` | `true` | Leyenda interactiva |
| `showGrid` | `boolean` | `true` | Mostrar cuadrícula de puntos |
| `showXAxis` | `boolean` | `true` | Mostrar eje X |
| `showYAxis` | `boolean` | `true` | Mostrar eje Y |
| `tickCount` | `number` | `5` | Número de ticks por eje |
| `dotRadius` | `number` | `6` | Radio base de los puntos |
| `minDotRadius` | `number` | `4` | Radio mínimo (modo burbuja) |
| `maxDotRadius` | `number` | `24` | Radio máximo (modo burbuja) |
| `minHeight` | `number` | `400` | Altura mínima en px |
| `animate` | `boolean` | `true` | Animación de entrada |
| `xFormatter` | `(v: number) => string` | — | Formatear valores eje X |
| `yFormatter` | `(v: number) => string` | — | Formatear valores eje Y |
| `tooltipFormatter` | `(seriesKey, point) => string` | — | Tooltip personalizado |

#### `ScatterSeriesConfig`

```ts
interface ScatterSeriesConfig {
  label: string;
  color: string;
  xKey: string;
  yKey: string;
  sizeKey?: string;      // para modo burbuja
  shape?: 'circle' | 'square' | 'diamond';
}

type ScatterConfig = Record<string, ScatterSeriesConfig>;
```

#### Características

- **3 formas** — circle, square y diamond por serie
- **Modo burbuja** — asigna `sizeKey` para mapear una tercera variable al tamaño del punto
- **Nice scale** — ambos ejes calculan rangos "bonitos" automáticamente
- **Glow on hover** — punto activo brilla, los demás bajan a 35% opacidad
- **Entrance animation** — puntos aparecen desde el centro del eje Y con cubic-bezier
- **Dot grid** — cuadrícula tipo punto para un look limpio

---

### Gauge Chart

Gauge radial con aguja, segmentos coloreados y 3 variantes de arco (semicircle, arc 270°, full 360°).

```vue
<script setup lang="ts">
import { UiChartGauge, type GaugeSegment } from '@3df/charts';

const segments: GaugeSegment[] = [
  { max: 60,  color: 'var(--color-chart-3)', label: 'Safe' },
  { max: 100, color: 'var(--color-chart-1)', label: 'Normal' },
  { max: 140, color: 'oklch(0.65 0.18 45)',  label: 'Fast' },
  { max: 200, color: 'oklch(0.60 0.22 25)',  label: 'Danger' },
];
</script>

<template>
  <UiChartGauge
    :value="115"
    :max="200"
    variant="arc"
    :segments="segments"
    :show-segment-labels="true"
    label="km/h"
  />
</template>
```

#### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | — | Valor actual del gauge |
| `min` | `number` | `0` | Valor mínimo |
| `max` | `number` | `100` | Valor máximo |
| `variant` | `'semicircle' \| 'arc' \| 'full'` | `'semicircle'` | Forma del arco |
| `segments` | `GaugeSegment[]` | — | Zonas coloreadas opcionales |
| `color` | `string` | `'var(--color-chart-1)'` | Color del arco de valor (sin segmentos) |
| `trackColor` | `string` | — | Color de la pista de fondo |
| `trackOpacity` | `number` | `0.3` | Opacidad de la pista |
| `label` | `string` | — | Etiqueta bajo el valor central |
| `valueFormatter` | `(v: number) => string` | — | Formatear el valor mostrado |
| `strokeWidth` | `number` | `20` | Ancho de la pista/arco |
| `showNeedle` | `boolean` | `true` | Mostrar aguja |
| `showSegmentLabels` | `boolean` | `false` | Etiquetas de segmentos |
| `minHeight` | `number` | `250` | Altura mínima en px |
| `animate` | `boolean` | `true` | Animación de entrada |

#### `GaugeSegment`

```ts
interface GaugeSegment {
  label?: string;
  max: number;
  color: string;
}
```

#### Características

- **3 variantes de arco** — semicircle (180°), arc (270°) y full (360°)
- **Segmentos coloreados** — define zonas con colores y etiquetas para indicar rangos
- **Needle** — aguja triangular con sombra y punto central, animada con CSS transition
- **Glow** — el arco de valor tiene un filtro glow sutil
- **Valor centrado** — muestra el valor actual y label en el centro del gauge
- **Min/Max labels** — etiquetas en los extremos del arco

---

## Utilidades

### `cn(...classes)`

Helper para combinar clases de Tailwind sin conflictos. Usa `clsx` + `tailwind-merge` internamente.

```ts
import { cn } from '@3df/ui';

cn('px-4 py-2', 'px-6'); // → 'py-2 px-6' (px-6 gana)
cn('rounded-md', 'rounded-full'); // → 'rounded-full' (gana la última)
cn('text-sm', false && 'hidden'); // → 'text-sm' (ignora falsy)
```

---

## Personalización del tema

Los design tokens se definen en `@3df/ui/theme.css` usando CSS custom properties. Para sobrescribirlos en tu proyecto, redefine las variables **después** del import:

```css
@import 'tailwindcss';
@import '@3df/ui/theme.css';
@source '@3df/ui';

/* Tus overrides */
@theme {
  --color-primary: hsl(220 90% 56%);
  --color-primary-foreground: hsl(0 0% 100%);
}
```

### Tokens disponibles

| Token                                                         | Descripción                   |
| ------------------------------------------------------------- | ----------------------------- |
| `--color-background` / `--color-foreground`                   | Fondo y texto principales     |
| `--color-primary` / `--color-primary-foreground`              | Color de acción principal     |
| `--color-secondary` / `--color-secondary-foreground`          | Color de acción secundaria    |
| `--color-muted` / `--color-muted-foreground`                  | Fondos y textos sutiles       |
| `--color-accent` / `--color-accent-foreground`                | Resaltados (hover, selección) |
| `--color-destructive` / `--color-destructive-foreground`      | Acciones peligrosas           |
| `--color-card` / `--color-card-foreground`                    | Fondos de tarjetas            |
| `--color-popover` / `--color-popover-foreground`              | Fondos de popovers/dropdowns  |
| `--color-border`                                              | Bordes                        |
| `--color-input`                                               | Bordes de inputs              |
| `--color-ring`                                                | Color del focus ring          |
| `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-xl` | Border radius                 |

Cada token tiene su equivalente dark mode en la clase `.dark`.

---

## Estructura del proyecto

```
packages/ui/
├── src/
│   ├── index.ts                          # Barrel — exports públicos
│   ├── components/ui/
│   │   ├── buttons/
│   │   │   ├── UiButton.vue              # Componente Button
│   │   │   └── button-variants.ts        # Variantes CVA del Button
│   │   ├── badges/
│   │   │   ├── UiBadge.vue               # Componente Badge
│   │   │   └── badge-variants.ts         # Variantes CVA del Badge
│   │   ├── label/
│   │   │   └── UiLabel.vue               # Componente Label
│   │   ├── input/
│   │   │   ├── UiInput.vue               # Componente Input
│   │   │   └── input-variants.ts         # Variantes CVA del Input
│   │   ├── textarea/
│   │   │   └── UiTextarea.vue            # Componente Textarea
│   │   ├── select/
│   │   │   ├── UiSelect.vue              # Componente Select (dropdown)
│   │   │   └── UiSelectItem.vue          # Componente SelectItem (opción)
│   │   ├── checkbox/
│   │   │   └── UiCheckbox.vue            # Componente Checkbox (animado)
│   │   ├── radio/
│   │   │   └── UiRadio.vue               # Componente Radio
│   │   ├── switch/
│   │   │   └── UiSwitch.vue              # Componente Switch (toggle)
│   │   ├── card/
│   │   │   ├── UiCard.vue                # Contenedor principal
│   │   │   ├── UiCardHeader.vue          # Header de la card
│   │   │   ├── UiCardTitle.vue           # Título (polimórfico)
│   │   │   ├── UiCardDescription.vue     # Descripción
│   │   │   ├── UiCardContent.vue         # Contenido principal
│   │   │   └── UiCardFooter.vue          # Footer de la card
│   │   ├── dropdown-menu/
│   │   │   ├── UiDropdownMenu.vue        # Contenedor raíz (provide/inject)
│   │   │   ├── UiDropdownMenuTrigger.vue # Trigger (role="button")
│   │   │   ├── UiDropdownMenuContent.vue # Panel flotante (fixed + Teleport)
│   │   │   ├── UiDropdownMenuItem.vue    # Opción clickeable
│   │   │   ├── UiDropdownMenuSeparator.vue # Divisor visual
│   │   │   ├── UiDropdownMenuLabel.vue   # Encabezado de sección
│   │   │   └── UiDropdownMenuShortcut.vue # Texto de atajo
│   │   ├── popover/
│   │   │   ├── UiPopover.vue             # Contenedor raíz
│   │   │   ├── UiPopoverTrigger.vue      # Trigger
│   │   │   └── UiPopoverContent.vue      # Panel flotante (fixed + Teleport)
│   │   ├── sonner/
│   │   │   ├── toast-state.ts            # Estado reactivo global + función toast()
│   │   │   ├── UiToast.vue               # Toast individual (animación, icono, acción)
│   │   │   └── UiToaster.vue             # Contenedor global (Teleport + posición)
│   │   ├── alert/
│   │   │   ├── alert-variants.ts         # Variantes CVA del Alert
│   │   │   ├── UiAlert.vue               # Contenedor principal (role="alert")
│   │   │   ├── UiAlertTitle.vue          # Título
│   │   │   └── UiAlertDescription.vue    # Descripción
│   │   ├── tooltip/
│   │   │   ├── UiTooltip.vue             # Contenedor raíz (provide/inject, delay)
│   │   │   ├── UiTooltipTrigger.vue      # Trigger (hover + focus)
│   │   │   └── UiTooltipContent.vue      # Panel flotante (fixed + Teleport)
│   │   ├── toggle/
│   │   │   ├── toggle-variants.ts        # Variantes CVA del Toggle
│   │   │   └── UiToggle.vue              # Botón toggle (aria-pressed)
│   │   ├── logo/
│   │   │   ├── UiLogoCloud.vue           # Grid estático de logos (responsivo)
│   │   │   └── UiLogoMarquee.vue         # Marquee infinito (hover-to-slow)
│   │   └── table/
│   │       ├── UiTable.vue               # Contenedor principal (<table> + scroll wrapper)
│   │       ├── UiTableHeader.vue         # <thead> estilizado
│   │       ├── UiTableBody.vue           # <tbody> estilizado
│   │       ├── UiTableFooter.vue         # <tfoot> con fondo muted
│   │       ├── UiTableRow.vue            # <tr> con hover y selección
│   │       ├── UiTableHead.vue           # <th> encabezado
│   │       ├── UiTableCell.vue           # <td> celda de datos
│   │       ├── UiTableCaption.vue        # <caption> leyenda
│   │       └── UiTableEmpty.vue          # Fila de estado vacío
│   │   └── slider/
│   │       └── UiSlider.vue              # Slider accesible (pointer + keyboard)
│   │   └── skeleton/
│   │       └── UiSkeleton.vue            # Placeholder con animación pulse
│   │   └── sidebar/
│   │       ├── sidebar-types.ts          # Tipos, InjectionKey, constantes
│   │       ├── use-sidebar.ts            # Composable (createSidebarContext + useSidebar)
│   │       ├── UiSidebarProvider.vue     # Provider de contexto (v-model:open)
│   │       ├── UiSidebar.vue             # Panel lateral (desktop + mobile)
│   │       ├── UiSidebarTrigger.vue      # Botón toggle
│   │       ├── UiSidebarHeader.vue       # Zona superior (border-b)
│   │       ├── UiSidebarFooter.vue       # Zona inferior (border-t)
│   │       ├── UiSidebarContent.vue      # Contenido scrollable (scrollbar custom)
│   │       ├── UiSidebarGroup.vue        # Agrupación con padding
│   │       ├── UiSidebarGroupLabel.vue   # Etiqueta de grupo (uppercase)
│   │       ├── UiSidebarGroupContent.vue # Contenido de grupo
│   │       ├── UiSidebarMenu.vue         # Lista <ul>
│   │       ├── UiSidebarMenuItem.vue     # Ítem <li>
│   │       ├── UiSidebarMenuButton.vue   # Botón interactivo (aria-current)
│   │       ├── UiSidebarMenuBadge.vue    # Badge/contador en items
│   │       ├── UiSidebarMenuAction.vue   # Botón de acción (showOnHover)
│   │       ├── UiSidebarMenuSub.vue      # Sub-menú colapsable animado
│   │       ├── UiSidebarMenuSubItem.vue  # Ítem de sub-menú
│   │       ├── UiSidebarMenuSubButton.vue# Botón de sub-menú
│   │       ├── UiSidebarMenuSkeleton.vue # Skeleton de carga
│   │       ├── UiSidebarSeparator.vue    # Línea divisoria
│   │       ├── UiSidebarRail.vue         # Rail lateral interactivo
│   │       └── UiSidebarInset.vue        # Contenedor de contenido principal
│   │   └── sheet/
│   │       ├── sheet-types.ts            # Tipos, InjectionKey
│   │       ├── sheet-variants.ts         # Variantes CVA (side)
│   │       ├── UiSheet.vue               # Proveedor de estado (v-model:open)
│   │       ├── UiSheetTrigger.vue        # Trigger (abre/cierra)
│   │       ├── UiSheetContent.vue        # Panel deslizante (overlay + focus trap)
│   │       ├── UiSheetHeader.vue         # Zona de título/descripción
│   │       ├── UiSheetFooter.vue         # Zona de acciones
│   │       ├── UiSheetTitle.vue          # Título accesible (polimórfico)
│   │       ├── UiSheetDescription.vue    # Descripción accesible
│   │       └── UiSheetClose.vue          # Botón para cerrar
│   │   └── separator/
│   │       └── UiSeparator.vue           # Separador horizontal/vertical
│   │   └── scroll-area/
│   │       └── UiScrollArea.vue          # Scroll area con barras custom
│   │   └── progress/
│   │       └── UiProgress.vue            # Barra de progreso
│   │   └── pagination/
│   │       ├── UiPagination.vue           # Nav wrapper
│   │       ├── UiPaginationContent.vue    # Lista contenedora
│   │       ├── UiPaginationItem.vue       # Elemento li
│   │       ├── UiPaginationLink.vue       # Botón de página
│   │       ├── UiPaginationPrevious.vue   # Botón anterior
│   │       ├── UiPaginationNext.vue       # Botón siguiente
│   │       └── UiPaginationEllipsis.vue   # Indicador ellipsis
│   │   └── navigation-menu/
│   │       ├── navigation-menu-types.ts    # Tipos e InjectionKeys
│   │       ├── UiNavigationMenu.vue        # Root provider (nav)
│   │       ├── UiNavigationMenuList.vue    # Lista contenedora (ul)
│   │       ├── UiNavigationMenuItem.vue    # Ítem individual (li)
│   │       ├── UiNavigationMenuTrigger.vue # Botón con chevron
│   │       ├── UiNavigationMenuContent.vue # Panel desplegable (Teleport)
│   │       ├── UiNavigationMenuLink.vue    # Link estilizado (polimórfico)
│   │       └── UiNavigationMenuViewport.vue# Contenedor de posicionamiento
│   │   └── menubar/
│   │       ├── menubar-types.ts             # Tipos, InjectionKeys
│   │       ├── UiMenubar.vue                # Root menubar (role="menubar")
│   │       ├── UiMenubarMenu.vue            # Wrapper menú individual
│   │       ├── UiMenubarTrigger.vue         # Botón trigger en la barra
│   │       ├── UiMenubarContent.vue         # Panel flotante (Teleport)
│   │       ├── UiMenubarItem.vue            # Ítem clickeable
│   │       ├── UiMenubarCheckboxItem.vue    # Ítem checkbox toggle
│   │       ├── UiMenubarRadioGroup.vue      # Grupo radio
│   │       ├── UiMenubarRadioItem.vue       # Opción radio
│   │       ├── UiMenubarSub.vue             # Wrapper sub-menú
│   │       ├── UiMenubarSubTrigger.vue      # Trigger de sub-menú
│   │       ├── UiMenubarSubContent.vue      # Panel lateral sub-menú
│   │       ├── UiMenubarSeparator.vue       # Divisor
│   │       ├── UiMenubarLabel.vue           # Encabezado de sección
│   │       └── UiMenubarShortcut.vue        # Texto de atajo
│   │   └── kbd/
│   │       ├── kbd-variants.ts              # Variantes CVA (size)
│   │       └── UiKbd.vue                    # Componente <kbd> semántico
│   │   └── item/
│   │       ├── item-variants.ts              # Variantes CVA (variant, size)
│   │       ├── UiItem.vue                    # Componente polimórfico (slots: start/end)
│   │       ├── UiItemLabel.vue               # Label truncado
│   │       └── UiItemDescription.vue         # Descripción muted
│   │   └── input-otp/
│   │       ├── input-otp-types.ts            # Tipos, InjectionKey, patrones
│   │       ├── UiInputOTP.vue                # Root provider (v-model, teclado, paste)
│   │       ├── UiInputOTPGroup.vue           # Agrupación visual de slots
│   │       ├── UiInputOTPSlot.vue            # Slot individual (input + caret)
│   │       └── UiInputOTPSeparator.vue       # Separador visual entre grupos
│   │   └── hover-card/
│   │       ├── hover-card-types.ts            # Tipos, InjectionKey
│   │       ├── UiHoverCard.vue                # Root provider (delays, open/close)
│   │       ├── UiHoverCardTrigger.vue         # Zona de activación (hover + focus)
│   │       └── UiHoverCardContent.vue         # Panel flotante (Teleport + posición)
│   │   └── empty-state/
│   │       └── UiEmptyState.vue               # Layout centrado (icon + text + actions)
│   │   └── drawer/
│   │       ├── drawer-types.ts                # Tipos, InjectionKey
│   │       ├── UiDrawer.vue                   # Provider de estado (v-model:open)
│   │       ├── UiDrawerTrigger.vue            # Botón trigger
│   │       ├── UiDrawerContent.vue            # Panel inferior (drag, overlay, focus trap)
│   │       ├── UiDrawerHeader.vue             # Zona de título
│   │       ├── UiDrawerFooter.vue             # Zona de acciones
│   │       ├── UiDrawerTitle.vue              # Título accesible
│   │       └── UiDrawerDescription.vue        # Descripción accesible
│   │   └── dialog/
│   │       ├── dialog-types.ts                # Tipos, InjectionKey
│   │       ├── UiDialog.vue                   # Provider de estado (v-model:open)
│   │       ├── UiDialogTrigger.vue            # Botón trigger
│   │       ├── UiDialogContent.vue            # Panel centrado (blur overlay, focus trap)
│   │       ├── UiDialogHeader.vue             # Zona de título
│   │       ├── UiDialogFooter.vue             # Zona de acciones (responsive)
│   │       ├── UiDialogTitle.vue              # Título accesible
│   │       ├── UiDialogDescription.vue        # Descripción accesible
│   │       └── UiDialogClose.vue              # Cierra el dialog
│   │   └── calendar/
│   │       ├── calendar-types.ts               # Tipos (DateRange, CalendarMode)
│   │       └── UiCalendar.vue                  # Calendario (single + range)
│   │   └── date-picker/
│   │       ├── UiDatePicker.vue                # DatePicker (Calendar + Popover)
│   │       └── UiDateRangePicker.vue           # DateRangePicker (range + Popover)
│   │   └── context-menu/
│   │       ├── context-menu-types.ts            # Tipos, InjectionKeys
│   │       ├── UiContextMenu.vue                # Provider raíz (keyboard nav)
│   │       ├── UiContextMenuTrigger.vue         # Zona de clic derecho
│   │       ├── UiContextMenuContent.vue         # Panel flotante (cursor pos)
│   │       ├── UiContextMenuItem.vue            # Ítem clickeable
│   │       ├── UiContextMenuCheckboxItem.vue    # Ítem checkbox toggle
│   │       ├── UiContextMenuRadioGroup.vue      # Grupo radio
│   │       ├── UiContextMenuRadioItem.vue       # Opción radio
│   │       ├── UiContextMenuLabel.vue           # Encabezado de sección
│   │       ├── UiContextMenuSeparator.vue       # Divisor
│   │       ├── UiContextMenuShortcut.vue        # Texto de atajo
│   │       ├── UiContextMenuSub.vue             # Wrapper sub-menú
│   │       ├── UiContextMenuSubTrigger.vue      # Trigger sub-menú
│   │       └── UiContextMenuSubContent.vue      # Panel sub-menú
│   │   └── command/
│   │       ├── command-types.ts                  # Tipos, InjectionKey
│   │       ├── UiCommand.vue                     # Provider raíz (filtro, keyboard nav)
│   │       ├── UiCommandDialog.vue               # Modal (Dialog + Command, ⌘K)
│   │       ├── UiCommandInput.vue                # Input de búsqueda (autofocus)
│   │       ├── UiCommandList.vue                 # Contenedor scrollable (listbox)
│   │       ├── UiCommandEmpty.vue                # Estado sin resultados
│   │       ├── UiCommandGroup.vue                # Grupo con heading
│   │       ├── UiCommandItem.vue                 # Ítem seleccionable (auto-hide)
│   │       ├── UiCommandShortcut.vue             # Texto de atajo
│   │       └── UiCommandSeparator.vue            # Divisor visual
│   │   └── combobox/
│   │       └── UiCombobox.vue                    # Select + búsqueda (Popover + Command)
│   │   └── collapsible/
│   │       ├── collapsible-types.ts               # Tipos, InjectionKey
│   │       ├── UiCollapsible.vue                  # Provider raíz (v-model:open)
│   │       ├── UiCollapsibleTrigger.vue           # Botón toggle (aria-expanded)
│   │       └── UiCollapsibleContent.vue           # Contenido animado (height)
│   │   └── carousel/
│   │       ├── carousel-types.ts                  # Tipos, InjectionKey
│   │       ├── UiCarousel.vue                     # Provider raíz (Embla engine)
│   │       ├── UiCarouselContent.vue              # Contenedor flex (overflow hidden)
│   │       ├── UiCarouselItem.vue                 # Slide individual (role=group)
│   │       ├── UiCarouselPrevious.vue             # Botón anterior
│   │       └── UiCarouselNext.vue                 # Botón siguiente
│   │   └── breadcrumb/
│   │       ├── UiBreadcrumb.vue                   # Nav semántico (aria-label)
│   │       ├── UiBreadcrumbList.vue               # Lista ordenada (ol)
│   │       ├── UiBreadcrumbItem.vue               # Ítem contenedor (li)
│   │       ├── UiBreadcrumbLink.vue               # Link navegable (polimórfico)
│   │       ├── UiBreadcrumbPage.vue               # Página actual (aria-current)
│   │       ├── UiBreadcrumbSeparator.vue          # Separador (chevron/custom)
│   │       └── UiBreadcrumbEllipsis.vue           # Indicador de rutas omitidas
│   ├── lib/
│   │   └── utils.ts                      # Helper cn()
│   └── styles/
│       └── theme.css                     # Design tokens (light + dark)
├── dist/                                 # Build output (generado)
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Scripts de desarrollo

Desde la raíz del monorepo:

| Script            | Descripción                     |
| ----------------- | ------------------------------- |
| `pnpm dev`        | Dev server de la app playground |
| `pnpm build:ui`   | Compila el paquete `@3df/ui`    |
| `pnpm build`      | Compila el paquete + la app     |
| `pnpm preview`    | Sirve el build de producción    |
| `pnpm lint`       | Linter (oxlint + eslint)        |
| `pnpm format`     | Formatea con Prettier           |
| `pnpm type-check` | Chequeo de tipos con vue-tsc    |

Desde `packages/ui/`:

| Script       | Descripción                                         |
| ------------ | --------------------------------------------------- |
| `pnpm build` | Build de producción del paquete                     |
| `pnpm dev`   | Build en watch mode (rebuild automático al guardar) |

---

## Contribución interna

### Agregar un nuevo componente

1. Crear la carpeta del componente en `packages/ui/src/components/ui/`:

```
packages/ui/src/components/ui/
├── inputs/
│   ├── UiInput.vue
│   └── input-variants.ts    # (si usa CVA)
```

2. Exportar desde `packages/ui/src/index.ts`:

```ts
export { default as Input } from './components/ui/inputs/UiInput.vue';
export { inputVariants } from './components/ui/inputs/input-variants';
```

3. Rebuild: `pnpm build:ui`

4. Crear una página de demo en `src/modules/ui/views/` y agregarla al router.

### Convenciones

- Los archivos de componentes se nombran `Ui[Nombre].vue` (ej: `UiButton.vue`)
- Se exportan sin el prefijo `Ui` (ej: `export { default as Button }`)
- Las variantes CVA van en archivos separados `[nombre]-variants.ts`
- Los componentes usan `inheritAttrs: false` y manejan attrs manualmente
- Clases de Tailwind se aplican vía `cn()` para permitir overrides del consumidor
- Los tipos de contexto provide/inject van en `[nombre]-types.ts` con `InjectionKey<T>` + `Symbol()`
- Triggers interactivos (`<div @click>`) siempre llevan `role="button"`, `tabindex="0"`, `@keydown.enter.prevent` y `@keydown.space.prevent`
- Aria-labels y textos accesibles en inglés neutral (el consumidor puede sobreescribir vía props/slots)
- Listeners globales (`document.addEventListener`) solo se registran cuando el componente está activo (ej: menú abierto)

### Patrón provide/inject (componentes compuestos)

Los componentes que forman familias (ej: `DropdownMenu` + `DropdownMenuTrigger` + `DropdownMenuContent`) usan `provide`/`inject` con `InjectionKey<T>` typed para compartir estado:

```ts
// dropdown-menu-types.ts
import type { InjectionKey, Ref } from 'vue';

export interface DropdownMenuContext {
  isOpen: Ref<boolean>;
  toggle: () => void;
  // ...
}

export const DROPDOWN_MENU_KEY: InjectionKey<DropdownMenuContext> = Symbol('dropdown-menu');
```

```vue
<!-- En el root: provide -->
<script setup lang="ts">
import { provide } from 'vue';
import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

provide(DROPDOWN_MENU_KEY, { isOpen, toggle, /* ... */ });
</script>
```

```vue
<!-- En hijos: inject -->
<script setup lang="ts">
import { inject } from 'vue';
import { DROPDOWN_MENU_KEY } from './dropdown-menu-types';

const menu = inject(DROPDOWN_MENU_KEY)!; // ← tipo inferido automáticamente
</script>
```

Todos los `InjectionKey` y sus interfaces de contexto se exportan desde `@3df/ui` para que el consumidor pueda acceder al contexto si lo necesita:

```ts
import {
  DROPDOWN_MENU_KEY, type DropdownMenuContext,
  TOOLTIP_KEY, type TooltipContext,
  POPOVER_KEY, type PopoverContext,
  SELECT_KEY, type SelectContext,
} from '@3df/ui';
```

---

## Buenas prácticas

### ✅ Hacer

```vue
<!-- Usar las props del componente para variantes -->
<Button variant="outline" size="sm">OK</Button>
<Badge variant="success">Online</Badge>

<!-- Override de clases cuando necesites algo específico -->
<Button class="w-full rounded-full">Custom</Button>
<Badge class="rounded-full">Pill</Badge>

<!-- buttonVariants() / badgeVariants() cuando no necesitas el componente Vue -->
<a :class="buttonVariants({ variant: 'link' })">Link</a>
<span :class="badgeVariants({ variant: 'outline' })">Tag</span>
```

### ❌ Evitar

```vue
<!-- No uses !important — cn() ya maneja la prioridad -->
<Button class="!bg-red-500">Mal</Button>

<!-- No mezcles estilos inline con clases de Tailwind -->
<Button :style="{ backgroundColor: 'red' }">Mal</Button>

<!-- No pases variant como clase, usa la prop -->
<Button class="bg-destructive text-destructive-foreground">Mal</Button>
<Badge class="bg-emerald-600 text-white">Mal</Badge>
```

---

## Peer dependencies

| Paquete                    | Versión  | Por qué                                   |
| -------------------------- | -------- | ----------------------------------------- |
| `vue`                      | `^3.0.0` | Framework base                            |
| `class-variance-authority` | `^0.7.1` | Sistema de variantes type-safe            |
| `clsx`                     | `^2.1.1` | Composición condicional de clases         |
| `tailwind-merge`           | `^3.4.0` | Resolución inteligente de clases Tailwind |
| `date-fns`                 | `^3 \|\| ^4` | Manipulación y formateo de fechas (Calendar, DatePicker) |
| `embla-carousel`           | `^8.0.0` | Motor de carousel (Carousel)              |

---

## Licencia

ISC — Uso interno de 3DF.
