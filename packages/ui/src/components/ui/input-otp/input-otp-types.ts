import type { ComputedRef, InjectionKey, Ref } from 'vue';

export interface InputOTPContext {
  /** Array of individual slot values */
  slots: Ref<string[]>;
  /** Total number of slots */
  length: number;
  /** Currently focused slot index (-1 = none) */
  focusedIndex: Ref<number>;
  /** Whether input is disabled */
  disabled: ComputedRef<boolean>;
  /** Regular expression pattern for allowed characters */
  pattern: RegExp;
  /** Set value for a specific slot */
  setValue: (index: number, value: string) => void;
  /** Focus a specific slot */
  focusSlot: (index: number) => void;
  /** Handle keydown on a slot */
  onSlotKeydown: (index: number, event: KeyboardEvent) => void;
  /** Handle paste */
  onPaste: (event: ClipboardEvent) => void;
  /** Register a slot input element */
  registerSlotRef: (index: number, el: HTMLInputElement) => void;
}

export const INPUT_OTP_KEY: InjectionKey<InputOTPContext> = Symbol('input-otp');

export const OTP_PATTERNS = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alpha: /^[a-zA-Z]$/,
} as const;

export type OTPPatternType = keyof typeof OTP_PATTERNS;
