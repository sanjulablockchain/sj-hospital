import type { Warning, WarningLevel } from "../types";

/**
 * The four escalation levels, most urgent first. `warnings` below is sorted by
 * this order, so the list reads top down from "tonight" to "whenever suits
 * you" without the component having to sort anything.
 */
export const WARNING_LEVELS = ["Come in now", "Same day", "This week", "Book routinely"] as const;

/**
 * How each level is painted. Only the top level gets the solid accent badge:
 * if every row shouted, none of them would.
 */
export const LEVEL_TONE: Record<WarningLevel, "hot" | "warm" | "cool"> = {
  "Come in now": "hot",
  "Same day": "warm",
  "This week": "cool",
  "Book routinely": "cool",
};

export const warnings: Warning[] = [
  {
    level: "Come in now",
    symptom: "Chest pressure spreading to jaw, arm or back",
    advice:
      "Treat this as a heart attack until proved otherwise, especially with sweating, nausea or breathlessness. Call 0117 84 84 84 for the ambulance rather than driving yourself. If a doctor has already told you to keep aspirin for exactly this situation, take it as they instructed; otherwise wait for the crew rather than taking anything on your own. Minutes change the outcome.",
  },
  {
    level: "Come in now",
    symptom: "Any fever in a baby under three months",
    advice:
      "A newborn's immune system gives very little warning before an infection becomes serious, and a mild looking fever can be the only sign. Do not wait for the morning clinic and do not give paracetamol and hope. Bring the baby to the emergency unit.",
  },
  {
    level: "Come in now",
    symptom: "Bleeding gums, black stools or vomiting blood during a fever",
    advice:
      "In a dengue fever these are warning signs that plasma is leaking and platelets have fallen. This is the point at which admission and fluid management change the outcome. Come straight in, at any hour.",
  },
  {
    level: "Come in now",
    symptom: "Sudden weakness on one side, slurred speech or a drooping face",
    advice:
      "This is a stroke. The treatments that work have a narrow window measured in hours from the moment symptoms started, so note the time and come immediately. Do not lie down and wait to see if it passes.",
  },
  {
    level: "Same day",
    symptom: "Fever that is still there on day three",
    advice:
      "Most viral fevers are settling by day three. One that is not, particularly in dengue season, needs a full blood count to check platelets and haematocrit. A same day OPD visit is enough; you do not need the emergency unit unless there are warning signs.",
  },
  {
    level: "Same day",
    symptom: "A child who is drowsy, floppy, or not drinking",
    advice:
      "With children, behaviour tells you more than the thermometer. A child who will not drink, has fewer wet nappies, cries without tears, or is unusually difficult to wake needs to be seen today rather than tomorrow.",
  },
  {
    level: "Same day",
    symptom: "Burning urine with fever or back pain",
    advice:
      "A simple bladder infection is uncomfortable but not urgent. Once there is fever or pain in the flank, the infection may have reached the kidney, which needs a urine culture and proper antibiotics rather than a guess.",
  },
  {
    level: "This week",
    symptom: "A cough that has lasted more than two weeks",
    advice:
      "Most coughs after a viral illness settle inside a fortnight. Beyond that, especially with weight loss, night sweats or blood in the sputum, it needs a chest X-ray. In Sri Lanka tuberculosis remains common enough to rule out properly.",
  },
  {
    level: "This week",
    symptom: "A lump anywhere that is new, hard or growing",
    advice:
      "Most lumps turn out to be harmless, and the ones that are not are far more treatable early. Book a consultation this week rather than watching it for months. An ultrasound at the same visit usually settles the question.",
  },
  {
    level: "This week",
    symptom: "A change in bowel habit lasting more than a few weeks",
    advice:
      "Persistent constipation, looser stools, or blood needs looking at, particularly over forty. It is usually something benign like piles, but the assessment that confirms this is straightforward and worth doing.",
  },
  {
    level: "Book routinely",
    symptom: "You feel fine but have not had a check in years",
    advice:
      "This is exactly the right time to come. Blood pressure, blood sugar and a lipid profile are cheap, quick and catch the conditions that cause the most harm precisely because they have no symptoms. A structured health check takes one morning.",
  },
];
