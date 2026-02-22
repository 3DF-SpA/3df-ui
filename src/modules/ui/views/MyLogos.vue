<script setup lang="ts">
import { LogoCloud, LogoMarquee, type LogoItem } from '@3df-spa/ui';



const techLogos: LogoItem[] = [
  { name: 'Vue.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', href: 'https://vuejs.org' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', href: 'https://typescriptlang.org' },
  { name: 'Tailwind', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', href: 'https://tailwindcss.com' },
  { name: 'Vite', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', href: 'https://vitejs.dev' },
  { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', href: 'https://nodejs.org' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
];

const brandLogos: LogoItem[] = [
  { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Angular', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Svelte', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Go', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'Rust', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
  { name: 'Redis', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'AWS', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Figma', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Linux', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
];

const row2Logos: LogoItem[] = [
  { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
  { name: 'GraphQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
  { name: 'Kubernetes', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
  { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Nginx', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
  { name: 'Sass', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Webpack', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
  { name: 'Jest', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg' },
];
</script>

<template>
  <div class="mx-auto max-w-5xl space-y-16 p-8">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Logo Cloud & Marquee</h1>
      <p class="mt-2 text-muted-foreground">
        Muestra marcas, sponsors y partners. Grid estático o marquee infinito con efecto hover-to-slow.
      </p>
    </div>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Logo Cloud — Grid con Grayscale</h2>
        <p class="text-sm text-muted-foreground">
          Grid estático 4 columnas. Logos en grayscale, color al hover. Con nombres.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-8">
        <LogoCloud
          :logos="techLogos"
          heading="Tecnologías que usamos"
          :columns="4"
          :show-names="true"
          :logo-height="44"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Logo Cloud — Full Color, 6 Columnas</h2>
        <p class="text-sm text-muted-foreground">
          Sin filtro grayscale, 6 columnas, sin nombres.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card p-8">
        <LogoCloud
          :logos="brandLogos"
          :columns="5"
          :grayscale="false"
          :logo-height="36"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Logo Marquee — Hover to Slow</h2>
        <p class="text-sm text-muted-foreground">
          Scroll infinito. Al hacer hover el scroll se desacelera suavemente (30s → 80s).
          Logos en grayscale, color al hover individual.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card py-10">
        <LogoMarquee
          :logos="techLogos"
          heading="Trusted by leading companies"
          :duration="25"
          :hover-duration="70"
          :logo-height="44"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Marquee — Full Color, Hover to Slow</h2>
        <p class="text-sm text-muted-foreground">
          Sin grayscale, con nombres. Al hacer hover se frena drásticamente (35s → 150s).
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card py-10">
        <LogoMarquee
          :logos="brandLogos"
          :grayscale="false"
          :show-names="true"
          :duration="35"
          :hover-duration="150"
          :logo-height="36"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Dual Marquee — Dos Filas Opuestas</h2>
        <p class="text-sm text-muted-foreground">
          Usa <code>reverse</code> para una segunda fila que va en dirección contraria.
          Efecto muy visual para landing pages.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card py-10">
        <LogoMarquee
          :logos="row2Logos"
          :reverse="true"
          :duration="20"
          :hover-duration="60"
          :logo-height="40"
          heading="Our Partners"
        />
      </div>
    </section>

    
    <section class="space-y-4">
      <div>
        <h2 class="text-xl font-semibold">Fast Marquee — Sin Fade Mask</h2>
        <p class="text-sm text-muted-foreground">
          Sin máscara de desvanecimiento, velocidad alta (12s), sin grayscale.
        </p>
      </div>
      <div class="rounded-xl border border-border bg-card py-10">
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
    </section>
  </div>
</template>