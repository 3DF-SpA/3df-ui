import { type Ref, onBeforeUnmount, watch } from 'vue';

export function useClickOutside(
  isOpen: Ref<boolean>,
  elementRefs: Ref<HTMLElement | undefined>[],
  callback: () => void,
) {
  function onClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    const isInside = elementRefs.some((elRef) => elRef.value?.contains(target));
    if (!isInside) callback();
  }

  watch(isOpen, (open) => {
    if (open) {
      document.addEventListener('click', onClickOutside, true);
    } else {
      document.removeEventListener('click', onClickOutside, true);
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside, true);
  });
}
