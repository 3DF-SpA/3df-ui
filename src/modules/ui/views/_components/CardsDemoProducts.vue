<script setup lang="ts">
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@3df-spa/ui';
</script>

<template>
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
              Cámara instantánea con flash integrado y modos de exposición automáticos. Incluye pack
              de 10 fotos.
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
</template>
