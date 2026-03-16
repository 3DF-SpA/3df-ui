import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiCombobox from '../UiCombobox.vue';

const defaultOptions = [
  { value: 'vue', label: 'Vue.js' },
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular', disabled: true },
];

const globalConfig = {
  global: {
    stubs: { Teleport: true },
  },
};

describe('UiCombobox', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiCombobox, {
      props: { options: defaultOptions },
      ...globalConfig,
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un botón con role="combobox"', () => {
    const wrapper = mount(UiCombobox, {
      props: { options: defaultOptions },
      ...globalConfig,
    });
    expect(wrapper.find('button[role="combobox"]').exists()).toBe(true);
  });

  it('muestra el placeholder cuando no hay valor seleccionado', () => {
    const wrapper = mount(UiCombobox, {
      props: { options: defaultOptions, placeholder: 'Elige una opción' },
      ...globalConfig,
    });
    expect(wrapper.find('button[role="combobox"]').text()).toContain('Elige una opción');
  });

  it('muestra la etiqueta del valor seleccionado', () => {
    const wrapper = mount(UiCombobox, {
      props: { options: defaultOptions, modelValue: 'vue' },
      ...globalConfig,
    });
    expect(wrapper.find('button[role="combobox"]').text()).toContain('Vue.js');
  });

  it('fusiona clases custom con cn() en el botón trigger', () => {
    const wrapper = mount(UiCombobox, {
      props: { options: defaultOptions },
      attrs: { class: 'custom-combobox' },
      ...globalConfig,
    });
    expect(wrapper.find('button[role="combobox"]').attributes('class')).toContain('custom-combobox');
  });
});
