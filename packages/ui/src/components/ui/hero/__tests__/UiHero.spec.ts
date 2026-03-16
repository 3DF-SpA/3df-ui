import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiHeroSimple from '../UiHeroSimple.vue';

describe('UiHeroSimple', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiHeroSimple);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un elemento <section>', () => {
    const wrapper = mount(UiHeroSimple);
    expect(wrapper.find('section').exists()).toBe(true);
  });

  it('muestra el headline cuando se pasa el prop headline', () => {
    const wrapper = mount(UiHeroSimple, {
      props: { headline: 'Bienvenido a 3DF' },
    });
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Bienvenido a 3DF');
  });

  it('muestra la descripción cuando se pasa el prop description', () => {
    const wrapper = mount(UiHeroSimple, {
      props: { description: 'Una librería de componentes increíble.' },
    });
    expect(wrapper.find('p').text()).toBe('Una librería de componentes increíble.');
  });

  it('renderiza el slot headline personalizado', () => {
    const wrapper = mount(UiHeroSimple, {
      slots: { headline: '<h2 class="custom-headline">Headline custom</h2>' },
    });
    expect(wrapper.find('.custom-headline').exists()).toBe(true);
  });

  it('renderiza el slot description personalizado', () => {
    const wrapper = mount(UiHeroSimple, {
      slots: { description: '<span class="custom-desc">Descripción custom</span>' },
    });
    expect(wrapper.find('.custom-desc').exists()).toBe(true);
  });

  it('renderiza acciones desde el prop actions', () => {
    const wrapper = mount(UiHeroSimple, {
      props: {
        actions: [
          { label: 'Empezar', variant: 'primary' },
          { label: 'Ver más', variant: 'outline' },
        ],
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]!.text()).toBe('Empezar');
    expect(buttons[1]!.text()).toBe('Ver más');
  });

  it('renderiza el slot default', () => {
    const wrapper = mount(UiHeroSimple, {
      slots: { default: '<div class="extra-content">Extra</div>' },
    });
    expect(wrapper.find('.extra-content').exists()).toBe(true);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiHeroSimple, {
      attrs: { class: 'custom-hero' },
    });
    expect(wrapper.find('section').attributes('class')).toContain('custom-hero');
  });
});
