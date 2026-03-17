import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiDrawer from '../UiDrawer.vue';
import UiDrawerContent from '../UiDrawerContent.vue';
import UiDrawerTrigger from '../UiDrawerTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiDrawerContent, UiDrawerTrigger },
};

describe('UiDrawer', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiDrawer, {
      global: globalConfig,
      slots: { default: '<UiDrawerTrigger><button>Abrir</button></UiDrawerTrigger>' },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('drawer cerrado por defecto (UiDrawerContent no visible)', () => {
    const wrapper = mount(UiDrawer, {
      global: globalConfig,
      slots: {
        default:
          '<UiDrawerTrigger><button>Abrir</button></UiDrawerTrigger>' +
          '<UiDrawerContent>Contenido</UiDrawerContent>',
      },
    });

    expect(wrapper.find('[data-drawer="content"]').exists()).toBe(false);
  });

  it('abre al click en trigger', async () => {
    const wrapper = mount(UiDrawer, {
      global: globalConfig,
      slots: {
        default:
          '<UiDrawerTrigger><button>Abrir</button></UiDrawerTrigger>' +
          '<UiDrawerContent>Contenido</UiDrawerContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[data-drawer="content"]').exists()).toBe(true);
  });

  it('cierra el drawer mediante el botón de cierre integrado', async () => {
    const wrapper = mount(UiDrawer, {
      global: globalConfig,
      slots: {
        default:
          '<UiDrawerTrigger><button>Abrir</button></UiDrawerTrigger>' +
          '<UiDrawerContent>Contenido</UiDrawerContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');
    expect(wrapper.find('[data-drawer="content"]').exists()).toBe(true);

    // El botón de cierre integrado tiene aria-label="Close"
    await wrapper.find('[aria-label="Close"]').trigger('click');

    expect(wrapper.find('[data-drawer="content"]').attributes('data-state')).toBe('closed');
  });

  it('merge de clase en UiDrawerContent', async () => {
    const wrapper = mount(UiDrawer, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiDrawerContent class="clase-drawer">Contenido</UiDrawerContent>',
      },
    });

    expect(wrapper.find('[data-drawer="content"]').classes()).toContain('clase-drawer');
  });
});
