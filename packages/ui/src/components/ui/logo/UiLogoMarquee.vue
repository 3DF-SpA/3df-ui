<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, useAttrs } from 'vue';
import type { ClassValue } from 'clsx';

import { cn } from '../../../lib/utils';
import type { LogoItem } from './UiLogoCloud.vue';

defineOptions({ name: 'UiLogoMarquee', inheritAttrs: false });

export type MarqueeDirection = 'left' | 'right';

interface Props {
  /** Array of logos to scroll */
  logos: LogoItem[];
  /** Scroll direction */
  direction?: MarqueeDirection;
  /** Animation duration in seconds (full cycle) */
  duration?: number;
  /** Duration when hovered (higher = slower). */
  hoverDuration?: number;
  /** Logo image max height in px */
  logoHeight?: number;
  /** Gap between logos in px */
  gap?: number;
  /** Grayscale logos */
  grayscale?: boolean;
  /** Show fade masks on edges */
  fadeMask?: boolean;
  /** Pause completely on hover instead of slowing */
  pauseOnHover?: boolean;
  /** Show company names */
  showNames?: boolean;
  /** Optional heading */
  heading?: string;
  /** Enable reverse row (two rows going opposite directions) */
  reverse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'left',
  duration: 30,
  hoverDuration: 80,
  logoHeight: 40,
  gap: 48,
  grayscale: true,
  fadeMask: true,
  pauseOnHover: false,
  showNames: false,
  reverse: false,
});

const attrs = useAttrs() as Record<string, unknown> & { class?: ClassValue };

const restAttrs = computed(() => {
  const { class: _cls, ...rest } = attrs;
  return rest;
});

/* ── Web Animations API engine ───────────────────────────── */
/*  CSS compositor handles the actual pixel movement (smooth) */
/*  playbackRate changes speed without position jumps.        */

const primaryRef = ref<HTMLElement | null>(null);
const reverseRef = ref<HTMLElement | null>(null);

let primaryAnim: Animation | null = null;
let reverseAnim: Animation | null = null;

const hoverRate = computed(() => props.duration / props.hoverDuration);

function createAnimation(el: HTMLElement, reverse: boolean): Animation {
  const dir = props.direction === 'left';
  const sign = reverse ? !dir : dir;
  const from = sign ? '0%' : '-50%';
  const to = sign ? '-50%' : '0%';

  const anim = el.animate(
    [
      { transform: `translateX(${from})` },
      { transform: `translateX(${to})` },
    ],
    {
      duration: props.duration * 1000,
      iterations: Infinity,
      easing: 'linear',
    },
  );
  return anim;
}

function onHoverEnter() {
  if (props.pauseOnHover) {
    primaryAnim?.pause();
    reverseAnim?.pause();
  } else {
    const rate = hoverRate.value;
    primaryAnim?.updatePlaybackRate(rate);
    reverseAnim?.updatePlaybackRate(rate);
  }
}

function onHoverLeave() {
  if (props.pauseOnHover) {
    primaryAnim?.play();
    reverseAnim?.play();
  } else {
    primaryAnim?.updatePlaybackRate(1);
    reverseAnim?.updatePlaybackRate(1);
  }
}

onMounted(() => {
  if (primaryRef.value) {
    primaryAnim = createAnimation(primaryRef.value, false);
  }
  if (props.reverse && reverseRef.value) {
    reverseAnim = createAnimation(reverseRef.value, true);
  }
});

onBeforeUnmount(() => {
  primaryAnim?.cancel();
  reverseAnim?.cancel();
});
</script>

<template>
  <div
    v-bind="restAttrs"
    :class="cn('w-full overflow-hidden', attrs.class)"
  >
    <!-- Optional heading -->
    <p
      v-if="heading"
      class="mb-8 text-center text-sm font-medium tracking-wider text-muted-foreground uppercase"
    >
      {{ heading }}
    </p>

    <!-- Primary row -->
    <div
      :class="cn('relative', fadeMask && 'mask-fade')"
      @mouseenter="onHoverEnter"
      @mouseleave="onHoverLeave"
    >
      <div
        ref="primaryRef"
        class="flex w-max items-center"
        :style="{ gap: `${gap}px` }"
      >
        <!-- Set A (original) -->
        <div
          v-for="logo in logos"
          :key="`a-${logo.name}`"
          class="flex shrink-0 flex-col items-center gap-2 px-2 pointer-events-none select-none"
        >
          <img
            :src="logo.src"
            :alt="logo.alt ?? logo.name"
            :style="{ height: `${logoHeight}px`, width: 'auto' }"
            :class="cn(
              'object-contain',
              grayscale && 'opacity-60 grayscale',
              !grayscale && 'opacity-80',
            )"
            loading="lazy"
            draggable="false"
          />
          <span
            v-if="showNames"
            class="text-xs font-medium text-muted-foreground whitespace-nowrap"
          >
            {{ logo.name }}
          </span>
        </div>
        <!-- Set B (exact duplicate for seamless loop) -->
        <div
          v-for="logo in logos"
          :key="`b-${logo.name}`"
          class="flex shrink-0 flex-col items-center gap-2 px-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <img
            :src="logo.src"
            alt=""
            :style="{ height: `${logoHeight}px`, width: 'auto' }"
            :class="cn(
              'object-contain',
              grayscale && 'opacity-60 grayscale',
              !grayscale && 'opacity-80',
            )"
            loading="lazy"
            draggable="false"
          />
          <span
            v-if="showNames"
            class="text-xs font-medium text-muted-foreground whitespace-nowrap"
          >
            {{ logo.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Optional reverse row (opposite direction) -->
    <div
      v-if="reverse"
      :class="cn('relative mt-6', fadeMask && 'mask-fade')"
      @mouseenter="onHoverEnter"
      @mouseleave="onHoverLeave"
    >
      <div
        ref="reverseRef"
        class="flex w-max items-center"
        :style="{ gap: `${gap}px` }"
      >
        <div
          v-for="logo in logos"
          :key="`ra-${logo.name}`"
          class="flex shrink-0 flex-col items-center gap-2 px-2 pointer-events-none select-none"
        >
          <img
            :src="logo.src"
            :alt="logo.alt ?? logo.name"
            :style="{ height: `${logoHeight}px`, width: 'auto' }"
            :class="cn(
              'object-contain',
              grayscale && 'opacity-60 grayscale',
              !grayscale && 'opacity-80',
            )"
            loading="lazy"
            draggable="false"
          />
          <span
            v-if="showNames"
            class="text-xs font-medium text-muted-foreground whitespace-nowrap"
          >
            {{ logo.name }}
          </span>
        </div>
        <div
          v-for="logo in logos"
          :key="`rb-${logo.name}`"
          class="flex shrink-0 flex-col items-center gap-2 px-2 pointer-events-none select-none"
          aria-hidden="true"
        >
          <img
            :src="logo.src"
            alt=""
            :style="{ height: `${logoHeight}px`, width: 'auto' }"
            :class="cn(
              'object-contain',
              grayscale && 'opacity-60 grayscale',
              !grayscale && 'opacity-80',
            )"
            loading="lazy"
            draggable="false"
          />
          <span
            v-if="showNames"
            class="text-xs font-medium text-muted-foreground whitespace-nowrap"
          >
            {{ logo.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Fade mask on both edges */
.mask-fade {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}
</style>
