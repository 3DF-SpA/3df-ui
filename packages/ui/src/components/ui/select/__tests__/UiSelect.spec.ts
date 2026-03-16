import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSelect from '../UiSelect.vue';
import UiSelectItem from '../UiSelectItem.vue';

describe('UiSelect', () => {
  // ── Renderizado base ──
  it('renderiza un contenedor <div> con un <button role="combobox"> dentro', () => {
    const wrapper = mount(UiSelect);
    expect(wrapper.element.tagName).toBe('DIV');
    const trigger = wrapper.find('button[role="combobox"]');
    expect(trigger.exists()).toBe(true);
  });

  // ── Placeholder ──
  it('muestra el placeholder por defecto cuando no hay valor seleccionado', () => {
    const wrapper = mount(UiSelect, { props: { placeholder: 'Elige una opcion' } });
    expect(wrapper.text()).toContain('Elige una opcion');
  });

  it('muestra placeholder personalizado pasado por prop', () => {
    const wrapper = mount(UiSelect, { props: { placeholder: 'Selecciona pais' } });
    expect(wrapper.text()).toContain('Selecciona pais');
  });

  // ── Toggle del listbox ──
  it('abre el listbox al hacer click en el trigger', async () => {
    const wrapper = mount(UiSelect);
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
  });

  it('cierra el listbox al hacer click dos veces en el trigger', async () => {
    const wrapper = mount(UiSelect);
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);
  });

  // ── Disabled ──
  it('el trigger tiene disabled cuando la prop disabled=true', () => {
    const wrapper = mount(UiSelect, { props: { disabled: true } });
    const trigger = wrapper.find('button[role="combobox"]');
    expect((trigger.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('no abre el listbox cuando disabled=true', async () => {
    const wrapper = mount(UiSelect, { props: { disabled: true } });
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);
  });

  // ── Merge de clases en el trigger ──
  it('fusiona clases custom en el trigger button', () => {
    const wrapper = mount(UiSelect, { attrs: { class: 'w-48 border-blue-600' } });
    const trigger = wrapper.find('button[role="combobox"]');
    const classStr = trigger.attributes('class') ?? '';
    expect(classStr).toContain('w-48');
    expect(classStr).toContain('border-blue-600');
    expect(classStr).toContain('rounded-md');
  });
});
