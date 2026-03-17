import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiDropdownMenu from '../UiDropdownMenu.vue';
import UiDropdownMenuContent from '../UiDropdownMenuContent.vue';
import UiDropdownMenuItem from '../UiDropdownMenuItem.vue';
import UiDropdownMenuTrigger from '../UiDropdownMenuTrigger.vue';

const globalConfig = {
  stubs: { Teleport: true },
  components: { UiDropdownMenuContent, UiDropdownMenuTrigger, UiDropdownMenuItem },
};

describe('UiDropdownMenu', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiDropdownMenu, {
      global: globalConfig,
      slots: {
        default: '<UiDropdownMenuTrigger><button>Menú</button></UiDropdownMenuTrigger>',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('menú cerrado por defecto', () => {
    const wrapper = mount(UiDropdownMenu, {
      global: globalConfig,
      slots: {
        default:
          '<UiDropdownMenuTrigger><button>Menú</button></UiDropdownMenuTrigger>' +
          '<UiDropdownMenuContent>Opciones</UiDropdownMenuContent>',
      },
    });

    expect(wrapper.find('[role="menu"]').exists()).toBe(false);
  });

  it('click en trigger abre el contenido del menú', async () => {
    const wrapper = mount(UiDropdownMenu, {
      global: globalConfig,
      slots: {
        default:
          '<UiDropdownMenuTrigger><button>Menú</button></UiDropdownMenuTrigger>' +
          '<UiDropdownMenuContent>Opciones</UiDropdownMenuContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
  });

  it('aria-expanded refleja el estado del menú', async () => {
    const wrapper = mount(UiDropdownMenu, {
      global: globalConfig,
      slots: {
        default:
          '<UiDropdownMenuTrigger><button>Menú</button></UiDropdownMenuTrigger>' +
          '<UiDropdownMenuContent>Opciones</UiDropdownMenuContent>',
      },
    });

    const trigger = wrapper.find('[role="button"]');
    expect(trigger.attributes('aria-expanded')).toBe('false');

    await trigger.trigger('click');

    expect(trigger.attributes('aria-expanded')).toBe('true');
  });

  it('merge de clase en UiDropdownMenuContent', async () => {
    const wrapper = mount(UiDropdownMenu, {
      global: globalConfig,
      slots: {
        default:
          '<UiDropdownMenuTrigger><button>Menú</button></UiDropdownMenuTrigger>' +
          '<UiDropdownMenuContent class="clase-menu">Opciones</UiDropdownMenuContent>',
      },
    });

    await wrapper.find('[role="button"]').trigger('click');

    expect(wrapper.find('[role="menu"]').classes()).toContain('clase-menu');
  });
});
