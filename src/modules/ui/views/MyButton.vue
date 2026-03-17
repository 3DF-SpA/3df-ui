<script setup lang="ts">
import { computed } from 'vue';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { Button } from '@3df/ui';

import Icon from '@/components/MyIcons.vue';
import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('button');

const buttonProps = computed<PropItem[]>(() => [
  {
    name: 'variant',
    type: `'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'`,
    default: `'default'`,
    description: propDesc('variant'),
  },
  {
    name: 'size',
    type: `'default' | 'xs' | 'sm' | 'lg' | 'icon'`,
    default: `'default'`,
    description: propDesc('size'),
  },
  {
    name: 'as',
    type: 'string',
    default: `'button'`,
    description: propDesc('as'),
  },
  {
    name: 'truncate',
    type: 'boolean',
    default: 'false',
    description: propDesc('truncate'),
  },
]);

const variantsCode = `<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`;

const sizesCode = `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon name="student" />
</Button>`;

const statesCode = `<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>
<Button variant="destructive" disabled>Disabled</Button>`;

const asLinkCode = `<Button as="a" href="https://vuejs.org" target="_blank">As anchor</Button>
<Button as="a" href="https://vuejs.org" target="_blank" variant="outline">Outline anchor</Button>
<Button as="a" href="https://vuejs.org" target="_blank" variant="link">Link anchor</Button>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Button"
      :description="description"
      import-code="import { Button } from '@3df/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('variants')"
      :description="showcaseDesc('variants')"
      :code="variantsCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('sizes')"
      :description="showcaseDesc('sizes')"
      :code="sizesCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon" variant="default">
          <Icon name="student" />
        </Button>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('states')"
      :description="showcaseDesc('states')"
      :code="statesCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button variant="destructive" disabled>Disabled</Button>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('asLink')"
      :description="showcaseDesc('asLink')"
      :code="asLinkCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Button as="a" href="https://vuejs.org" target="_blank">As anchor</Button>
        <Button as="a" href="https://vuejs.org" target="_blank" variant="outline"
          >Outline anchor</Button
        >
        <Button as="a" href="https://vuejs.org" target="_blank" variant="link">Link anchor</Button>
      </div>
    </DocShowcase>

    <DocPropsTable :props="buttonProps" />
  </div>
</template>
