import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiAlertDialog from '../UiAlertDialog.vue';
import UiAlertDialogCancel from '../UiAlertDialogCancel.vue';
import UiAlertDialogContent from '../UiAlertDialogContent.vue';
import UiAlertDialogTrigger from '../UiAlertDialogTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiAlertDialogContent, UiAlertDialogTrigger, UiAlertDialogCancel },
};

describe('UiAlertDialog', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiAlertDialog, {
      global: globalConfig,
      slots: { default: '<UiAlertDialogTrigger><button>Abrir</button></UiAlertDialogTrigger>' },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('dialog cerrado por defecto (UiAlertDialogContent no visible)', () => {
    const wrapper = mount(UiAlertDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiAlertDialogTrigger><button>Abrir</button></UiAlertDialogTrigger>' +
          '<UiAlertDialogContent>Contenido</UiAlertDialogContent>',
      },
    });

    expect(wrapper.find('[data-alert-dialog="content"]').exists()).toBe(false);
  });

  it('abre al click en trigger', async () => {
    const wrapper = mount(UiAlertDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiAlertDialogTrigger><button>Abrir</button></UiAlertDialogTrigger>' +
          '<UiAlertDialogContent>Contenido</UiAlertDialogContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[data-alert-dialog="content"]').exists()).toBe(true);
  });

  it('botón Cancel cierra el alert dialog', async () => {
    const wrapper = mount(UiAlertDialog, {
      global: globalConfig,
      slots: {
        default:
          '<UiAlertDialogTrigger><button>Abrir</button></UiAlertDialogTrigger>' +
          '<UiAlertDialogContent>' +
          '<UiAlertDialogCancel>Cancelar</UiAlertDialogCancel>' +
          '</UiAlertDialogContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');
    expect(wrapper.find('[data-alert-dialog="content"]').exists()).toBe(true);

    await wrapper.find('[data-alert-dialog-cancel]').trigger('click');

    expect(wrapper.find('[data-alert-dialog="content"]').attributes('data-state')).toBe('closed');
  });

  it('merge de clase en UiAlertDialogContent', async () => {
    const wrapper = mount(UiAlertDialog, {
      props: { defaultOpen: true },
      global: globalConfig,
      slots: {
        default:
          '<UiAlertDialogContent class="clase-alerta">Contenido</UiAlertDialogContent>',
      },
    });

    expect(wrapper.find('[data-alert-dialog="content"]').classes()).toContain('clase-alerta');
  });
});
