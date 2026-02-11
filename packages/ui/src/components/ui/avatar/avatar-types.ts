import type { InjectionKey, Ref } from 'vue';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarContext {
  imageLoaded: Ref<boolean>;
  imageError: Ref<boolean>;
  size: Ref<AvatarSize>;
}

export const AVATAR_KEY: InjectionKey<AvatarContext> = Symbol('avatar');
