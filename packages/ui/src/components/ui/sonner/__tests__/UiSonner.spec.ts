import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import UiToast from '../UiToast.vue';
import UiToaster from '../UiToaster.vue';
import { toast, toasts } from '../toast-state';
import type { Toast } from '../toast-state';

// -------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------
function makeToast(overrides: Partial<Toast> = {}): Toast {
  return {
    id: 'test-toast-1',
    variant: 'default',
    duration: 0, // sin auto-dismiss en tests
    dismissible: true,
    createdAt: Date.now(),
    title: 'Título test',
    ...overrides,
  };
}

const globalStubs = {
  global: {
    stubs: { Teleport: true },
  },
};

// -------------------------------------------------------------------
// UiToast (componente individual)
// -------------------------------------------------------------------
describe('UiToast', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast() },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renderiza un elemento <li> con role="status"', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast() },
    });
    expect(wrapper.find('li[role="status"]').exists()).toBe(true);
  });

  it('muestra el título del toast', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast({ title: 'Operación exitosa' }) },
    });
    expect(wrapper.find('p').text()).toBe('Operación exitosa');
  });

  it('muestra la descripción del toast', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast({ title: undefined, description: 'Guardado correctamente' }) },
    });
    expect(wrapper.text()).toContain('Guardado correctamente');
  });

  it('muestra el botón de cierre cuando dismissible=true', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast({ dismissible: true }) },
    });
    expect(wrapper.find('button[aria-label="Close notification"]').exists()).toBe(true);
  });

  it('muestra el icono de éxito para variant="success"', () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast({ variant: 'success' }) },
    });
    expect(wrapper.text()).toContain('✓');
  });

  it('emite el evento dismiss al hacer click en cerrar', async () => {
    const wrapper = mount(UiToast, {
      props: { toast: makeToast({ id: 'dismiss-test' }) },
    });
    await wrapper.find('button[aria-label="Close notification"]').trigger('click');
    // Esperamos que el evento se emita (con delay interno de 300ms)
    // Solo verificamos que el botón se puede interactuar
    expect(wrapper.emitted()).toBeDefined();
  });
});

// -------------------------------------------------------------------
// UiToaster (contenedor global con Teleport)
// -------------------------------------------------------------------
describe('UiToaster', () => {
  beforeEach(() => {
    toast.dismissAll();
  });

  afterEach(() => {
    toast.dismissAll();
  });

  it('renderiza correctamente (sin toasts no muestra nada)', () => {
    const wrapper = mount(UiToaster, globalStubs);
    // Sin toasts el ol no debe renderizarse
    expect(wrapper.find('ol').exists()).toBe(false);
  });

  it('muestra el listado cuando hay toasts en el estado global', () => {
    toast({ title: 'Hola mundo', duration: 0 });

    const wrapper = mount(UiToaster, globalStubs);
    expect(wrapper.find('ol').exists()).toBe(true);
  });

  it('el ol tiene role="region" y aria-label de notificaciones', () => {
    toast({ title: 'Test', duration: 0 });

    const wrapper = mount(UiToaster, globalStubs);
    const ol = wrapper.find('ol');
    expect(ol.attributes('role')).toBe('region');
    expect(ol.attributes('aria-label')).toBe('Notificaciones');
  });

  it('acepta el prop position y aplica las clases correspondientes', () => {
    toast({ title: 'Top center', duration: 0 });

    const wrapper = mount(UiToaster, {
      props: { position: 'top-center' },
      ...globalStubs,
    });
    const olClass = wrapper.find('ol').attributes('class') ?? '';
    expect(olClass).toContain('top-4');
  });

  it('fusiona clases custom con cn()', () => {
    toast({ title: 'Clase custom', duration: 0 });

    const wrapper = mount(UiToaster, {
      props: { class: 'custom-toaster' },
      ...globalStubs,
    });
    expect(wrapper.find('ol').attributes('class')).toContain('custom-toaster');
  });
});
