import { vi } from 'vitest';

// ResizeObserver mock — must be a real class (arrow functions can't be 'new'-ed)
global.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
} as unknown as typeof ResizeObserver;

// Web Animations API mock (not available in jsdom)
if (!Element.prototype.animate) {
  Element.prototype.animate = vi.fn().mockReturnValue({
    finished: Promise.resolve(),
    cancel: vi.fn(),
    pause: vi.fn(),
    play: vi.fn(),
    reverse: vi.fn(),
    currentTime: 0,
    playbackRate: 1,
    playState: 'finished' as AnimationPlayState,
    onfinish: null,
    oncancel: null,
  });
}
