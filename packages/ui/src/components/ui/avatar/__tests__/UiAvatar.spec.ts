import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import UiAvatar from '../UiAvatar.vue';
import UiAvatarFallback from '../UiAvatarFallback.vue';
import { AVATAR_KEY } from '../avatar-types';

const makeCtx = (imageLoaded = false) => ({
  imageLoaded: ref(imageLoaded),
  imageError: ref(!imageLoaded),
  size: ref('md' as const),
});

describe('UiAvatar', () => {
  it('renderiza un contenedor <span>', () => {
    const wrapper = mount(UiAvatar);
    expect(wrapper.element.tagName).toBe('SPAN');
  });

  it('aplica clases de tamaño "md" por defecto (h-10 w-10)', () => {
    const wrapper = mount(UiAvatar);
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-10', 'w-10']));
  });

  it('aplica clases de tamaño "lg" (h-12 w-12)', () => {
    const wrapper = mount(UiAvatar, { props: { size: 'lg' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-12', 'w-12']));
  });

  it('aplica clases de tamaño "sm" (h-8 w-8)', () => {
    const wrapper = mount(UiAvatar, { props: { size: 'sm' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-8', 'w-8']));
  });

  it('aplica clases de tamaño "xs" (h-6 w-6)', () => {
    const wrapper = mount(UiAvatar, { props: { size: 'xs' } });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['h-6', 'w-6']));
  });

  it('incluye clase rounded-full en el contenedor', () => {
    const wrapper = mount(UiAvatar);
    expect(wrapper.classes()).toContain('rounded-full');
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiAvatar, { attrs: { class: 'ring-2 ring-primary' } });
    expect(wrapper.attributes('class')).toContain('ring-2');
  });
});

describe('UiAvatarFallback', () => {
  it('muestra el fallback cuando la imagen no está cargada', () => {
    const wrapper = mount(UiAvatarFallback, {
      slots: { default: 'JD' },
      global: { provide: { [AVATAR_KEY as symbol]: makeCtx(false) } },
    });
    expect(wrapper.text()).toBe('JD');
  });

  it('no renderiza el span cuando la imagen sí está cargada', () => {
    const wrapper = mount(UiAvatarFallback, {
      slots: { default: 'JD' },
      global: { provide: { [AVATAR_KEY as symbol]: makeCtx(true) } },
    });
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('incluye clases base (rounded-full bg-muted)', () => {
    const wrapper = mount(UiAvatarFallback, {
      slots: { default: 'AB' },
      global: { provide: { [AVATAR_KEY as symbol]: makeCtx(false) } },
    });
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['rounded-full', 'bg-muted']));
  });

  it('fusiona clases custom con cn()', () => {
    const wrapper = mount(UiAvatarFallback, {
      attrs: { class: 'bg-blue-200' },
      slots: { default: 'AB' },
      global: { provide: { [AVATAR_KEY as symbol]: makeCtx(false) } },
    });
    expect(wrapper.attributes('class')).toContain('bg-blue-200');
  });
});
