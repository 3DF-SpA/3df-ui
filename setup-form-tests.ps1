# setup-form-tests.ps1
# Ejecutar desde la raiz del proyecto: .\setup-form-tests.ps1
# Crea los directorios __tests__ y escribe los 8 spec files de componentes de formulario.

$base = "packages\ui\src\components\ui"

$dirs = @(
  "$base\input\__tests__",
  "$base\textarea\__tests__",
  "$base\checkbox\__tests__",
  "$base\switch\__tests__",
  "$base\radio\__tests__",
  "$base\select\__tests__",
  "$base\slider\__tests__",
  "$base\input-otp\__tests__"
)

foreach ($dir in $dirs) {
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  Directorio creado: $dir"
  } else {
    Write-Host "  Ya existe: $dir"
  }
}

# ─────────────────────────────────────────────
# 1. UiInput.spec.ts
# ─────────────────────────────────────────────
$uiInputSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInput from '../UiInput.vue';

describe('UiInput', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <input>', () => {
    const wrapper = mount(UiInput);
    expect(wrapper.element.tagName).toBe('INPUT');
  });

  // ── v-model / modelValue ──
  it('vincula modelValue al value del input nativo', () => {
    const wrapper = mount(UiInput, { props: { modelValue: 'hola' } });
    expect((wrapper.element as HTMLInputElement).value).toBe('hola');
  });

  it('emite update:modelValue con el nuevo valor al escribir', async () => {
    const wrapper = mount(UiInput, { props: { modelValue: '' } });
    await wrapper.setValue('nuevo valor');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['nuevo valor']);
  });

  // ── Variantes de tamaño ──
  it('aplica clase h-9 cuando size="sm"', () => {
    const wrapper = mount(UiInput, { props: { size: 'sm' } });
    expect(wrapper.attributes('class')).toContain('h-9');
  });

  it('aplica clase h-11 cuando size="lg"', () => {
    const wrapper = mount(UiInput, { props: { size: 'lg' } });
    expect(wrapper.attributes('class')).toContain('h-11');
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiInput, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiInput, { attrs: { class: 'w-full mt-2' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('w-full');
    expect(classStr).toContain('mt-2');
    expect(classStr).toContain('rounded-md');
  });

  // ── Passthrough de atributos ──
  it('pasa atributos adicionales como placeholder al input', () => {
    const wrapper = mount(UiInput, { attrs: { placeholder: 'Escribe aqui' } });
    expect(wrapper.attributes('placeholder')).toBe('Escribe aqui');
  });
});
'@

# ─────────────────────────────────────────────
# 2. UiTextarea.spec.ts
# ─────────────────────────────────────────────
$uiTextareaSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiTextarea from '../UiTextarea.vue';

describe('UiTextarea', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <textarea>', () => {
    const wrapper = mount(UiTextarea);
    expect(wrapper.element.tagName).toBe('TEXTAREA');
  });

  // ── v-model / modelValue ──
  it('vincula modelValue al value de la textarea nativa', () => {
    const wrapper = mount(UiTextarea, { props: { modelValue: 'texto inicial' } });
    expect((wrapper.element as HTMLTextAreaElement).value).toBe('texto inicial');
  });

  it('emite update:modelValue con el nuevo valor al escribir', async () => {
    const wrapper = mount(UiTextarea, { props: { modelValue: '' } });
    await wrapper.setValue('contenido nuevo');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['contenido nuevo']);
  });

  // ── Variante default ──
  it('aplica clase bg-foreground/5 con variant="default"', () => {
    const wrapper = mount(UiTextarea, { props: { variant: 'default' } });
    expect(wrapper.attributes('class')).toContain('bg-foreground/5');
  });

  // ── Disabled ──
  it('pasa el atributo disabled a la textarea nativa', () => {
    const wrapper = mount(UiTextarea, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLTextAreaElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiTextarea, { attrs: { class: 'min-h-[200px] border-red-500' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('min-h-[200px]');
    expect(classStr).toContain('border-red-500');
    expect(classStr).toContain('rounded-md');
  });

  // ── Passthrough de atributos ──
  it('pasa atributos adicionales como rows a la textarea', () => {
    const wrapper = mount(UiTextarea, { attrs: { rows: 8 } });
    expect(wrapper.attributes('rows')).toBe('8');
  });
});
'@

# ─────────────────────────────────────────────
# 3. UiCheckbox.spec.ts
# ─────────────────────────────────────────────
$uiCheckboxSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiCheckbox from '../UiCheckbox.vue';

describe('UiCheckbox', () => {
  // ── Renderizado base ──
  it('renderiza un <span> wrapper con un <input type="checkbox"> dentro', () => {
    const wrapper = mount(UiCheckbox);
    expect(wrapper.element.tagName).toBe('SPAN');
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);
  });

  // ── v-model / modelValue ──
  it('refleja modelValue=true como checked en el input', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: true } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('refleja modelValue=false como unchecked en el input', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).checked).toBe(false);
  });

  it('emite update:modelValue con true al hacer click en unchecked', async () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false } });
    const input = wrapper.find('input[type="checkbox"]');
    await input.trigger('change');
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
  });

  // ── Indeterminate ──
  it('muestra el icono de indeterminate cuando indeterminate=true y modelValue=false', () => {
    const wrapper = mount(UiCheckbox, { props: { modelValue: false, indeterminate: true } });
    const svgs = wrapper.findAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiCheckbox, { attrs: { disabled: true } });
    const input = wrapper.find('input[type="checkbox"]');
    expect((input.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom en el wrapper <span>', () => {
    const wrapper = mount(UiCheckbox, { attrs: { class: 'ml-2 opacity-80' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('ml-2');
    expect(classStr).toContain('opacity-80');
  });
});
'@

# ─────────────────────────────────────────────
# 4. UiSwitch.spec.ts
# ─────────────────────────────────────────────
$uiSwitchSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSwitch from '../UiSwitch.vue';

describe('UiSwitch', () => {
  // ── Renderizado base ──
  it('renderiza un <button> con role="switch"', () => {
    const wrapper = mount(UiSwitch);
    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.attributes('role')).toBe('switch');
  });

  // ── Estado checked / modelValue ──
  it('aria-checked es "false" cuando modelValue=false', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: false } });
    expect(wrapper.attributes('aria-checked')).toBe('false');
  });

  it('aria-checked es "true" cuando modelValue=true', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    expect(wrapper.attributes('aria-checked')).toBe('true');
  });

  it('aplica clase bg-primary al track cuando modelValue=true', () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    expect(wrapper.attributes('class')).toContain('bg-primary');
  });

  // ── Emisión de cambio ──
  it('emite update:modelValue con el valor invertido al hacer click', async () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: false } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('emite false al hacer click cuando modelValue=true', async () => {
    const wrapper = mount(UiSwitch, { props: { modelValue: true } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al button', () => {
    const wrapper = mount(UiSwitch, { attrs: { disabled: true } });
    expect((wrapper.element as HTMLButtonElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del track', () => {
    const wrapper = mount(UiSwitch, { attrs: { class: 'mt-4 opacity-75' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('mt-4');
    expect(classStr).toContain('opacity-75');
    expect(classStr).toContain('rounded-full');
  });
});
'@

# ─────────────────────────────────────────────
# 5. UiRadio.spec.ts
# ─────────────────────────────────────────────
$uiRadioSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiRadio from '../UiRadio.vue';

describe('UiRadio', () => {
  // ── Renderizado base ──
  it('renderiza un elemento <input type="radio">', () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-a' } });
    expect(wrapper.element.tagName).toBe('INPUT');
    expect(wrapper.attributes('type')).toBe('radio');
  });

  // ── Prop value ──
  it('establece el atributo value con la prop "value"', () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-b' } });
    expect(wrapper.attributes('value')).toBe('opcion-b');
  });

  // ── Estado checked via modelValue ──
  it('esta checked cuando modelValue coincide con value', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x', modelValue: 'x' } });
    expect((wrapper.element as HTMLInputElement).checked).toBe(true);
  });

  it('no esta checked cuando modelValue no coincide con value', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x', modelValue: 'y' } });
    expect((wrapper.element as HTMLInputElement).checked).toBe(false);
  });

  // ── Emisión al cambiar ──
  it('emite update:modelValue con el value propio al cambiar', async () => {
    const wrapper = mount(UiRadio, { props: { value: 'opcion-a', modelValue: '' } });
    await wrapper.trigger('change');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['opcion-a']);
  });

  // ── Disabled ──
  it('pasa el atributo disabled al input nativo', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x' }, attrs: { disabled: true } });
    expect((wrapper.element as HTMLInputElement).disabled).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base', () => {
    const wrapper = mount(UiRadio, { props: { value: 'x' }, attrs: { class: 'ml-2 border-blue-500' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('ml-2');
    expect(classStr).toContain('border-blue-500');
    expect(classStr).toContain('rounded-full');
  });
});
'@

# ─────────────────────────────────────────────
# 6. UiSelect.spec.ts
# ─────────────────────────────────────────────
$uiSelectSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSelect from '../UiSelect.vue';
import UiSelectItem from '../UiSelectItem.vue';

describe('UiSelect', () => {
  // ── Renderizado base ──
  it('renderiza un contenedor <div> con un <button role="combobox"> dentro', () => {
    const wrapper = mount(UiSelect);
    expect(wrapper.element.tagName).toBe('DIV');
    const trigger = wrapper.find('button[role="combobox"]');
    expect(trigger.exists()).toBe(true);
  });

  // ── Placeholder ──
  it('muestra el placeholder por defecto cuando no hay valor seleccionado', () => {
    const wrapper = mount(UiSelect, { props: { placeholder: 'Elige una opcion' } });
    expect(wrapper.text()).toContain('Elige una opcion');
  });

  it('muestra placeholder personalizado pasado por prop', () => {
    const wrapper = mount(UiSelect, { props: { placeholder: 'Selecciona pais' } });
    expect(wrapper.text()).toContain('Selecciona pais');
  });

  // ── Toggle del listbox ──
  it('abre el listbox al hacer click en el trigger', async () => {
    const wrapper = mount(UiSelect);
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true);
  });

  it('cierra el listbox al hacer click dos veces en el trigger', async () => {
    const wrapper = mount(UiSelect);
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);
  });

  // ── Disabled ──
  it('el trigger tiene disabled cuando la prop disabled=true', () => {
    const wrapper = mount(UiSelect, { props: { disabled: true } });
    const trigger = wrapper.find('button[role="combobox"]');
    expect((trigger.element as HTMLButtonElement).disabled).toBe(true);
  });

  it('no abre el listbox cuando disabled=true', async () => {
    const wrapper = mount(UiSelect, { props: { disabled: true } });
    const trigger = wrapper.find('button[role="combobox"]');
    await trigger.trigger('click');
    expect(wrapper.find('[role="listbox"]').exists()).toBe(false);
  });

  // ── Merge de clases en el trigger ──
  it('fusiona clases custom en el trigger button', () => {
    const wrapper = mount(UiSelect, { attrs: { class: 'w-48 border-blue-600' } });
    const trigger = wrapper.find('button[role="combobox"]');
    const classStr = trigger.attributes('class') ?? '';
    expect(classStr).toContain('w-48');
    expect(classStr).toContain('border-blue-600');
    expect(classStr).toContain('rounded-md');
  });
});
'@

# ─────────────────────────────────────────────
# 7. UiSlider.spec.ts
# ─────────────────────────────────────────────
$uiSliderSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiSlider from '../UiSlider.vue';

describe('UiSlider', () => {
  // ── Renderizado base ──
  it('renderiza un <div role="slider">', () => {
    const wrapper = mount(UiSlider);
    expect(wrapper.attributes('role')).toBe('slider');
  });

  // ── Props min / max / value (aria) ──
  it('expone aria-valuemin con la prop min', () => {
    const wrapper = mount(UiSlider, { props: { min: 10, max: 100, modelValue: 50 } });
    expect(wrapper.attributes('aria-valuemin')).toBe('10');
  });

  it('expone aria-valuemax con la prop max', () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 200, modelValue: 50 } });
    expect(wrapper.attributes('aria-valuemax')).toBe('200');
  });

  it('expone aria-valuenow con la prop modelValue', () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 42 } });
    expect(wrapper.attributes('aria-valuenow')).toBe('42');
  });

  // ── Keyboard: ArrowRight emite el valor + step ──
  it('emite update:modelValue con valor incrementado en step al presionar ArrowRight', async () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 50, step: 5 } });
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([55]);
  });

  it('emite update:modelValue con valor decrementado al presionar ArrowLeft', async () => {
    const wrapper = mount(UiSlider, { props: { min: 0, max: 100, modelValue: 50, step: 5 } });
    await wrapper.trigger('keydown', { key: 'ArrowLeft' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([45]);
  });

  // ── Disabled ──
  it('tiene aria-disabled cuando disabled=true', () => {
    const wrapper = mount(UiSlider, { props: { disabled: true } });
    expect(wrapper.attributes('aria-disabled')).toBe('true');
  });

  it('tiene tabindex=-1 cuando disabled=true', () => {
    const wrapper = mount(UiSlider, { props: { disabled: true } });
    expect(wrapper.attributes('tabindex')).toBe('-1');
  });

  it('no emite update:modelValue al presionar tecla cuando disabled=true', async () => {
    const wrapper = mount(UiSlider, { props: { disabled: true, modelValue: 50 } });
    await wrapper.trigger('keydown', { key: 'ArrowRight' });
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del track', () => {
    const wrapper = mount(UiSlider, { attrs: { class: 'w-64 mt-4' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('w-64');
    expect(classStr).toContain('mt-4');
    expect(classStr).toContain('touch-none');
  });
});
'@

# ─────────────────────────────────────────────
# 8. UiInputOtp.spec.ts
# ─────────────────────────────────────────────
$uiInputOtpSpec = @'
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInputOTP from '../UiInputOTP.vue';

describe('UiInputOTP', () => {
  // ── Renderizado base ──
  it('renderiza un <div role="group">', () => {
    const wrapper = mount(UiInputOTP);
    expect(wrapper.element.tagName).toBe('DIV');
    expect(wrapper.attributes('role')).toBe('group');
  });

  it('tiene aria-label por defecto "One-time password"', () => {
    const wrapper = mount(UiInputOTP);
    expect(wrapper.attributes('aria-label')).toBe('One-time password');
  });

  it('acepta un aria-label personalizado via attrs', () => {
    const wrapper = mount(UiInputOTP, { attrs: { 'aria-label': 'Codigo de verificacion' } });
    expect(wrapper.attributes('aria-label')).toBe('Codigo de verificacion');
  });

  // ── Prop disabled ──
  it('agrega data-disabled cuando disabled=true', () => {
    const wrapper = mount(UiInputOTP, { props: { disabled: true } });
    expect(wrapper.attributes('data-disabled')).toBe('true');
  });

  it('no agrega data-disabled cuando disabled=false', () => {
    const wrapper = mount(UiInputOTP, { props: { disabled: false } });
    expect(wrapper.attributes('data-disabled')).toBeUndefined();
  });

  // ── Prop modelValue ──
  it('acepta modelValue vacio sin errores', () => {
    const wrapper = mount(UiInputOTP, { props: { modelValue: '' } });
    expect(wrapper.exists()).toBe(true);
  });

  // ── Prop length ──
  it('acepta la prop length sin errores', () => {
    const wrapper = mount(UiInputOTP, { props: { length: 4 } });
    expect(wrapper.exists()).toBe(true);
  });

  // ── Merge de clases ──
  it('fusiona clases custom con las clases base del contenedor', () => {
    const wrapper = mount(UiInputOTP, { attrs: { class: 'gap-4 justify-center' } });
    const classStr = wrapper.attributes('class') ?? '';
    expect(classStr).toContain('gap-4');
    expect(classStr).toContain('justify-center');
    expect(classStr).toContain('flex');
  });
});
'@

# ── Escribir los archivos ──
$files = @{
  "$base\input\__tests__\UiInput.spec.ts"       = $uiInputSpec
  "$base\textarea\__tests__\UiTextarea.spec.ts" = $uiTextareaSpec
  "$base\checkbox\__tests__\UiCheckbox.spec.ts" = $uiCheckboxSpec
  "$base\switch\__tests__\UiSwitch.spec.ts"     = $uiSwitchSpec
  "$base\radio\__tests__\UiRadio.spec.ts"       = $uiRadioSpec
  "$base\select\__tests__\UiSelect.spec.ts"     = $uiSelectSpec
  "$base\slider\__tests__\UiSlider.spec.ts"     = $uiSliderSpec
  "$base\input-otp\__tests__\UiInputOtp.spec.ts" = $uiInputOtpSpec
}

foreach ($entry in $files.GetEnumerator()) {
  $entry.Value | Set-Content -Path $entry.Key -Encoding UTF8
  Write-Host "  Spec creado: $($entry.Key)"
}

Write-Host ""
Write-Host "Listo. Ejecuta: pnpm vitest run" -ForegroundColor Green
