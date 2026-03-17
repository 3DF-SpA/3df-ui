import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiContextMenu from '../UiContextMenu.vue';
import UiContextMenuContent from '../UiContextMenuContent.vue';
import UiContextMenuTrigger from '../UiContextMenuTrigger.vue';

const globalStubs = {
  global: {
    stubs: { Teleport: true },
  },
};

describe('UiContextMenu', () => {
  it('renderiza correctamente (slot visible)', () => {
    const wrapper = mount(UiContextMenu, {
      slots: { default: '<span class="trigger-text">Click derecho aquí</span>' },
      ...globalStubs,
    });
    expect(wrapper.find('.trigger-text').exists()).toBe(true);
  });

  it('el trigger renderiza un div que responde a contextmenu', async () => {
    const wrapper = mount(
      {
        components: { UiContextMenu, UiContextMenuTrigger },
        template: `
          <UiContextMenu>
            <UiContextMenuTrigger>
              <span id="trigger-inner">Clic derecho</span>
            </UiContextMenuTrigger>
          </UiContextMenu>
        `,
      },
      globalStubs,
    );
    expect(wrapper.find('#trigger-inner').exists()).toBe(true);
  });

  it('el evento contextmenu en el trigger hace visible el contenido', async () => {
    const wrapper = mount(
      {
        components: { UiContextMenu, UiContextMenuTrigger, UiContextMenuContent },
        template: `
          <UiContextMenu>
            <UiContextMenuTrigger>
              <span>Right click</span>
            </UiContextMenuTrigger>
            <UiContextMenuContent>
              <span class="menu-content">Opción 1</span>
            </UiContextMenuContent>
          </UiContextMenu>
        `,
      },
      globalStubs,
    );

    // Antes del evento el content no debe estar visible
    expect(wrapper.find('[role="menu"]').exists()).toBe(false);

    // Disparamos contextmenu en el trigger
    await wrapper.find('div').trigger('contextmenu');

    expect(wrapper.find('[role="menu"]').exists()).toBe(true);
    expect(wrapper.find('.menu-content').text()).toBe('Opción 1');
  });

  it('UiContextMenuContent fusiona clases custom con cn()', async () => {
    const wrapper = mount(
      {
        components: { UiContextMenu, UiContextMenuTrigger, UiContextMenuContent },
        template: `
          <UiContextMenu>
            <UiContextMenuTrigger><span>x</span></UiContextMenuTrigger>
            <UiContextMenuContent class="my-custom-content">Contenido</UiContextMenuContent>
          </UiContextMenu>
        `,
      },
      globalStubs,
    );

    await wrapper.find('div').trigger('contextmenu');
    expect(wrapper.find('[role="menu"]').attributes('class')).toContain('my-custom-content');
  });
});
