import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

// Mock embla-carousel antes de importar el componente
vi.mock('embla-carousel', () => ({
  default: vi.fn(() => ({
    destroy: vi.fn(),
    canScrollPrev: vi.fn(() => false),
    canScrollNext: vi.fn(() => false),
    on: vi.fn(),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
  })),
}));

import UiCarousel from '../UiCarousel.vue';
import UiCarouselContent from '../UiCarouselContent.vue';
import UiCarouselItem from '../UiCarouselItem.vue';

describe('UiCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renderiza correctamente', () => {
    const wrapper = mount(UiCarousel);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un div con role="region"', () => {
    const wrapper = mount(UiCarousel);
    expect(wrapper.find('[role="region"]').exists()).toBe(true);
  });

  it('tiene aria-roledescription="carousel"', () => {
    const wrapper = mount(UiCarousel);
    expect(wrapper.find('[role="region"]').attributes('aria-roledescription')).toBe('carousel');
  });

  it('renderiza el slot default', () => {
    const wrapper = mount(UiCarousel, {
      slots: { default: '<span class="carousel-slot">Contenido</span>' },
    });
    expect(wrapper.find('.carousel-slot').exists()).toBe(true);
  });

  it('renderiza UiCarouselContent y UiCarouselItem en el slot', () => {
    const wrapper = mount(UiCarousel, {
      slots: {
        default: {
          components: { UiCarouselContent, UiCarouselItem },
          template: `
            <UiCarouselContent>
              <UiCarouselItem><span class="slide-1">Slide 1</span></UiCarouselItem>
              <UiCarouselItem><span class="slide-2">Slide 2</span></UiCarouselItem>
            </UiCarouselContent>
          `,
        },
      },
    });
    expect(wrapper.find('.slide-1').text()).toBe('Slide 1');
    expect(wrapper.find('.slide-2').text()).toBe('Slide 2');
  });

  it('UiCarouselItem tiene role="group" y aria-roledescription="slide"', () => {
    const wrapper = mount(UiCarousel, {
      slots: {
        default: {
          components: { UiCarouselContent, UiCarouselItem },
          template: `
            <UiCarouselContent>
              <UiCarouselItem>Item</UiCarouselItem>
            </UiCarouselContent>
          `,
        },
      },
    });
    const item = wrapper.find('[role="group"]');
    expect(item.exists()).toBe(true);
    expect(item.attributes('aria-roledescription')).toBe('slide');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiCarousel, { attrs: { class: 'custom-carousel' } });
    expect(wrapper.find('[role="region"]').attributes('class')).toContain('custom-carousel');
  });
});
