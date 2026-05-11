/**
 * Public asset used when a stored image value is missing or not usable with `next/image`
 * (e.g. a pasted Windows path like `G:\folder\file`).
 */
export const NEXT_IMAGE_PLACEHOLDER_PATH = '/images/placeholder.png';

/**
 * Returns a `src` safe for `next/image` when the value comes from a database or CMS.
 * Rejects local file paths and other strings that are not root-relative or http(s) URLs.
 */
export function safeNextImageSrc(src: string | null | undefined): string {
  if (src == null) return NEXT_IMAGE_PLACEHOLDER_PATH;
  const trimmed = String(src).trim();
  if (!trimmed) return NEXT_IMAGE_PLACEHOLDER_PATH;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) return trimmed;
  if (/^[a-zA-Z]:[\\/]/.test(trimmed) || trimmed.startsWith('file:')) {
    return NEXT_IMAGE_PLACEHOLDER_PATH;
  }
  return NEXT_IMAGE_PLACEHOLDER_PATH;
}
