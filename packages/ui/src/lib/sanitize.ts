/**
 * Sanitizes a URL to prevent XSS via javascript: and data: URI injection.
 * Apply to any `href` or `src` prop before rendering as an HTML attribute.
 *
 * @param url - The URL to sanitize
 * @returns The original URL if safe, '#' if potentially malicious
 */
export function sanitizeHref(url: string | undefined | null): string {
  if (!url) return '#';
  // eslint-disable-next-line no-control-regex
  const normalized = url.trim().toLowerCase().replace(/[\u0000-\u001f\u007f\u00ad\ufeff]/g, '');
  if (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('data:text/html') ||
    normalized.startsWith('data:text/javascript') ||
    normalized.startsWith('vbscript:')
  ) {
    return '#';
  }
  return url;
}
