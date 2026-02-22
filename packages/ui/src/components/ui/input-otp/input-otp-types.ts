import type { ComputedRef, InjectionKey, Ref } from 'vue';

export interface InputOTPContext {
  slots: Ref<string[]>;
  length: number;
  focusedIndex: Ref<number>;
  disabled: ComputedRef<boolean>;
  pattern: RegExp;
  setValue: (index: number, value: string) => void;
  focusSlot: (index: number) => void;
  onSlotKeydown: (index: number, event: KeyboardEvent) => void;
  onPaste: (event: ClipboardEvent) => void;
  registerSlotRef: (index: number, el: HTMLInputElement) => void;
}

export const INPUT_OTP_KEY: InjectionKey<InputOTPContext> = Symbol('input-otp');

export const OTP_PATTERNS = {
  numeric: /^[0-9]$/,
  alphanumeric: /^[a-zA-Z0-9]$/,
  alpha: /^[a-zA-Z]$/,
} as const;

export type OTPPatternType = keyof typeof OTP_PATTERNS;
