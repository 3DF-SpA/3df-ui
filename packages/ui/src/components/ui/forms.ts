/** Botón de acción principal con variantes: default, secondary, outline, ghost, destructive, link. */
export { default as Button } from './buttons/UiButton.vue';
export { buttonVariants } from './buttons/button-variants';

/** Etiqueta accesible para campos de formulario. */
export { default as Label } from './label/UiLabel.vue';

/** Campo de texto de una línea con variantes de tamaño y estado de error. */
export { default as Input } from './input/UiInput.vue';
export { inputVariants } from './input/input-variants';

/** Área de texto multilínea con auto-resize opcional y estado de error. */
export { default as Textarea } from './textarea/UiTextarea.vue';

/** Selector nativo accesible con búsqueda y soporte de grupos. */
export { default as Select } from './select/UiSelect.vue';
export { default as SelectItem } from './select/UiSelectItem.vue';
export { SELECT_KEY, type SelectContext, type SelectItemData } from './select/select-types';

/** Casilla de verificación accesible con estado indeterminado. */
export { default as Checkbox } from './checkbox/UiCheckbox.vue';

/** Botón de radio accesible para selección única en grupo. */
export { default as Radio } from './radio/UiRadio.vue';

/** Interruptor on/off accesible con animación CSS. */
export { default as Switch } from './switch/UiSwitch.vue';

/** Botón con estado activo/inactivo para activar/desactivar opciones. */
export { default as Toggle } from './toggle/UiToggle.vue';
export { toggleVariants } from './toggle/toggle-variants';

/** Control deslizante para selección de valor numérico en un rango. */
export { default as Slider } from './slider/UiSlider.vue';

/** Input de código de un solo uso (OTP) con validación por patrón. */
export { default as InputOTP } from './input-otp/UiInputOTP.vue';
export { default as InputOTPGroup } from './input-otp/UiInputOTPGroup.vue';
export { default as InputOTPSlot } from './input-otp/UiInputOTPSlot.vue';
export { default as InputOTPSeparator } from './input-otp/UiInputOTPSeparator.vue';
export { INPUT_OTP_KEY, OTP_PATTERNS } from './input-otp/input-otp-types';
export type { InputOTPContext, OTPPatternType } from './input-otp/input-otp-types';

/** Calendario interactivo con modo single, range y multiple. */
export { default as Calendar } from './calendar/UiCalendar.vue';
export type { DateRange, CalendarMode } from './calendar/calendar-types';

/** Selector de fecha con popover integrado. */
export { default as DatePicker } from './date-picker/UiDatePicker.vue';

/** Selector de rango de fechas con dos calendarios. */
export { default as DateRangePicker } from './date-picker/UiDateRangePicker.vue';

/** Campo de búsqueda con lista desplegable filtrable y soporte de teclado. */
export { default as Combobox } from './combobox/UiCombobox.vue';
