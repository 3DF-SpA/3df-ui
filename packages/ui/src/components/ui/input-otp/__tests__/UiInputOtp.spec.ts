import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInputOTP from '../UiInputOTP.vue';

describe('UiInputOTP', () => {
  // ── Renderizado base ──
  it('renderiza un <div role="group">', () => {
    const wrapper = mount(UiInputOTP);
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('group');
  });

  it('tiene aria-label por defecto "One-time password"', () => {
    const wrapper = mount(UiInputOTP);
    expect(wrapper.attributes('aria-label')).toBe('One-time password');
  });

  it('acepta un aria-label personalizado via attrs', () => {
    const wrapper = mount(UiInputOTP, { attrs: { 'aria-label': 'Codigo de verificacion' } });
    expect(wrapper.attributes('aria-label')).toBe('Codigo de verificacion');
  });

  // ── Prop disabled ──
  it('agrega data-disabled cuando disabled=true', () => {
    const wrapper = mount(UiInputOTP, { props: { disabled: true } });
    expect(wrapper.attributes('data-disabled')).toBe('true');
  });

  it('no agrega data-disabled cuando disabled=false', () => {
    const wrapper = mount(UiInputOTP, { props: { disabled: false } });
    expect(wrapper.attributes('data-disabled')).toBeUndefined();
  });

  // ── Prop modelValue ──
  it('acepta modelValue vacio sin errores', () => {
    const wrapper = mount(UiInputOTP, { props: { modelValue: '' } });
    expect(wrapper.exists()).toBe(true);
  });

  // ── Prop length ──
  it('acepta la prop length sin errores', () => {
    const wrapper = mount(UiInputOTP, { props: { length: 4 } });
    expect(wrapper.exists()).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del contenedor', () => {
    const wrapper = mount(UiInputOTP, { attrs: { class: 'gap-4 justify-center' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('gap-4');
    expect(classStr).toContain('justify-center');
    expect(classStr).toContain('flex');
  });
});
