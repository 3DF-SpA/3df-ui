import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiTextarea from '../UiTextarea.vue';

describe('UiTextarea', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <textarea>', () => {
    const wrapper = mount(UiTextarea);
    expect(wrapper.element.tagName).toBe('TEXTAREA');
  });

  // ── v-model / modelValue ──
  it('vincula modelValue al value de la textarea nativa', () => {
    const wrapper = mount(UiTextarea, { props: { modelValue: 'texto inicial' } });
    expect((wrapper.element as HTMLTextAreaElement).value).toBe('texto inicial');
  });

  it('emite update:modelValue con el nuevo valor al escribir', async () => {
    const wrapper = mount(UiTextarea, { props: { modelValue: '' } });
    await wrapper.setValue('contenido nuevo');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['contenido nuevo']);
  });

  // ── Variante default ──
  it('aplica clase bg-foreground/5 con variant="default"', () => {
    const wrapper = mount(UiTextarea, { props: { variant: 'default' } });
    expect(wrapper.attributes('class')).toContain('bg-foreground/5');
  });

  // ── Disabled ──
  it('pasa el atributo disabled a la textarea nativa', () => {
    const wrapper = mount(UiTextarea, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLTextAreaElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiTextarea, { attrs: { class: 'min-h-[200px] border-red-500' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('min-h-[200px]');
    expect(classStr).toContain('border-red-500');
    expect(classStr).toContain('rounded-md');
  });

  // ── Passthrough de atributos ──
  it('pasa atributos adicionales como rows a la textarea', () => {
    const wrapper = mount(UiTextarea, { attrs: { rows: 8 } });
    expect(wrapper.attributes('rows')).toBe('8');
  });
});
