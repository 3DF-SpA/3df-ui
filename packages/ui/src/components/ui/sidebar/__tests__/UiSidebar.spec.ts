import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiSidebarProvider from '../UiSidebarProvider.vue';
import UiSidebar from '../UiSidebar.vue';
import UiSidebarContent from '../UiSidebarContent.vue';
import UiSidebarFooter from '../UiSidebarFooter.vue';
import UiSidebarHeader from '../UiSidebarHeader.vue';
import UiSidebarMenu from '../UiSidebarMenu.vue';
import UiSidebarMenuButton from '../UiSidebarMenuButton.vue';
import UiSidebarMenuItem from '../UiSidebarMenuItem.vue';

// Helper: monta cualquier template dentro de UiSidebarProvider
function mountWithProvider(innerSlot: string, providerProps: Record<string, unknown> = {}) {
  return mount(UiSidebarProvider, {
    props: providerProps,
    slots: { default: innerSlot },
    global: {
      components: {
        UiSidebar,
        UiSidebarHeader,
        UiSidebarContent,
        UiSidebarFooter,
        UiSidebarMenu,
        UiSidebarMenuItem,
        UiSidebarMenuButton,
      },
    },
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarProvider
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarProvider', () => {
  it('renderiza sin errores', () => {
    const wrapper = mount(UiSidebarProvider, {
      slots: { default: '<div>slot</div>' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('data-variant es "sidebar" por defecto', () => {
    const wrapper = mount(UiSidebarProvider, {
      slots: { default: '<div>slot</div>' },
    });
    expect(wrapper.attributes('data-variant')).toBe('sidebar');
  });

  it('data-side es "left" por defecto', () => {
    const wrapper = mount(UiSidebarProvider, {
      slots: { default: '<div>slot</div>' },
    });
    expect(wrapper.attributes('data-side')).toBe('left');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebar
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebar', () => {
  it('renderiza un <aside> dentro del Provider', () => {
    const wrapper = mountWithProvider('<UiSidebar><div>contenido</div></UiSidebar>');
    expect(wrapper.find('aside').exists()).toBe(true);
  });

  it('<aside> tiene data-variant="sidebar" por defecto', () => {
    const wrapper = mountWithProvider('<UiSidebar><div>contenido</div></UiSidebar>');
    expect(wrapper.find('aside').attributes('data-variant')).toBe('sidebar');
  });

  it('<aside> tiene data-side="left" por defecto', () => {
    const wrapper = mountWithProvider('<UiSidebar><div>contenido</div></UiSidebar>');
    expect(wrapper.find('aside').attributes('data-side')).toBe('left');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarHeader
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarHeader', () => {
  it('renderiza el contenido del slot', () => {
    const wrapper = mount(UiSidebarHeader, {
      slots: { default: '<span>Encabezado</span>' },
    });
    expect(wrapper.text()).toContain('Encabezado');
  });

  it('tiene data-sidebar="header"', () => {
    const wrapper = mount(UiSidebarHeader);
    expect(wrapper.attributes('data-sidebar')).toBe('header');
  });

  it('hace merge de clase custom', () => {
    const wrapper = mount(UiSidebarHeader, {
      attrs: { class: 'extra-header' },
    });
    expect(wrapper.classes()).toContain('extra-header');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarContent
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarContent', () => {
  it('renderiza el contenido del slot', () => {
    const wrapper = mount(UiSidebarContent, {
      slots: { default: '<p>Contenido</p>' },
    });
    expect(wrapper.text()).toContain('Contenido');
  });

  it('tiene data-sidebar="content"', () => {
    const wrapper = mount(UiSidebarContent);
    expect(wrapper.attributes('data-sidebar')).toBe('content');
  });

  it('hace merge de clase custom', () => {
    const wrapper = mount(UiSidebarContent, {
      attrs: { class: 'mi-clase-content' },
    });
    expect(wrapper.classes()).toContain('mi-clase-content');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarFooter
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarFooter', () => {
  it('renderiza el contenido del slot', () => {
    const wrapper = mount(UiSidebarFooter, {
      slots: { default: '<span>Pie de página</span>' },
    });
    expect(wrapper.text()).toContain('Pie de página');
  });

  it('tiene data-sidebar="footer"', () => {
    const wrapper = mount(UiSidebarFooter);
    expect(wrapper.attributes('data-sidebar')).toBe('footer');
  });

  it('hace merge de clase custom', () => {
    const wrapper = mount(UiSidebarFooter, {
      attrs: { class: 'extra-footer' },
    });
    expect(wrapper.classes()).toContain('extra-footer');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarMenu
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarMenu', () => {
  it('renderiza una <ul>', () => {
    const wrapper = mount(UiSidebarMenu);
    expect(wrapper.element.tagName.toLowerCase()).toBe('ul');
  });

  it('tiene data-sidebar="menu"', () => {
    const wrapper = mount(UiSidebarMenu);
    expect(wrapper.attributes('data-sidebar')).toBe('menu');
  });

  it('renderiza los items del slot', () => {
    const wrapper = mount(UiSidebarMenu, {
      slots: { default: '<li>Item A</li><li>Item B</li>' },
    });
    expect(wrapper.findAll('li').length).toBe(2);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarMenuItem
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarMenuItem', () => {
  it('renderiza una <li>', () => {
    const wrapper = mount(UiSidebarMenuItem);
    expect(wrapper.element.tagName.toLowerCase()).toBe('li');
  });

  it('tiene data-sidebar="menu-item"', () => {
    const wrapper = mount(UiSidebarMenuItem);
    expect(wrapper.attributes('data-sidebar')).toBe('menu-item');
  });

  it('renderiza el contenido del slot', () => {
    const wrapper = mount(UiSidebarMenuItem, {
      slots: { default: '<span>Mi ítem</span>' },
    });
    expect(wrapper.text()).toContain('Mi ítem');
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// UiSidebarMenuButton
// ─────────────────────────────────────────────────────────────────────────────
describe('UiSidebarMenuButton', () => {
  it('renderiza un <button> con data-sidebar="menu-button"', () => {
    const wrapper = mountWithProvider(
      '<UiSidebarMenuButton>Acción</UiSidebarMenuButton>',
    );
    const btn = wrapper.find('[data-sidebar="menu-button"]');
    expect(btn.exists()).toBe(true);
    expect(btn.element.tagName.toLowerCase()).toBe('button');
  });

  it('hace merge de clase custom', () => {
    const wrapper = mountWithProvider(
      '<UiSidebarMenuButton class="btn-extra">Acción</UiSidebarMenuButton>',
    );
    expect(wrapper.find('[data-sidebar="menu-button"]').classes()).toContain('btn-extra');
  });

  it('aplica data-active cuando isActive=true', () => {
    const wrapper = mountWithProvider(
      '<UiSidebarMenuButton :is-active="true">Activo</UiSidebarMenuButton>',
    );
    expect(wrapper.find('[data-sidebar="menu-button"]').attributes('data-active')).toBe('true');
  });

  it('omite data-active cuando isActive=false', () => {
    const wrapper = mountWithProvider(
      '<UiSidebarMenuButton :is-active="false">Inactivo</UiSidebarMenuButton>',
    );
    expect(wrapper.find('[data-sidebar="menu-button"]').attributes('data-active')).toBeUndefined();
  });

  it('renderiza como <a> cuando as="a"', () => {
    const wrapper = mountWithProvider(
      '<UiSidebarMenuButton as="a">Link</UiSidebarMenuButton>',
    );
    expect(wrapper.find('[data-sidebar="menu-button"]').element.tagName.toLowerCase()).toBe('a');
  });
});
