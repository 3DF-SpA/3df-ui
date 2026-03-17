import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { format } from 'date-fns';

import UiDatePicker from '../UiDatePicker.vue';

const globalStubs = { global: { stubs: { Teleport: true } } };

describe('UiDatePicker', () => {
  it('renderiza un elemento button', () => {
    const wrapper = mount(UiDatePicker, globalStubs);

    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('sin modelValue muestra el placeholder por defecto "Pick a date"', () => {
    const wrapper = mount(UiDatePicker, globalStubs);

    expect(wrapper.find('button span').text()).toBe('Pick a date');
  });

  it('con modelValue muestra la fecha formateada', () => {
    const date = new Date(2024, 0, 15);
    const wrapper = mount(UiDatePicker, {
      ...globalStubs,
      props: { modelValue: date },
    });

    expect(wrapper.find('button span').text()).toBe(format(date, 'PPP'));
  });

  it('prop placeholder custom se muestra cuando no hay modelValue', () => {
    const wrapper = mount(UiDatePicker, {
      ...globalStubs,
      props: { placeholder: 'Selecciona una fecha' },
    });

    expect(wrapper.find('button span').text()).toBe('Selecciona una fecha');
  });

  it('fusiona clase custom con cn()', () => {
    const wrapper = mount(UiDatePicker, {
      ...globalStubs,
      attrs: { class: 'w-full' },
    });

    const btn = wrapper.find('button');
    expect(btn.classes()).toContain('w-full');
  });
});
