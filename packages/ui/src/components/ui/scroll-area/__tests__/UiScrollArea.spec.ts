import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiScrollArea from '../UiScrollArea.vue';

describe('UiScrollArea', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiScrollArea);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el contenedor principal con data-scroll-area', () => {
    const wrapper = mount(UiScrollArea);
    expect(wrapper.find('[data-scroll-area=""]').exists()).toBe(true);
  });

  it('el contenedor tiene las clases base relative overflow-hidden', () => {
    const wrapper = mount(UiScrollArea);
    const rootClass = wrapper.find('[data-scroll-area=""]').attributes('class') ?? '';
    expect(rootClass).toContain('relative');
    expect(rootClass).toContain('overflow-hidden');
  });

  it('renderiza el slot default dentro del viewport', () => {
    const wrapper = mount(UiScrollArea, {
      slots: { default: '<p class="scroll-content">Contenido desplazable</p>' },
    });
    expect(wrapper.find('.scroll-content').exists()).toBe(true);
    expect(wrapper.find('.scroll-content').text()).toBe('Contenido desplazable');
  });

  it('el viewport tiene data-scroll-area="viewport"', () => {
    const wrapper = mount(UiScrollArea);
    expect(wrapper.find('[data-scroll-area="viewport"]').exists()).toBe(true);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiScrollArea, {
      attrs: { class: 'custom-scroll' },
    });
    expect(wrapper.find('[data-scroll-area=""]').attributes('class')).toContain('custom-scroll');
  });
});
