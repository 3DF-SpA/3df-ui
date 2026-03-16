import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';

import UiHoverCard from '../UiHoverCard.vue';
import UiHoverCardContent from '../UiHoverCardContent.vue';
import UiHoverCardTrigger from '../UiHoverCardTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiHoverCardContent, UiHoverCardTrigger },
};

describe('UiHoverCard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiHoverCard, {
      global: globalConfig,
      slots: { default: '<UiHoverCardTrigger>Hover</UiHoverCardTrigger>' },
    });

    expect(wrapper.exists()).toBe(true);
    // El root de UiHoverCard es un div.inline-block
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('content no visible cuando el hover card está cerrado', () => {
    const wrapper = mount(UiHoverCard, {
      global: globalConfig,
      slots: {
        default:
          '<UiHoverCardTrigger>Hover</UiHoverCardTrigger>' +
          '<UiHoverCardContent>Contenido</UiHoverCardContent>',
      },
    });

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
  });

  it('merge de clase en UiHoverCardContent (con openDelay=0)', async () => {
    const wrapper = mount(UiHoverCard, {
      props: { openDelay: 0 },
      global: globalConfig,
      slots: {
        default:
          '<UiHoverCardTrigger>Hover</UiHoverCardTrigger>' +
          '<UiHoverCardContent class="clase-hover-card">Contenido</UiHoverCardContent>',
      },
    });

    // Disparar mouseenter en el trigger (div con tabindex="0")
    await wrapper.find('[tabindex="0"]').trigger('mouseenter');
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find('[role="tooltip"]').classes()).toContain('clase-hover-card');
  });
});
