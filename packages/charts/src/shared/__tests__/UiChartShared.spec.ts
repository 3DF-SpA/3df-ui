import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import { CHART_KEY } from '../chart-types';
import type { ChartContext } from '../chart-types';
import UiChartContainer from '../UiChartContainer.vue';
import UiChartLegend from '../UiChartLegend.vue';
import UiChartTooltip from '../UiChartTooltip.vue';

const config = {
  desktop: { label: 'Desktop', color: '#3b82f6' },
  mobile: { label: 'Mobile', color: '#10b981' },
};

function makeChartContext(): ChartContext {
  return {
    config: ref(config),
    resolvedColors: ref({ desktop: '#3b82f6', mobile: '#10b981' }),
  };
}

// ─────────────────────────────────────────────────────────────
// UiChartContainer
// ─────────────────────────────────────────────────────────────
describe('UiChartContainer', () => {
  it('renderiza un div contenedor con role="img"', () => {
    const wrapper = mount(UiChartContainer);
    expect(wrapper.find('[role="img"]').exists()).toBe(true);
  });

  it('aplica minHeight como inline style', () => {
    const wrapper = mount(UiChartContainer, { props: { minHeight: 400 } });
    expect(wrapper.find('[role="img"]').attributes('style')).toContain('400px');
  });

  it('aplica clase personalizada al div contenedor', () => {
    const wrapper = mount(UiChartContainer, { props: { class: 'contenedor-custom' } });
    expect(wrapper.find('[role="img"]').classes()).toContain('contenedor-custom');
  });

  it('no renderiza SVG cuando las dimensiones son 0×0 (jsdom)', () => {
    const wrapper = mount(UiChartContainer);
    expect(wrapper.find('svg').exists()).toBe(false);
  });

  it('usa minHeight=300 por defecto', () => {
    const wrapper = mount(UiChartContainer);
    expect(wrapper.find('[role="img"]').attributes('style')).toContain('300px');
  });
});

// ─────────────────────────────────────────────────────────────
// UiChartLegend
// ─────────────────────────────────────────────────────────────
describe('UiChartLegend', () => {
  it('renderiza un elemento con role="list"', () => {
    const wrapper = mount(UiChartLegend, {
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    expect(wrapper.find('[role="list"]').exists()).toBe(true);
  });

  it('renderiza un item por cada clave del config', () => {
    const wrapper = mount(UiChartLegend, {
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    expect(wrapper.findAll('[role="listitem"]')).toHaveLength(2);
  });

  it('muestra los labels definidos en el config', () => {
    const wrapper = mount(UiChartLegend, {
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    const text = wrapper.text();
    expect(text).toContain('Desktop');
    expect(text).toContain('Mobile');
  });

  it('aplica flex-col con direction="vertical"', () => {
    const wrapper = mount(UiChartLegend, {
      props: { direction: 'vertical' },
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    expect(wrapper.find('[role="list"]').classes()).toContain('flex-col');
  });

  it('no aplica flex-col con direction="horizontal" (por defecto)', () => {
    const wrapper = mount(UiChartLegend, {
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    expect(wrapper.find('[role="list"]').classes()).not.toContain('flex-col');
  });

  it('emite el evento toggle con la key al hacer clic (hiddenKeys activo)', async () => {
    const wrapper = mount(UiChartLegend, {
      props: { hiddenKeys: new Set<string>() },
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    const items = wrapper.findAll('[role="listitem"]');
    await items[0]!.trigger('click');
    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect((wrapper.emitted('toggle')![0] as string[])[0]).toBe('desktop');
  });

  it('aplica clase personalizada', () => {
    const wrapper = mount(UiChartLegend, {
      props: { class: 'leyenda-custom' },
      global: { provide: { [CHART_KEY as symbol]: makeChartContext() } },
    });
    expect(wrapper.classes()).toContain('leyenda-custom');
  });

  it('retorna lista vacía sin contexto inyectado', () => {
    const wrapper = mount(UiChartLegend);
    expect(wrapper.findAll('[role="listitem"]')).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────
// UiChartTooltip
// ─────────────────────────────────────────────────────────────
describe('UiChartTooltip', () => {
  const tooltipData = {
    label: 'Jan',
    items: [{ key: 'desktop', label: 'Desktop', value: 100, color: '#3b82f6' }],
  };

  it('renderiza un div con role="tooltip"', () => {
    const wrapper = mount(UiChartTooltip, { props: { data: null } });
    expect(wrapper.find('[role="tooltip"]').exists()).toBe(true);
  });

  it('está oculto (v-show) cuando data es null', () => {
    const wrapper = mount(UiChartTooltip, {
      props: { data: null },
      attachTo: document.body,
    });
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(false);
    wrapper.unmount();
  });

  it('es visible cuando data tiene contenido', () => {
    const wrapper = mount(UiChartTooltip, {
      props: { data: tooltipData },
      attachTo: document.body,
    });
    expect(wrapper.find('[role="tooltip"]').isVisible()).toBe(true);
    wrapper.unmount();
  });

  it('muestra el label y el nombre de la serie', () => {
    const wrapper = mount(UiChartTooltip, { props: { data: tooltipData } });
    const text = wrapper.text();
    expect(text).toContain('Jan');
    expect(text).toContain('Desktop');
  });

  it('posiciona el tooltip con las props x e y', () => {
    const wrapper = mount(UiChartTooltip, {
      props: { data: tooltipData, x: 42, y: 88 },
    });
    const style = wrapper.find('[role="tooltip"]').attributes('style') ?? '';
    expect(style).toContain('42px');
    expect(style).toContain('88px');
  });

  it('aplica clase personalizada', () => {
    const wrapper = mount(UiChartTooltip, {
      props: { data: null, class: 'tooltip-custom' },
    });
    expect(wrapper.find('[role="tooltip"]').classes()).toContain('tooltip-custom');
  });

  it('usa el formatter personalizado para los valores', () => {
    const wrapper = mount(UiChartTooltip, {
      props: {
        data: tooltipData,
        formatter: (_val: number, _key: string) => 'VALOR_CUSTOM',
      },
    });
    expect(wrapper.text()).toContain('VALOR_CUSTOM');
  });
});
