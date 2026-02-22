import { type Ref, ref } from 'vue';

export interface ItemData {
  id: string;
  disabled: boolean;
}

export function useItemRegistration<T extends ItemData>() {
  const items: Ref<T[]> = ref([]) as Ref<T[]>;

  function register(data: T) {
    const existing = items.value.findIndex((i) => i.id === data.id);
    if (existing >= 0) {
      items.value[existing] = data;
    } else {
      items.value.push(data);
    }
  }

  function unregister(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  return { items, register, unregister };
}
