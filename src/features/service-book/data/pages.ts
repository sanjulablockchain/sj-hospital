import type { BookPage } from "../types.ts";

/**
 * What is on each page of the 2026 Service Book, as alt text. The pages are
 * flattened artwork with no text layer, so this is all a screen reader gets
 * of the page itself; the "What's inside" section below the viewer carries
 * the substance as real text. English in every locale, like the book.
 *
 * Kept free of image imports so `node --test` can load it; the images live
 * in `pageImages.ts`, in the same order.
 */
const ALT: readonly string[] = [
  "Service Book cover: a St. Joseph Hospital doctor talking with a patient, with the title Service Book, our services, laboratory fees and doctors",
  "Welcome to St. Joseph Hospital: a drawing of the hospital building and the line Trusted care, modern medical service, always for you",
  "Message from the Chairman, Mr. Sunil De Silva, with his portrait",
  "Contents: about the hospital, our services, laboratory services and fees, our doctors and booking, and the patient guide",
  "Chapter 01, About St. Joseph Hospital: who we are and why families choose us",
  "Who we are: managed by the USA based Kids and Teens Medical Group, American hospital standards, 74 consultants from Sunday to Saturday, digital X-ray and a pharmacy open 24/7",
  "How to reach us: phone 031 784 84 84, WhatsApp 076 422 8898, the website, the address at 229/10 St. Joseph Street, Negombo, and parking at the hospital",
  "Chapter 02, Our services: nine services and why St. Joseph is the right place",
  "Service 1, Free OPD: walk in and see a doctor from 7.00 AM to 6.00 PM, with no charge for the OPD service",
  "Service 2, Emergency care, 24 hours: urgent care at any hour of the day or night, with the laboratory and pharmacy open around the clock",
  "Service 3, Super Channelling: book a specialist by phone or WhatsApp, with 74 consultants across more than 25 specialities",
  "Service 4, Exercise ECG: same day appointments, with the fee confirmed when you book",
  "Service 5, Digital X-ray: clear images quickly, read by consultant radiologists on our doctor list",
  "Service 6, Laboratory open 24/7: blood, urine and other tests at any hour, with prices for 323 tests in this book",
  "Service 8, Home visits: our team can visit you at home for a health check, booked by phone or WhatsApp",
  "Service 7, Pharmacy open 24/7: send your prescription on WhatsApp, with free delivery within 1 km of the hospital",
  "Rooms and inpatient care: ward, standard, deluxe and super deluxe rooms with the price per day in LKR",
  "Chapter 03, Laboratory services and fees: open 24/7, with 323 tests priced from the 2026 price list",
  "Laboratory price list 2026: how to read the list, and notes on fasting, report times, prices and booking a test",
  "Laboratory fees: blood count and clotting, 31 tests, each with its sample, report time and price in LKR",
  "Laboratory fees: diabetes and blood sugar (14 tests) and heart and cholesterol (15 tests), with sample, report time and price in LKR",
  "Laboratory fees: liver and pancreas (18 tests) and kidney, minerals and electrolytes (16 tests), with sample, report time and price in LKR",
  "Laboratory fees: thyroid and hormones, 28 tests, each with its sample, report time and price in LKR",
  "Laboratory fees: vitamins, iron and minerals (8 tests) and the first part of urine, stool and body fluids (33 tests)",
  "Laboratory fees: the rest of urine, stool and body fluids, and the first part of infection and serology (72 tests)",
  "Laboratory fees: infection and serology continued, from Epstein Barr virus to the TB Quantiferon test",
  "Laboratory fees: the end of infection and serology, and the first part of cultures and swabs (26 tests)",
  "Laboratory fees: the rest of cultures and swabs, and the first part of immunology and autoimmune tests (34 tests)",
  "Laboratory fees: the rest of immunology and autoimmune tests, and tumour markers (9 tests)",
  "Laboratory fees: drug levels and genetic tests (8 tests) and histology and pathology (11 tests)",
  "Chapter 04, Our doctors and booking: 74 consultants and 13 allied health professionals",
  "Meet our specialists: book an appointment on 031 784 84 84 or WhatsApp 076 422 8898, how to book, and why choose St. Joseph for a specialist",
  "Doctor directory: women's health and fertility, children's health, and medicine and other specialities",
  "Doctor directory: medicine and other specialities, continued",
  "Doctor directory: heart, and surgery and surgical specialities",
  "Doctor directory: the rest of surgery, diagnostics and medico legal, and allied health and therapy",
  "Doctor directory: the rest of allied health and therapy, with the booking line",
  "Chapter 05, Patient guide: how to book, what to bring, and how to find us",
  "How to book a doctor: choose your doctor, book by phone or WhatsApp, and what to remember on the day",
  "Visit and contact us: address, phone, WhatsApp, website and parking, with opening hours for OPD, emergency, laboratory, pharmacy and doctors",
  "Back cover: We are here for you, with the hospital's phone, WhatsApp, website, address and opening hours",
];

export const bookPages: readonly BookPage[] = ALT.map((alt, index) => ({ number: index + 1, alt }));

export const PAGE_COUNT = bookPages.length;
