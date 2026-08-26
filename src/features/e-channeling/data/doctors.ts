export const CALENDLY_BASE = "https://calendly.com/appointments-sjhospital/";

export type Doctor = {
  name: string;
  specialization: string;
  calendlySlug: string;
  /**
   * A consultant and the Calendly event that books them.
   *
   * `calendlySlug` is appended to CALENDLY_BASE. Many slugs name a different
   * doctor than the row does, which looks alarming and was once recorded here as
   * a data-quality bug worth reproducing. It is not a bug: Calendly's "clone"
   * feature keeps the source event's URL slug while the copy gets renamed, and a
   * slug is not required to match its event title. Checked on 2026-08-26 by
   * fetching the og:title of all 71 booking pages, and all 71 resolve to the
   * consultant named here. `doctors.test.ts` fails if the old flag returns.
   */
};

export const doctors: Doctor[] = [
  // Gynecologist
  { name: "Dr. Athula Fernando", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-m-i-k-naeem-clone" },
  { name: "Dr. Chandana Jayasundara", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-chandanajayasundara" },
  { name: "Prof. H. M. Jagath N. Herath", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-prof-jagath-herath" },
  { name: "Dr. Prabath Randombage", specialization: "Gynecologist", calendlySlug: "consultant-gynecologist-dr-prabath-randombage" },
  { name: "Dr. Sabaretnam Jeyakumar", specialization: "Gynecologist", calendlySlug: "consultantgynecologist-dr-sabarathnamjeyakumar" },

  // Pediatrician
  { name: "Dr. Ananda Piyatissa", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-anandapiyatissa" },
  { name: "Dr. Aruni Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-aruniwijesinghe" },
  { name: "Dr. Champa Wickramasinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-champa-wickramasinghe" },
  { name: "Dr. Himali Wijesinghe", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe" },
  { name: "Dr. Lakkumar Fernando", specialization: "Pediatrician", calendlySlug: "consultant-gynecologist-dr-lakkumar-fernando" },
  { name: "Dr. Nimalika Hettiarachchi", specialization: "Pediatrician", calendlySlug: "pediatrician-dr-nimalika-hettiarachchi" },
  { name: "Dr. Sandaya Doluweera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-himali-wijesinghe-clone" },
  { name: "Dr. A. Windsor Perera", specialization: "Pediatrician", calendlySlug: "consultant-pediatrician-dr-ananda-piyatissa-clone" },

  // Physician
  { name: "Dr. Champa Jayamanna", specialization: "Physician", calendlySlug: "consultant-physician-dr-n-sritharan-clone" },
  { name: "Dr. Damintha Dissanayake", specialization: "Physician", calendlySlug: "consultant-physician-dr-damintha-dissanayake" },
  { name: "Dr. Lalindra Dias", specialization: "Physician", calendlySlug: "consultant-physician-dr-damintha-dissanayake-clone" },
  { name: "Dr. N. Sritharan", specialization: "Physician", calendlySlug: "consultant-pediatrician-dr-champa-wickramasi-clone" },
  { name: "Dr. Raja Hettiarachchi", specialization: "Physician", calendlySlug: "consultant-physician-dr-champa-jayamanna-clone" },
  { name: "Dr. Saman Wijetunge", specialization: "Physician", calendlySlug: "consultant-physician-dr-thusith-gunawardhana-clone" },
  { name: "Dr. Thusith Gunawardhana", specialization: "Physician", calendlySlug: "consultant-physician-dr-raja-hettiarachchi-clone" },

  // Surgeon
  { name: "Dr. E. Rajasekaran", specialization: "Surgeon", calendlySlug: "consultant-physician-dr-saman-wijetunge-clone" },
  { name: "Dr. Kailanathan", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-ranjith-perera-clone" },
  { name: "Dr. M.R.M Ziyard", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-m-r-m-ziyard" },
  { name: "Dr. Prabath Kumarasinghe", specialization: "Surgeon", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone" },
  { name: "Dr. R.D. Yapa", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-r-d-yapa" },
  { name: "Dr. Ranjith Perera", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-e-rajasekaran-clone" },
  { name: "Dr. Roshan Dassanayake", specialization: "Surgeon", calendlySlug: "consultant-surgeon-dr-roshan-dassanayake" },

  // Orthopaedic Surgeon
  { name: "Dr. Rushantha Premadasa", specialization: "Orthopaedic Surgeon", calendlySlug: "dr-rushanthapremadasa" },
  { name: "Dr. Thushara De Almeida", specialization: "Orthopaedic Surgeon", calendlySlug: "consultant-orthopedic-dr-thushara-de-almeida" },

  // Rheumatologist
  { name: "Dr. Dilrukshi Thennakoon", specialization: "Rheumatologist", calendlySlug: "consultant-rheumatology-rehabilitation" },
  { name: "Dr. Gunendrika Kasthurirathne", specialization: "Rheumatologist", calendlySlug: "dr-gunendrikakasthurirathne" },
  { name: "Dr. Lalith S. Wijerathne", specialization: "Rheumatologist", calendlySlug: "consultant-in-rheumatology-rehabilitation-dr-lalith" },

  // Cardiologist
  { name: "Dr. Ajith Wanniarachchi", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-ajith-wanniarachchi" },
  { name: "Dr. Nimali Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-nimali-fernando" },
  { name: "Dr. Tharanga Fernando", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-taranga-fernando" },
  { name: "Dr. Wasantha Abeywickrama", specialization: "Cardiologist", calendlySlug: "consultant-cardiologist-dr-wasantha-abeywickrama" },

  // Eye Surgeon
  { name: "Dr. Jayan De Silva", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-jayan-de-silva" },
  { name: "Dr. Nihal Ganegoda", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-nihal-ganegoda" },
  { name: "Dr. Pradeepa K. Siriwardana", specialization: "Eye Surgeon", calendlySlug: "consultant-eye-surgeon-dr-pradeepa-k" },

  // Dermatologist / Skin Specialist
  { name: "Dr. Ahamed Uwyes", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-ahamed-uwyes" },
  { name: "Dr. Dulcy Tissera", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-dulcy-tissera" },
  { name: "Dr. Lakmali Pathiraja", specialization: "Dermatologist / Skin Specialist", calendlySlug: "pta-physical-therapy-assistant-mr-lilangit-clone" },
  { name: "Dr. Punya Abeygunawardana", specialization: "Dermatologist / Skin Specialist", calendlySlug: "consultant-dermatologist-dr-punya" },

  // Neurologist / Neuro Physician
  { name: "Dr. Dhanushka Withanawasam", specialization: "Neurologist / Neuro Physician", calendlySlug: "consultant-neurologist-dr-dhanushka-withanawasam" },
  { name: "Dr. M. Saamir Mohideen", specialization: "Neurologist / Neuro Physician", calendlySlug: "consultant-neurologist-dr-m-samir-mohideen" },

  // Nephrologist
  { name: "Dr. Dinith Galabada", specialization: "Nephrologist", calendlySlug: "consultant-nephrologist-dr-dinith-galabada" },

  // Psychiatrist
  { name: "Dr. Prabath Wickrama", specialization: "Psychiatrist", calendlySlug: "consultant-psychiatrist-dr-prabath-wickrama" },
  { name: "Dr. Saman Weerawardhana", specialization: "Psychiatrist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardhana" },

  // ENT Surgeon
  { name: "Dr. Yasath Weerakkody", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-yasathweerakkody" },
  { name: "Dr. V. Centuran", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-vcenturan" },
  { name: "Dr. Premalal De Mel", specialization: "ENT Surgeon", calendlySlug: "ent-surgeon-dr-premalaldemel" },

  // Gastroenterologist / Liver Specialist
  { name: "Dr. Ruwan Perera", specialization: "Gastroenterologist / Liver Specialist", calendlySlug: "consultant-gastro-enterologist-dr-ruwan-perera" },

  // Endocrinologist
  { name: "Dr. Tharanga Samarasekara", specialization: "Endocrinologist", calendlySlug: "consultant-endocrinologist-diabetologist-dr-tharanga-samarasekara" },

  // Respiratory / Chest Physician
  { name: "Dr. Bodhika Samarasekara", specialization: "Respiratory / Chest Physician", calendlySlug: "consultant-respiratory-chest-physician-dr-bodhika" },
  { name: "Dr. Wathsala Gunasinghe", specialization: "Respiratory / Chest Physician", calendlySlug: "consultant-respiratory-physician-dr-wathsala-gunasinghe" },

  // Neuro Surgeon
  { name: "Dr. Lakmal Hewage", specialization: "Neuro Surgeon", calendlySlug: "clinical-embryologist-reproductive-medicine-sp-clone" },

  // Hematologist
  { name: "Dr. Aruna Jayawardhana", specialization: "Hematologist", calendlySlug: "consultant-psychiatrist-dr-saman-weerawardha-clone" },

  // Urologist
  { name: "Dr. Ishan Jayasuriya", specialization: "Urologist", calendlySlug: "consultant-urologist-dr-ishan-jayasuriya" },

  // Histopathologist
  { name: "Dr. Ineesha Jayasinghe", specialization: "Histopathologist", calendlySlug: "consultant-histopathologist-dr-ineesha-jayasinghe" },

  // Radiologist
  { name: "Dr. Prasanna Rupasinghe", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasinghe" },
  { name: "Dr. Ranjita Sivapatham", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-ranjieta-sivapatham" },
  { name: "Dr. Wasantha Hewapathirana", specialization: "Radiologist", calendlySlug: "consultant-radiologist-dr-wasantha-hewapathirana" },

  // Audiologist
  { name: "Mrs. Dinusha Manathunga", specialization: "Audiologist", calendlySlug: "counselor-ms-romin-fernando-clone" },
  { name: "Mr. Lilangith Silva", specialization: "Audiologist", calendlySlug: "eeg-electroencephalogram-technician-mr-sam-clone" },

  // Clinical Embryologist / Fertility Counselor
  { name: "Dr. H. Rathnayaka", specialization: "Clinical Embryologist / Fertility Counselor", calendlySlug: "consultant-surgeon-liver-transplant-hepatob-clone" },

  // Speech Therapist
  { name: "Mrs. Mayuri Bandara", specialization: "Speech Therapist", calendlySlug: "consultant-radiologist-dr-prasanna-rupasingh-clone" },

  // Physiotherapist
  { name: "Mr. Gamini De Mel", specialization: "Physiotherapist", calendlySlug: "speech-therapist-mrs-mayuri-bandara-clone" },
  { name: "Mrs. Yamuna Perera", specialization: "Physiotherapist", calendlySlug: "physiotherapists-mr-demal-clone" },

  // Nutritionist
  { name: "Mrs. Thiloka Sammani", specialization: "Nutritionist", calendlySlug: "physiotherapists-mrs-yamuna-perera-clone-clone" },

  // Psychological Counselling
  { name: "Ms. Romin Fernando", specialization: "Psychological Counselling", calendlySlug: "neurosurgeon-dr-lakmal-hewage-clone" },

  // Counseling Psychologist
  { name: "Dr. S.A.M. Randika Rupasinghe", specialization: "Counseling Psychologist", calendlySlug: "cosmetic-dermatologist-dr-lakmali-pathiraja-clone-1" },
];
