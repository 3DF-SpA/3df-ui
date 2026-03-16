import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSeparator from '../UiSeparator.vue';

describe('UiSeparator', () => {
  it('renderiza un <div> con role="separator"', () => {
    const wrapper = mount(UiSeparator);
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('separator');
  });

  it('orientación horizontal por defecto aplica h-px w-full', () => {
    const wrapper = mount(UiSeparator);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-px', 'w-full']));
    expect(wrapper.attributes('data-orientation')).toBe('horizontal');
  });

  it('aria-orientation es "horizontal" por defecto', () => {
    const wrapper = mount(UiSeparator);
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal');
  });

  it('orientación "vertical" aplica h-full w-px y data-orientation correcto', () => {
    const wrapper = mount(UiSeparator, { props: { orientation: 'vertical' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-full', 'w-px']));
    expect(wrapper.attributes('data-orientation')).toBe('vertical');
    expect(wrapper.attributes('aria-orientation')).toBe('vertical');
  });

  it('decorative=true cambia role a "none" y omite aria-orientation', () => {
    const wrapper = mount(UiSeparator, { props: { decorative: true } });
    expect(wrapper.attributes('role')).toBe('none');
    expect(wrapper.attributes('aria-orientation')).toBeUndefined();
  });

  it('incluye clase bg-border en el separador', () => {
    const wrapper = mount(UiSeparator);
    expect(wrapper.classes()).toContain('bg-border');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiSeparator, { attrs: { class: 'my-4 bg-primary' } });
    expect(wrapper.attributes('class')).toContain('my-4');
    expect(wrapper.attributes('class')).toContain('bg-primary');
  });
});
