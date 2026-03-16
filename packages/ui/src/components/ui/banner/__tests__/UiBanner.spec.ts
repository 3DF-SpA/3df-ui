import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiBanner from '../UiBanner.vue';

describe('UiBanner', () => {
  it('renderiza un <div> con role="banner"', () => {
    const wrapper = mount(UiBanner, { slots: { default: 'Aviso' } });
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('banner');
  });

  it('renderiza el slot default', () => {
    const wrapper = mount(UiBanner, { slots: { default: 'Contenido del banner' } });
    expect(wrapper.text()).toContain('Contenido del banner');
  });

  it('aplica clases de variant "default" (bg-primary text-primary-foreground)', () => {
    const wrapper = mount(UiBanner, { slots: { default: 'Banner' } });
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['bg-primary', 'text-primary-foreground']),
    );
  });

  it('aplica clases de variant "destructive"', () => {
    const wrapper = mount(UiBanner, {
      props: { variant: 'destructive' },
      slots: { default: 'Error' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-destructive']));
  });

  it('aplica clases de variant "warning"', () => {
    const wrapper = mount(UiBanner, {
      props: { variant: 'warning' },
      slots: { default: 'Advertencia' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-warning']));
  });

  it('aplica clases de variant "success"', () => {
    const wrapper = mount(UiBanner, {
      props: { variant: 'success' },
      slots: { default: 'Éxito' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['bg-success']));
  });

  it('aplica clase sticky top-0 con position="sticky"', () => {
    const wrapper = mount(UiBanner, {
      props: { position: 'sticky' },
      slots: { default: 'Sticky' },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['sticky', 'top-0']));
  });

  it('no muestra el botón de cerrar cuando dismissible=false (por defecto)', () => {
    const wrapper = mount(UiBanner, { slots: { default: 'Info' } });
    expect(wrapper.find('button').exists()).toBe(false);
  });

  it('muestra el botón de cerrar con aria-label cuando dismissible=true', () => {
    const wrapper = mount(UiBanner, {
      props: { dismissible: true },
      slots: { default: 'Cerrable' },
    });
    expect(wrapper.find('button[aria-label="Cerrar"]').exists()).toBe(true);
  });

  it('emite "dismiss" y oculta el banner al hacer click en cerrar', async () => {
    const wrapper = mount(UiBanner, {
      props: { dismissible: true },
      slots: { default: 'Cerrar' },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('dismiss')).toBeTruthy();
    expect(wrapper.find('[role="banner"]').exists()).toBe(false);
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiBanner, {
      attrs: { class: 'rounded-lg mb-4' },
      slots: { default: 'Custom' },
    });
    expect(wrapper.attributes('class')).toContain('rounded-lg');
    expect(wrapper.attributes('class')).toContain('mb-4');
  });
});
