<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@3df/ui';

import DocShowcase from '@/components/docs/DocShowcase.vue';

const { t } = useI18n();

const codeRich = `<HoverCard>
  <HoverCardTrigger>
    <div class="flex items-center gap-2">
      <div class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full text-xs font-bold">NM</div>
      <span class="text-sm font-medium underline decoration-dotted underline-offset-4">Nicolás M.</span>
    </div>
  </HoverCardTrigger>
  <HoverCardContent class="w-80">
    <!-- Avatar, bio, stats -->
  </HoverCardContent>
</HoverCard>`;
</script>

<template>
  <DocShowcase
    :title="t('demo.hoverCard.richContent')"
    :description="t('demo.hoverCard.richContentDesc')"
    :code="codeRich"
  >
    <HoverCard>
      <HoverCardTrigger>
        <div class="flex cursor-default items-center gap-2">
          <div
            class="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
          >
            NM
          </div>
          <span class="text-sm font-medium underline decoration-dotted underline-offset-4">
            Nicolás M.
          </span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent class="w-80">
        <div class="flex gap-4">
          <div
            class="bg-primary text-primary-foreground flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold"
          >
            NM
          </div>
          <div class="space-y-1">
            <h4 class="text-sm font-semibold">Nicolás M.</h4>
            <p class="text-muted-foreground text-sm">
              Full-stack developer. Vue.js & TypeScript enthusiast.
            </p>
            <div class="flex gap-4 pt-2">
              <div class="flex items-center gap-1">
                <span class="text-xs font-semibold">128</span>
                <span class="text-muted-foreground text-xs">repos</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-xs font-semibold">1.4k</span>
                <span class="text-muted-foreground text-xs">followers</span>
              </div>
              <div class="flex items-center gap-1">
                <span class="text-xs font-semibold">42</span>
                <span class="text-muted-foreground text-xs">following</span>
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  </DocShowcase>
</template>
