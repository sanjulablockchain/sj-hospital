import type { LabOverride } from "./importRules";

/**
 * Hand maintained corrections to the hospital's laboratory price list,
 * applied by `scripts/import-lab-catalogue.mjs` after its mechanical rules
 * and kept across every re-import. Keyed by `overrideKey(code, n)`:
 * the sheet's item code plus the zero based occurrence of that code, because
 * a code can repeat. The comment above each entry is the sheet's own
 * spelling of the row, for finding it again.
 *
 * Each entry is one of: `name` to replace the display name (spelling slips,
 * reference-lab markers stripped), `exclude` to drop a row that is not a
 * test, `note` to add a short qualifier that tells two rows of the same test
 * apart. The importer warns about any key that no longer matches a row.
 *
 * See docs/superpowers/specs/2026-10-28-hero-slideshow-design.md,
 * "Catalogue cleaning". The owner reviews the published list; further
 * corrections land here.
 */
export const labOverrides: Record<string, LabOverride> = {
  // CSR MEDICAL (BOI KATUNAYAKE)
  "LAB0001514#0": { exclude: true, reason: "a corporate medical package, not a laboratory test" },
  // ANA/ANF-TITRE (ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR)
  "10362#0": { name: "ANA/ANF titre (antinuclear antibody and factor)" },
  // ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR (ANA/ANF)
  "10049#0": { name: "Antinuclear antibody, antinuclear factor (ANA/ANF)" },
  // ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR (ANA/ANF)
  "NIGHT002#0": { name: "Antinuclear antibody, antinuclear factor (ANA/ANF)", note: "Night service" },
  // ANTI NEUCLEAR ANTIBODY TITRE (LDH)
  "10355#0": { name: "Antinuclear antibody titre" },
  // ANTI NUCLEAR FACTOR
  "G2243#0": { name: "Antinuclear factor" },
  // ENA PROFILE/ ANTI NUCLEAR ANTIBODY PROFILE
  "LAB0002#0": { name: "ENA profile, antinuclear antibody profile" },
  // COMPLIMENT C3 - (BLOOD)
  "10164#0": { name: "Complement C3 (blood)" },
  // COMPLIMENT LEVEL C4 - (BLOOD)
  "10168#0": { name: "Complement C4 (blood)" },
  // HELICOBACTOR PYLORI ANTIBODY- RAPID TEST
  "10253#0": { name: "Helicobacter pylori antibody rapid test" },
  // HELICOBACTOR PYLORI ANTIGEN (RAPID)
  "10161#0": { name: "Helicobacter pylori antigen (rapid)" },
  // HEPATITIS B SURFACE ANTIBODY(QUNTITATIVE)
  "10163#0": { name: "Hepatitis B surface antibody (quantitative)" },
  // HEPATITIS B SURFACE ANTIBODY(QUNTITATIVE)-ELIZA
  "10340#0": { name: "Hepatitis B surface antibody (quantitative), ELISA" },
  // Luteinizinng Hormone ( LH )
  "G4035#0": { name: "Luteinizing hormone (LH)" },
  // OGTT 2 Samlple
  "G2015#0": { name: "OGTT, 2 samples" },
  // OGTT 5 SAMPLE
  "L1102#0": { name: "OGTT, 5 samples" },
  // BLOOD UREA NOTROGEN (BUN)
  "L1896#0": { name: "Blood urea nitrogen (BUN)" },
  // C1 ESTRASE INHIBITOR
  "LAB1500#0": { name: "C1 esterase inhibitor" },
  // HPLC ( HIGH PERFORMANCE LIQUID CHROMATOGRAPHI )
  "G2153#0": { name: "HPLC (high performance liquid chromatography)" },
  // ALLEGEN - EGG WHITE
  "00006#0": { name: "Allergen, egg white" },
  // HEMOLYTIE TITRE IGG ANTI A & B
  "LAB0001568#0": { name: "Haemolytic titre, IgG anti A & B" },
  // DOUBLE STANDED DNA ( DSDNA )
  "10081#0": { name: "Double stranded DNA (dsDNA)" },
  // HEPATITS B PROFILE
  "COL017#0": { name: "Hepatitis B profile" },
  // RHEUMATOID FACTOR (Rh Factor)
  "G2434#0": { name: "Rheumatoid factor (RF)" },
  // BETA 2 GLYCOPROTEIN ANTIBODY IGG(LH)
  "102115#0": { name: "Beta 2 glycoprotein antibody IgG" },
  // BETA 2 GLYCOPROTEIN ANTIBODY IGM (LH)
  "102116#0": { name: "Beta 2 glycoprotein antibody IgM" },
  // CHLAMYDIA TRACHOMATIS ANTIBODY -LH
  "102110#0": { name: "Chlamydia trachomatis antibody" },
  // CHLAMYDIA TRACHOMATIS TRACHOMATIS - PCR-(LDH)
  "102177#0": { name: "Chlamydia trachomatis PCR" },
  // EBV(EPSTEIN-BARR VIRUS)(HHV-4)-PCR - LH
  "10352#0": { name: "EBV (Epstein Barr virus, HHV-4) PCR" },
  // ELISA HIV 1& 2 (ANTIGEN ANTIBODY) LANKA
  "10323#0": { name: "ELISA HIV 1 & 2 (antigen and antibody)" },
  // COVID-19-PCR-(GENE LAB)
  "102154#0": { name: "COVID-19 PCR" },
  // COVID-19-PCR-(OPD)
  "102156#0": { name: "COVID-19 PCR", note: "OPD" },
  // COVID-19 AG RAPID TEST
  "102155#0": { name: "COVID-19 antigen rapid test" },
  // COVID-19 -IGG & IGM ANTIBODY TEST-(A)
  "102161#0": { name: "COVID-19 IgG & IgM antibody test" },
  // TB QUNTIFERON GOLD TEST (A)
  "102104#0": { name: "TB QuantiFERON Gold test" },
  // AEROBIC CULTURE & ABST - BONE MARROW (BACTEC) - L
  "102182#0": { name: "Aerobic culture & ABST, bone marrow (Bactec)" },
  // HEPATITIS B IGG ANTIBODY(LHD)
  "215#0": { name: "Hepatitis B IgG antibody" },
  // THROMBIN TIME (TT)..
  "G2120#0": { name: "Thrombin time (TT)" },
  // THROMBIN TIME (TT)
  "10150#0": { name: "Thrombin time (TT)" },
  // SEREM PROTIEN ELECTROPHROSIS
  "G3000#0": { name: "Serum protein electrophoresis" },
  // SERUM ELECTRORYTES
  "LAB00033#0": { name: "Serum electrolytes" },
  // SPOT URINE ELECTROLYES
  "G2551#0": { name: "Spot urine electrolytes" },
  // IRON PROFLE
  "G2531#0": { name: "Iron profile" },
  // RED CELLS FOLATE (FOLIC ACD-RED CELLS)
  "10284#0": { name: "Red cell folate" },
  // LUPUS ANTICOAGULENT
  "10104#0": { name: "Lupus anticoagulant" },
  // PARACITAMOL LEVEL SERUM
  "203#0": { name: "Paracetamol level, serum" },
  // PAROVIRUS IGM
  "10156#0": { name: "Parvovirus IgM" },
  // AMINOCENTASIS FISH TEST
  "10054#0": { name: "Amniocentesis FISH test" },
  // AMH (ANTI MULARIAN HORMONE)
  "10055#0": { name: "AMH (anti Mullerian hormone)" },
  // ANTI THYROGLOBIULIN ANTIBODY
  "1016#0": { name: "Anti thyroglobulin antibody" },
  // BENCE JONES PROTEININ URINE
  "10143#0": { name: "Bence Jones protein in urine" },
  // BIOSPY XL
  "LAB00038#0": { name: "Biopsy, extra large" },
  // BIOPSY L
  "LAB00046#0": { name: "Biopsy, large" },
  // BIOPSY M
  "LAB00039#0": { name: "Biopsy, medium" },
  // BIOPSY S
  "LAB00040#0": { name: "Biopsy, small" },
  // HISTO XL I
  "10136#0": { name: "Histology, extra large" },
  // HISTOLOGY LARGE
  "10097#0": { name: "Histology, large" },
  // HISTOLOGY LARGE
  "10180#0": { name: "Histology, large" },
  // HISTOLOGY MEDIUM 1
  "10095#0": { name: "Histology, medium" },
  // HISTOLOGY SMALL 1
  "10094#0": { name: "Histology, small" },
  // BJP ( Immuno fixation Electroporesis ) URINE
  "SJ0001#0": { name: "BJP (immunofixation electrophoresis), urine" },
  // HAEMOGLOBIN ELECTROPORESIS
  "000013#0": { name: "Haemoglobin electrophoresis" },
  // PAPSMEAR
  "10374#0": { name: "Pap smear" },
  // STOOL CAL PROTECTIN
  "10235#0": { name: "Stool calprotectin" },
  // HSV 1 & 2 LGM & IGG
  "G4009#0": { name: "HSV 1 & 2 IgM & IgG" },
  // FSH/LH/PROLACTIN
  "G2395#0": { name: "FSH, LH, prolactin" },
  // WBC/DC
  "10211#0": { name: "WBC/DC" },
  // APTT/PT&INR
  "10148#0": { name: "APTT, PT & INR" },
  // PT& INR
  "G2143#0": { name: "PT & INR" },
  // CA-19.9/AFP
  "LAB0001517#0": { name: "CA 19.9 & AFP" },
  // CARDIAC ENZYMES/PROFILE(CK/CK-MB/AST/LD)
  "G2382#0": { name: "Cardiac enzymes profile (CK, CK-MB, AST, LD)" },
  // CLOTTING PROFILE (PT/APTT/TT/BT/CT)
  "G2119#0": { name: "Clotting profile (PT, APTT, TT, BT, CT)" },
  // BONE PROFILE (CA/P/TP/ALB/ALP)
  "LAB0001#0": { name: "Bone profile (Ca, P, TP, Alb, ALP)" },
  // CK-MB
  "G2539#0": { name: "CK-MB" },
  // C-ANCA(PR-3)
  "102128#0": { name: "c-ANCA (PR3)" },
  // P-ANCA(MPO)
  "102129#0": { name: "p-ANCA (MPO)" },
  // CYTOMEGALOVIRUS IGG/IGM ANTIBODY
  "G2458#0": { name: "Cytomegalovirus IgG & IgM antibody" },
  // S.AMMONIA
  "10152#0": { name: "Serum ammonia" },
  // S.LACTATE
  "10151#0": { name: "Serum lactate" },
  // C.PEPTIDE LEVEL
  "10078#0": { name: "C peptide level" },
  // JAK2 V617F MUTATION DETECTION
  "10372#0": { name: "JAK2 V617F mutation detection" },
  // CYCLOSPORINE C0 LEVEL-WHOLE BLOOD
  "10273#0": { name: "Cyclosporine C0 level, whole blood" },
  // CYCLOSPORINE C2 LEVEL-WHOLE BLOOD
  "10274#0": { name: "Cyclosporine C2 level, whole blood" },
  // FACTOR II LEIDEN MUTATION
  "102137#0": { name: "Factor II Leiden mutation" },
  // FACTOR V LEIDEN MUTATION
  "102136#0": { name: "Factor V Leiden mutation" },
  // INFLUENZA A /H1N1-PCR
  "10357#0": { name: "Influenza A (H1N1) PCR" },
  // PCR-VARICELLA ZOSTER VIRUS
  "10294#0": { name: "Varicella zoster virus PCR" },
  // DENGUE VIRUS-PCR
  "10252#0": { name: "Dengue virus PCR" },
  // URINE-HAEMOGLOBIN
  "10267#0": { name: "Urine haemoglobin" },
  // URINE 24HRS CREATININE CLEARANCE
  "G2522#0": { name: "Urine 24 hours creatinine clearance" },
  // 24HRS URINE NA+
  "10209#0": { name: "24 hours urine sodium" },
  // 24 HOURS - URINE PROTEIN
  "G2016#0": { name: "24 hours urine protein" },
  // 17-OH PROGESTERONE
  "10318#0": { name: "17-OH progesterone" },
  // HEPATITIS C ANTI BODY
  "10329#0": { name: "Hepatitis C antibody" },
  // GLYCOSYLATED HAEMOGLOBIN ( HBA1C % ) - HPLC
  "G2361#0": { name: "Glycosylated haemoglobin (HbA1c), HPLC" },
  // CLOSTRIDIUM DIFFICILE TOXIN A
  "102107#0": { name: "Clostridium difficile toxin A" },
  // CLOSTRIDIUM DIFFICILE TOXIN GDH-RAPID TEST
  "102140#0": { name: "Clostridium difficile toxin GDH, rapid test" },
  // CEA (CARCINO-EMBRYONIC ANTIGEN)
  "G2341#0": { name: "CEA (carcinoembryonic antigen)" },
  // CPK (CREATININE PHOSPHOKINASE)
  "G2327#0": { name: "CPK (creatine phosphokinase)" },
  // DHEAS ( DEHYDROEPIANDROSTERONE SULPHATE )
  "10083#0": { name: "DHEAS (dehydroepiandrosterone sulphate)" },
  // VITAMIN D LEVEL (1 25 HYDROXY)
  "102105#0": { name: "Vitamin D level (1,25 hydroxy)" },
  // LDL-CHOLESTEROL (DIRECT)
  "10257#0": { name: "LDL cholesterol (direct)" },
  // BICARBONATES (BLOOD)
  "10217#0": { name: "Bicarbonate (blood)" },
  // VITAMIN B 12
  "10134#0": { name: "Vitamin B12" },
  // Vitamin B12
  "10134#1": { name: "Vitamin B12" },
};
