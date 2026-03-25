import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiCard from '../UiCard.vue';
import UiCardContent from '../UiCardContent.vue';
import UiCardHeader from '../UiCardHeader.vue';
import UiCardTitle from '../UiCardTitle.vue';
import UiCardDescription from '../UiCardDescription.vue';
import UiCardFooter from '../UiCardFooter.vue';

// ---------------------------------------------------------------------------
// UiCard
// ---------------------------------------------------------------------------
describe('UiCard', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiCard, { slots: { default: 'contenido' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('contenido');
  });

  it('usa div como tag por defecto', () => {
    const wrapper = mount(UiCard);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('aplica clases base del variante default', () => {
    const wrapper = mount(UiCard);
    expect(wrapper.classes()).toContain('rounded-lg');
    expect(wrapper.classes()).toContain('shadow-none');
  });

  it('NO aplica clases interactivas cuando as="div"', () => {
    const wrapper = mount(UiCard, { props: { as: 'div' } });
    expect(wrapper.classes()).not.toContain('cursor-pointer');
    expect(wrapper.classes()).not.toContain('hover:shadow-lg');
  });

  it('modo interactivo: as="button" añade cursor-pointer y hover:shadow-lg', () => {
    const wrapper = mount(UiCard, { props: { as: 'button' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    expect(wrapper.classes()).toContain('cursor-pointer');
    expect(wrapper.classes()).toContain('hover:shadow-lg');
  });

  it('modo interactivo: as="a" aplica clases interactivas', () => {
    const wrapper = mount(UiCard, { props: { as: 'a' } });
    expect(wrapper.classes()).toContain('cursor-pointer');
  });

  it('hace merge de clase extra pasada vía attrs', () => {
    const wrapper = mount(UiCard, { attrs: { class: 'mi-clase-custom' } });
    expect(wrapper.classes()).toContain('mi-clase-custom');
    expect(wrapper.classes()).toContain('rounded-lg');
  });
});

// ---------------------------------------------------------------------------
// UiCardContent
// ---------------------------------------------------------------------------
describe('UiCardContent', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiCardContent, { slots: { default: 'texto' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('texto');
  });

  it('usa div como tag raíz', () => {
    const wrapper = mount(UiCardContent);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('contiene clases de padding base', () => {
    const wrapper = mount(UiCardContent);
    expect(wrapper.classes()).toContain('p-3');
    expect(wrapper.classes()).toContain('pt-0');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiCardContent, { attrs: { class: 'extra' } });
    expect(wrapper.classes()).toContain('extra');
    expect(wrapper.classes()).toContain('p-3');
  });
});

// ---------------------------------------------------------------------------
// UiCardHeader
// ---------------------------------------------------------------------------
describe('UiCardHeader', () => {
  it('renderiza correctamente con slot', () => {
    const wrapper = mount(UiCardHeader, { slots: { default: 'cabecera' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('cabecera');
  });

  it('usa div como tag raíz', () => {
    const wrapper = mount(UiCardHeader);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('contiene clases flex y padding', () => {
    const wrapper = mount(UiCardHeader);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('p-3');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiCardHeader, { attrs: { class: 'extra-header' } });
    expect(wrapper.classes()).toContain('extra-header');
    expect(wrapper.classes()).toContain('flex');
  });
});

// ---------------------------------------------------------------------------
// UiCardTitle
// ---------------------------------------------------------------------------
describe('UiCardTitle', () => {
  it('renderiza el texto del slot', () => {
    const wrapper = mount(UiCardTitle, { slots: { default: 'Mi Título' } });
    expect(wrapper.text()).toBe('Mi Título');
  });

  it('usa h3 como tag por defecto', () => {
    const wrapper = mount(UiCardTitle);
    expect(wrapper.element.tagName.toLowerCase()).toBe('h3');
  });

  it('acepta prop as para cambiar el tag', () => {
    const wrapper = mount(UiCardTitle, { props: { as: 'h2' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
  });

  it('contiene clases de tipografía', () => {
    const wrapper = mount(UiCardTitle);
    expect(wrapper.classes()).toContain('font-semibold');
    expect(wrapper.classes()).toContain('text-lg');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiCardTitle, { attrs: { class: 'mi-titulo' } });
    expect(wrapper.classes()).toContain('mi-titulo');
    expect(wrapper.classes()).toContain('font-semibold');
  });
});

// ---------------------------------------------------------------------------
// UiCardDescription
// ---------------------------------------------------------------------------
describe('UiCardDescription', () => {
  it('renderiza el texto del slot', () => {
    const wrapper = mount(UiCardDescription, { slots: { default: 'descripción' } });
    expect(wrapper.text()).toBe('descripción');
  });

  it('usa p como tag raíz', () => {
    const wrapper = mount(UiCardDescription);
    expect(wrapper.element.tagName.toLowerCase()).toBe('p');
  });

  it('contiene clase text-muted-foreground', () => {
    const wrapper = mount(UiCardDescription);
    expect(wrapper.classes()).toContain('text-muted-foreground');
  });

  it('contiene clase text-sm', () => {
    const wrapper = mount(UiCardDescription);
    expect(wrapper.classes()).toContain('text-sm');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiCardDescription, { attrs: { class: 'extra-desc' } });
    expect(wrapper.classes()).toContain('extra-desc');
    expect(wrapper.classes()).toContain('text-muted-foreground');
  });
});

// ---------------------------------------------------------------------------
// UiCardFooter
// ---------------------------------------------------------------------------
describe('UiCardFooter', () => {
  it('renderiza correctamente con slot', () => {
    const wrapper = mount(UiCardFooter, { slots: { default: 'pie' } });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('pie');
  });

  it('usa div como tag raíz', () => {
    const wrapper = mount(UiCardFooter);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('contiene clases flex e items-center', () => {
    const wrapper = mount(UiCardFooter);
    expect(wrapper.classes()).toContain('flex');
    expect(wrapper.classes()).toContain('items-center');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiCardFooter, { attrs: { class: 'footer-extra' } });
    expect(wrapper.classes()).toContain('footer-extra');
    expect(wrapper.classes()).toContain('flex');
  });
});
