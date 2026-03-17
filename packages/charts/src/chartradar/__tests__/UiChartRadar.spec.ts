import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiChartRadar from '../UiChartRadar.vue';

const config = {
  desktop: { label: 'Desktop', color: '#3b82f6' },
  mobile: { label: 'Mobile', color: '#10b981' },
};

// Para el radar, index es la dimensión/categoría del eje (ej. "month")
const data = [
  { month: 'Jan', desktop: 100, mobile: 80 },
  { month: 'Feb', desktop: 150, mobile: 120 },
  { month: 'Mar', desktop: 200, mobile: 160 },
];

const baseProps = { config, data, index: 'month' } as const;

describe('UiChartRadar', () => {
  it('renderiza sin errores con data, config e index', () => {
    const wrapper = mount(UiChartRadar, { props: baseProps });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza el div contenedor (UiChartContainer) con role="img"', () => {
    const wrapper = mount(UiChartRadar, { props: baseProps });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('no renderiza SVG en jsdom porque las dimensiones son 0×0', () => {
    const wrapper = mount(UiChartRadar, { props: baseProps });
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('muestra la leyenda por defecto (showLegend=true)', () => {
    const wrapper = mount(UiChartRadar, { props: baseProps });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it('oculta la leyenda con showLegend=false', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, showLegend: false },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(false);
  });

  it('los labels del config aparecen en la leyenda', () => {
    const wrapper = mount(UiChartRadar, { props: baseProps });
    const text = wrapper.find('[role="list"]').text();
    expect(text).toContain('Desktop');
    expect(text).toContain('Mobile');
  });

  it('aplica clase personalizada al wrapper raíz', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, class: 'radar-custom' },
    });
    expect(wrapper.find('.radar-custom').exists()).toBe(true);
  });

  it('acepta variant="circle" sin lanzar errores', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, variant: 'circle' },
    });
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('acepta showFill=false sin lanzar errores', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, showFill: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta showDots=false sin lanzar errores', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, showDots: false },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('acepta animate=false sin lanzar errores', () => {
    const wrapper = mount(UiChartRadar, {
      props: { ...baseProps, animate: false },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
