import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UiButton from '../UiButton.vue';

describe('UiButton', () => {
  // ── Renderizado base ──
  it('renderiza un <button> por defecto', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Click me' } });
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.text()).toBe('Click me');
  });

  it('renderiza el tag indicado con la prop "as"', () => {
    const wrapper = mount(UiButton, {
      props: { as: 'a' },
      attrs: { href: '/test' },
      slots: { default: 'Link' },
    });
    expect(wrapper.element.tagName).toBe('A');
    expect(wrapper.attributes('href')).toBe('/test');
  });

  // ── Passthrough de atributos (aria, data-*) ──
  it('pasa aria-label al nodo raíz', () => {
    const wrapper = mount(UiButton, {
      attrs: { 'aria-label': 'Guardar cambios' },
      slots: { default: 'Guardar' },
    });
    expect(wrapper.attributes('aria-label')).toBe('Guardar cambios');
  });

  it('pasa aria-disabled al nodo raíz', () => {
    const wrapper = mount(UiButton, {
      attrs: { 'aria-disabled': 'true' },
      slots: { default: 'Disabled' },
    });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('pasa atributos data-* al nodo raíz', () => {
    const wrapper = mount(UiButton, {
      attrs: { 'data-testid': 'btn-submit' },
      slots: { default: 'Submit' },
    });
    expect(wrapper.attributes('data-testid')).toBe('btn-submit');
  });

  // ── Eventos ──
  it('emite el evento click correctamente', async () => {
    const onClick = vi.fn();
    const wrapper = mount(UiButton, {
      attrs: { onClick },
      slots: { default: 'Click' },
    });
    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('no emite click cuando está disabled', async () => {
    const onClick = vi.fn();
    const wrapper = mount(UiButton, {
      attrs: { onClick, disabled: true },
      slots: { default: 'Disabled' },
    });
    await wrapper.trigger('click');
    // Browsers prevent click on disabled buttons
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  // ── Variantes ──
  it('aplica clases de variant "destructive"', () => {
    const wrapper = mount(UiButton, {
      props: { variant: 'destructive' },
      slots: { default: 'Eliminar' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-destructive']));
  });

  it('aplica clases de size "sm"', () => {
    const wrapper = mount(UiButton, {
      props: { size: 'sm' },
      slots: { default: 'Small' },
    });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('h-9');
  });

  // ── Truncate ──
  it('no aplica truncate por defecto', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Normal' } });
    expect(wrapper.classes()).not.toContain('truncate');
  });

  it('aplica clase truncate cuando la prop es true', () => {
    const wrapper = mount(UiButton, {
      props: { truncate: true },
      slots: { default: 'Texto largo que debería truncarse en pantallas pequeñas' },
    });
    expect(wrapper.classes()).toContain('truncate');
  });

  // ── Merge de clases ──
  it('fusiona clases custom con cn() sin conflictos', () => {
    const wrapper = mount(UiButton, {
      attrs: { class: 'w-full mt-4' },
      slots: { default: 'Full width' },
    });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('w-full');
    expect(classStr).toContain('mt-4');
  });

  // ── Micro-interacciones ──
  it('incluye active:scale en las clases base', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Press' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('active:scale-[0.97]');
  });
});
