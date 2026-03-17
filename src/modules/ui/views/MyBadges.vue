<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { Badge, Button } from '@3df-spa/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import BadgeDemoIcons from './_components/BadgeDemoIcons.vue';

const { description, propDesc, showcaseTitle, showcaseDesc } = useDocPage('badges');
const { t } = useI18n();

const badgeProps = computed<PropItem[]>(() => [
  {
    name: 'variant',
    type: "'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'indigo' | 'purple' | 'pink' | 'gray'",
    default: "'default'",
    description: propDesc('variant'),
  },
  {
    name: 'size',
    type: "'sm' | 'default' | 'lg'",
    default: "'default'",
    description: propDesc('size'),
  },
  { name: 'as', type: 'string', default: "'span'", description: propDesc('as') },
  {
    name: 'truncate',
    type: 'boolean',
    default: 'false',
    description: propDesc('truncate'),
  },
]);

const variantsCode = `<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>`;

const colorsCode = `<Badge variant="red">Red</Badge>
<Badge variant="blue">Blue</Badge>
<Badge variant="green">Green</Badge>
<!-- También funciona con class="rounded-full" -->
<Badge variant="purple" class="rounded-full">Purple</Badge>`;

const sizesCode = `<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>`;

const iconsCode = `<Badge variant="success">
  <svg><!-- check icon --></svg>
  Approved
</Badge>
<Badge variant="destructive">
  <svg><!-- X icon --></svg>
  Rejected
</Badge>`;

const pillCode = `<Badge class="rounded-full">Default pill</Badge>
<Badge variant="secondary" class="rounded-full">Secondary pill</Badge>
<Badge variant="success" class="rounded-full">Success pill</Badge>`;

const asLinkCode = `<Badge as="a" href="#" class="hover:bg-primary/85 cursor-pointer transition-[background-color] duration-200">
  Clickable
</Badge>
<Badge as="a" href="#" variant="outline" class="hover:bg-accent cursor-pointer transition-[background-color] duration-200">
  Outline link
</Badge>`;

const contextCode = `<Button>
  Inbox
  <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
</Button>
<span class="text-sm font-medium">Server status</span>
<Badge variant="success" size="sm">Online</Badge>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="Badge"
      :description="description"
      import-code="import { Badge } from '@3df-spa/ui'"
    />

    <DocShowcase
      :title="showcaseTitle('variants')"
      :description="showcaseDesc('variants')"
      :code="variantsCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('colors')"
      :description="showcaseDesc('colors')"
      :code="colorsCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
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
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <Badge variant="red" class="rounded-full">Red</Badge>
          <Badge variant="orange" class="rounded-full">Orange</Badge>
          <Badge variant="yellow" class="rounded-full">Yellow</Badge>
          <Badge variant="green" class="rounded-full">Green</Badge>
          <Badge variant="teal" class="rounded-full">Teal</Badge>
          <Badge variant="blue" class="rounded-full">Blue</Badge>
          <Badge variant="indigo" class="rounded-full">Indigo</Badge>
          <Badge variant="purple" class="rounded-full">Purple</Badge>
          <Badge variant="pink" class="rounded-full">Pink</Badge>
          <Badge variant="gray" class="rounded-full">Gray</Badge>
        </div>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('sizes')"
      :description="showcaseDesc('sizes')"
      :code="sizesCode"
    >
      <div class="flex flex-wrap items-end gap-4">
        <Badge size="sm">Small</Badge>
        <Badge size="default">Default</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('withIcons')"
      :description="showcaseDesc('withIcons')"
      :code="iconsCode"
    >
      <BadgeDemoIcons />
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('pill')"
      :description="showcaseDesc('pill')"
      :code="pillCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge class="rounded-full">Default pill</Badge>
        <Badge variant="secondary" class="rounded-full">Secondary pill</Badge>
        <Badge variant="success" class="rounded-full">Success pill</Badge>
        <Badge variant="destructive" class="rounded-full">Destructive pill</Badge>
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('asLink')"
      :description="showcaseDesc('asLink')"
      :code="asLinkCode"
    >
      <div class="flex flex-wrap items-center gap-4">
        <Badge
          as="a"
          href="#"
          class="hover:bg-primary/85 cursor-pointer transition-[background-color] duration-200"
          >Clickable</Badge
        >
        <Badge
          as="a"
          href="#"
          variant="outline"
          class="hover:bg-accent cursor-pointer transition-[background-color] duration-200"
          >Outline link</Badge
        >
        <Badge
          as="a"
          href="#"
          variant="blue"
          class="cursor-pointer transition-[background-color] duration-200 hover:bg-blue-700"
          >Blue link</Badge
        >
      </div>
    </DocShowcase>

    <DocShowcase
      :title="showcaseTitle('context')"
      :description="showcaseDesc('context')"
      :code="contextCode"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-center gap-4">
          <Button>
            {{ t('demo.inbox') }}
            <Badge variant="secondary" size="sm" class="rounded-full">24</Badge>
          </Button>
          <Button variant="outline">
            {{ t('demo.notifications') }}
            <Badge variant="destructive" size="sm" class="rounded-full">3</Badge>
          </Button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">{{ t('demo.serverStatus') }}</span>
          <Badge variant="success" size="sm">Online</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">{{ t('demo.maintenance') }}</span>
          <Badge variant="warning" size="sm">{{ t('demo.scheduled') }}</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">{{ t('demo.version') }}</span>
          <Badge variant="blue" size="sm">v2.1.0</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm font-medium">{{ t('demo.priority') }}</span>
          <Badge variant="purple" size="sm">{{ t('demo.high') }}</Badge>
        </div>
      </div>
    </DocShowcase>

    <DocPropsTable :props="badgeProps" />
  </div>
</template>
