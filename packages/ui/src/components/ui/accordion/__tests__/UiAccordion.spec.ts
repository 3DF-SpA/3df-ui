import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiAccordion from '../UiAccordion.vue';
import UiAccordionItem from '../UiAccordionItem.vue';
import UiAccordionTrigger from '../UiAccordionTrigger.vue';
import UiAccordionContent from '../UiAccordionContent.vue';

// Helper: monta el árbol completo de accordion con un único item
function mountAccordion(defaultValue?: string) {
  return mount(UiAccordion, {
    props: { type: 'single', collapsible: true, defaultValue },
    slots: {
      default: `
        <UiAccordionItem value="item-1">
          <UiAccordionTrigger>Pregunta 1</UiAccordionTrigger>
          <UiAccordionContent>Respuesta 1</UiAccordionContent>
        </UiAccordionItem>
        <UiAccordionItem value="item-2">
          <UiAccordionTrigger>Pregunta 2</UiAccordionTrigger>
          <UiAccordionContent>Respuesta 2</UiAccordionContent>
        </UiAccordionItem>
      `,
    },
    global: {
      components: { UiAccordionItem, UiAccordionTrigger, UiAccordionContent },
    },
  });
}

// ---------------------------------------------------------------------------
// UiAccordion (root)
// ---------------------------------------------------------------------------
describe('UiAccordion', () => {
  it('renderiza el contenedor correctamente', () => {
    const wrapper = mountAccordion();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('renderiza los items en el slot', () => {
    const wrapper = mountAccordion();
    const items = wrapper.findAllComponents(UiAccordionItem);
    expect(items.length).toBe(2);
  });

  it('hace merge de clase extra en el root', () => {
    const wrapper = mount(UiAccordion, {
      attrs: { class: 'extra-accordion' },
    });
    expect(wrapper.classes()).toContain('extra-accordion');
  });

  it('todos los items empiezan cerrados por defecto (sin defaultValue)', () => {
    const wrapper = mountAccordion();
    const items = wrapper.findAll('[data-state]');
    const openItems = items.filter(el => el.attributes('data-state') === 'open');
    expect(openItems.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// UiAccordionItem
// ---------------------------------------------------------------------------
describe('UiAccordionItem', () => {
  it('renderiza con data-state="closed" por defecto', () => {
    const wrapper = mountAccordion();
    const items = wrapper.findAllComponents(UiAccordionItem);
    expect(items[0].attributes('data-state')).toBe('closed');
  });

  it('renderiza con data-state="open" cuando está en defaultValue', () => {
    const wrapper = mountAccordion('item-1');
    const items = wrapper.findAllComponents(UiAccordionItem);
    expect(items[0].attributes('data-state')).toBe('open');
  });

  it('hace merge de clase extra', () => {
    const wrapper = mount(UiAccordion, {
      props: { type: 'single' },
      slots: {
        default: '<UiAccordionItem value="x" class="item-extra">Slot</UiAccordionItem>',
      },
      global: { components: { UiAccordionItem } },
    });
    const item = wrapper.findComponent(UiAccordionItem);
    expect(item.classes()).toContain('item-extra');
  });
});

// ---------------------------------------------------------------------------
// UiAccordionTrigger
// ---------------------------------------------------------------------------
describe('UiAccordionTrigger', () => {
  it('renderiza el texto del slot', () => {
    const wrapper = mountAccordion();
    const trigger = wrapper.find('button[aria-expanded]');
    expect(trigger.exists()).toBe(true);
  });

  it('tiene aria-expanded="false" cuando el item está cerrado', () => {
    const wrapper = mountAccordion();
    const buttons = wrapper.findAll('button[aria-expanded]');
    expect(buttons[0].attributes('aria-expanded')).toBe('false');
  });

  it('tiene aria-expanded="true" cuando el item está abierto', () => {
    const wrapper = mountAccordion('item-1');
    const buttons = wrapper.findAll('button[aria-expanded]');
    expect(buttons[0].attributes('aria-expanded')).toBe('true');
  });

  it('al hacer click abre el item cerrado', async () => {
    const wrapper = mountAccordion();
    const button = wrapper.findAll('button[aria-expanded]')[0];
    expect(button.attributes('aria-expanded')).toBe('false');
    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('true');
  });

  it('al hacer click cierra el item abierto (collapsible=true)', async () => {
    const wrapper = mountAccordion('item-1');
    const button = wrapper.findAll('button[aria-expanded]')[0];
    expect(button.attributes('aria-expanded')).toBe('true');
    await button.trigger('click');
    expect(button.attributes('aria-expanded')).toBe('false');
  });
});

// ---------------------------------------------------------------------------
// UiAccordionContent
// ---------------------------------------------------------------------------
describe('UiAccordionContent', () => {
  it('el content tiene role="region"', () => {
    const wrapper = mountAccordion();
    const regions = wrapper.findAll('[role="region"]');
    expect(regions.length).toBe(2);
  });

  it('tiene data-state="closed" cuando el item está cerrado', () => {
    const wrapper = mountAccordion();
    const regions = wrapper.findAll('[role="region"]');
    expect(regions[0].attributes('data-state')).toBe('closed');
  });

  it('tiene data-state="open" cuando el item está abierto', () => {
    const wrapper = mountAccordion('item-1');
    const regions = wrapper.findAll('[role="region"]');
    expect(regions[0].attributes('data-state')).toBe('open');
  });

  it('el contenido se hace visible al hacer click en el trigger', async () => {
    const wrapper = mountAccordion();
    const button = wrapper.findAll('button[aria-expanded]')[0];
    await button.trigger('click');
    const regions = wrapper.findAll('[role="region"]');
    expect(regions[0].attributes('data-state')).toBe('open');
    expect(regions[0].text()).toContain('Respuesta 1');
  });
});
