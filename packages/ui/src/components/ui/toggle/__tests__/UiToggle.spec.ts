import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiToggle from '../UiToggle.vue';

describe('UiToggle', () => {
  it('renderiza un <button> de tipo "button"', () => {
    const wrapper = mount(UiToggle, { slots: { default: 'Bold' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('type')).toBe('button');
  });

  it('aria-pressed="false" y data-state="off" por defecto', () => {
    const wrapper = mount(UiToggle, { slots: { default: 'Toggle' } });
    expect(wrapper.attributes('aria-pressed')).toBe('false');
    expect(wrapper.attributes('data-state')).toBe('off');
  });

  it('aria-pressed="true" y data-state="on" cuando pressed=true', () => {
    const wrapper = mount(UiToggle, {
      props: { pressed: true },
      slots: { default: 'Toggle activo' },
    });
    expect(wrapper.attributes('aria-pressed')).toBe('true');
    expect(wrapper.attributes('data-state')).toBe('on');
  });

  it('emite "update:pressed" con valor opuesto al hacer click', async () => {
    const wrapper = mount(UiToggle, {
      props: { pressed: false },
      slots: { default: 'Toggle' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:pressed')).toBeTruthy();
    expect(wrapper.emitted('update:pressed')![0]).toEqual([true]);
  });

  it('emite "update:pressed" con false cuando pressed=true y se hace click', async () => {
    const wrapper = mount(UiToggle, {
      props: { pressed: true },
      slots: { default: 'Toggle' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:pressed')![0]).toEqual([false]);
  });

  it('no emite "update:pressed" cuando está disabled', async () => {
    const wrapper = mount(UiToggle, {
      props: { pressed: false, disabled: true },
      slots: { default: 'Disabled' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:pressed')).toBeFalsy();
  });

  it('aplica clases de variant "outline" (border-border shadow-sm)', () => {
    const wrapper = mount(UiToggle, {
      props: { variant: 'outline' },
      slots: { default: 'Outline' },
    });
    // tailwind-merge absorbe border-ui (custom @utility) como border-color y conserva border-border
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['border-border', 'shadow-sm']));
  });

  it('renderiza el slot correctamente', () => {
    const wrapper = mount(UiToggle, { slots: { default: 'Negrita' } });
    expect(wrapper.text()).toBe('Negrita');
  });

  it('fusiona clases custom mediante prop class', () => {
    const wrapper = mount(UiToggle, {
      props: { class: 'w-full rounded-none' },
      slots: { default: 'Full' },
    });
    expect(wrapper.attributes('class')).toContain('w-full');
    expect(wrapper.attributes('class')).toContain('rounded-none');
  });
});
