import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiRadio from '../UiRadio.vue';

describe('UiRadio', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <input type="radio">', () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-a' } });
    expect(wrapper.element.tagName).toBe('INPUT');
    expect(wrapper.attributes('type')).toBe('radio');
  });

  // ── Prop value ──
  it('establece el atributo value con la prop "value"', () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-b' } });
    expect(wrapper.attributes('value')).toBe('opcion-b');
  });

  // ── Estado checked via modelValue ──
  it('esta checked cuando modelValue coincide con value', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x', modelValue: 'x' } });
    expect((wrapper.element as HTMLInputElement).checked).toBe(true);
  });

  it('no esta checked cuando modelValue no coincide con value', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x', modelValue: 'y' } });
    expect((wrapper.element as HTMLInputElement).checked).toBe(false);
  });

  // ── Emisión al cambiar ──
  it('emite update:modelValue con el value propio al cambiar', async () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-a', modelValue: '' } });
    await wrapper.trigger('change');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['opcion-a']);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x' }, attrs: { disabled: true } });
    expect((wrapper.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x' }, attrs: { class: 'ml-2 border-blue-500' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('ml-2');
    expect(classStr).toContain('border-blue-500');
    expect(classStr).toContain('rounded-full');
  });
});
