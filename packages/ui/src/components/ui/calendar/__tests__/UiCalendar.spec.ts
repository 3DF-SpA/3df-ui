import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { addMonths, format, subMonths } from 'date-fns';

import UiCalendar from '../UiCalendar.vue';

const JAN_2024 = new Date(2024, 0, 1);

describe('UiCalendar', () => {
  it('renderiza sin props (modo single, fecha actual)', () => {
    const wrapper = mount(UiCalendar);

    expect(wrapper.exists()).toBe(true);

    const label = wrapper.find('[aria-live="polite"]');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(format(new Date(), 'MMMM yyyy'));
  });

  it('muestra 7 columnas de encabezados de días de la semana', () => {
    const wrapper = mount(UiCalendar, { props: { defaultMonth: JAN_2024 } });

    const headers = wrapper.findAll('[role="columnheader"]');
    expect(headers).toHaveLength(7);
  });

  it('botón "Mes anterior" navega al mes previo', async () => {
    const wrapper = mount(UiCalendar, { props: { defaultMonth: JAN_2024 } });

    await wrapper.find('[aria-label="Mes anterior"]').trigger('click');

    const label = wrapper.find('[aria-live="polite"]');
    expect(label.text()).toBe(format(subMonths(JAN_2024, 1), 'MMMM yyyy'));
  });

  it('botón "Mes siguiente" navega al mes siguiente', async () => {
    const wrapper = mount(UiCalendar, { props: { defaultMonth: JAN_2024 } });

    await wrapper.find('[aria-label="Mes siguiente"]').trigger('click');

    const label = wrapper.find('[aria-live="polite"]');
    expect(label.text()).toBe(format(addMonths(JAN_2024, 1), 'MMMM yyyy'));
  });

  it('al hacer click en un día emite update:modelValue con una Date', async () => {
    const wrapper = mount(UiCalendar, { props: { defaultMonth: JAN_2024 } });

    const dayButtons = wrapper.findAll('button[role="gridcell"]');
    const firstEnabled = dayButtons.find((btn) => btn.attributes('disabled') === undefined);
    expect(firstEnabled).toBeDefined();

    await firstEnabled!.trigger('click');

    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeDefined();
    expect(emitted![0][0]).toBeInstanceOf(Date);
  });

  it('día con disabled={() => true} tiene atributo disabled en todos los botones de día', () => {
    const wrapper = mount(UiCalendar, {
      props: { defaultMonth: JAN_2024, disabled: () => true },
    });

    const dayButtons = wrapper.findAll('button[role="gridcell"]');
    expect(dayButtons.length).toBeGreaterThan(0);
    dayButtons.forEach((btn) => {
      expect(btn.attributes('disabled')).toBeDefined();
    });
  });

  it('prop numberOfMonths=2 renderiza dos cabeceras de mes', () => {
    const wrapper = mount(UiCalendar, {
      props: { defaultMonth: JAN_2024, numberOfMonths: 2 },
    });

    const labels = wrapper.findAll('[aria-live="polite"]');
    expect(labels).toHaveLength(2);
    expect(labels[0].text()).toBe(format(JAN_2024, 'MMMM yyyy'));
    expect(labels[1].text()).toBe(format(addMonths(JAN_2024, 1), 'MMMM yyyy'));
  });

  it('fusiona clase custom con cn()', () => {
    const wrapper = mount(UiCalendar, {
      attrs: { class: 'my-custom-class' },
    });

    expect(wrapper.classes()).toContain('my-custom-class');
    expect(wrapper.classes()).toContain('p-3');
  });
});
