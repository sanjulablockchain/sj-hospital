import type { ScreeningCheck } from "../types";

/**
 * What our physicians order for someone with no symptoms and no family
 * history. Frequencies are ranges rather than promises, because the interval
 * that suits a given patient is a consultation, not a table.
 *
 * "Dental check" is a recommendation, not an offer: this hospital does not
 * provide dental treatment, and `pageContent.test.ts` guards that distinction.
 */
export const screening: ScreeningCheck[] = [
  {
    check: "Blood pressure",
    who: "Every adult, from your twenties onward",
    freq: "Yearly",
  },
  {
    check: "Blood sugar and HbA1c",
    who: "From 30 in South Asians, earlier with family history or excess weight",
    freq: "Yearly",
  },
  {
    check: "Lipid profile",
    who: "From 35, or earlier with diabetes, smoking or family history",
    freq: "2 to 3 years",
  },
  {
    check: "Weight and waist measurement",
    who: "Every adult; waist matters more than the scale here",
    freq: "Yearly",
  },
  {
    check: "Full blood count",
    who: "Women of reproductive age, and anyone persistently tired",
    freq: "Yearly",
  },
  {
    check: "Kidney function and urine protein",
    who: "Anyone with diabetes, high blood pressure, or outdoor manual work",
    freq: "Yearly",
  },
  {
    check: "Cervical screening",
    who: "Women from 25 to 65",
    freq: "3 to 5 years",
  },
  {
    check: "Breast examination and mammogram",
    who: "Clinical examination from 30; mammogram discussion from 40",
    freq: "Yearly / as advised",
  },
  {
    check: "Eye examination",
    who: "Everyone from 40; annually with diabetes from diagnosis",
    freq: "1 to 2 years",
  },
  {
    check: "Dental check",
    who: "Every adult and child, with a dental practice of your choice",
    freq: "Yearly",
  },
  {
    check: "ECG and cardiac risk",
    who: "From 40, or earlier with symptoms or family history",
    freq: "As advised",
  },
];
