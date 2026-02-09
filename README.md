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
│   │   └── alert/
│   │       ├── alert-variants.ts         # Variantes CVA del Alert
│   │       ├── UiAlert.vue               # Contenedor principal (role="alert")
│   │       ├── UiAlertTitle.vue          # Título
│   │       └── UiAlertDescription.vue    # Descripción
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
