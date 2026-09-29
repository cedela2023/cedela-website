/** Records when a form was first rendered in the browser (simple bot check). */
export function stampRef(el: HTMLInputElement | null) {
  if (el && !el.value) el.value = String(Date.now());
}
