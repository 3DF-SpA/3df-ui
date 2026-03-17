<script setup lang="ts">
import { computed } from 'vue';
import { useDocPage } from '@/i18n/composables/useDocPage';
import { LogoCloud, type LogoItem } from '@3df/ui';

import DocHeader from '@/components/docs/DocHeader.vue';
import DocPropsTable from '@/components/docs/DocPropsTable.vue';
import type { PropItem } from '@/components/docs/DocPropsTable.vue';
import DocShowcase from '@/components/docs/DocShowcase.vue';

import LogosDemoMarquee from './_components/LogosDemoMarquee.vue';

const { description, propDesc, showcaseTitle } = useDocPage('logos');

const techLogos: LogoItem[] = [
  {
    name: 'Vue.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    href: 'https://vuejs.org',
  },
  {
    name: 'TypeScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    href: 'https://typescriptlang.org',
  },
  {
    name: 'Tailwind',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    href: 'https://tailwindcss.com',
  },
  {
    name: 'Vite',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    href: 'https://vitejs.dev',
  },
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    href: 'https://nodejs.org',
  },
  {
    name: 'PostgreSQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'Docker',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'GitHub',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
  },
];

const brandLogos: LogoItem[] = [
  {
    name: 'React',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    name: 'Angular',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  },
  {
    name: 'Svelte',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg',
  },
  {
    name: 'Python',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  { name: 'Go', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  {
    name: 'Rust',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg',
  },
  {
    name: 'Redis',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  },
  {
    name: 'AWS',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Figma',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Linux',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
];

const cloudProps = computed<PropItem[]>(() => [
  {
    name: 'logos',
    type: 'LogoItem[]',
    default: '—',
    description: propDesc('logos'),
  },
  {
    name: 'columns',
    type: '3 | 4 | 5 | 6',
    default: '4',
    description: propDesc('columns'),
  },
  {
    name: 'showNames',
    type: 'boolean',
    default: 'false',
    description: propDesc('showNames'),
  },
  {
    name: 'logoHeight',
    type: 'number',
    default: '40',
    description: propDesc('logoHeight'),
  },
  {
    name: 'grayscale',
    type: 'boolean',
    default: 'true',
    description: propDesc('grayscale'),
  },
  {
    name: 'heading',
    type: 'string',
    default: 'undefined',
    description: propDesc('heading'),
  },
]);

const marqueeProps = computed<PropItem[]>(() => [
  {
    name: 'logos',
    type: 'LogoItem[]',
    default: '—',
    description: propDesc('logos'),
  },
  {
    name: 'direction',
    type: "'left' | 'right'",
    default: "'left'",
    description: propDesc('direction'),
  },
  {
    name: 'duration',
    type: 'number',
    default: '30',
    description: propDesc('duration'),
  },
  {
    name: 'hoverDuration',
    type: 'number',
    default: '80',
    description: propDesc('hoverDuration'),
  },
  { name: 'logoHeight', type: 'number', default: '40', description: propDesc('logoHeight') },
  { name: 'gap', type: 'number', default: '48', description: propDesc('gap') },
  {
    name: 'grayscale',
    type: 'boolean',
    default: 'true',
    description: propDesc('grayscale'),
  },
  {
    name: 'fadeMask',
    type: 'boolean',
    default: 'true',
    description: propDesc('fadeMask'),
  },
  {
    name: 'pauseOnHover',
    type: 'boolean',
    default: 'false',
    description: propDesc('pauseOnHover'),
  },
  {
    name: 'showNames',
    type: 'boolean',
    default: 'false',
    description: propDesc('showNames'),
  },
  {
    name: 'heading',
    type: 'string',
    default: 'undefined',
    description: propDesc('heading'),
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: 'false',
    description: propDesc('reverse'),
  },
]);

const cloudCode = `<LogoCloud
  :logos="logos"
  heading="Tecnologías que usamos"
  :columns="4"
  :show-names="true"
  :logo-height="44"
/>`;

const cloudColorCode = `<LogoCloud
  :logos="logos"
  :columns="5"
  :grayscale="false"
  :logo-height="36"
/>`;
</script>

<template>
  <div class="flex flex-col gap-10">
    <DocHeader
      title="LogoCloud & LogoMarquee"
      :description="description"
      import-code="import { LogoCloud, LogoMarquee, type LogoItem } from '@3df/ui'"
    />

    <DocShowcase :title="showcaseTitle('cloudGrayscale')" :code="cloudCode">
      <div class="border-border bg-card rounded-xl border p-8">
        <LogoCloud
          :logos="techLogos"
          heading="Tecnologías que usamos"
          :columns="4"
          :show-names="true"
          :logo-height="44"
        />
      </div>
    </DocShowcase>

    <DocShowcase :title="showcaseTitle('cloudColor')" :code="cloudColorCode">
      <div class="border-border bg-card rounded-xl border p-8">
        <LogoCloud :logos="brandLogos" :columns="5" :grayscale="false" :logo-height="36" />
      </div>
    </DocShowcase>

    <LogosDemoMarquee />

    <DocPropsTable title="LogoCloud Props" :props="cloudProps" />
    <DocPropsTable title="LogoMarquee Props" :props="marqueeProps" />
  </div>
</template>
