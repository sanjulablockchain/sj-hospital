# Consultants removed on 2026-10-05

The e-channeling directory (`src/features/e-channeling/data/doctors.ts`) was rebuilt from the hospital's consultant roster of 2026-10-05. These 14 people were on the site before that update and are not on the roster, so they were taken off the directory.

Each row is exactly as it stood in `doctors.ts` before the update, so anyone here can be restored by copying the row back. Their Calendly events were not touched and may still be live: check the link before restoring, and switch the event off in Calendly if the consultant has left for good.

| Name | Speciality | Calendly booking link |
| --- | --- | --- |
| Dr. Damintha Dissanayake | Physician | https://calendly.com/appointments-sjhospital/consultant-physician-dr-damintha-dissanayake |
| Dr. Lalindra Dias | Physician | https://calendly.com/appointments-sjhospital/consultant-physician-dr-damintha-dissanayake-clone |
| Dr. N. Sritharan | Physician | https://calendly.com/appointments-sjhospital/consultant-pediatrician-dr-champa-wickramasi-clone |
| Dr. Raja Hettiarachchi | Physician | https://calendly.com/appointments-sjhospital/consultant-physician-dr-champa-jayamanna-clone |
| Dr. Rushantha Premadasa | Orthopaedic Surgeon | https://calendly.com/appointments-sjhospital/dr-rushanthapremadasa |
| Dr. Jayan De Silva | Eye Surgeon | https://calendly.com/appointments-sjhospital/consultant-eye-surgeon-dr-jayan-de-silva |
| Dr. Nihal Ganegoda | Eye Surgeon | https://calendly.com/appointments-sjhospital/consultant-eye-surgeon-dr-nihal-ganegoda |
| Dr. Dulcy Tissera | Dermatologist / Skin Specialist | https://calendly.com/appointments-sjhospital/consultant-dermatologist-dr-dulcy-tissera |
| Dr. Dhanushka Withanawasam | Neurologist / Neuro Physician | https://calendly.com/appointments-sjhospital/consultant-neurologist-dr-dhanushka-withanawasam |
| Dr. Prabath Wickrama | Psychiatrist | https://calendly.com/appointments-sjhospital/consultant-psychiatrist-dr-prabath-wickrama |
| Dr. V. Centuran | ENT Surgeon | https://calendly.com/appointments-sjhospital/ent-surgeon-dr-vcenturan |
| Dr. Ruwan Perera | Gastroenterologist / Liver Specialist | https://calendly.com/appointments-sjhospital/consultant-gastro-enterologist-dr-ruwan-perera |
| Dr. Bodhika Samarasekara | Respiratory / Chest Physician | https://calendly.com/appointments-sjhospital/consultant-respiratory-chest-physician-dr-bodhika |
| Mr. Gamini De Mel | Physiotherapist | https://calendly.com/appointments-sjhospital/speech-therapist-mrs-mayuri-bandara-clone |

Dr. Ruwan Perera was the only Gastroenterologist / Liver Specialist, so that speciality has left the directory as well. The site's media page and endoscopy service page still say a consultant gastroenterologist is available; that copy was left unchanged pending a decision.

## Restoring one

1. Copy the row back into `doctors.ts` under its speciality, as `{ name, specialization, calendlySlug, sessions: { … } }`, with their current session times.
2. Add a matching row at the same index in `doctors.si.ts` and `doctors.ta.ts`. For Gastroenterologist / Liver Specialist the old wording was `ආමාශ ආන්ත්‍ර හා අක්මා රෝග විශේෂඥ` (Sinhala) and `இரைப்பை குடல் மற்றும் கல்லீரல் நோய் நிபுணர்` (Tamil).
3. Update the counts in `doctors.test.ts`, then run `npm test`. The ticker test names any `tickerItems` entry in `content.si.ts` / `content.ta.ts` that needs reordering.
