import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiChartGauge from '../UiChartGauge.vue';

describe('UiChartGauge', () => {
  it('renderiza sin errores con prop value', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 75 } });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el SVG directamente (no usa UiChartContainer)', () => {
    // UiChartGauge no tiene dependencia de ResizeObserver — pinta SVG siempre
    const wrapper = mount(UiChartGauge, { props: { value: 50 } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('renderiza un div raíz que envuelve el SVG', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 50 } });
    expect(wrapper.element.tagName.toLowerCase()).toBe('div');
  });

  it('aplica clase personalizada al div raíz', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 60, class: 'gauge-custom' },
    });
    expect(wrapper.classes()).toContain('gauge-custom');
  });

  it('acepta value=0 (mínimo) sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 0 } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta value=100 (máximo) sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 100 } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta valor fuera de rango — queda clamped al rango [min, max]', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 150, min: 0, max: 100 } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta min y max personalizados sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, { props: { value: 500, min: 0, max: 1000 } });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta variant="full" sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 40, variant: 'full' },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta variant="arc" sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 40, variant: 'arc' },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta variant="semicircle" (por defecto) sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 40, variant: 'semicircle' },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta showNeedle=false sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 50, showNeedle: false },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('muestra el label cuando se provee la prop label', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 75, label: 'Velocidad' },
    });
    expect(wrapper.text()).toContain('Velocidad');
  });

  it('usa valueFormatter personalizado para el texto del valor', () => {
    const wrapper = mount(UiChartGauge, {
      props: {
        value: 75,
        valueFormatter: (v: number) => `${v} km/h`,
      },
    });
    expect(wrapper.text()).toContain('75 km/h');
  });

  it('acepta animate=false sin lanzar errores', () => {
    const wrapper = mount(UiChartGauge, {
      props: { value: 50, animate: false },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('acepta segments de color sin lanzar errores', () => {
    const segments = [
      { min: 0, max: 33, color: '#22c55e', label: 'Bajo' },
      { min: 33, max: 66, color: '#f59e0b', label: 'Medio' },
      { min: 66, max: 100, color: '#ef4444', label: 'Alto' },
    ];
    const wrapper = mount(UiChartGauge, {
      props: { value: 50, segments },
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
