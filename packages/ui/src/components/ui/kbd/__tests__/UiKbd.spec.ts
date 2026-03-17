import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiKbd from '../UiKbd.vue';

describe('UiKbd', () => {
  it('renderiza un <kbd>', () => {
    const wrapper = mount(UiKbd, { slots: { default: '⌘K' } });
    expect(wrapper.element.tagName).toBe('KBD');
    expect(wrapper.text()).toBe('⌘K');
  });

  it('incluye clases base (font-mono, rounded-md)', () => {
    const wrapper = mount(UiKbd, { slots: { default: 'Ctrl' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['font-mono', 'rounded-md']));
  });

  it('aplica clases de size "default" (min-w-7)', () => {
    const wrapper = mount(UiKbd, { slots: { default: 'K' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['min-w-7']));
  });

  it('aplica clases de size "xs" (min-w-5)', () => {
    const wrapper = mount(UiKbd, {
      props: { size: 'xs' },
      slots: { default: 'K' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['min-w-5']));
  });

  it('aplica clases de size "sm" (min-w-6)', () => {
    const wrapper = mount(UiKbd, {
      props: { size: 'sm' },
      slots: { default: 'Alt' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['min-w-6']));
  });

  it('aplica clases de size "lg" (min-w-8)', () => {
    const wrapper = mount(UiKbd, {
      props: { size: 'lg' },
      slots: { default: 'Enter' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['min-w-8']));
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiKbd, {
      attrs: { class: 'opacity-75 ml-1' },
      slots: { default: 'Tab' },
    });
    expect(wrapper.attributes('class')).toContain('opacity-75');
    expect(wrapper.attributes('class')).toContain('ml-1');
  });
});
