# Consultants removed on 2026-11-06

The e-channeling directory (`src/features/e-channeling/data/doctors.ts`) was updated from the hospital's consultant roster of 2026-11-06 (the CSV `St (1).csv`). Three people came off the directory in that update:

| Name | Speciality | Why | Calendly booking link |
| --- | --- | --- | --- |
| Dr. Sandaya Doluweera | Pediatrician | Not on the roster any more | https://calendly.com/appointments-sjhospital/consultant-pediatrician-dr-himali-wijesinghe-clone |
| Dr. H. Rathnayaka | Clinical Embryologist / Fertility Counselor | Not on the roster any more | https://calendly.com/appointments-sjhospital/consultant-surgeon-liver-transplant-hepatob-clone |
| Dr. S. M. Alahakoon | Radiologist | Still on the roster, but with every session time cleared (he had Monday to Friday 6.00 PM in October) | none, the row had no booking link |

Each row is exactly as it stood in `doctors.ts` before the update, so anyone here can be restored by copying the row back. Their Calendly events were not touched and may still be live: check the link before restoring, and switch the event off in Calendly if the consultant has left for good.

```ts
{ name: "Dr. Sandaya Doluweera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe-clone", sessions: { sat: ["2.00 PM"] } },
{ name: "Dr. H. Rathnayaka", specialization: "Clinical Embryologist / Fertility Counselor", calendlySlug: "consultant-surgeon-liver-transplant-hepatob-clone", sessions: { mon: ["4.30 PM"], tue: ["4.30 PM"], wed: ["4.30 PM"], thu: ["4.30 PM"], fri: ["4.30 PM"], sat: ["4.30 PM"] } },
{ name: "Dr. S. M. Alahakoon", specialization: "Radiologist", contactOnly: true, sessions: { mon: ["6.00 PM"], tue: ["6.00 PM"], wed: ["6.00 PM"], thu: ["6.00 PM"], fri: ["6.00 PM"] } },
```

Dr. H. Rathnayaka was the only Clinical Embryologist / Fertility Counselor, so that speciality has left the directory as well. The Sinhala wording was `වන්ධ්‍යත්ව උපදේශන විශේෂඥ` and the Tamil `கருவுறுதல் ஆலோசனை நிபுணர்`.

## The roster's colour coding

The hospital marks rows to delete in red and rows with new times in yellow in its spreadsheet. A CSV export carries no colours, so this update identified the two kinds of change by comparing the new CSV with the previous one and with the site: rows missing from the new CSV were treated as deleted, and rows whose times differ were updated. Dr. S. M. Alahakoon was treated as deleted because his row lists no session at all. If a red row survived with its times intact, it is still on the site and needs naming.

## Radiologists book by contact only

The same update took the Calendly links off the three remaining radiologists and marked them `contactOnly`, so their cards offer a call and a WhatsApp text to the channelling desk instead of a booking page. The events were not touched in Calendly. Their links, should booking online ever return:

| Name | Calendly booking link |
| --- | --- |
| Dr. Prasanna Rupasinghe | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-prasanna-rupasinghe |
| Dr. Ranjita Sivapatham | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-ranjieta-sivapatham |
| Dr. Wasantha Hewapathirana | https://calendly.com/appointments-sjhospital/consultant-radiologist-dr-wasantha-hewapathirana |

## Restoring one

1. Copy the row back into `doctors.ts` under its speciality, with their current session times.
2. Add a matching row at the same index in `doctors.si.ts` and `doctors.ta.ts`.
3. Update the counts in `doctors.test.ts`, then run `npm test`. The ticker test names any `tickerItems` entry in `content.si.ts` / `content.ta.ts` that needs reordering.
