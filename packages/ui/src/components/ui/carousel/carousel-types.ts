import type { InjectionKey, Ref } from 'vue';
import type { EmblaCarouselType } from 'embla-carousel';

export type CarouselOrientation = 'horizontal' | 'vertical';

export interface CarouselContext {
  orientation: Ref<CarouselOrientation>;
  viewportRef: Ref<HTMLElement | undefined>;
  api: Ref<EmblaCarouselType | undefined>;
  canScrollPrev: Ref<boolean>;
  canScrollNext: Ref<boolean>;
  scrollPrev: () => void;
  scrollNext: () => void;
}

export const CAROUSEL_KEY: InjectionKey<CarouselContext> = Symbol('carousel');
