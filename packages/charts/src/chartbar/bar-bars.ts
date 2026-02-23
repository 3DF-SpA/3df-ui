import type { BarParams, BarRect } from './bar-geometry';

export function computeVerticalBars(w: number, h: number, p: BarParams): BarRect[] {
  const {
    padding: pad,
    scale,
    data,
    visibleSeriesKeys: keys,
    mode,
    categoryGap,
    barGap,
    radius,
    animProgress,
  } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale;
  const range = sMax - sMin || 1;
  const categoryCount = data.length;
  const bandWidth = plotW / categoryCount;
  const usableWidth = bandWidth * (1 - categoryGap);
  const seriesCount = keys.length;
  const bars: BarRect[] = [];

  for (let di = 0; di < categoryCount; di++) {
    const row = data[di]!;
    const categoryX = pad.left + di * bandWidth + (bandWidth - usableWidth) / 2;

    if (mode === 'stacked') {
      let positiveY = 0;
      let negativeY = 0;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const barH = (Math.abs(v) / range) * plotH;
        let y: number;
        if (v >= 0) {
          y = pad.top + ((sMax - positiveY - v) / range) * plotH;
          positiveY += v;
        } else {
          y = pad.top + ((sMax - negativeY) / range) * plotH;
          negativeY += v;
        }
        const zeroY = pad.top + (sMax / range) * plotH;
        const animY = zeroY + (y - zeroY) * animProgress;
        bars.push({
          x: categoryX,
          y: animY,
          width: usableWidth,
          height: Math.max(barH * animProgress, 0.5),
          gradientId: `bar-grad-${key}`,
          dataIndex: di,
          rx: radius,
        });
      }
    } else {
      const barW = usableWidth / seriesCount;
      const gap = barW * barGap;
      const effectiveBarW = barW - gap;
      const zeroY = pad.top + (sMax / range) * plotH;
      for (let si = 0; si < seriesCount; si++) {
        const key = keys[si]!;
        const v = Number(row[key]) || 0;
        const barH = (Math.abs(v) / range) * plotH;
        const x = categoryX + si * barW + gap / 2;
        const targetY = v >= 0 ? zeroY - barH : zeroY;
        const animY = zeroY + (targetY - zeroY) * animProgress;
        bars.push({
          x,
          y: animY,
          width: Math.max(effectiveBarW, 2),
          height: Math.max(barH * animProgress, 0.5),
          gradientId: `bar-grad-${key}`,
          dataIndex: di,
          rx: radius,
        });
      }
    }
  }
  return bars;
}

export function computeHorizontalBars(w: number, h: number, p: BarParams): BarRect[] {
  const {
    padding: pad,
    scale,
    data,
    visibleSeriesKeys: keys,
    mode,
    categoryGap,
    barGap,
    radius,
    animProgress,
  } = p;
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;
  const { min: sMin, max: sMax } = scale;
  const range = sMax - sMin || 1;
  const categoryCount = data.length;
  const bandHeight = plotH / categoryCount;
  const usableHeight = bandHeight * (1 - categoryGap);
  const seriesCount = keys.length;
  const bars: BarRect[] = [];

  for (let di = 0; di < categoryCount; di++) {
    const row = data[di]!;
    const categoryY = pad.top + di * bandHeight + (bandHeight - usableHeight) / 2;

    if (mode === 'stacked') {
      let positiveX = 0;
      const zeroX = pad.left + ((0 - sMin) / range) * plotW;
      for (const key of keys) {
        const v = Number(row[key]) || 0;
        const barW = (Math.abs(v) / range) * plotW;
        const targetX = v >= 0 ? zeroX + (positiveX / range) * plotW : zeroX - barW;
        if (v >= 0) positiveX += v;
        const animW = barW * animProgress;
        const animX = v >= 0 ? targetX : targetX + barW - animW;
        bars.push({
          x: animX,
          y: categoryY,
          width: Math.max(animW, 0.5),
          height: usableHeight,
          gradientId: `bar-grad-${key}`,
          dataIndex: di,
          rx: radius,
        });
      }
    } else {
      const barH = usableHeight / seriesCount;
      const gap = barH * barGap;
      const effectiveBarH = barH - gap;
      const zeroX = pad.left + ((0 - sMin) / range) * plotW;
      for (let si = 0; si < seriesCount; si++) {
        const key = keys[si]!;
        const v = Number(row[key]) || 0;
        const barW = (Math.abs(v) / range) * plotW;
        const y = categoryY + si * barH + gap / 2;
        const targetX = v >= 0 ? zeroX : zeroX - barW;
        const animW = barW * animProgress;
        const animX = v >= 0 ? targetX : targetX + barW - animW;
        bars.push({
          x: animX,
          y,
          width: Math.max(animW, 0.5),
          height: Math.max(effectiveBarH, 2),
          gradientId: `bar-grad-${key}`,
          dataIndex: di,
          rx: radius,
        });
      }
    }
  }
  return bars;
}
