import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiCommand from '../UiCommand.vue';
import UiCommandInput from '../UiCommandInput.vue';
import UiCommandList from '../UiCommandList.vue';

describe('UiCommand', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiCommand);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un div con role="dialog"', () => {
    const wrapper = mount(UiCommand);
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);
  });

  it('usa el prop label como aria-label', () => {
    const wrapper = mount(UiCommand, { props: { label: 'Buscar comandos' } });
    expect(wrapper.find('[role="dialog"]').attributes('aria-label')).toBe('Buscar comandos');
  });

  it('tiene el label por defecto "Comando"', () => {
    const wrapper = mount(UiCommand);
    expect(wrapper.find('[role="dialog"]').attributes('aria-label')).toBe('Comando');
  });

  it('UiCommandInput renderiza un input de texto', () => {
    const wrapper = mount(UiCommand, {
      slots: {
        default: {
          components: { UiCommandInput },
          template: '<UiCommandInput placeholder="Buscar..." />',
        },
      },
    });
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Buscar...');
  });

  it('UiCommandInput actualiza el valor al escribir', async () => {
    const wrapper = mount(UiCommand, {
      slots: {
        default: {
          components: { UiCommandInput },
          template: '<UiCommandInput />',
        },
      },
    });
    const input = wrapper.find('input');
    await input.setValue('hola');
    expect(input.element.value).toBe('hola');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiCommand, { attrs: { class: 'custom-command' } });
    expect(wrapper.find('[role="dialog"]').attributes('class')).toContain('custom-command');
  });

  it('UiCommandList renderiza con UiCommand como padre', () => {
    const wrapper = mount(UiCommand, {
      slots: {
        default: {
          components: { UiCommandList },
          template: '<UiCommandList><span class="list-item">Elemento</span></UiCommandList>',
        },
      },
    });
    expect(wrapper.find('.list-item').exists()).toBe(true);
  });
});
