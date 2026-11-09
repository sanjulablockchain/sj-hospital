/**
 * Replaces every `{key}` in a template with its value. Numbers are written
 * with thousands separators ("10,000"), the way the site already prints
 * "Rooms from 10,000 LKR". A token with no value is left as it is, so a
 * missing figure is visible rather than silently blank.
 */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (token, key: string) => {
    const value = values[key];
    if (value === undefined) return token;
    return typeof value === "number" ? value.toLocaleString("en") : value;
  });
}
