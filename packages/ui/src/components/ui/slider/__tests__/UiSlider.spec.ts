import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSlider from '../UiSlider.vue';

describe('UiSlider', () => {
  // ── Renderizado base ──
  it('renderiza un <div role="slider">', () => {
    const wrapper = mount(UiSlider);
    expect(wrapper.attributes('role')).toBe('slider');
  });

  // ── Props min / max / value (aria) ──
  it('expone aria-valuemin con la prop min', () => {
    const wrapper = mount(UiSlider, { props: { min: 10, max: 100, modelValue: 50 } });
    expect(wrapper.attributes('aria-valuemin')).toBe('10');
  });

  it('expone aria-valuemax con la prop max', () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 200, modelValue: 50 } });
    expect(wrapper.attributes('aria-valuemax')).toBe('200');
  });

  it('expone aria-valuenow con la prop modelValue', () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 42 } });
    expect(wrapper.attributes('aria-valuenow')).toBe('42');
  });

  // ── Keyboard: ArrowRight emite el valor + step ──
  it('emite update:modelValue con valor incrementado en step al presionar ArrowRight', async () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 50, step: 5 } });
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([55]);
  });

  it('emite update:modelValue con valor decrementado al presionar ArrowLeft', async () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 50, step: 5 } });
    await wrapper.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([45]);
  });

  // ── Disabled ──
  it('tiene aria-disabled cuando disabled=true', () => {
    const wrapper = mount(UiSlider, { props: { disabled: true } });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('tiene tabindex=-1 cuando disabled=true', () => {
    const wrapper = mount(UiSlider, { props: { disabled: true } });
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('no emite update:modelValue al presionar tecla cuando disabled=true', async () => {
    const wrapper = mount(UiSlider, { props: { disabled: true, modelValue: 50 } });
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del track', () => {
    const wrapper = mount(UiSlider, { attrs: { class: 'w-64 mt-4' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('w-64');
    expect(classStr).toContain('mt-4');
    expect(classStr).toContain('touch-none');
  });
});
