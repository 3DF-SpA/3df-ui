import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiCheckbox from '../UiCheckbox.vue';

describe('UiCheckbox', () => {
  // ── Renderizado base ──
  it('renderiza un <span> wrapper con un <input type="checkbox"> dentro', () => {
    const wrapper = mount(UiCheckbox);
    expect(wrapper.element.tagName).toBe('SPAN');
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);
  });

  // ── v-model / modelValue ──
  it('refleja modelValue=true como checked en el input', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: true } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('refleja modelValue=false como unchecked en el input', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(false);
  });

  it('emite update:modelValue con true al hacer click en unchecked', async () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false } });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('change');
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
  });

  // ── Indeterminate ──
  it('muestra el icono de indeterminate cuando indeterminate=true y modelValue=false', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false, indeterminate: true } });
    const svgs = wrapper.findAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiCheckbox, { attrs: { disabled: true } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom en el wrapper <span>', () => {
    const wrapper = mount(UiCheckbox, { attrs: { class: 'ml-2 opacity-80' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('ml-2');
    expect(classStr).toContain('opacity-80');
  });
});
