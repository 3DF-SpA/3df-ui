import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiLabel from '../UiLabel.vue';

describe('UiLabel', () => {
  it('renderiza un <label>', () => {
    const wrapper = mount(UiLabel, { slots: { default: 'Nombre' } });
    expect(wrapper.element.tagName).toBe('LABEL');
    expect(wrapper.text()).toBe('Nombre');
  });

  it('pasa el atributo "for" al nodo raíz', () => {
    const wrapper = mount(UiLabel, {
      attrs: { for: 'input-nombre' },
      slots: { default: 'Nombre' },
    });
    expect(wrapper.attributes('for')).toBe('input-nombre');
  });

  it('incluye clases base de tipografía (text-sm font-medium)', () => {
    const wrapper = mount(UiLabel, { slots: { default: 'Label' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['text-sm', 'font-medium']));
  });

  it('aplica clases de estado disabled (cursor-not-allowed opacity-70)', () => {
    const wrapper = mount(UiLabel, {
      props: { disabled: true },
      slots: { default: 'Campo deshabilitado' },
    });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['cursor-not-allowed', 'opacity-70']),
    );
  });

  it('no aplica clases disabled por defecto', () => {
    const wrapper = mount(UiLabel, { slots: { default: 'Normal' } });
    expect(wrapper.classes()).not.toContain('cursor-not-allowed');
    expect(wrapper.classes()).not.toContain('opacity-70');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiLabel, {
      attrs: { class: 'text-primary font-bold' },
      slots: { default: 'Label' },
    });
    expect(wrapper.attributes('class')).toContain('text-primary');
    expect(wrapper.attributes('class')).toContain('font-bold');
  });
});
