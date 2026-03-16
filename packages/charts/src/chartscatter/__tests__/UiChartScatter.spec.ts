import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import type { ScatterConfig } from '../scatter-types';
import UiChartScatter from '../UiChartScatter.vue';

// ScatterConfig requiere xKey e yKey por cada serie
const config: ScatterConfig = {
  dataset1: { label: 'Dataset 1', color: '#3b82f6', xKey: 'x', yKey: 'y' },
  dataset2: { label: 'Dataset 2', color: '#10b981', xKey: 'x', yKey: 'z' },
};

const data = [
  { x: 10, y: 20, z: 15 },
  { x: 30, y: 50, z: 40 },
  { x: 50, y: 30, z: 60 },
];

const baseProps = { config, data } as const;

describe('UiChartScatter', () => {
  it('renderiza sin errores con data y config', () => {
    const wrapper = mount(UiChartScatter, { props: baseProps });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el div contenedor (UiChartContainer) con role="img"', () => {
    const wrapper = mount(UiChartScatter, { props: baseProps });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('no renderiza SVG en jsdom porque las dimensiones son 0×0', () => {
    const wrapper = mount(UiChartScatter, { props: baseProps });
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('muestra la leyenda por defecto (showLegend=true)', () => {
    const wrapper = mount(UiChartScatter, { props: baseProps });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it('oculta la leyenda con showLegend=false', () => {
    const wrapper = mount(UiChartScatter, {
      props: { ...baseProps, showLegend: false },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(false);
  });

  it('los labels del config aparecen en la leyenda', () => {
    const wrapper = mount(UiChartScatter, { props: baseProps });
    const text = wrapper.find('[role="list"]').text();
    expect(text).toContain('Dataset 1');
    expect(text).toContain('Dataset 2');
  });

  it('aplica clase personalizada al wrapper raíz', () => {
    const wrapper = mount(UiChartScatter, {
      props: { ...baseProps, class: 'scatter-custom' },
    });
    expect(wrapper.find('.scatter-custom').exists()).toBe(true);
  });

  it('acepta showGrid=false sin lanzar errores', () => {
    const wrapper = mount(UiChartScatter, {
      props: { ...baseProps, showGrid: false },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('acepta showXAxis=false y showYAxis=false sin lanzar errores', () => {
    const wrapper = mount(UiChartScatter, {
      props: { ...baseProps, showXAxis: false, showYAxis: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta animate=false sin lanzar errores', () => {
    const wrapper = mount(UiChartScatter, {
      props: { ...baseProps, animate: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta una sola serie sin lanzar errores', () => {
    const singleConfig: ScatterConfig = {
      puntos: { label: 'Puntos', color: '#f59e0b', xKey: 'x', yKey: 'y' },
    };
    const wrapper = mount(UiChartScatter, {
      props: { config: singleConfig, data },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });
});
