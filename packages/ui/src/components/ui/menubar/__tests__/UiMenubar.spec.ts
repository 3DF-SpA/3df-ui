import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiMenubar from '../UiMenubar.vue';

describe('UiMenubar', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiMenubar);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un elemento con role="menubar"', () => {
    const wrapper = mount(UiMenubar);
    expect(wrapper.find('[role="menubar"]').exists()).toBe(true);
  });

  it('renderiza el contenido del slot default', () => {
    const wrapper = mount(UiMenubar, {
      slots: { default: '<span class="menu-item">Archivo</span>' },
    });
    expect(wrapper.find('.menu-item').text()).toBe('Archivo');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiMenubar, {
      attrs: { class: 'custom-menubar' },
    });
    expect(wrapper.find('[role="menubar"]').attributes('class')).toContain('custom-menubar');
  });

  it('incluye las clases base de estilo', () => {
    const wrapper = mount(UiMenubar);
    const cls = wrapper.find('[role="menubar"]').attributes('class') ?? '';
    expect(cls).toContain('flex');
    expect(cls).toContain('rounded-md');
  });
});
