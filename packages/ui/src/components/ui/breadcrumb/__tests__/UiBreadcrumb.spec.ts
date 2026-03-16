import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiBreadcrumb from '../UiBreadcrumb.vue';
import UiBreadcrumbList from '../UiBreadcrumbList.vue';
import UiBreadcrumbItem from '../UiBreadcrumbItem.vue';
import UiBreadcrumbLink from '../UiBreadcrumbLink.vue';
import UiBreadcrumbSeparator from '../UiBreadcrumbSeparator.vue';
import UiBreadcrumbPage from '../UiBreadcrumbPage.vue';

// ---------------------------------------------------------------------------
// UiBreadcrumb
// ---------------------------------------------------------------------------
describe('UiBreadcrumb', () => {
  it('renderiza un elemento <nav>', () => {
    const wrapper = mount(UiBreadcrumb);
    expect(wrapper.element.tagName.toLowerCase()).toBe('nav');
  });

  it('tiene aria-label="breadcrumb"', () => {
    const wrapper = mount(UiBreadcrumb);
    expect(wrapper.attributes('aria-label')).toBe('breadcrumb');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiBreadcrumb, { slots: { default: '<span>ruta</span>' } });
    expect(wrapper.text()).toContain('ruta');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumb, { attrs: { class: 'mi-nav' } });
    expect(wrapper.classes()).toContain('mi-nav');
  });
});

// ---------------------------------------------------------------------------
// UiBreadcrumbList
// ---------------------------------------------------------------------------
describe('UiBreadcrumbList', () => {
  it('renderiza un elemento <ol>', () => {
    const wrapper = mount(UiBreadcrumbList);
    expect(wrapper.element.tagName.toLowerCase()).toBe('ol');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiBreadcrumbList, { slots: { default: '<li>ítem</li>' } });
    expect(wrapper.text()).toContain('ítem');
  });

  it('contiene clases flex y text-sm', () => {
    const wrapper = mount(UiBreadcrumbList);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('text-sm');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumbList, { attrs: { class: 'extra-list' } });
    expect(wrapper.classes()).toContain('extra-list');
    expect(wrapper.classes()).toContain('flex');
  });
});

// ---------------------------------------------------------------------------
// UiBreadcrumbItem
// ---------------------------------------------------------------------------
describe('UiBreadcrumbItem', () => {
  it('renderiza un elemento <li>', () => {
    const wrapper = mount(UiBreadcrumbItem);
    expect(wrapper.element.tagName.toLowerCase()).toBe('li');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiBreadcrumbItem, { slots: { default: 'Inicio' } });
    expect(wrapper.text()).toContain('Inicio');
  });

  it('contiene clases inline-flex e items-center', () => {
    const wrapper = mount(UiBreadcrumbItem);
    expect(wrapper.classes()).toContain('inline-flex');
    expect(wrapper.classes()).toContain('items-center');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumbItem, { attrs: { class: 'extra-item' } });
    expect(wrapper.classes()).toContain('extra-item');
    expect(wrapper.classes()).toContain('inline-flex');
  });
});

// ---------------------------------------------------------------------------
// UiBreadcrumbLink
// ---------------------------------------------------------------------------
describe('UiBreadcrumbLink', () => {
  it('renderiza un <a> cuando se provee href', () => {
    const wrapper = mount(UiBreadcrumbLink, { props: { href: '/inicio' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
  });

  it('renderiza un <span> cuando no se provee href ni as', () => {
    const wrapper = mount(UiBreadcrumbLink);
    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
  });

  it('el href del enlace es el valor pasado', () => {
    const wrapper = mount(UiBreadcrumbLink, { props: { href: '/contacto' } });
    expect(wrapper.attributes('href')).toBe('/contacto');
  });

  it('renderiza texto del slot', () => {
    const wrapper = mount(UiBreadcrumbLink, {
      props: { href: '/inicio' },
      slots: { default: 'Inicio' },
    });
    expect(wrapper.text()).toBe('Inicio');
  });

  it('contiene clase text-muted-foreground', () => {
    const wrapper = mount(UiBreadcrumbLink, { props: { href: '/' } });
    expect(wrapper.classes()).toContain('text-muted-foreground');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumbLink, {
      props: { href: '/' },
      attrs: { class: 'extra-link' },
    });
    expect(wrapper.classes()).toContain('extra-link');
    expect(wrapper.classes()).toContain('text-muted-foreground');
  });

  it('acepta prop as para cambiar el tag', () => {
    const wrapper = mount(UiBreadcrumbLink, { props: { as: 'button' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });
});

// ---------------------------------------------------------------------------
// UiBreadcrumbSeparator
// ---------------------------------------------------------------------------
describe('UiBreadcrumbSeparator', () => {
  it('renderiza un elemento <li>', () => {
    const wrapper = mount(UiBreadcrumbSeparator);
    expect(wrapper.element.tagName.toLowerCase()).toBe('li');
  });

  it('tiene role="presentation" y aria-hidden="true"', () => {
    const wrapper = mount(UiBreadcrumbSeparator);
    expect(wrapper.attributes('role')).toBe('presentation');
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('renderiza el svg de separador por defecto', () => {
    const wrapper = mount(UiBreadcrumbSeparator);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renderiza contenido personalizado en el slot', () => {
    const wrapper = mount(UiBreadcrumbSeparator, { slots: { default: '/' } });
    expect(wrapper.text()).toContain('/');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumbSeparator, { attrs: { class: 'sep-extra' } });
    expect(wrapper.classes()).toContain('sep-extra');
  });
});

// ---------------------------------------------------------------------------
// UiBreadcrumbPage
// ---------------------------------------------------------------------------
describe('UiBreadcrumbPage', () => {
  it('renderiza un elemento <span>', () => {
    const wrapper = mount(UiBreadcrumbPage);
    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
  });

  it('tiene aria-current="page"', () => {
    const wrapper = mount(UiBreadcrumbPage);
    expect(wrapper.attributes('aria-current')).toBe('page');
  });

  it('tiene aria-disabled="true"', () => {
    const wrapper = mount(UiBreadcrumbPage);
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('renderiza texto del slot', () => {
    const wrapper = mount(UiBreadcrumbPage, { slots: { default: 'Página actual' } });
    expect(wrapper.text()).toBe('Página actual');
  });

  it('contiene clase text-foreground', () => {
    const wrapper = mount(UiBreadcrumbPage);
    expect(wrapper.classes()).toContain('text-foreground');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiBreadcrumbPage, { attrs: { class: 'page-extra' } });
    expect(wrapper.classes()).toContain('page-extra');
    expect(wrapper.classes()).toContain('text-foreground');
  });
});
