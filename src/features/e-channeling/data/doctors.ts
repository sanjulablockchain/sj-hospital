export const CALENDLY_BASE = "https://calendly.com/appointments-sjhospital/";

/** Monday first, the order a session list is read in. */
export const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
export type Weekday = (typeof WEEKDAYS)[number];

export type Doctor = {
  name: string;
  specialization: string;
  /**
   * A consultant and the Calendly event that books them.
   *
   * `calendlySlug` is appended to CALENDLY_BASE. Many slugs name a different
   * doctor than the row does, which looks alarming and was once recorded here as
   * a data-quality bug worth reproducing. It is not a bug: Calendly's "clone"
   * feature keeps the source event's URL slug while the copy gets renamed, and a
   * slug is not required to match its event title. Checked on 2026-08-26 by
   * fetching the og:title of the 71 booking pages of the time, and all 71
   * resolved to the consultant named in the row. `doctors.test.ts` fails if the
   * old flag returns.
   *
   * Absent on the 31 rows added from the 2026-10-05 roster: their Calendly
   * events have not been supplied yet, so DoctorDirectory sends those cards to
   * the channelling desk's phone instead of a booking page. Add the slug when
   * it arrives and the card becomes a booking link with no other change.
   */
  calendlySlug?: string;
  /**
   * Weekly session start times from the hospital's roster, keyed by day. A day
   * with no session is simply absent. Times are written once, in English
   * numerals ("4.00 PM"), and render as written in every locale.
   */
  sessions: Partial<Record<Weekday, readonly string[]>>;
  /** For a consultant without fixed weekly days, what to tell the patient instead. */
  sessionNote?: string;
};

/**
 * Source: the hospital's consultant roster of 2026-10-05 (88 rows). Where the
 * roster and this file spelled a name differently, this file's spelling was
 * kept. Fees, qualifications, registration numbers and phone numbers in the
 * roster are deliberately not published here. The 14 consultants that roster
 * dropped are recorded in `docs/consultants-removed-2026-10-05.md`, slugs
 * included, so any of them can be restored.
 *
 * Translation note (Sinhala and Tamil overlays live beside this file as
 * `doctors.si.ts` / `doctors.ta.ts`): `name` is a proper noun, exactly like
 * the hospital's own name, and never changes script. Several rows carry a
 * title merged straight into the string ("Dr. ", "Prof. ", "Mrs. ", "Mr. ",
 * "Ms. "), not as a separate field, so there is nothing to split the title
 * off from without inventing structure this file never had; the whole string
 * is treated as one untranslatable name. `specialization` and `sessionNote`
 * are common nouns and do translate, so the overlay carries one entry per row
 * with only those filled in. `content.i18n.test.ts` excludes `.name`,
 * `.calendlySlug` and `.sessions` by path rather than listing every name in
 * KEEPS_ENGLISH.
 */

export const doctors: Doctor[] = [
  // Gynecologist
  { name: "Dr. Athula Fernando", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-m-i-k-naeem-clone", sessions: { mon: ["6.00 PM"], tue: ["6.00 PM"], wed: ["6.00 PM"], thu: ["6.00 PM"], fri: ["6.00 PM"], sat: ["2.00 PM"], sun: ["10.00 AM"] } },
  { name: "Dr. Chandana Jayasundara", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-chandanajayasundara", sessions: { wed: ["4.00 PM"], fri: ["3.45 PM"] } },
  { name: "Prof. H. M. Jagath N. Herath", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-prof-jagath-herath", sessions: { mon: ["4.00 PM", "9.00 PM"], tue: ["4.00 PM", "9.00 PM"], wed: ["4.00 PM", "9.00 PM"], thu: ["4.00 PM", "9.00 PM"], fri: ["4.00 PM", "9.00 PM"], sat: ["3.00 PM"], sun: ["2.30 PM"] } },
  { name: "Dr. Nilan Kalidasa Rodrigo", specialization: "Gynecologist", sessions: { tue: ["6.30 PM"] } },
  { name: "Dr. P. D. Wimal Rajakaruna", specialization: "Gynecologist", sessions: { wed: ["6.00 PM"], thu: ["6.00 PM"], sat: ["3.00 PM"], sun: ["2.00 PM"] } },
  { name: "Dr. Prabath Randombage", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-prabath-randombage", sessions: { mon: ["8.00 PM"], tue: ["8.00 PM"], thu: ["8.00 PM"], sat: ["8.30 PM"], sun: ["8.30 PM"] } },
  { name: "Dr. Sabaretnam Jeyakumar", specialization: "Gynecologist", calendlySlug: "consultantgynecologist-dr-sabarathnamjeyakumar", sessions: { wed: ["6.00 PM"], sat: ["6.00 PM"] } },

  // Pediatrician
  { name: "Dr. A. Windsor Perera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-ananda-piyatissa-clone", sessions: { mon: ["3.00 PM"], tue: ["3.00 PM"], thu: ["3.00 PM"], sat: ["3.00 PM"] } },
  { name: "Dr. Ananda Piyatissa", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-anandapiyatissa", sessions: { wed: ["4.30 PM"], sun: ["8.30 AM"] } },
  { name: "Dr. Anura Jayasinghe", specialization: "Pediatrician", sessions: { mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], thu: ["4.00 PM"], fri: ["4.00 PM"], sat: ["5.00 PM"], sun: ["5.00 PM"] } },
  { name: "Dr. Aruni Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-aruniwijesinghe", sessions: { sat: ["6.30 AM"] } },
  { name: "Dr. Champa Wickramasinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-champa-wickramasinghe", sessions: { mon: ["7.00 AM", "4.00 PM"], tue: ["7.00 AM", "4.00 PM"], wed: ["7.00 AM", "4.00 PM"], thu: ["7.00 AM", "4.00 PM"], fri: ["7.00 AM", "4.00 PM"], sat: ["12.00 PM"], sun: ["7.00 AM", "12.00 PM"] } },
  { name: "Dr. Himali Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe", sessions: { mon: ["3.30 PM", "6.00 PM"], tue: ["3.30 PM", "6.00 PM"], wed: ["3.30 PM", "6.00 PM"], thu: ["3.30 PM", "6.00 PM"], fri: ["3.30 PM", "6.00 PM"], sat: ["1.30 PM"] } },
  { name: "Dr. Lakkumar Fernando", specialization: "Pediatrician", calendlySlug: "consultant-gynecologist-dr-lakkumar-fernando", sessions: { mon: ["9.30 AM", "7.00 PM"], tue: ["9.30 AM", "7.00 PM"], wed: ["9.30 AM", "7.00 PM"], thu: ["9.30 AM", "7.00 PM"], fri: ["9.30 AM", "7.00 PM"], sat: ["3.00 PM"], sun: ["12.00 PM"] } },
  { name: "Dr. Nimalika Hettiarachchi", specialization: "Pediatrician", calendlySlug: "pediatrician-dr-nimalika-hettiarachchi", sessions: { mon: ["4.15 PM"], wed: ["7.30 AM"], thu: ["4.15 PM"], sat: ["7.30 AM"] } },
  { name: "Dr. Sandaya Doluweera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe-clone", sessions: { sat: ["2.00 PM"] } },

  // Physician
  { name: "Dr. Champa Jayamanna", specialization: "Physician", calendlySlug: "consultant-physician-dr-n-sritharan-clone", sessions: { sat: ["3.00 PM"] } },
  { name: "Dr. Charith Perera", specialization: "Physician", sessions: { mon: ["7.30 PM"], tue: ["7.30 PM"], wed: ["7.30 PM"], thu: ["5.00 PM"], fri: ["7.30 PM"], sat: ["5.00 PM"] } },
  { name: "Dr. Saman Wijetunge", specialization: "Physician", calendlySlug: "consultant-physician-dr-thusith-gunawardhana-clone", sessions: { mon: ["3.45 PM"], tue: ["5.00 PM"], wed: ["4.30 PM"], thu: ["3.45 PM"], fri: ["4.30 PM"], sat: ["12.00 PM"], sun: ["10.30 AM"] } },
  { name: "Prof. Shaluka Francis Jayamanne", specialization: "Physician", sessions: { sun: ["11.00 AM"] } },
  { name: "Dr. Thusith Gunawardhana", specialization: "Physician", calendlySlug: "consultant-physician-dr-raja-hettiarachchi-clone", sessions: { tue: ["4.00 PM"] } },

  // Sports and Exercise Physician
  { name: "Dr. Thiwanka Gunawardena", specialization: "Sports and Exercise Physician", sessions: { sun: ["8.30 AM"] } },

  // Surgeon
  { name: "Dr. Ashmo Ranasinghe", specialization: "Surgeon", sessions: { mon: ["4.00 PM"], wed: ["4.00 PM"], fri: ["4.00 PM"] } },
  { name: "Dr. Asoka Wijemanne", specialization: "Surgeon", sessions: { wed: ["5.00 PM"], sat: ["2.00 PM"] } },
  { name: "Dr. E. Rajasekaran", specialization: "Surgeon", calendlySlug: "consultant-physician-dr-saman-wijetunge-clone", sessions: { sat: ["2.00 PM"], sun: ["9.00 AM"] } },
  { name: "Dr. Kailanathan", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-ranjith-perera-clone", sessions: {}, sessionNote: "Once a month; call for the date" },
  { name: "Dr. Keerthi Rajapaksha", specialization: "Surgeon", sessions: { sat: ["2.30 PM"], sun: ["2.30 PM"] } },
  { name: "Dr. M.R.M Ziyard", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-m-r-m-ziyard", sessions: { mon: ["5.00 PM"], tue: ["5.00 PM"], wed: ["5.00 PM"], thu: ["5.00 PM"], fri: ["5.00 PM"] } },
  { name: "Dr. Prabath Kumarasinghe", specialization: "Surgeon", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone", sessions: { mon: ["6.30 PM"], thu: ["6.30 PM"], sat: ["2.00 PM"] } },
  { name: "Dr. R.D. Yapa", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-r-d-yapa", sessions: { mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], thu: ["4.00 PM"], fri: ["4.00 PM"] } },
  { name: "Dr. Ranjith Perera", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-e-rajasekaran-clone", sessions: { tue: ["3.30 PM"], thu: ["3.30 PM"], sat: ["3.30 PM"], sun: ["9.00 AM"] } },
  { name: "Dr. Roshan Dassanayake", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-roshan-dassanayake", sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["12.00 PM"], sun: ["12.00 PM"] } },

  // Orthopaedic Surgeon
  { name: "Dr. Ajith Priyantha Ukwaththaarachchi", specialization: "Orthopaedic Surgeon", sessions: { mon: ["4.30 PM"] } },
  { name: "Dr. Lisitha Kularathne", specialization: "Orthopaedic Surgeon", sessions: { sat: ["11.00 AM"] } },
  { name: "Dr. Nirosh Subramaniam", specialization: "Orthopaedic Surgeon", sessions: { sun: ["9.00 AM"] } },
  { name: "Dr. Thushara De Almeida", specialization: "Orthopaedic Surgeon", calendlySlug: "consultant-orthopedic-dr-thushara-de-almeida", sessions: { mon: ["3.45 PM"], tue: ["3.45 PM"], wed: ["3.45 PM"], thu: ["3.45 PM"], fri: ["3.45 PM"], sat: ["5.00 PM"] } },

  // Rheumatologist
  { name: "Dr. Dilrukshi Thennakoon", specialization: "Rheumatologist", calendlySlug: "consultant-rheumatology-rehabilitation", sessions: { tue: ["5.00 PM"], thu: ["5.00 PM"], sat: ["11.30 AM"] } },
  { name: "Dr. Gunendrika Kasthurirathne", specialization: "Rheumatologist", calendlySlug: "dr-gunendrikakasthurirathne", sessions: { wed: ["4.00 PM"] } },
  { name: "Dr. Lalith S. Wijerathne", specialization: "Rheumatologist", calendlySlug: "consultant-in-rheumatology-rehabilitation-dr-lalith", sessions: {}, sessionNote: "Twice a month; call for the dates" },

  // Cardiologist
  { name: "Dr. Ajith Wanniarachchi", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-ajith-wanniarachchi", sessions: { tue: ["4.00 PM"], thu: ["4.00 PM"] } },
  { name: "Dr. Nimali Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-nimali-fernando", sessions: { mon: ["3.00 PM"], fri: ["3.00 PM"] } },
  { name: "Dr. Sanjaya Kularathne", specialization: "Cardiologist", sessions: { thu: ["4.30 PM"], sun: ["6.00 PM"] } },
  { name: "Dr. Tharanga Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-taranga-fernando", sessions: { sun: ["10.30 AM"] } },
  { name: "Dr. Wasantha Abeywickrama", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-wasantha-abeywickrama", sessions: { sat: ["7.00 PM"] } },

  // Eye Surgeon
  { name: "Dr. D. M. Priyanka Parakrama Bandara", specialization: "Eye Surgeon", sessions: { mon: ["5.30 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], thu: ["5.30 PM"], sat: ["2.00 PM"] } },
  { name: "Dr. Pradeepa K. Siriwardana", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-pradeepa-k", sessions: { mon: ["2.00 PM"], thu: ["2.00 PM"] } },

  // Dermatologist / Skin Specialist
  { name: "Dr. Ahamed Uwyes", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-ahamed-uwyes", sessions: { mon: ["8.45 PM"], wed: ["8.45 PM"] } },
  { name: "Dr. Lakmali Pathiraja", specialization: "Dermatologist / Skin Specialist", calendlySlug: "pta-physical-therapy-assistant-mr-lilangit-clone", sessions: { tue: ["4.30 PM"] } },
  { name: "Dr. Poorna Weerasinghe", specialization: "Dermatologist / Skin Specialist", sessions: { thu: ["4.00 PM"] } },
  { name: "Dr. Punya Abeygunawardana", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-punya", sessions: { mon: ["4.00 PM"], tue: ["4.00 PM"], thu: ["4.00 PM"], fri: ["4.00 PM"], sat: ["2.30 PM"] } },

  // Neurologist / Neuro Physician
  { name: "Dr. M. Saamir Mohideen", specialization: "Neurologist / Neuro Physician", calendlySlug: "consultant-neurologist-dr-m-samir-mohideen", sessions: { thu: ["4.00 PM"] } },

  // Nephrologist
  { name: "Dr. Anupama De Silva", specialization: "Nephrologist", sessions: { sat: ["11.00 AM"] } },
  { name: "Dr. Dinith Galabada", specialization: "Nephrologist", calendlySlug: "consultant-nephrologist-dr-dinith-galabada", sessions: { sat: ["7.00 PM"] } },
  { name: "Dr. N. J. A. Harshani Dinusha Perera", specialization: "Nephrologist", sessions: { sat: ["8.00 PM"] } },

  // Psychiatrist
  { name: "Dr. Saman Weerawardhana", specialization: "Psychiatrist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardhana", sessions: { sat: ["11.30 AM"] } },
  { name: "Dr. Shanika Medagama", specialization: "Psychiatrist", sessions: { mon: ["6.00 PM"], tue: ["5.00 PM"], wed: ["6.00 PM"] } },

  // ENT Surgeon
  { name: "Dr. Premalal De Mel", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-premalaldemel", sessions: { mon: ["4.00 PM"], tue: ["7.30 AM", "7.00 PM"], wed: ["4.00 PM"], thu: ["7.30 AM", "7.00 PM"], fri: ["4.00 PM"], sat: ["4.00 PM"] } },
  { name: "Dr. Yasath Weerakkody", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-yasathweerakkody", sessions: { tue: ["7.00 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["7.00 PM"], sat: ["11.30 PM"] } },

  // Endocrinologist
  { name: "Dr. Tharanga Samarasekara", specialization: "Endocrinologist", calendlySlug: "consultant-endocrinologist-diabetologist-dr-tharanga-samarasekara", sessions: { mon: ["3.30 PM"] } },

  // Respiratory / Chest Physician
  { name: "Dr. Dilesha Wadasinghe", specialization: "Respiratory / Chest Physician", sessions: { sun: ["1.30 PM"] } },
  { name: "Dr. Wathsala Gunasinghe", specialization: "Respiratory / Chest Physician", calendlySlug: "consultant-respiratory-physician-dr-wathsala-gunasinghe", sessions: { mon: ["4.00 PM"] } },

  // Neuro Surgeon
  { name: "Dr. Lakmal Hewage", specialization: "Neuro Surgeon", calendlySlug: "clinical-embryologist-reproductive-medicine-sp-clone", sessions: { thu: ["6.00 PM"] } },

  // Hematologist
  { name: "Dr. Aruna Jayawardhana", specialization: "Hematologist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardha-clone", sessions: { mon: ["5.00 PM"], wed: ["7.00 AM"], sat: ["7.00 AM"] } },

  // Urologist
  { name: "Dr. D. S. Indrajith", specialization: "Urologist", sessions: { wed: ["4.00 PM"] } },
  { name: "Dr. Ishan Jayasuriya", specialization: "Urologist", calendlySlug: "consultant-urologist-dr-ishan-jayasuriya", sessions: { mon: ["6.45 AM", "7.00 PM"], tue: ["6.45 AM", "7.00 PM"], wed: ["6.45 AM", "7.00 PM"], thu: ["6.45 AM", "7.00 PM"], fri: ["6.45 AM", "7.00 PM"], sat: ["4.00 PM"], sun: ["9.00 AM", "4.00 PM"] } },
  { name: "Dr. Munipriya Willarachchi", specialization: "Urologist", sessions: { tue: ["5.00 PM"], wed: ["5.00 PM"] } },

  // Oncologist
  { name: "Dr. N. Yoganathan", specialization: "Oncologist", sessions: { sun: ["1.00 PM"] } },

  // Oncological Surgeon
  { name: "Dr. Buddhika Thilakarathna", specialization: "Oncological Surgeon", sessions: { sat: ["6.00 PM"], sun: ["12.00 PM"] } },

  // Histopathologist
  { name: "Dr. Ineesha Jayasinghe", specialization: "Histopathologist", calendlySlug: "consultant-histopathologist-dr-ineesha-jayasinghe", sessions: { mon: ["6.30 AM"], tue: ["6.30 AM"], wed: ["6.30 AM"], thu: ["6.30 AM"], fri: ["6.30 AM"] } },

  // Radiologist
  { name: "Dr. Nimesha Madagedara", specialization: "Radiologist", sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["11.30 AM"] } },
  { name: "Dr. Prasanna Rupasinghe", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasinghe", sessions: { sun: ["8.00 AM"] } },
  { name: "Dr. Ranjita Sivapatham", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-ranjieta-sivapatham", sessions: { mon: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["12.00 PM"] } },
  { name: "Dr. S. M. Alahakoon", specialization: "Radiologist", sessions: { mon: ["6.00 PM"], tue: ["6.00 PM"], wed: ["6.00 PM"], thu: ["6.00 PM"], fri: ["6.00 PM"] } },
  { name: "Dr. Wasantha Hewapathirana", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-wasantha-hewapathirana", sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"], sat: ["12.00 PM"] } },

  // Medico-Legal Consultant
  { name: "Dr. W. A. S. R. Wickramarachchi", specialization: "Medico-Legal Consultant", sessions: { mon: ["4.30 PM"], tue: ["4.30 PM"], wed: ["4.30 PM"], thu: ["4.30 PM"] } },

  // Audiologist
  { name: "Mrs. Dinusha Manathunga", specialization: "Audiologist", calendlySlug: "counselor-ms-romin-fernando-clone", sessions: { mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], thu: ["4.00 PM"], fri: ["4.00 PM"], sat: ["4.00 PM"], sun: ["5.00 PM"] } },
  { name: "Mr. Lilangith Silva", specialization: "Audiologist", calendlySlug: "eeg-electroencephalogram-technician-mr-sam-clone", sessions: { wed: ["3.30 PM"] } },

  // EEG (Electroencephalogram)
  { name: "Mr. Sampath", specialization: "EEG (Electroencephalogram)", sessions: { sat: ["3.00 PM"] } },

  // Lung Function Test
  { name: "Mr. Samitha Edirisinghe", specialization: "Lung Function Test", sessions: { mon: ["6.00 AM"], tue: ["6.00 AM"], wed: ["6.00 AM"], thu: ["6.00 AM"], fri: ["6.00 AM"], sat: ["6.00 AM"], sun: ["6.00 AM"] } },

  // Clinical Embryologist / Fertility Counselor
  { name: "Dr. H. Rathnayaka", specialization: "Clinical Embryologist / Fertility Counselor", calendlySlug: "consultant-surgeon-liver-transplant-hepatob-clone", sessions: { mon: ["4.30 PM"], tue: ["4.30 PM"], wed: ["4.30 PM"], thu: ["4.30 PM"], fri: ["4.30 PM"], sat: ["4.30 PM"] } },

  // Speech Therapist
  { name: "Mrs. Mayuri Bandara", specialization: "Speech Therapist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasingh-clone", sessions: { mon: ["3.30 PM"], tue: ["3.30 PM"], wed: ["3.30 PM"], thu: ["3.30 PM"], fri: ["3.30 PM"] } },

  // Physiotherapist
  { name: "Mrs. Yamuna Perera", specialization: "Physiotherapist", calendlySlug: "physiotherapists-mr-demal-clone", sessions: { mon: ["10.00 AM"], tue: ["10.00 AM"], wed: ["10.00 AM"], thu: ["10.00 AM"], fri: ["10.00 AM"], sat: ["10.00 AM"], sun: ["10.00 AM"] } },

  // Nutritionist
  { name: "Mrs. Fathima Nazriya", specialization: "Nutritionist", sessions: { mon: ["4.00 PM"], tue: ["4.00 PM"], wed: ["4.00 PM"], thu: ["4.00 PM"], fri: ["4.00 PM"] } },
  { name: "H. D. Rasika Chandimala", specialization: "Nutritionist", sessions: { mon: ["9.00 AM – 5.00 PM"], tue: ["9.00 AM – 5.00 PM"], wed: ["9.00 AM – 5.00 PM"], thu: ["9.00 AM – 5.00 PM"], fri: ["9.00 AM – 5.00 PM"] } },
  { name: "Mrs. Thiloka Sammani", specialization: "Nutritionist", calendlySlug: "physiotherapists-mrs-yamuna-perera-clone-clone", sessions: { mon: ["4.30 PM"], tue: ["4.30 PM"], wed: ["4.30 PM"], thu: ["4.30 PM"], fri: ["4.30 PM"], sat: ["3.30 PM"], sun: ["6.30 PM"] } },

  // Psychological Counselling
  { name: "Ms. Priyadarshani Cooray", specialization: "Psychological Counselling", sessions: { sun: ["10.00 AM"] } },
  { name: "Ms. Romin Fernando", specialization: "Psychological Counselling", calendlySlug: "neurosurgeon-dr-lakmal-hewage-clone", sessions: { mon: ["2.00 PM"], wed: ["2.00 PM"], sat: ["2.00 PM"] } },

  // Counseling Psychologist
  { name: "Dr. S.A.M. Randika Rupasinghe", specialization: "Counseling Psychologist", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone-1", sessions: { mon: ["3.00 PM"], tue: ["3.00 PM"], wed: ["3.00 PM"], thu: ["3.00 PM"], fri: ["3.00 PM"], sat: ["3.00 PM"] } },
];
