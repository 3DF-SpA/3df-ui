import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiTabs from '../UiTabs.vue';
import UiTabsList from '../UiTabsList.vue';
import UiTabsTrigger from '../UiTabsTrigger.vue';
import UiTabsContent from '../UiTabsContent.vue';

// Helper: monta el árbol completo de tabs
function mountTabs(defaultValue = 'tab1') {
  return mount(UiTabs, {
    props: { defaultValue },
    slots: {
      default: `
        <UiTabsList>
          <UiTabsTrigger value="tab1">Tab 1</UiTabsTrigger>
          <UiTabsTrigger value="tab2">Tab 2</UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="tab1">Contenido 1</UiTabsContent>
        <UiTabsContent value="tab2">Contenido 2</UiTabsContent>
      `,
    },
    global: {
      components: { UiTabsList, UiTabsTrigger, UiTabsContent },
    },
  });
}

// ---------------------------------------------------------------------------
// UiTabs (root)
// ---------------------------------------------------------------------------
describe('UiTabs', () => {
  it('renderiza correctamente', () => {
    const wrapper = mountTabs();
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza como div con data-orientation horizontal por defecto', () => {
    const wrapper = mount(UiTabs, { props: { defaultValue: '' } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    expect(wrapper.attributes('data-orientation')).toBe('horizontal');
  });

  it('aplica data-orientation vertical cuando se pasa la prop', () => {
    const wrapper = mount(UiTabs, {
      props: { defaultValue: '', orientation: 'vertical' },
    });
    expect(wrapper.attributes('data-orientation')).toBe('vertical');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTabs, {
      props: { defaultValue: '' },
      attrs: { class: 'extra-tabs' },
    });
    expect(wrapper.classes()).toContain('extra-tabs');
  });
});

// ---------------------------------------------------------------------------
// UiTabsList
// ---------------------------------------------------------------------------
describe('UiTabsList', () => {
  it('renderiza con slot dentro de UiTabs', () => {
    const wrapper = mountTabs();
    const list = wrapper.findComponent(UiTabsList);
    expect(list.exists()).toBe(true);
  });

  it('tiene role="tablist"', () => {
    const wrapper = mountTabs();
    const list = wrapper.find('[role="tablist"]');
    expect(list.exists()).toBe(true);
  });

  it('contiene los triggers en el slot', () => {
    const wrapper = mountTabs();
    const list = wrapper.find('[role="tablist"]');
    expect(list.text()).toContain('Tab 1');
    expect(list.text()).toContain('Tab 2');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiTabs, {
      props: { defaultValue: 'a' },
      slots: {
        default: '<UiTabsList class="extra-list"><UiTabsTrigger value="a">A</UiTabsTrigger></UiTabsList>',
      },
      global: { components: { UiTabsList, UiTabsTrigger } },
    });
    const list = wrapper.find('[role="tablist"]');
    expect(list.classes()).toContain('extra-list');
  });
});

// ---------------------------------------------------------------------------
// UiTabsTrigger
// ---------------------------------------------------------------------------
describe('UiTabsTrigger', () => {
  it('renderiza botones para cada trigger', () => {
    const wrapper = mountTabs();
    const triggers = wrapper.findAll('[role="tab"]');
    expect(triggers.length).toBe(2);
  });

  it('el trigger del tab activo tiene aria-selected="true"', () => {
    const wrapper = mountTabs('tab1');
    const trigger1 = wrapper.find('[role="tab"][aria-selected="true"]');
    expect(trigger1.exists()).toBe(true);
    expect(trigger1.text()).toContain('Tab 1');
  });

  it('el trigger inactivo tiene aria-selected="false"', () => {
    const wrapper = mountTabs('tab1');
    const triggers = wrapper.findAll('[role="tab"]');
    const inactiveTrigger = triggers.find(t => t.attributes('aria-selected') === 'false');
    expect(inactiveTrigger).toBeDefined();
  });

  it('al hacer click cambia el tab activo', async () => {
    const wrapper = mountTabs('tab1');
    const triggers = wrapper.findAll('[role="tab"]');
    await triggers[1].trigger('click');
    expect(triggers[1].attributes('aria-selected')).toBe('true');
    expect(triggers[0].attributes('aria-selected')).toBe('false');
  });

  it('trigger deshabilitado no cambia el tab activo', async () => {
    const wrapper = mount(UiTabs, {
      props: { defaultValue: 'tab1' },
      slots: {
        default: `
          <UiTabsList>
            <UiTabsTrigger value="tab1">Tab 1</UiTabsTrigger>
            <UiTabsTrigger value="tab2" :disabled="true">Tab 2</UiTabsTrigger>
          </UiTabsList>
          <UiTabsContent value="tab1">C1</UiTabsContent>
          <UiTabsContent value="tab2">C2</UiTabsContent>
        `,
      },
      global: { components: { UiTabsList, UiTabsTrigger, UiTabsContent } },
    });
    const triggers = wrapper.findAll('[role="tab"]');
    await triggers[1].trigger('click');
    expect(triggers[0].attributes('aria-selected')).toBe('true');
  });
});

// ---------------------------------------------------------------------------
// UiTabsContent
// ---------------------------------------------------------------------------
describe('UiTabsContent', () => {
  it('muestra el contenido del tab activo', () => {
    const wrapper = mountTabs('tab1');
    const panels = wrapper.findAll('[role="tabpanel"]');
    const activePanel = panels.find(p => p.attributes('data-state') === 'active');
    expect(activePanel).toBeDefined();
    expect(activePanel!.text()).toContain('Contenido 1');
  });

  it('el panel inactivo tiene data-state="inactive"', () => {
    const wrapper = mountTabs('tab1');
    const panels = wrapper.findAll('[role="tabpanel"]');
    const inactivePanel = panels.find(p => p.attributes('data-state') === 'inactive');
    expect(inactivePanel).toBeDefined();
  });

  it('hay tantos paneles como tabs', () => {
    const wrapper = mountTabs();
    const panels = wrapper.findAll('[role="tabpanel"]');
    expect(panels.length).toBe(2);
  });

  it('al cambiar tab, el panel correcto pasa a activo', async () => {
    const wrapper = mountTabs('tab1');
    const triggers = wrapper.findAll('[role="tab"]');
    await triggers[1].trigger('click');
    const panels = wrapper.findAll('[role="tabpanel"]');
    const activePanel = panels.find(p => p.attributes('data-state') === 'active');
    expect(activePanel!.text()).toContain('Contenido 2');
  });
});
