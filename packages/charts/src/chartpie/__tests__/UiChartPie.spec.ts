import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiChartPie from '../UiChartPie.vue';

// Para pie chart, config define una serie por cada categoría del dato
const config = {
  desktop: { label: 'Desktop', color: '#3b82f6' },
  mobile: { label: 'Mobile', color: '#10b981' },
};

// Pie usa un "valueKey" para leer el valor numérico; por defecto
// interpreta cada clave del config como su propia serie de valor.
// Con valueKey explícito el chart suma una columna concreta.
const data = [
  { month: 'Jan', desktop: 100, mobile: 80 },
  { month: 'Feb', desktop: 150, mobile: 120 },
  { month: 'Mar', desktop: 200, mobile: 160 },
];

// Datos alternativos en formato "una fila = una categoría" (más típico de pie)
const pieData = [
  { category: 'desktop', value: 450 },
  { category: 'mobile', value: 360 },
];

const pieConfig = {
  desktop: { label: 'Desktop', color: '#3b82f6' },
  mobile: { label: 'Mobile', color: '#10b981' },
};

describe('UiChartPie', () => {
  it('renderiza sin errores con data, config e index', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month' },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el div contenedor (UiChartContainer) con role="img"', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month' },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('no renderiza SVG en jsdom porque las dimensiones son 0×0', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month' },
    });
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('muestra la leyenda por defecto (showLegend=true)', () => {
    const wrapper = mount(UiChartPie, {
      props: { config: pieConfig, data: pieData, index: 'category' },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it('oculta la leyenda con showLegend=false', () => {
    const wrapper = mount(UiChartPie, {
      props: { config: pieConfig, data: pieData, index: 'category', showLegend: false },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(false);
  });

  it('los labels del config aparecen en la leyenda', () => {
    const wrapper = mount(UiChartPie, {
      props: { config: pieConfig, data: pieData, index: 'category' },
    });
    const text = wrapper.find('[role="list"]').text();
    expect(text).toContain('Desktop');
    expect(text).toContain('Mobile');
  });

  it('aplica clase personalizada al wrapper raíz', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month', class: 'pie-custom' },
    });
    expect(wrapper.find('.pie-custom').exists()).toBe(true);
  });

  it('acepta innerRadius para variante donut sin lanzar errores', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month', innerRadius: 0.5 },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta animate=false sin lanzar errores', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month', animate: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta showLabels=true sin lanzar errores', () => {
    const wrapper = mount(UiChartPie, {
      props: { config, data, index: 'month', showLabels: true },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
