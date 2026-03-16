<script setup lang="ts">
import { type LogoItem, LogoMarquee } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const techLogos: LogoItem[] = [
  {
    name: 'Vue.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'TypeScript',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Tailwind',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
  },
  {
    name: 'Vite',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
  },
  {
    name: 'Node.js',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
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

const row2Logos: LogoItem[] = [
  {
    name: 'Firebase',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
  },
  {
    name: 'GraphQL',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg',
  },
  {
    name: 'Kubernetes',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
  },
  {
    name: 'MongoDB',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    name: 'Nginx',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  },
  {
    name: 'Sass',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
  },
  {
    name: 'Webpack',
    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg',
  },
  { name: 'Jest', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
];

const marqueeCode = `<LogoMarquee
  :logos="logos"
  heading="Trusted by leading companies"
  :duration="25"
  :hover-duration="70"
  :logo-height="44"
/>`;

const reverseCode = `<LogoMarquee
  :logos="logos"
  :reverse="true"
  :duration="20"
  :hover-duration="60"
  heading="Our Partners"
/>`;

const noFadeCode = `<LogoMarquee
  :logos="logos"
  :duration="12"
  :fade-mask="false"
  :grayscale="false"
/>`;
</script>

<template>
  <DocShowcase title="Marquee — Hover to Slow" :code="marqueeCode">
    <div class="border-border bg-card rounded-xl border py-10">
      <LogoMarquee
        :logos="techLogos"
        heading="Trusted by leading companies"
        :duration="25"
        :hover-duration="70"
        :logo-height="44"
      />
    </div>
  </DocShowcase>

  <DocShowcase title="Marquee — Full Color con nombres" code="">
    <div class="border-border bg-card rounded-xl border py-10">
      <LogoMarquee
        :logos="brandLogos"
        :grayscale="false"
        :show-names="true"
        :duration="35"
        :hover-duration="150"
        :logo-height="36"
      />
    </div>
  </DocShowcase>

  <DocShowcase title="Dual Marquee — Dos filas opuestas" :code="reverseCode">
    <div class="border-border bg-card rounded-xl border py-10">
      <LogoMarquee
        :logos="row2Logos"
        :reverse="true"
        :duration="20"
        :hover-duration="60"
        :logo-height="40"
        heading="Our Partners"
      />
    </div>
  </DocShowcase>

  <DocShowcase title="Fast Marquee — Sin Fade Mask" :code="noFadeCode">
    <div class="border-border bg-card rounded-xl border py-10">
      <LogoMarquee
        :logos="[...techLogos, ...row2Logos.slice(0, 4)]"
        :duration="12"
        :hover-duration="40"
        :fade-mask="false"
        :grayscale="false"
        :logo-height="32"
        :gap="64"
      />
    </div>
  </DocShowcase>
</template>
