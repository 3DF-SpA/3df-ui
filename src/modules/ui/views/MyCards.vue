<script setup lang="ts">
import { ref } from 'vue';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectItem,
  Switch,
} from '@3df/ui';

const notifications = ref(true);
const framework = ref('vue');
</script>

<template>
  <div class="flex min-h-screen flex-col gap-12 p-8">
    <h1 class="text-3xl font-bold">Cards</h1>

    <!-- Card básica -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card básica</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Título de la card</CardTitle>
            <CardDescription>Una descripción breve del contenido de la card.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-sm">
              Este es el contenido principal de la card. Puedes poner cualquier cosa aquí.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Acción</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- Card con formulario -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con formulario</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Crear proyecto</CardTitle>
            <CardDescription>Configura tu nuevo proyecto en un click.</CardDescription>
          </CardHeader>
          <CardContent>
            <form class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <Label for="project-name">Nombre</Label>
                <Input id="project-name" placeholder="Mi proyecto" />
              </div>
              <div class="flex flex-col gap-2">
                <Label for="project-framework">Framework</Label>
                <Select
                  id="project-framework"
                  v-model="framework"
                  placeholder="Selecciona un framework"
                >
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt</SelectItem>
                </Select>
              </div>
            </form>
          </CardContent>
          <CardFooter class="justify-between">
            <Button variant="ghost">Cancelar</Button>
            <Button>Crear</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- Card con switch -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con notificaciones</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>Configura cómo quieres recibir notificaciones.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-4">
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">Push</span>
                  <span class="text-muted-foreground text-xs">Recibir notificaciones push.</span>
                </div>
                <Switch v-model="notifications" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">Email</span>
                  <span class="text-muted-foreground text-xs">Resumen diario por correo.</span>
                </div>
                <Switch :model-value="false" />
              </div>
              <div class="flex items-center justify-between">
                <div class="flex flex-col gap-1">
                  <span class="text-sm font-medium">SMS</span>
                  <span class="text-muted-foreground text-xs">Alertas críticas por SMS.</span>
                </div>
                <Switch :model-value="false" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Grid de cards -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Grid de cards</h2>
      <div class="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle as="h4" class="text-base">Ingresos</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-muted-foreground"
              >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">$45,231.89</p>
            <p class="text-muted-foreground text-xs">+20.1% respecto al mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle as="h4" class="text-base">Usuarios</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">+2,350</p>
            <p class="text-muted-foreground text-xs">+180 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle as="h4" class="text-base">Ventas</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <p class="text-2xl font-bold">+12,234</p>
            <p class="text-muted-foreground text-xs">+8% respecto al mes pasado</p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Card con badges -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card con badges</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle>Deploy #1234</CardTitle>
              <Badge variant="success" size="sm">Exitoso</Badge>
            </div>
            <CardDescription>Desplegado hace 3 minutos en producción.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-col gap-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Rama</span>
                <span class="font-mono text-xs">main</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Commit</span>
                <span class="font-mono text-xs">a3f8c2d</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Duración</span>
                <span>42s</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" class="w-full">Ver logs</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- Card como enlace -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card interactiva (hover)</h2>
      <div class="grid max-w-md gap-4">
        <Card class="cursor-pointer transition-shadow duration-200 hover:shadow-md">
          <CardHeader>
            <CardTitle>Documentación</CardTitle>
            <CardDescription>Aprende a usar @3df/ui con guías y ejemplos.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground text-sm">
              Guías completas, API reference y ejemplos interactivos para cada componente.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Card sin header -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card solo contenido</h2>
      <div class="grid max-w-md gap-4">
        <Card>
          <CardContent class="pt-6">
            <p class="text-sm">
              Una card puede tener solo contenido, sin header ni footer. Usa
              <code class="bg-muted rounded px-1 py-0.5 text-xs">class="pt-6"</code> en CardContent
              para compensar el padding superior.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Pricing cards -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Cards de planes (pricing)</h2>
      <div class="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Free -->
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Para proyectos personales y experimentación.</CardDescription>
            <div class="mt-2">
              <span class="text-3xl font-bold">$0</span>
              <span class="text-muted-foreground text-sm">/mes</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-3 text-sm">
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                1 proyecto
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                100 MB almacenamiento
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Soporte por comunidad
              </li>
              <li class="text-muted-foreground flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 opacity-40"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
                Dominio personalizado
              </li>
              <li class="text-muted-foreground flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 opacity-40"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
                Analytics avanzados
              </li>
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
            <CardDescription>Para equipos pequeños y freelancers.</CardDescription>
            <div class="mt-2">
              <span class="text-3xl font-bold">$19</span>
              <span class="text-muted-foreground text-sm">/mes</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-3 text-sm">
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                10 proyectos
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                10 GB almacenamiento
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Soporte prioritario
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Dominio personalizado
              </li>
              <li class="text-muted-foreground flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 opacity-40"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
                Analytics avanzados
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button class="w-full">Suscribirse</Button>
          </CardFooter>
        </Card>

        <!-- Enterprise -->
        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>Para organizaciones con necesidades avanzadas.</CardDescription>
            <div class="mt-2">
              <span class="text-3xl font-bold">$49</span>
              <span class="text-muted-foreground text-sm">/mes</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul class="flex flex-col gap-3 text-sm">
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Proyectos ilimitados
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                100 GB almacenamiento
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Soporte 24/7 dedicado
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Dominio personalizado
              </li>
              <li class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="text-primary shrink-0"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Analytics avanzados
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" class="w-full">Contactar ventas</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- Product cards con imagen -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Cards de producto</h2>
      <div class="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop"
            alt="Reloj minimalista"
            class="aspect-[3/2] w-full object-cover"
          />
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-base">Reloj Classic</CardTitle>
              <Badge variant="secondary" size="sm">Nuevo</Badge>
            </div>
            <CardDescription>Reloj minimalista con correa de cuero genuino.</CardDescription>
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

        <Card class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
            alt="Auriculares"
            class="aspect-[3/2] w-full object-cover"
          />
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-base">Studio Pro</CardTitle>
              <Badge variant="red" size="sm">-20%</Badge>
            </div>
            <CardDescription>Auriculares inalámbricos con cancelación de ruido.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-bold">$239.00</span>
              <span class="text-muted-foreground text-sm line-through">$299.00</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full" size="sm">Agregar al carrito</Button>
          </CardFooter>
        </Card>

        <Card class="overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=400&fit=crop"
            alt="Zapatillas"
            class="aspect-[3/2] w-full object-cover"
          />
          <CardHeader>
            <div class="flex items-center justify-between">
              <CardTitle class="text-base">Runner X</CardTitle>
              <Badge variant="success" size="sm">En stock</Badge>
            </div>
            <CardDescription>Zapatillas ultraligeras para running profesional.</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-bold">$89.00</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button class="w-full" size="sm">Agregar al carrito</Button>
          </CardFooter>
        </Card>
      </div>
    </section>

    <!-- Product card horizontal -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Card de producto horizontal</h2>
      <div class="grid max-w-2xl gap-4">
        <Card class="flex flex-col overflow-hidden sm:flex-row">
          <img
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
            alt="Cámara Polaroid"
            class="aspect-square w-full object-cover sm:w-48"
          />
          <div class="flex flex-1 flex-col">
            <CardHeader>
              <div class="flex items-center gap-2">
                <CardTitle class="text-base">Cámara Instant</CardTitle>
                <Badge variant="orange" size="sm">Oferta</Badge>
              </div>
              <CardDescription>
                Cámara instantánea con flash integrado y modos de exposición automáticos. Incluye
                pack de 10 fotos.
              </CardDescription>
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
      </div>
    </section>

    <!-- Feature cards (estilo landing / marketing) -->
    <section class="flex flex-col gap-4">
      <h2 class="text-muted-foreground text-sm font-medium">Cards tipo feature (landing page)</h2>
      <div class="grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Feature 1 -->
        <Card class="border-0 bg-amber-50 shadow-none dark:bg-amber-950/30">
          <CardContent class="pt-6">
            <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
              <div class="flex flex-col gap-3">
                <div class="flex gap-2">
                  <div class="h-2 w-16 rounded-full bg-amber-300/60"></div>
                  <div class="h-2 w-10 rounded-full bg-amber-200/60"></div>
                </div>
                <div class="flex gap-2">
                  <div class="h-2 w-20 rounded-full bg-amber-300/40"></div>
                  <div class="h-2 w-8 rounded-full bg-amber-200/40"></div>
                </div>
                <div class="flex gap-2">
                  <div class="h-2 w-12 rounded-full bg-amber-300/40"></div>
                  <div class="h-2 w-14 rounded-full bg-amber-200/40"></div>
                </div>
                <div
                  class="mt-2 flex items-center justify-between rounded-md border border-amber-200 bg-white px-3 py-2 dark:border-amber-800 dark:bg-white/5"
                >
                  <span class="text-xs font-medium">Auto QA score</span>
                  <div class="flex items-center gap-1.5">
                    <span
                      class="flex size-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white"
                      >✓</span
                    >
                    <span class="text-sm font-bold">80</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardHeader class="pt-0">
            <CardTitle class="text-xl font-bold">Analiza interacciones en segundos.</CardTitle>
            <CardDescription class="text-sm">
              Visualiza el panorama completo de cada interacción: chat, email, teléfono y video, de
              un vistazo.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature 2 -->
        <Card class="border-0 bg-teal-50 shadow-none dark:bg-teal-950/30">
          <CardContent class="pt-6">
            <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
              <div class="flex flex-col gap-2">
                <p class="text-xs font-semibold">Training Plan</p>
                <div class="flex items-center gap-2">
                  <div class="size-7 rounded-full bg-teal-200 dark:bg-teal-700"></div>
                  <div class="flex flex-col">
                    <span class="text-xs font-medium">Simón Gregory</span>
                    <span class="text-[10px] text-teal-600 dark:text-teal-400"
                      >QA score ↘ 1.25 this week</span
                    >
                  </div>
                </div>
                <div class="mt-1 flex flex-col gap-1.5">
                  <div
                    class="flex items-center gap-2 rounded-sm bg-teal-50 px-2 py-1.5 dark:bg-teal-900/30"
                  >
                    <span
                      class="flex size-4 items-center justify-center rounded-full bg-teal-500 text-[8px] text-white"
                      >📞</span
                    >
                    <span class="truncate text-[11px]">Resolving Login Issues with Emp...</span>
                  </div>
                  <div
                    class="flex items-center gap-2 rounded-sm bg-teal-50 px-2 py-1.5 dark:bg-teal-900/30"
                  >
                    <span
                      class="flex size-4 items-center justify-center rounded-full bg-teal-400 text-[8px] text-white"
                      >💬</span
                    >
                    <span class="truncate text-[11px]">Assisting a Tech-Savvy Customer</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardHeader class="pt-0">
            <CardTitle class="text-xl font-bold">Genera entrenamientos personalizados.</CardTitle>
            <CardDescription class="text-sm">
              Entrena agentes con simulaciones IA que replican escenarios reales y mejoran sus
              habilidades.
            </CardDescription>
          </CardHeader>
        </Card>

        <!-- Feature 3 -->
        <Card class="border-0 bg-emerald-50 shadow-none dark:bg-emerald-950/30">
          <CardContent class="pt-6">
            <div class="mb-4 overflow-hidden rounded-lg bg-white p-4 shadow-sm dark:bg-white/10">
              <div class="flex flex-col gap-2">
                <p class="text-xs font-semibold">Conversation performance</p>
                <div class="mb-1 flex items-center gap-3">
                  <div class="flex items-center gap-1">
                    <span class="inline-block size-2.5 rounded-sm bg-emerald-500"></span>
                    <span class="text-[10px]">Reps</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="inline-block size-2.5 rounded-sm bg-teal-400"></span>
                    <span class="text-[10px]">Bots</span>
                  </div>
                </div>
                <div class="flex items-end gap-1.5">
                  <div class="flex w-full flex-col items-center gap-0.5">
                    <div class="h-10 w-full rounded-t-sm bg-emerald-400/60"></div>
                    <div class="h-6 w-full rounded-t-sm bg-teal-300/60"></div>
                  </div>
                  <div class="flex w-full flex-col items-center gap-0.5">
                    <div class="h-12 w-full rounded-t-sm bg-emerald-400/70"></div>
                    <div class="h-8 w-full rounded-t-sm bg-teal-300/70"></div>
                  </div>
                  <div class="flex w-full flex-col items-center gap-0.5">
                    <div class="h-8 w-full rounded-t-sm bg-emerald-400/50"></div>
                    <div class="h-10 w-full rounded-t-sm bg-teal-300/50"></div>
                  </div>
                  <div class="flex w-full flex-col items-center gap-0.5">
                    <div class="h-14 w-full rounded-t-sm bg-emerald-500/80"></div>
                    <div class="h-10 w-full rounded-t-sm bg-teal-400/80"></div>
                  </div>
                  <div class="flex w-full flex-col items-center gap-0.5">
                    <div class="h-16 w-full rounded-t-sm bg-emerald-500"></div>
                    <div class="h-12 w-full rounded-t-sm bg-teal-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardHeader class="pt-0">
            <CardTitle class="text-xl font-bold">Observa la satisfacción crecer.</CardTitle>
            <CardDescription class="text-sm">
              QA y entrenamiento trabajan juntos para mejorar cada conversación, ya sea humana o IA.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  </div>
</template>
