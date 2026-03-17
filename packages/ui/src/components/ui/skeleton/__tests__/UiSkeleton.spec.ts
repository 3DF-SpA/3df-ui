import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSkeleton from '../UiSkeleton.vue';

describe('UiSkeleton', () => {
  it('renderiza un <div>', () => {
    const wrapper = mount(UiSkeleton);
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('tiene la clase de animación "animate-pulse-soft"', () => {
    const wrapper = mount(UiSkeleton);
    expect(wrapper.classes()).toContain('animate-pulse-soft');
  });

  it('tiene la clase de color "bg-muted"', () => {
    const wrapper = mount(UiSkeleton);
    expect(wrapper.classes()).toContain('bg-muted');
  });

  it('tiene la clase de forma "rounded-md"', () => {
    const wrapper = mount(UiSkeleton);
    expect(wrapper.classes()).toContain('rounded-md');
  });

  it('pasa atributos extra al nodo raíz', () => {
    const wrapper = mount(UiSkeleton, { attrs: { 'data-testid': 'skeleton-avatar' } });
    expect(wrapper.attributes('data-testid')).toBe('skeleton-avatar');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiSkeleton, { attrs: { class: 'h-10 w-48' } });
    expect(wrapper.attributes('class')).toContain('h-10');
    expect(wrapper.attributes('class')).toContain('w-48');
  });
});
