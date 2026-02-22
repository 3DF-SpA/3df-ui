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

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'default' | 'outline';
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: 'Free',
    description: 'Para proyectos personales y experimentación.',
    price: '$0',
    features: [
      { text: '1 proyecto', included: true },
      { text: '100 MB almacenamiento', included: true },
      { text: 'Soporte por comunidad', included: true },
      { text: 'Dominio personalizado', included: false },
      { text: 'Analytics avanzados', included: false },
    ],
    buttonText: 'Empezar gratis',
    buttonVariant: 'outline',
  },
  {
    name: 'Pro',
    description: 'Para equipos pequeños y freelancers.',
    price: '$19',
    features: [
      { text: '10 proyectos', included: true },
      { text: '10 GB almacenamiento', included: true },
      { text: 'Soporte prioritario', included: true },
      { text: 'Dominio personalizado', included: true },
      { text: 'Analytics avanzados', included: false },
    ],
    buttonText: 'Suscribirse',
    buttonVariant: 'default',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'Para organizaciones con necesidades avanzadas.',
    price: '$49',
    features: [
      { text: 'Proyectos ilimitados', included: true },
      { text: '100 GB almacenamiento', included: true },
      { text: 'Soporte 24/7 dedicado', included: true },
      { text: 'Dominio personalizado', included: true },
      { text: 'Analytics avanzados', included: true },
    ],
    buttonText: 'Contactar ventas',
    buttonVariant: 'outline',
  },
];
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">Cards de planes (pricing)</h2>
    <div class="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card
        v-for="plan in plans"
        :key="plan.name"
        :class="plan.popular ? 'border-primary relative border-2' : ''"
      >
        <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge>Más popular</Badge>
        </div>
        <CardHeader>
          <CardTitle>{{ plan.name }}</CardTitle>
          <CardDescription>{{ plan.description }}</CardDescription>
          <div class="mt-2">
            <span class="text-3xl font-bold">{{ plan.price }}</span>
            <span class="text-muted-foreground text-sm">/mes</span>
          </div>
        </CardHeader>
        <CardContent>
          <ul class="flex flex-col gap-3 text-sm">
            <li
              v-for="feature in plan.features"
              :key="feature.text"
              class="flex items-center gap-2"
              :class="{ 'text-muted-foreground': !feature.included }"
            >
              <svg
                v-if="feature.included"
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
              <svg
                v-else
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
              {{ feature.text }}
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button :variant="plan.buttonVariant" class="w-full">{{ plan.buttonText }}</Button>
        </CardFooter>
      </Card>
    </div>
  </section>
</template>
