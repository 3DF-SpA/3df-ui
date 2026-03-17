import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSwitch from '../UiSwitch.vue';

describe('UiSwitch', () => {
  // ── Renderizado base ──
  it('renderiza un <button> con role="switch"', () => {
    const wrapper = mount(UiSwitch);
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('role')).toBe('switch');
  });

  // ── Estado checked / modelValue ──
  it('aria-checked es "false" cuando modelValue=false', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: false } });
    expect(wrapper.attributes('aria-checked')).toBe('false');
  });

  it('aria-checked es "true" cuando modelValue=true', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    expect(wrapper.attributes('aria-checked')).toBe('true');
  });

  it('aplica clase bg-primary al track cuando modelValue=true', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    expect(wrapper.attributes('class')).toContain('bg-primary');
  });

  // ── Emisión de cambio ──
  it('emite update:modelValue con el valor invertido al hacer click', async () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: false } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('emite false al hacer click cuando modelValue=true', async () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al button', () => {
    const wrapper = mount(UiSwitch, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLButtonElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del track', () => {
    const wrapper = mount(UiSwitch, { attrs: { class: 'mt-4 opacity-75' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('mt-4');
    expect(classStr).toContain('opacity-75');
    expect(classStr).toContain('rounded-full');
  });
});
