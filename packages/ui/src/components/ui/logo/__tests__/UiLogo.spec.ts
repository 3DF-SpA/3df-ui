import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiLogoCloud from '../UiLogoCloud.vue';
import UiLogoMarquee from '../UiLogoMarquee.vue';

const sampleLogos = [
  { name: 'Vue', src: '/vue.svg', alt: 'Vue logo' },
  { name: 'React', src: '/react.svg', alt: 'React logo' },
  { name: 'Angular', src: '/angular.svg', alt: 'Angular logo' },
];

describe('UiLogoCloud', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiLogoCloud, { props: { logos: sampleLogos } });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza una imagen por cada logo', () => {
    const wrapper = mount(UiLogoCloud, { props: { logos: sampleLogos } });
    expect(wrapper.findAll('img')).toHaveLength(sampleLogos.length);
  });

  it('cada imagen tiene el atributo src correcto', () => {
    const wrapper = mount(UiLogoCloud, { props: { logos: sampleLogos } });
    const imgs = wrapper.findAll('img');
    expect(imgs[0]!.attributes('src')).toBe('/vue.svg');
    expect(imgs[1]!.attributes('src')).toBe('/react.svg');
  });

  it('muestra el heading cuando se proporciona', () => {
    const wrapper = mount(UiLogoCloud, {
      props: { logos: sampleLogos, heading: 'Tecnologías que usamos' },
    });
    expect(wrapper.find('p').text()).toBe('Tecnologías que usamos');
  });

  it('no muestra heading si no se pasa el prop', () => {
    const wrapper = mount(UiLogoCloud, { props: { logos: sampleLogos } });
    expect(wrapper.find('p').exists()).toBe(false);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiLogoCloud, {
      props: { logos: sampleLogos },
      attrs: { class: 'custom-logo-cloud' },
    });
    expect(wrapper.find('div').attributes('class')).toContain('custom-logo-cloud');
  });
});

describe('UiLogoMarquee', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiLogoMarquee, { props: { logos: sampleLogos } });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza imágenes de logos', () => {
    const wrapper = mount(UiLogoMarquee, { props: { logos: sampleLogos } });
    // Cada logo aparece duplicado para el efecto marquee
    const imgs = wrapper.findAll('img');
    expect(imgs.length).toBeGreaterThanOrEqual(sampleLogos.length);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiLogoMarquee, {
      props: { logos: sampleLogos },
      attrs: { class: 'custom-marquee' },
    });
    expect(wrapper.find('div').attributes('class')).toContain('custom-marquee');
  });
});
