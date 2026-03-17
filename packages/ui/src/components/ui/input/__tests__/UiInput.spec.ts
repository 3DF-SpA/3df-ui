import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInput from '../UiInput.vue';

describe('UiInput', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <input>', () => {
    const wrapper = mount(UiInput);
    expect(wrapper.element.tagName).toBe('INPUT');
  });

  // ── v-model / modelValue ──
  it('vincula modelValue al value del input nativo', () => {
    const wrapper = mount(UiInput, { props: { modelValue: 'hola' } });
    expect((wrapper.element as HTMLInputElement).value).toBe('hola');
  });

  it('emite update:modelValue con el nuevo valor al escribir', async () => {
    const wrapper = mount(UiInput, { props: { modelValue: '' } });
    await wrapper.setValue('nuevo valor');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['nuevo valor']);
  });

  // ── Variantes de tamaño ──
  it('aplica clase h-9 cuando size="sm"', () => {
    const wrapper = mount(UiInput, { props: { size: 'sm' } });
    expect(wrapper.attributes('class')).toContain('h-9');
  });

  it('aplica clase h-11 cuando size="lg"', () => {
    const wrapper = mount(UiInput, { props: { size: 'lg' } });
    expect(wrapper.attributes('class')).toContain('h-11');
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiInput, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiInput, { attrs: { class: 'w-full mt-2' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('w-full');
    expect(classStr).toContain('mt-2');
    expect(classStr).toContain('rounded-md');
  });

  // ── Passthrough de atributos ──
  it('pasa atributos adicionales como placeholder al input', () => {
    const wrapper = mount(UiInput, { attrs: { placeholder: 'Escribe aqui' } });
    expect(wrapper.attributes('placeholder')).toBe('Escribe aqui');
  });
});
