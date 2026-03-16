import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiChartLine from '../UiChartLine.vue';

const config = {
  desktop: { label: 'Desktop', color: '#3b82f6' },
  mobile: { label: 'Mobile', color: '#10b981' },
};

const data = [
  { month: 'Jan', desktop: 100, mobile: 80 },
  { month: 'Feb', desktop: 150, mobile: 120 },
  { month: 'Mar', desktop: 200, mobile: 160 },
];

const baseProps = { config, data, index: 'month' } as const;

describe('UiChartLine', () => {
  it('renderiza sin errores con data, config e index', () => {
    const wrapper = mount(UiChartLine, { props: baseProps });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el div contenedor (UiChartContainer) con role="img"', () => {
    const wrapper = mount(UiChartLine, { props: baseProps });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('no renderiza SVG en jsdom porque las dimensiones son 0×0', () => {
    const wrapper = mount(UiChartLine, { props: baseProps });
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('muestra la leyenda por defecto (showLegend=true)', () => {
    const wrapper = mount(UiChartLine, { props: baseProps });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it('oculta la leyenda con showLegend=false', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, showLegend: false },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(false);
  });

  it('los labels del config aparecen en la leyenda', () => {
    const wrapper = mount(UiChartLine, { props: baseProps });
    const text = wrapper.find('[role="list"]').text();
    expect(text).toContain('Desktop');
    expect(text).toContain('Mobile');
  });

  it('aplica clase personalizada al wrapper raíz', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, class: 'line-custom' },
    });
    expect(wrapper.find('.line-custom').exists()).toBe(true);
  });

  it('acepta curveType="linear" sin lanzar errores', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, curveType: 'linear' },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('acepta curveType="step" sin lanzar errores', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, curveType: 'step' },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('acepta showArea=false sin lanzar errores', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, showArea: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta showDots=true sin lanzar errores', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, showDots: true },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta animate=false sin lanzar errores', () => {
    const wrapper = mount(UiChartLine, {
      props: { ...baseProps, animate: false },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
