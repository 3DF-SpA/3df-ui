import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiDialog from '../UiDialog.vue';
import UiDialogClose from '../UiDialogClose.vue';
import UiDialogContent from '../UiDialogContent.vue';
import UiDialogTitle from '../UiDialogTitle.vue';
import UiDialogTrigger from '../UiDialogTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiDialogContent, UiDialogTrigger, UiDialogTitle, UiDialogClose },
};

describe('UiDialog', () => {
  it('dialog cerrado por defecto (UiDialogContent no visible)', () => {
    const wrapper = mount(UiDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiDialogTrigger><button>Abrir</button></UiDialogTrigger><UiDialogContent>Contenido</UiDialogContent>',
      },
    });

    expect(wrapper.find('[data-dialog="content"]').exists()).toBe(false);
  });

  it('al click en Trigger el dialog abre', async () => {
    const wrapper = mount(UiDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiDialogTrigger><button>Abrir</button></UiDialogTrigger><UiDialogContent>Contenido</UiDialogContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[data-dialog="content"]').exists()).toBe(true);
  });

  it('UiDialogTitle renderiza contenido del slot', async () => {
    const wrapper = mount(UiDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiDialogTrigger><button>Abrir</button></UiDialogTrigger>' +
          '<UiDialogContent><UiDialogTitle>Mi Título</UiDialogTitle></UiDialogContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('h2').text()).toBe('Mi Título');
  });

  it('UiDialogClose cierra el dialog', async () => {
    const wrapper = mount(UiDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiDialogTrigger><button>Abrir</button></UiDialogTrigger>' +
          '<UiDialogContent :showClose="false">' +
          '<UiDialogClose><button>Cerrar</button></UiDialogClose>' +
          '</UiDialogContent>',
      },
    });

    // Abrir el dialog
    await wrapper.find('[role="button"]').trigger('click');
    expect(wrapper.find('[data-dialog="content"]').exists()).toBe(true);

    // Cerrar mediante UiDialogClose (primer role="button" dentro del panel role="dialog")
    await wrapper.find('[role="dialog"] [role="button"]').trigger('click');

    // isAnimating se vuelve false inmediatamente, isVisible se elimina tras 200ms
    expect(wrapper.find('[data-dialog="content"]').attributes('data-state')).toBe('closed');
  });

  it('merge de clase en UiDialogContent', async () => {
    const wrapper = mount(UiDialog, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default: '<UiDialogContent class="clase-personalizada">Cuerpo</UiDialogContent>',
      },
    });

    expect(wrapper.find('[data-dialog="content"]').classes()).toContain('clase-personalizada');
  });
});
