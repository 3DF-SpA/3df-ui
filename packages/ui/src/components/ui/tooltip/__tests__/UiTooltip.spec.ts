import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';

import UiTooltip from '../UiTooltip.vue';
import UiTooltipContent from '../UiTooltipContent.vue';
import UiTooltipTrigger from '../UiTooltipTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiTooltipTrigger, UiTooltipContent },
};

describe('UiTooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('content no visible cuando el tooltip está cerrado', () => {
    const wrapper = mount(UiTooltip, {
      global: globalConfig,
      slots: {
        default:
          '<UiTooltipTrigger>Hover</UiTooltipTrigger>' +
          '<UiTooltipContent>Texto tooltip</UiTooltipContent>',
      },
    });

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(false);
  });

  it('mouseenter en trigger abre el tooltip (con delay=0)', async () => {
    const wrapper = mount(UiTooltip, {
      props: { delay: 0 },
      global: globalConfig,
      slots: {
        default:
          '<UiTooltipTrigger>Hover</UiTooltipTrigger>' +
          '<UiTooltipContent>Texto tooltip</UiTooltipContent>',
      },
    });

    // El trigger renderiza un div con tabindex="0"
    await wrapper.find('[tabindex="0"]').trigger('mouseenter');
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
  });

  it('merge de clase en UiTooltipContent', async () => {
    const wrapper = mount(UiTooltip, {
      props: { delay: 0 },
      global: globalConfig,
      slots: {
        default:
          '<UiTooltipTrigger>Hover</UiTooltipTrigger>' +
          '<UiTooltipContent class="clase-tooltip">Texto tooltip</UiTooltipContent>',
      },
    });

    await wrapper.find('[tabindex="0"]').trigger('mouseenter');
    vi.runAllTimers();
    await nextTick();

    expect(wrapper.find('[role="tooltip"]').classes()).toContain('clase-tooltip');
  });
});
