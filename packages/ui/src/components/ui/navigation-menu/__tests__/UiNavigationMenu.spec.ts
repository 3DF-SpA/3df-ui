import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiNavigationMenu from '../UiNavigationMenu.vue';
import UiNavigationMenuItem from '../UiNavigationMenuItem.vue';
import UiNavigationMenuList from '../UiNavigationMenuList.vue';

describe('UiNavigationMenu', () => {
  it('renderiza un elemento <nav>', () => {
    const wrapper = mount(UiNavigationMenu, {
      slots: { default: '<span>Contenido</span>' },
    });
    expect(wrapper.find('nav').exists()).toBe(true);
  });

  it('tiene aria-label="Main"', () => {
    const wrapper = mount(UiNavigationMenu);
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Main');
  });

  it('renderiza UiNavigationMenuItem en el slot', () => {
    const wrapper = mount(UiNavigationMenu, {
      slots: {
        default: {
          components: { UiNavigationMenuList, UiNavigationMenuItem },
          template: `
            <UiNavigationMenuList>
              <UiNavigationMenuItem>Inicio</UiNavigationMenuItem>
              <UiNavigationMenuItem>Nosotros</UiNavigationMenuItem>
            </UiNavigationMenuList>
          `,
        },
      },
    });
    expect(wrapper.findAll('li')).toHaveLength(2);
  });

  it('UiNavigationMenuList renderiza un <ul>', () => {
    const wrapper = mount(UiNavigationMenuList, {
      slots: { default: '<li>Item</li>' },
    });
    expect(wrapper.find('ul').exists()).toBe(true);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiNavigationMenu, {
      attrs: { class: 'custom-nav-class' },
    });
    expect(wrapper.find('nav').attributes('class')).toContain('custom-nav-class');
  });

  it('incluye las clases base de layout', () => {
    const wrapper = mount(UiNavigationMenu);
    const navClass = wrapper.find('nav').attributes('class') ?? '';
    expect(navClass).toContain('flex');
    expect(navClass).toContain('items-center');
  });
});
