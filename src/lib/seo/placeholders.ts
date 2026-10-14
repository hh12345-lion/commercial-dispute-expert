/** True when copy is still a pre-launch placeholder: omit from structured data */
export function isPlaceholder(value: string | undefined | null): boolean {
  if (!value) return true;
  return value.includes("[PLACEHOLDER]");
}
