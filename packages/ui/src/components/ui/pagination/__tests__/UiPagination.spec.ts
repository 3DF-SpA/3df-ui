import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiPagination from '../UiPagination.vue';
import UiPaginationContent from '../UiPaginationContent.vue';
import UiPaginationItem from '../UiPaginationItem.vue';
import UiPaginationLink from '../UiPaginationLink.vue';
import UiPaginationNext from '../UiPaginationNext.vue';
import UiPaginationPrevious from '../UiPaginationPrevious.vue';
import UiPaginationEllipsis from '../UiPaginationEllipsis.vue';

// ---------------------------------------------------------------------------
// UiPagination
// ---------------------------------------------------------------------------
describe('UiPagination', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiPagination);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un elemento <nav>', () => {
    const wrapper = mount(UiPagination);
    expect(wrapper.element.tagName.toLowerCase()).toBe('nav');
  });

  it('tiene role="navigation"', () => {
    const wrapper = mount(UiPagination);
    expect(wrapper.attributes('role')).toBe('navigation');
  });

  it('tiene aria-label="pagination"', () => {
    const wrapper = mount(UiPagination);
    expect(wrapper.attributes('aria-label')).toBe('pagination');
  });

  it('contiene clases flex y justify-center', () => {
    const wrapper = mount(UiPagination);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('justify-center');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPagination, { attrs: { class: 'extra-pag' } });
    expect(wrapper.classes()).toContain('extra-pag');
    expect(wrapper.classes()).toContain('flex');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiPagination, { slots: { default: '<span>págs</span>' } });
    expect(wrapper.text()).toContain('págs');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationContent
// ---------------------------------------------------------------------------
describe('UiPaginationContent', () => {
  it('renderiza un elemento <ul>', () => {
    const wrapper = mount(UiPaginationContent);
    expect(wrapper.element.tagName.toLowerCase()).toBe('ul');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiPaginationContent, { slots: { default: '<li>1</li>' } });
    expect(wrapper.text()).toContain('1');
  });

  it('contiene clases flex e items-center', () => {
    const wrapper = mount(UiPaginationContent);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('items-center');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationContent, { attrs: { class: 'extra-content' } });
    expect(wrapper.classes()).toContain('extra-content');
    expect(wrapper.classes()).toContain('flex');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationItem
// ---------------------------------------------------------------------------
describe('UiPaginationItem', () => {
  it('renderiza un elemento <li>', () => {
    const wrapper = mount(UiPaginationItem);
    expect(wrapper.element.tagName.toLowerCase()).toBe('li');
  });

  it('renderiza contenido en el slot', () => {
    const wrapper = mount(UiPaginationItem, { slots: { default: 'ítem' } });
    expect(wrapper.text()).toContain('ítem');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationItem, { attrs: { class: 'extra-item' } });
    expect(wrapper.classes()).toContain('extra-item');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationLink
// ---------------------------------------------------------------------------
describe('UiPaginationLink', () => {
  it('renderiza un <button> por defecto', () => {
    const wrapper = mount(UiPaginationLink, { slots: { default: '1' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });

  it('renderiza el texto del slot', () => {
    const wrapper = mount(UiPaginationLink, { slots: { default: '5' } });
    expect(wrapper.text()).toBe('5');
  });

  it('cuando isActive=false NO tiene aria-current', () => {
    const wrapper = mount(UiPaginationLink, { props: { isActive: false } });
    expect(wrapper.attributes('aria-current')).toBeUndefined();
  });

  it('cuando isActive=true tiene aria-current="page"', () => {
    const wrapper = mount(UiPaginationLink, { props: { isActive: true } });
    expect(wrapper.attributes('aria-current')).toBe('page');
  });

  it('cuando isActive=true contiene clase bg-accent', () => {
    const wrapper = mount(UiPaginationLink, { props: { isActive: true } });
    expect(wrapper.classes()).toContain('bg-accent');
  });

  it('cuando disabled=true contiene clase opacity-50', () => {
    const wrapper = mount(UiPaginationLink, { props: { disabled: true } });
    expect(wrapper.classes()).toContain('opacity-50');
  });

  it('acepta prop as para cambiar el tag', () => {
    const wrapper = mount(UiPaginationLink, { props: { as: 'a' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('a');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationLink, { attrs: { class: 'extra-link' } });
    expect(wrapper.classes()).toContain('extra-link');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationNext
// ---------------------------------------------------------------------------
describe('UiPaginationNext', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiPaginationNext);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un <button> por defecto', () => {
    const wrapper = mount(UiPaginationNext);
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });

  it('tiene aria-label de navegación', () => {
    const wrapper = mount(UiPaginationNext);
    expect(wrapper.attributes('aria-label')).toBeTruthy();
  });

  it('cuando disabled=true contiene clase opacity-50', () => {
    const wrapper = mount(UiPaginationNext, { props: { disabled: true } });
    expect(wrapper.classes()).toContain('opacity-50');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationNext, { attrs: { class: 'extra-next' } });
    expect(wrapper.classes()).toContain('extra-next');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationPrevious
// ---------------------------------------------------------------------------
describe('UiPaginationPrevious', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiPaginationPrevious);
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un <button> por defecto', () => {
    const wrapper = mount(UiPaginationPrevious);
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
  });

  it('tiene aria-label de navegación', () => {
    const wrapper = mount(UiPaginationPrevious);
    expect(wrapper.attributes('aria-label')).toBeTruthy();
  });

  it('cuando disabled=true contiene clase opacity-50', () => {
    const wrapper = mount(UiPaginationPrevious, { props: { disabled: true } });
    expect(wrapper.classes()).toContain('opacity-50');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationPrevious, { attrs: { class: 'extra-prev' } });
    expect(wrapper.classes()).toContain('extra-prev');
  });
});

// ---------------------------------------------------------------------------
// UiPaginationEllipsis
// ---------------------------------------------------------------------------
describe('UiPaginationEllipsis', () => {
  it('renderiza un elemento <span>', () => {
    const wrapper = mount(UiPaginationEllipsis);
    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
  });

  it('tiene aria-hidden="true"', () => {
    const wrapper = mount(UiPaginationEllipsis);
    expect(wrapper.attributes('aria-hidden')).toBe('true');
  });

  it('contiene el svg de puntos suspensivos', () => {
    const wrapper = mount(UiPaginationEllipsis);
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('contiene texto sr-only "Más páginas"', () => {
    const wrapper = mount(UiPaginationEllipsis);
    const srOnly = wrapper.find('.sr-only');
    expect(srOnly.exists()).toBe(true);
    expect(srOnly.text()).toContain('Más páginas');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiPaginationEllipsis, { attrs: { class: 'extra-ellipsis' } });
    expect(wrapper.classes()).toContain('extra-ellipsis');
  });
});
