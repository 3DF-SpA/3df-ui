<script setup lang="ts">
import { Button } from '@3df-spa/ui';

import Icon from '@/components/MyIcons.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col gap-10 p-8">
    <h1 class="text-3xl font-bold">Button</h1>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">Variants</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">Sizes</h2>
      <div class="flex flex-wrap items-end gap-4">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="default">
          <Icon name="student" />
        </Button>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">States</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="text-muted-foreground text-sm font-medium">As link</h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button as="a" href="https://vuejs.org" target="_blank">As anchor</Button>
        <Button as="a" href="https://vuejs.org" target="_blank" variant="outline"
          >Outline anchor</Button
        >
        <Button as="a" href="https://vuejs.org" target="_blank" variant="link">Link anchor</Button>
      </div>
    </section>
  </div>
</template>
