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
  "LAB0001514#0": { expect: "Csr medical (BOI katunayake)", exclude: true, reason: "a corporate medical package, not a laboratory test" },
  // ANA/ANF-TITRE (ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR)
  "10362#0": { expect: "ANA/ANF-titre (anti neuclear antibody, anti neuclear factor)", name: "ANA/ANF titre (antinuclear antibody and factor)" },
  // ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR (ANA/ANF)
  "10049#0": { expect: "Anti neuclear antibody, anti neuclear factor (ANA/ANF)", name: "Antinuclear antibody, antinuclear factor (ANA/ANF)" },
  // ANTI NEUCLEAR ANTIBODY / ANTI NEUCLEAR FACTOR (ANA/ANF)
  "NIGHT002#0": { expect: "Anti neuclear antibody, anti neuclear factor (ANA/ANF)", name: "Antinuclear antibody, antinuclear factor (ANA/ANF)", note: "Night service" },
  // ANTI NEUCLEAR ANTIBODY TITRE (LDH)
  "10355#0": { expect: "Anti neuclear antibody titre (LDH)", name: "Antinuclear antibody titre" },
  // ANTI NUCLEAR FACTOR
  "G2243#0": { expect: "Anti nuclear factor", name: "Antinuclear factor" },
  // ENA PROFILE/ ANTI NUCLEAR ANTIBODY PROFILE
  "LAB0002#0": { expect: "Ena profile, anti nuclear antibody profile", name: "ENA profile, antinuclear antibody profile" },
  // COMPLIMENT C3 - (BLOOD)
  "10164#0": { expect: "Compliment C3, (blood)", name: "Complement C3 (blood)" },
  // COMPLIMENT LEVEL C4 - (BLOOD)
  "10168#0": { expect: "Compliment level C4, (blood)", name: "Complement C4 (blood)" },
  // HELICOBACTOR PYLORI ANTIBODY- RAPID TEST
  "10253#0": { expect: "Helicobactor pylori antibody rapid test", name: "Helicobacter pylori antibody rapid test" },
  // HELICOBACTOR PYLORI ANTIGEN (RAPID)
  "10161#0": { expect: "Helicobactor pylori antigen (rapid)", name: "Helicobacter pylori antigen (rapid)" },
  // HEPATITIS B SURFACE ANTIBODY(QUNTITATIVE)
  "10163#0": { expect: "Hepatitis B surface antibody (quntitative)", name: "Hepatitis B surface antibody (quantitative)" },
  // HEPATITIS B SURFACE ANTIBODY(QUNTITATIVE)-ELIZA
  "10340#0": { expect: "Hepatitis B surface antibody (quntitative) eliza", name: "Hepatitis B surface antibody (quantitative), ELISA" },
  // Luteinizinng Hormone ( LH )
  "G4035#0": { expect: "Luteinizinng hormone (LH)", name: "Luteinizing hormone (LH)" },
  // OGTT 2 Samlple
  "G2015#0": { expect: "OGTT 2 samlple", name: "OGTT, 2 samples" },
  // OGTT 5 SAMPLE
  "L1102#0": { expect: "OGTT 5 sample", name: "OGTT, 5 samples" },
  // BLOOD UREA NOTROGEN (BUN)
  "L1896#0": { expect: "Blood urea notrogen (BUN)", name: "Blood urea nitrogen (BUN)" },
  // C1 ESTRASE INHIBITOR
  "LAB1500#0": { expect: "C1 estrase inhibitor", name: "C1 esterase inhibitor" },
  // HPLC ( HIGH PERFORMANCE LIQUID CHROMATOGRAPHI )
  "G2153#0": { expect: "HPLC (high performance liquid chromatographi)", name: "HPLC (high performance liquid chromatography)" },
  // ALLEGEN - EGG WHITE
  "00006#0": { expect: "Allegen, egg white", name: "Allergen, egg white" },
  // HEMOLYTIE TITRE IGG ANTI A & B
  "LAB0001568#0": { expect: "Hemolytie titre IgG anti A & B", name: "Haemolytic titre, IgG anti A & B" },
  // DOUBLE STANDED DNA ( DSDNA )
  "10081#0": { expect: "Double standed DNA (dsdna)", name: "Double stranded DNA (dsDNA)" },
  // HEPATITS B PROFILE
  "COL017#0": { expect: "Hepatits B profile", name: "Hepatitis B profile" },
  // RHEUMATOID FACTOR (Rh Factor)
  "G2434#0": { expect: "Rheumatoid factor (Rh factor)", name: "Rheumatoid factor (RF)" },
  // BETA 2 GLYCOPROTEIN ANTIBODY IGG(LH)
  "102115#0": { expect: "Beta 2 glycoprotein antibody IgG (LH)", name: "Beta 2 glycoprotein antibody IgG" },
  // BETA 2 GLYCOPROTEIN ANTIBODY IGM (LH)
  "102116#0": { expect: "Beta 2 glycoprotein antibody IgM (LH)", name: "Beta 2 glycoprotein antibody IgM" },
  // CHLAMYDIA TRACHOMATIS ANTIBODY -LH
  "102110#0": { expect: "Chlamydia trachomatis antibody LH", name: "Chlamydia trachomatis antibody" },
  // CHLAMYDIA TRACHOMATIS TRACHOMATIS - PCR-(LDH)
  "102177#0": { expect: "Chlamydia trachomatis trachomatis, PCR (LDH)", name: "Chlamydia trachomatis PCR" },
  // EBV(EPSTEIN-BARR VIRUS)(HHV-4)-PCR - LH
  "10352#0": { expect: "EBV (epstein-barr virus) (hhv-4) PCR, LH", name: "EBV (Epstein Barr virus, HHV-4) PCR" },
  // ELISA HIV 1& 2 (ANTIGEN ANTIBODY) LANKA
  "10323#0": { expect: "ELISA HIV 1& 2 (antigen antibody) lanka", name: "ELISA HIV 1 & 2 (antigen and antibody)" },
  // COVID-19-PCR-(GENE LAB)
  "102154#0": { expect: "Covid-19-PCR (gene lab)", name: "COVID-19 PCR" },
  // COVID-19-PCR-(OPD)
  "102156#0": { expect: "Covid-19-PCR (OPD)", name: "COVID-19 PCR", note: "OPD" },
  // COVID-19 AG RAPID TEST
  "102155#0": { expect: "Covid-19 ag rapid test", name: "COVID-19 antigen rapid test" },
  // COVID-19 -IGG & IGM ANTIBODY TEST-(A)
  "102161#0": { expect: "Covid-19 IgG & IgM antibody test (A)", name: "COVID-19 IgG & IgM antibody test" },
  // TB QUNTIFERON GOLD TEST (A)
  "102104#0": { expect: "TB quntiferon gold test (A)", name: "TB QuantiFERON Gold test" },
  // AEROBIC CULTURE & ABST - BONE MARROW (BACTEC) - L
  "102182#0": { expect: "Aerobic culture & ABST, bone marrow (bactec), L", name: "Aerobic culture & ABST, bone marrow (Bactec)" },
  // HEPATITIS B IGG ANTIBODY(LHD)
  "215#0": { expect: "Hepatitis B IgG antibody (LHD)", name: "Hepatitis B IgG antibody" },
  // THROMBIN TIME (TT)..
  "G2120#0": { expect: "Thrombin time (TT) ..", name: "Thrombin time (TT)" },
  // THROMBIN TIME (TT)
  "10150#0": { expect: "Thrombin time (TT)", name: "Thrombin time (TT)" },
  // SEREM PROTIEN ELECTROPHROSIS
  "G3000#0": { expect: "Serem protien electrophrosis", name: "Serum protein electrophoresis" },
  // SERUM ELECTRORYTES
  "LAB00033#0": { expect: "Serum electrorytes", name: "Serum electrolytes" },
  // SPOT URINE ELECTROLYES
  "G2551#0": { expect: "Spot urine electrolyes", name: "Spot urine electrolytes" },
  // IRON PROFLE
  "G2531#0": { expect: "Iron profle", name: "Iron profile" },
  // RED CELLS FOLATE (FOLIC ACD-RED CELLS)
  "10284#0": { expect: "Red cells folate (folic acd-red cells)", name: "Red cell folate" },
  // LUPUS ANTICOAGULENT
  "10104#0": { expect: "Lupus anticoagulent", name: "Lupus anticoagulant" },
  // PARACITAMOL LEVEL SERUM
  "203#0": { expect: "Paracitamol level serum", name: "Paracetamol level, serum" },
  // PAROVIRUS IGM
  "10156#0": { expect: "Parovirus IgM", name: "Parvovirus IgM" },
  // AMINOCENTASIS FISH TEST
  "10054#0": { expect: "Aminocentasis fish test", name: "Amniocentesis FISH test" },
  // AMH (ANTI MULARIAN HORMONE)
  "10055#0": { expect: "AMH (anti mularian hormone)", name: "AMH (anti Mullerian hormone)" },
  // ANTI THYROGLOBIULIN ANTIBODY
  "1016#0": { expect: "Anti thyroglobiulin antibody", name: "Anti thyroglobulin antibody" },
  // BENCE JONES PROTEININ URINE
  "10143#0": { expect: "Bence jones proteinin urine", name: "Bence Jones protein in urine" },
  // BIOSPY XL
  "LAB00038#0": { expect: "Biospy XL", name: "Biopsy, extra large" },
  // BIOPSY L
  "LAB00046#0": { expect: "Biopsy L", name: "Biopsy, large" },
  // BIOPSY M
  "LAB00039#0": { expect: "Biopsy M", name: "Biopsy, medium" },
  // BIOPSY S
  "LAB00040#0": { expect: "Biopsy S", name: "Biopsy, small" },
  // HISTO XL I
  "10136#0": { expect: "Histo XL I", name: "Histology, extra large" },
  // HISTOLOGY LARGE
  "10097#0": { expect: "Histology large", name: "Histology, large" },
  // HISTOLOGY LARGE
  "10180#0": { expect: "Histology large", name: "Histology, large" },
  // HISTOLOGY MEDIUM 1
  "10095#0": { expect: "Histology medium 1", name: "Histology, medium" },
  // HISTOLOGY SMALL 1
  "10094#0": { expect: "Histology small 1", name: "Histology, small" },
  // BJP ( Immuno fixation Electroporesis ) URINE
  "SJ0001#0": { expect: "Bjp (immuno fixation electroporesis) urine", name: "BJP (immunofixation electrophoresis), urine" },
  // HAEMOGLOBIN ELECTROPORESIS
  "000013#0": { expect: "Haemoglobin electroporesis", name: "Haemoglobin electrophoresis" },
  // PAPSMEAR
  "10374#0": { expect: "Papsmear", name: "Pap smear" },
  // STOOL CAL PROTECTIN
  "10235#0": { expect: "Stool cal protectin", name: "Stool calprotectin" },
  // HSV 1 & 2 LGM & IGG
  "G4009#0": { expect: "HSV 1 & 2 lgm & IgG", name: "HSV 1 & 2 IgM & IgG" },
  // FSH/LH/PROLACTIN
  "G2395#0": { expect: "FSH/LH/prolactin", name: "FSH, LH, prolactin" },
  // WBC/DC
  "10211#0": { expect: "WBC/DC", name: "WBC/DC" },
  // APTT/PT&INR
  "10148#0": { expect: "APTT/PT&INR", name: "APTT, PT & INR" },
  // PT& INR
  "G2143#0": { expect: "PT& INR", name: "PT & INR" },
  // CA-19.9/AFP
  "LAB0001517#0": { expect: "CA-19.9/AFP", name: "CA 19.9 & AFP" },
  // CARDIAC ENZYMES/PROFILE(CK/CK-MB/AST/LD)
  "G2382#0": { expect: "Cardiac enzymes/profile (CK/CK-mb/AST/ld)", name: "Cardiac enzymes profile (CK, CK-MB, AST, LD)" },
  // CLOTTING PROFILE (PT/APTT/TT/BT/CT)
  "G2119#0": { expect: "Clotting profile (PT/APTT/tt/bt/ct)", name: "Clotting profile (PT, APTT, TT, BT, CT)" },
  // BONE PROFILE (CA/P/TP/ALB/ALP)
  "LAB0001#0": { expect: "Bone profile (CA/P/tp/alb/ALP)", name: "Bone profile (Ca, P, TP, Alb, ALP)" },
  // CK-MB
  "G2539#0": { expect: "CK-mb", name: "CK-MB" },
  // C-ANCA(PR-3)
  "102128#0": { expect: "C-ANCA (pr-3)", name: "c-ANCA (PR3)" },
  // P-ANCA(MPO)
  "102129#0": { expect: "P-ANCA (MPO)", name: "p-ANCA (MPO)" },
  // CYTOMEGALOVIRUS IGG/IGM ANTIBODY
  "G2458#0": { expect: "Cytomegalovirus IgG/IgM antibody", name: "Cytomegalovirus IgG & IgM antibody" },
  // S.AMMONIA
  "10152#0": { expect: "S.ammonia", name: "Serum ammonia" },
  // S.LACTATE
  "10151#0": { expect: "S.lactate", name: "Serum lactate" },
  // C.PEPTIDE LEVEL
  "10078#0": { expect: "C.peptide level", name: "C peptide level" },
  // JAK2 V617F MUTATION DETECTION
  "10372#0": { expect: "Jak2 v617f mutation detection", name: "JAK2 V617F mutation detection" },
  // CYCLOSPORINE C0 LEVEL-WHOLE BLOOD
  "10273#0": { expect: "Cyclosporine c0 level-whole blood", name: "Cyclosporine C0 level, whole blood" },
  // CYCLOSPORINE C2 LEVEL-WHOLE BLOOD
  "10274#0": { expect: "Cyclosporine c2 level-whole blood", name: "Cyclosporine C2 level, whole blood" },
  // FACTOR II LEIDEN MUTATION
  "102137#0": { expect: "Factor II leiden mutation", name: "Factor II Leiden mutation" },
  // FACTOR V LEIDEN MUTATION
  "102136#0": { expect: "Factor V leiden mutation", name: "Factor V Leiden mutation" },
  // INFLUENZA A /H1N1-PCR
  "10357#0": { expect: "Influenza A, H1N1-PCR", name: "Influenza A (H1N1) PCR" },
  // PCR-VARICELLA ZOSTER VIRUS
  "10294#0": { expect: "PCR-varicella zoster virus", name: "Varicella zoster virus PCR" },
  // DENGUE VIRUS-PCR
  "10252#0": { expect: "Dengue virus-PCR", name: "Dengue virus PCR" },
  // URINE-HAEMOGLOBIN
  "10267#0": { expect: "Urine-haemoglobin", name: "Urine haemoglobin" },
  // URINE 24HRS CREATININE CLEARANCE
  "G2522#0": { expect: "Urine 24hrs creatinine clearance", name: "Urine 24 hours creatinine clearance" },
  // 24HRS URINE NA+
  "10209#0": { expect: "24hrs urine na+", name: "24 hours urine sodium" },
  // 24 HOURS - URINE PROTEIN
  "G2016#0": { expect: "24 hours, urine protein", name: "24 hours urine protein" },
  // 17-OH PROGESTERONE
  "10318#0": { expect: "17-oh progesterone", name: "17-OH progesterone" },
  // HEPATITIS C ANTI BODY
  "10329#0": { expect: "Hepatitis C anti body", name: "Hepatitis C antibody" },
  // GLYCOSYLATED HAEMOGLOBIN ( HBA1C % ) - HPLC
  "G2361#0": { expect: "Glycosylated haemoglobin (HbA1c %), HPLC", name: "Glycosylated haemoglobin (HbA1c), HPLC" },
  // CLOSTRIDIUM DIFFICILE TOXIN A
  "102107#0": { expect: "Clostridium difficile toxin A", name: "Clostridium difficile toxin A" },
  // CLOSTRIDIUM DIFFICILE TOXIN GDH-RAPID TEST
  "102140#0": { expect: "Clostridium difficile toxin gdh-rapid test", name: "Clostridium difficile toxin GDH, rapid test" },
  // CEA (CARCINO-EMBRYONIC ANTIGEN)
  "G2341#0": { expect: "CEA (carcino-embryonic antigen)", name: "CEA (carcinoembryonic antigen)" },
  // CPK (CREATININE PHOSPHOKINASE)
  "G2327#0": { expect: "CPK (creatinine phosphokinase)", name: "CPK (creatine phosphokinase)" },
  // DHEAS ( DEHYDROEPIANDROSTERONE SULPHATE )
  "10083#0": { expect: "DHEAS (dehydroepiandrosterone sulphate)", name: "DHEAS (dehydroepiandrosterone sulphate)" },
  // VITAMIN D LEVEL (1 25 HYDROXY)
  "102105#0": { expect: "Vitamin D level (1 25 hydroxy)", name: "Vitamin D level (1,25 hydroxy)" },
  // LDL-CHOLESTEROL (DIRECT)
  "10257#0": { expect: "LDL-cholesterol (direct)", name: "LDL cholesterol (direct)" },
  // BICARBONATES (BLOOD)
  "10217#0": { expect: "Bicarbonates (blood)", name: "Bicarbonate (blood)" },
  // VITAMIN B 12
  "10134#0": { expect: "Vitamin B 12", name: "Vitamin B12" },
  // Vitamin B12
  "10134#1": { expect: "Vitamin B12", name: "Vitamin B12" },
};
