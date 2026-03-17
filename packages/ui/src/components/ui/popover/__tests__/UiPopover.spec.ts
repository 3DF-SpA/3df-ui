import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiPopover from '../UiPopover.vue';
import UiPopoverContent from '../UiPopoverContent.vue';
import UiPopoverTrigger from '../UiPopoverTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiPopoverContent, UiPopoverTrigger },
};

describe('UiPopover', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiPopover, {
      global: globalConfig,
      slots: { default: '<UiPopoverTrigger><button>Abrir</button></UiPopoverTrigger>' },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('popover cerrado por defecto', () => {
    const wrapper = mount(UiPopover, {
      global: globalConfig,
      slots: {
        default:
          '<UiPopoverTrigger><button>Abrir</button></UiPopoverTrigger>' +
          '<UiPopoverContent>Contenido</UiPopoverContent>',
      },
    });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it('click en trigger abre el popover', async () => {
    const wrapper = mount(UiPopover, {
      global: globalConfig,
      slots: {
        default:
          '<UiPopoverTrigger><button>Abrir</button></UiPopoverTrigger>' +
          '<UiPopoverContent>Contenido</UiPopoverContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it('segundo click en trigger cierra el popover', async () => {
    const wrapper = mount(UiPopover, {
      global: globalConfig,
      slots: {
        default:
          '<UiPopoverTrigger><button>Abrir</button></UiPopoverTrigger>' +
          '<UiPopoverContent>Contenido</UiPopoverContent>',
      },
    });

    const trigger = wrapper.find('[role="button"]');
    await trigger.trigger('click');
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);

    await trigger.trigger('click');
    // isEntering = false → anim timeout 150ms; el elemento puede seguir en DOM brevemente
    // Verificamos que el contenido ya no se muestra como abierto
    expect(wrapper.find('[role="button"]').attributes('aria-expanded')).toBe('false');
  });

  it('merge de clase en UiPopoverContent', async () => {
    const wrapper = mount(UiPopover, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiPopoverContent class="clase-popover">Contenido</UiPopoverContent>',
      },
    });

    expect(wrapper.find('[role="dialog"]').classes()).toContain('clase-popover');
  });
});
