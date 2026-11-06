# Consultants removed on 2026-11-06

The e-channeling directory (`src/features/e-channeling/data/doctors.ts`) was updated from the hospital's consultant roster of 2026-11-06. In the hospital's spreadsheet a red row means the consultant is to be deleted and a yellow row means their times changed. Eight people came off the directory in this update: the six red rows, and two who were no longer on the roster at all.

| Name | Speciality | Why | Calendly booking link |
| --- | --- | --- | --- |
| Dr. Sanjaya Kularathne | Cardiologist | Red row | none, the row had no booking link |
| Dr. Lakmali Pathiraja | Dermatologist / Skin Specialist | Red row | https://calendly.com/appointments-sjhospital/pta-physical-therapy-assistant-mr-lilangit-clone |
| Dr. D. S. Indrajith | Urologist | Red row | none, the row had no booking link |
| Dr. Wasantha Hewapathirana | Radiologist | Red row | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-wasantha-hewapathirana |
| Dr. Nimesha Madagedara | Radiologist | Red row | none, the row had no booking link |
| Dr. S. M. Alahakoon | Radiologist | Red row | none, the row had no booking link |
| Dr. Sandaya Doluweera | Pediatrician | Not on the roster any more | https://calendly.com/appointments-sjhospital/consultant-pediatrician-dr-himali-wijesinghe-clone |
| Dr. H. Rathnayaka | Clinical Embryologist / Fertility Counselor | Not on the roster any more | https://calendly.com/appointments-sjhospital/consultant-surgeon-liver-transplant-hepatob-clone |

Each row below is exactly as it stood in `doctors.ts` before the update, so anyone here can be restored by copying the row back. Their Calendly events were not touched and may still be live: check the link before restoring, and switch the event off in Calendly if the consultant has left for good.

```ts
{ name: "Dr. Sanjaya Kularathne", specialization: "Cardiologist", sessions: { thu: ["4.30 PM"], sun: ["6.00 PM"] } },
{ name: "Dr. Lakmali Pathiraja", specialization: "Dermatologist / Skin Specialist", calendlySlug: "pta-physical-therapy-assistant-mr-lilangit-clone", sessions: { tue: ["4.30 PM"] } },
{ name: "Dr. D. S. Indrajith", specialization: "Urologist", sessions: { wed: ["4.00 PM"] } },
{ name: "Dr. Wasantha Hewapathirana", specialization: "Radiologist", contactOnly: true, sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["12.00 PM"] } },
{ name: "Dr. Nimesha Madagedara", specialization: "Radiologist", contactOnly: true, sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["11.30 AM"] } },
{ name: "Dr. S. M. Alahakoon", specialization: "Radiologist", contactOnly: true, sessions: { mon: ["6.00 PM"], tue: ["6.00 PM"], wed: ["6.00 PM"], thu: ["6.00 PM"], fri: ["6.00 PM"] } },
{ name: "Dr. Sandaya Doluweera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe-clone", sessions: { sat: ["2.00 PM"] } },
{ name: "Dr. H. Rathnayaka", specialization: "Clinical Embryologist / Fertility Counselor", calendlySlug: "consultant-surgeon-liver-transplant-hepatob-clone", sessions: { mon: ["4.30 PM"], tue: ["4.30 PM"], wed: ["4.30 PM"], thu: ["4.30 PM"], fri: ["4.30 PM"], sat: ["4.30 PM"] } },
```

Dr. H. Rathnayaka was the only Clinical Embryologist / Fertility Counselor, so that speciality has left the directory as well. The Sinhala wording was `වන්ධ්‍යත්ව උපදේශන විශේෂඥ` and the Tamil `கருவுறுதல் ஆலோசனை நிபுணர்`.

## Reading the roster

A CSV export of the spreadsheet carries no colours, so the red and yellow rows can only be read from the spreadsheet itself or a screenshot of it. The two consultants above who were simply absent from the roster were found by comparing the new CSV with the previous one.

## Radiologists book by contact only

The same update took the Calendly links off the radiologists and marked the two who remain (Dr. Prasanna Rupasinghe and Dr. Ranjita Sivapatham) `contactOnly`, so their cards offer a call and a WhatsApp text to the channelling desk instead of a booking page. The events were not touched in Calendly. Their links, should booking online ever return:

| Name | Calendly booking link |
| --- | --- |
| Dr. Prasanna Rupasinghe | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-prasanna-rupasinghe |
| Dr. Ranjita Sivapatham | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-ranjieta-sivapatham |

## Restoring one

1. Copy the row back into `doctors.ts` under its speciality, with their current session times.
2. Add a matching row at the same index in `doctors.si.ts` and `doctors.ta.ts`.
3. Update the counts in `doctors.test.ts`, then run `npm test`. The ticker test names any `tickerItems` entry in `content.si.ts` / `content.ta.ts` that needs reordering.
