import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiProgress from '../UiProgress.vue';

describe('UiProgress', () => {
  it('renderiza un <div> con role="progressbar"', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 50 } });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('progressbar');
  });

  it('tiene aria-valuemin="0" y aria-valuemax="100" por defecto', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 50 } });
    expect(wrapper.attributes('aria-valuemin')).toBe('0');
    expect(wrapper.attributes('aria-valuemax')).toBe('100');
  });

  it('refleja modelValue en aria-valuenow', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 75 } });
    expect(wrapper.attributes('aria-valuenow')).toBe('75');
  });

  it('data-state es "determinate" cuando hay modelValue', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 30 } });
    expect(wrapper.attributes('data-state')).toBe('determinate');
  });

  it('data-state es "indeterminate" cuando modelValue es undefined', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: undefined } });
    expect(wrapper.attributes('data-state')).toBe('indeterminate');
  });

  it('aplica el transform correcto en el indicador según modelValue', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 50 } });
    const indicator = wrapper.find('[data-state="indicator"]');
    expect(indicator.attributes('style')).toContain('translateX(-50%)');
  });

  it('respeta la prop max personalizada en aria-valuemax', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 10, max: 200 } });
    expect(wrapper.attributes('aria-valuemax')).toBe('200');
  });

  it('incluye clases base del contenedor (rounded-full bg-secondary)', () => {
    const wrapper = mount(UiProgress, { props: { modelValue: 0 } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['rounded-full', 'bg-secondary']));
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiProgress, {
      props: { modelValue: 20 },
      attrs: { class: 'h-2 w-64' },
    });
    expect(wrapper.attributes('class')).toContain('h-2');
    expect(wrapper.attributes('class')).toContain('w-64');
  });
});
