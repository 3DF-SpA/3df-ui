import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiItem from '../UiItem.vue';
import UiItemDescription from '../UiItemDescription.vue';
import UiItemLabel from '../UiItemLabel.vue';

describe('UiItem', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiItem, { slots: { default: 'Contenido' } });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza como <div> por defecto', () => {
    const wrapper = mount(UiItem);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('renderiza el slot default', () => {
    const wrapper = mount(UiItem, {
      slots: { default: '<span class="item-text">Texto del ítem</span>' },
    });
    expect(wrapper.find('.item-text').text()).toBe('Texto del ítem');
  });

  it('renderiza como <button> cuando se pasa as="button"', () => {
    const wrapper = mount(UiItem, { props: { as: 'button' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });

  it('aplica aria-disabled cuando disabled=true', () => {
    const wrapper = mount(UiItem, { props: { disabled: true } });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('aplica la clase de opacidad cuando está deshabilitado', () => {
    const wrapper = mount(UiItem, { props: { disabled: true } });
    expect(wrapper.attributes('class')).toContain('opacity-50');
  });

  it('renderiza el slot start', () => {
    const wrapper = mount(UiItem, {
      slots: { start: '<svg class="icon-start" />' },
    });
    expect(wrapper.find('.icon-start').exists()).toBe(true);
  });

  it('renderiza el slot end', () => {
    const wrapper = mount(UiItem, {
      slots: { end: '<svg class="icon-end" />' },
    });
    expect(wrapper.find('.icon-end').exists()).toBe(true);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiItem, { attrs: { class: 'custom-item' } });
    expect(wrapper.attributes('class')).toContain('custom-item');
  });

  it('UiItemLabel renderiza correctamente', () => {
    const wrapper = mount(UiItemLabel, { slots: { default: 'Etiqueta' } });
    expect(wrapper.text()).toBe('Etiqueta');
  });

  it('UiItemDescription renderiza correctamente', () => {
    const wrapper = mount(UiItemDescription, { slots: { default: 'Descripción' } });
    expect(wrapper.text()).toBe('Descripción');
  });
});
