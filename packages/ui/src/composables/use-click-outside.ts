import { type Ref, onBeforeUnmount, watch } from 'vue';

export function useClickOutside(
  elementOrOpen: Ref<HTMLElement | undefined> | Ref<boolean>,
  refsOrCallback: Ref<HTMLElement | undefined>[] | (() => void),
  callbackOrUndef?: () => void,
) {
  const isSimple = typeof refsOrCallback === 'function';

  const elementRefs: Ref<HTMLElement | undefined>[] = isSimple
    ? [elementOrOpen as Ref<HTMLElement | undefined>]
    : (refsOrCallback as Ref<HTMLElement | undefined>[]);

  const callback: () => void = isSimple ? (refsOrCallback as () => void) : callbackOrUndef!;

  const isOpen: Ref<boolean> | undefined = isSimple ? undefined : (elementOrOpen as Ref<boolean>);

  function onClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    const isInside = elementRefs.some((elRef) => elRef.value?.contains(target));
    if (!isInside) callback();
  }

  if (isOpen !== undefined) {
    watch(
      () => isOpen.value,
      (open) => {
        if (open) {
          document.addEventListener('click', onClickOutside, true);
        } else {
          document.removeEventListener('click', onClickOutside, true);
        }
      },
    );
  } else {
    document.addEventListener('click', onClickOutside, true);
  }

  onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside, true);
  });
}
