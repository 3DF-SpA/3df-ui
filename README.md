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
| `modelValue`  | `string`  | `''`                      | Valor seleccionado (v-model)  |
| `placeholder` | `string`  | `'Selecciona una opción'` | Texto cuando no hay selección |
| `disabled`    | `boolean` | `false`                   | Deshabilita el select         |

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
- Se bloquea `body` scroll cuando el drawer está abierto.

### Animaciones

| Elemento  | Transición                                                   |
| --------- | ------------------------------------------------------------ |
| Desktop   | `transition-[left,right,width] duration-200 ease-linear`     |
| Spacer    | `transition-[width] duration-200 ease-linear`                |
| Overlay   | `opacity 0.2s ease`                                          |
| Sheet     | `transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)` (iOS feel)  |
| Labels    | `transition-[margin,opacity,padding] duration-200`           |

### Atajo de teclado

`Ctrl+B` (Windows/Linux) o `⌘+B` (macOS) para toggle rápido.

### Accesibilidad

- `SidebarTrigger` incluye `aria-label` dinámico ("Abrir/Cerrar sidebar").
- `SidebarRail` tiene `role="button"`, `tabindex="0"` y responde a `Enter`/`Space`.
- Mobile drawer: botón de cierre con `aria-label`, overlay clickable.
- Texto oculto accesible en trigger (`<span class="sr-only">`).

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

---

## Licencia

ISC — Uso interno de 3DF.
