import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiBadge from '../UiBadge.vue';

describe('UiBadge', () => {
  it('renderiza un <span> por defecto', () => {
    const wrapper = mount(UiBadge, { slots: { default: 'Beta' } });
    expect(wrapper.element.tagName).toBe('SPAN');
    expect(wrapper.text()).toBe('Beta');
  });

  it('renderiza el tag indicado con la prop "as"', () => {
    const wrapper = mount(UiBadge, {
      props: { as: 'div' },
      slots: { default: 'Etiqueta' },
    });
    expect(wrapper.element.tagName).toBe('DIV');
  });

  it('aplica clases de variant "default" (bg-primary)', () => {
    const wrapper = mount(UiBadge, { slots: { default: 'Default' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-primary']));
  });

  it('aplica clases de variant "destructive"', () => {
    const wrapper = mount(UiBadge, {
      props: { variant: 'destructive' },
      slots: { default: 'Error' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-destructive']));
  });

  it('aplica clases de variant "secondary"', () => {
    const wrapper = mount(UiBadge, {
      props: { variant: 'secondary' },
      slots: { default: 'Secundario' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-secondary']));
  });

  it('aplica clase "truncate" cuando la prop es true', () => {
    const wrapper = mount(UiBadge, {
      props: { truncate: true },
      slots: { default: 'Texto muy largo que se debe truncar' },
    });
    expect(wrapper.classes()).toContain('truncate');
  });

  it('no aplica "truncate" por defecto', () => {
    const wrapper = mount(UiBadge, { slots: { default: 'Normal' } });
    expect(wrapper.classes()).not.toContain('truncate');
  });

  it('aplica clases de size "sm"', () => {
    const wrapper = mount(UiBadge, {
      props: { size: 'sm' },
      slots: { default: 'Pequeño' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['px-2']));
  });

  it('aplica clases de size "lg"', () => {
    const wrapper = mount(UiBadge, {
      props: { size: 'lg' },
      slots: { default: 'Grande' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['px-3']));
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiBadge, {
      attrs: { class: 'ml-2 uppercase' },
      slots: { default: 'Custom' },
    });
    expect(wrapper.attributes('class')).toContain('ml-2');
    expect(wrapper.attributes('class')).toContain('uppercase');
  });
});
