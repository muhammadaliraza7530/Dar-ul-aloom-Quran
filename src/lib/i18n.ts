/**
 * Bilingual (English / Urdu) content helpers.
 *
 * Every user-facing string in the site is stored as a `Bi` tuple:
 *   ["English text", "اردو متن"]
 * and rendered with `pick(value, isUrdu)` or the `t` helper from
 * `useLanguage()` in src/components/academy-layout.tsx.
 */
export type Bi = readonly [string, string];

export const pick = (value: Bi, urdu: boolean): string => (urdu ? value[1] : value[0]);
