<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@3df/ui';

const { t } = useI18n();
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.cards.cardGrid') }}</h2>
    <div class="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle as="h4" class="text-base">{{ t('demo.cards.revenue') }}</CardTitle>
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
          <p class="text-muted-foreground text-xs">{{ t('demo.cards.revenueGrowth') }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle as="h4" class="text-base">{{ t('demo.users') }}</CardTitle>
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
          <p class="text-muted-foreground text-xs">{{ t('demo.cards.usersGrowth') }}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle as="h4" class="text-base">{{ t('demo.cards.sales') }}</CardTitle>
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
          <p class="text-muted-foreground text-xs">{{ t('demo.cards.salesGrowth') }}</p>
        </CardContent>
      </Card>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.cards.productCards') }}</h2>
    <div class="grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card class="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop"
          :alt="t('demo.cards.minimalWatchAlt')"
          class="aspect-[3/2] w-full object-cover"
        />
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-base">{{ t('demo.cards.minimalWatch') }}</CardTitle>
            <Badge variant="secondary" size="sm">{{ t('demo.newLabel') }}</Badge>
          </div>
          <CardDescription>{{ t('demo.cards.minimalWatchDesc') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-bold">$129.00</span>
            <span class="text-muted-foreground text-sm line-through">$159.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" size="sm">{{ t('demo.cards.addToCart') }}</Button>
        </CardFooter>
      </Card>

      <Card class="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
          :alt="t('demo.cards.headphonesAlt')"
          class="aspect-[3/2] w-full object-cover"
        />
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-base">Studio Pro</CardTitle>
            <Badge variant="red" size="sm">-20%</Badge>
          </div>
          <CardDescription>{{ t('demo.cards.studioProDesc') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-bold">$239.00</span>
            <span class="text-muted-foreground text-sm line-through">$299.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" size="sm">{{ t('demo.cards.addToCart') }}</Button>
        </CardFooter>
      </Card>

      <Card class="overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=400&fit=crop"
          :alt="t('demo.cards.shoesAlt')"
          class="aspect-[3/2] w-full object-cover"
        />
        <CardHeader>
          <div class="flex items-center justify-between">
            <CardTitle class="text-base">{{ t('demo.cards.runnerX') }}</CardTitle>
            <Badge variant="success" size="sm">{{ t('demo.cards.inStock') }}</Badge>
          </div>
          <CardDescription>{{ t('demo.cards.runnerXDesc') }}</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-baseline gap-2">
            <span class="text-lg font-bold">$89.00</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" size="sm">{{ t('demo.cards.addToCart') }}</Button>
        </CardFooter>
      </Card>
    </div>
  </section>

  <section class="flex flex-col gap-4">
    <h2 class="text-muted-foreground text-sm font-medium">{{ t('demo.cards.horizontalProductCard') }}</h2>
    <div class="grid max-w-2xl gap-4">
      <Card class="flex flex-col overflow-hidden sm:flex-row">
        <img
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop"
          :alt="t('demo.cards.cameraAlt')"
          class="aspect-square w-full object-cover sm:w-48"
        />
        <div class="flex flex-1 flex-col">
          <CardHeader>
            <div class="flex items-center gap-2">
              <CardTitle class="text-base">{{ t('demo.cards.instantCamera') }}</CardTitle>
              <Badge variant="orange" size="sm">{{ t('demo.cards.offer') }}</Badge>
            </div>
            <CardDescription>
              {{ t('demo.cards.instantCameraDesc') }}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-baseline gap-2">
              <span class="text-lg font-bold">$69.00</span>
              <span class="text-muted-foreground text-sm line-through">$99.00</span>
            </div>
          </CardContent>
          <CardFooter class="mt-auto gap-2">
            <Button size="sm">{{ t('demo.cards.buyNow') }}</Button>
            <Button variant="outline" size="sm">{{ t('demo.viewDetails') }}</Button>
          </CardFooter>
        </div>
      </Card>
    </div>
  </section>
</template>
