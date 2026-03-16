import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiAlert from '../UiAlert.vue';
import UiAlertTitle from '../UiAlertTitle.vue';
import UiAlertDescription from '../UiAlertDescription.vue';

describe('UiAlert', () => {
  it('renderiza un <div> con role="alert"', () => {
    const wrapper = mount(UiAlert, { slots: { default: 'Mensaje' } });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('aplica clases de variant "default" (bg-card text-foreground)', () => {
    const wrapper = mount(UiAlert, { slots: { default: 'Info' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-card', 'text-foreground']));
  });

  it('aplica clases de variant "destructive"', () => {
    const wrapper = mount(UiAlert, {
      props: { variant: 'destructive' },
      slots: { default: 'Error crítico' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['text-destructive']));
  });

  it('aplica clases de variant "warning"', () => {
    const wrapper = mount(UiAlert, {
      props: { variant: 'warning' },
      slots: { default: 'Advertencia' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['text-warning']));
  });

  it('renderiza el slot default', () => {
    const wrapper = mount(UiAlert, { slots: { default: 'Contenido de alerta' } });
    expect(wrapper.text()).toBe('Contenido de alerta');
  });

  it('fusiona clases custom con cn() mediante prop class', () => {
    const wrapper = mount(UiAlert, {
      props: { class: 'mt-4 w-full' },
      slots: { default: 'Alerta' },
    });
    expect(wrapper.attributes('class')).toContain('mt-4');
    expect(wrapper.attributes('class')).toContain('w-full');
  });
});

describe('UiAlertTitle', () => {
  it('renderiza un <h5>', () => {
    const wrapper = mount(UiAlertTitle, { slots: { default: 'Título de alerta' } });
    expect(wrapper.element.tagName).toBe('H5');
    expect(wrapper.text()).toBe('Título de alerta');
  });

  it('incluye clases base de tipografía', () => {
    const wrapper = mount(UiAlertTitle, { slots: { default: 'Título' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['font-medium', 'leading-none']));
  });

  it('fusiona clases custom mediante prop class', () => {
    const wrapper = mount(UiAlertTitle, {
      props: { class: 'text-lg' },
      slots: { default: 'Título' },
    });
    expect(wrapper.attributes('class')).toContain('text-lg');
  });
});

describe('UiAlertDescription', () => {
  it('renderiza un <div> con el contenido del slot', () => {
    const wrapper = mount(UiAlertDescription, { slots: { default: 'Descripción detallada' } });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.text()).toBe('Descripción detallada');
  });

  it('incluye clase base text-sm', () => {
    const wrapper = mount(UiAlertDescription, { slots: { default: 'Desc' } });
    expect(wrapper.classes()).toContain('text-sm');
  });

  it('fusiona clases custom mediante prop class', () => {
    const wrapper = mount(UiAlertDescription, {
      props: { class: 'opacity-80' },
      slots: { default: 'Desc' },
    });
    expect(wrapper.attributes('class')).toContain('opacity-80');
  });
});
