import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiSheet from '../UiSheet.vue';
import UiSheetClose from '../UiSheetClose.vue';
import UiSheetContent from '../UiSheetContent.vue';
import UiSheetTrigger from '../UiSheetTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiSheetContent, UiSheetTrigger, UiSheetClose },
};

describe('UiSheet', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiSheet, {
      global: globalConfig,
      slots: { default: '<UiSheetTrigger><button>Abrir</button></UiSheetTrigger>' },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('sheet cerrado por defecto (UiSheetContent no visible)', () => {
    const wrapper = mount(UiSheet, {
      global: globalConfig,
      slots: {
        default:
          '<UiSheetTrigger><button>Abrir</button></UiSheetTrigger>' +
          '<UiSheetContent>Contenido</UiSheetContent>',
      },
    });

    expect(wrapper.find('[data-sheet="content"]').exists()).toBe(false);
  });

  it('side="left" aplica clases de posicionamiento izquierdo', async () => {
    const wrapper = mount(UiSheet, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiSheetContent side="left">Contenido</UiSheetContent>',
      },
    });

    const panel = wrapper.find('[data-sheet="content"]');
    expect(panel.exists()).toBe(true);
    expect(panel.classes().some((c) => c.includes('left-0'))).toBe(true);
  });

  it('side="right" aplica clases de posicionamiento derecho (por defecto)', async () => {
    const wrapper = mount(UiSheet, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiSheetContent side="right">Contenido</UiSheetContent>',
      },
    });

    const panel = wrapper.find('[data-sheet="content"]');
    expect(panel.exists()).toBe(true);
    expect(panel.classes().some((c) => c.includes('right-0'))).toBe(true);
  });

  it('UiSheetClose cierra el sheet', async () => {
    const wrapper = mount(UiSheet, {
      global: globalConfig,
      slots: {
        default:
          '<UiSheetTrigger><button>Abrir</button></UiSheetTrigger>' +
          '<UiSheetContent :showClose="false">' +
          '<UiSheetClose>Cerrar</UiSheetClose>' +
          '</UiSheetContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');
    expect(wrapper.find('[data-sheet="content"]').exists()).toBe(true);

    await wrapper.find('[data-sheet="close"]').trigger('click');

    expect(wrapper.find('[data-sheet="content"]').attributes('data-state')).toBe('closed');
  });

  it('merge de clase en UiSheetContent', async () => {
    const wrapper = mount(UiSheet, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiSheetContent class="clase-sheet">Contenido</UiSheetContent>',
      },
    });

    expect(wrapper.find('[data-sheet="content"]').classes()).toContain('clase-sheet');
  });
});
