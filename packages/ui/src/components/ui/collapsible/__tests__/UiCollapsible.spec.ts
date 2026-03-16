import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiCollapsible from '../UiCollapsible.vue';
import UiCollapsibleContent from '../UiCollapsibleContent.vue';
import UiCollapsibleTrigger from '../UiCollapsibleTrigger.vue';

const globalConfig = {
  components: { UiCollapsibleContent, UiCollapsibleTrigger },
};

describe('UiCollapsible', () => {
  it('renderiza el componente raíz correctamente', () => {
    const wrapper = mount(UiCollapsible, {
      global: globalConfig,
      slots: { default: 'Contenido' },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('estado inicial cerrado (data-state="closed")', () => {
    const wrapper = mount(UiCollapsible, {
      global: globalConfig,
      slots: {
        default:
          '<UiCollapsibleTrigger>Toggle</UiCollapsibleTrigger>' +
          '<UiCollapsibleContent>Panel</UiCollapsibleContent>',
      },
    });

    expect(wrapper.attributes('data-state')).toBe('closed');
    expect(wrapper.find('[role="region"]').attributes('data-state')).toBe('closed');
  });

  it('abre al hacer click en el trigger', async () => {
    const wrapper = mount(UiCollapsible, {
      global: globalConfig,
      slots: {
        default:
          '<UiCollapsibleTrigger>Toggle</UiCollapsibleTrigger>' +
          '<UiCollapsibleContent>Panel</UiCollapsibleContent>',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.attributes('data-state')).toBe('open');
    expect(wrapper.find('[role="region"]').attributes('data-state')).toBe('open');
  });

  it('trigger tiene aria-expanded actualizado al abrir', async () => {
    const wrapper = mount(UiCollapsible, {
      global: globalConfig,
      slots: {
        default:
          '<UiCollapsibleTrigger>Toggle</UiCollapsibleTrigger>' +
          '<UiCollapsibleContent>Panel</UiCollapsibleContent>',
      },
    });

    const trigger = wrapper.find('button');
    expect(trigger.attributes('aria-expanded')).toBe('false');

    await trigger.trigger('click');

    expect(trigger.attributes('aria-expanded')).toBe('true');
  });

  it('merge de clase en UiCollapsible raíz', () => {
    const wrapper = mount(UiCollapsible, {
      attrs: { class: 'clase-collapsible' },
      global: globalConfig,
      slots: { default: 'Contenido' },
    });

    expect(wrapper.classes()).toContain('clase-collapsible');
  });

  it('merge de clase en UiCollapsibleContent', () => {
    const wrapper = mount(UiCollapsible, {
      global: globalConfig,
      slots: {
        default:
          '<UiCollapsibleTrigger>Toggle</UiCollapsibleTrigger>' +
          '<UiCollapsibleContent class="clase-content">Panel</UiCollapsibleContent>',
      },
    });

    expect(wrapper.find('[role="region"]').classes()).toContain('clase-content');
  });

  it('no abre cuando disabled=true', async () => {
    const wrapper = mount(UiCollapsible, {
      props: { disabled: true },
      global: globalConfig,
      slots: {
        default:
          '<UiCollapsibleTrigger>Toggle</UiCollapsibleTrigger>' +
          '<UiCollapsibleContent>Panel</UiCollapsibleContent>',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.attributes('data-state')).toBe('closed');
  });
});
