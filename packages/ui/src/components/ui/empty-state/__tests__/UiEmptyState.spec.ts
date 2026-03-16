import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiEmptyState from '../UiEmptyState.vue';

describe('UiEmptyState', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiEmptyState);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un div raíz con clases de layout', () => {
    const wrapper = mount(UiEmptyState);
    const cls = wrapper.find('div').attributes('class') ?? '';
    expect(cls).toContain('flex');
    expect(cls).toContain('flex-col');
    expect(cls).toContain('items-center');
  });

  it('muestra el título cuando se pasa el prop title', () => {
    const wrapper = mount(UiEmptyState, {
      props: { title: 'Sin resultados' },
    });
    expect(wrapper.find('h3').exists()).toBe(true);
    expect(wrapper.find('h3').text()).toBe('Sin resultados');
  });

  it('muestra la descripción cuando se pasa el prop description', () => {
    const wrapper = mount(UiEmptyState, {
      props: { description: 'Intenta con otro término de búsqueda.' },
    });
    expect(wrapper.find('p').exists()).toBe(true);
    expect(wrapper.find('p').text()).toBe('Intenta con otro término de búsqueda.');
  });

  it('renderiza el slot title personalizado', () => {
    const wrapper = mount(UiEmptyState, {
      slots: { title: '<em class="custom-title">Título personalizado</em>' },
    });
    expect(wrapper.find('.custom-title').text()).toBe('Título personalizado');
  });

  it('renderiza el slot description personalizado', () => {
    const wrapper = mount(UiEmptyState, {
      props: { description: 'fallback' },
      slots: { description: '<span class="custom-desc">Descripción custom</span>' },
    });
    expect(wrapper.find('.custom-desc').text()).toBe('Descripción custom');
  });

  it('renderiza el slot default (acción)', () => {
    const wrapper = mount(UiEmptyState, {
      slots: { default: '<button class="action-btn">Crear nuevo</button>' },
    });
    expect(wrapper.find('.action-btn').exists()).toBe(true);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiEmptyState, {
      attrs: { class: 'custom-empty' },
    });
    expect(wrapper.find('div').attributes('class')).toContain('custom-empty');
  });
});
