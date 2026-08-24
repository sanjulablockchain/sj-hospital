import type { EmergencyNumber, FirstAidStep } from "../types";

/**
 * The four things worth knowing before help arrives. Each card prints
 * "Never: " ahead of `avoid`, so `avoid` is written to follow that label and
 * never repeats it.
 */
export const firstAidSteps: FirstAidStep[] = [
  {
    kind: "Burns",
    title: "Cool water, twenty minutes",
    action:
      "Hold the burn under cool running water for a full twenty minutes, then cover loosely with cling film or a clean cloth. Come in for anything larger than a palm, or any burn on the face, hands or across a joint.",
    avoid: "ice, toothpaste, butter, or breaking blisters",
  },
  {
    kind: "Choking",
    title: "Five back blows, five thrusts",
    action:
      "If they cannot cough or speak, lean them forward and give five firm blows between the shoulder blades, then five abdominal thrusts. Alternate, and have someone call the ambulance while you continue.",
    avoid: "reach blindly into the mouth to fish it out",
  },
  {
    kind: "Bleeding",
    title: "Press hard, keep pressing",
    action:
      "Press firmly on the wound with a clean cloth and hold it, raising the limb above the heart if you can. Ten uninterrupted minutes of pressure stops most bleeding.",
    avoid: "lift the cloth every minute to look",
  },
  {
    kind: "Snake bite",
    title: "Still, low, and straight to hospital",
    action:
      "Keep the person calm and as still as possible, keep the bitten limb below heart level, remove rings and tight clothing, and bring them in immediately. Note the time of the bite.",
    avoid: "cut, suck, apply a tourniquet, or chase the snake",
  },
];

/** A home kit that covers the four steps above and the ordinary weeks between. */
export const homeKit = [
  "Digital thermometer",
  "Paracetamol, adult and syrup",
  "Oral rehydration sachets",
  "Sterile gauze and tape",
  "Crepe bandage",
  "Antiseptic solution",
  "Plasters, assorted",
  "Blunt scissors and tweezers",
  "Disposable gloves",
  "Your medicine list, printed",
  "Torch",
];

/**
 * Only our own two lines carry a `tel`, so the page never puts a one-tap dial
 * on a national service; those two are printed for the reader to save.
 */
export const emergencyNumbers: EmergencyNumber[] = [
  { label: "Hospital & ambulance", number: "0117 84 84 84", tel: "+94117848484" },
  { label: "Pharmacy, 24 hours", number: "074 222 333 4", tel: "+94742223334" },
  { label: "National ambulance", number: "1990" },
  { label: "National Poisons Centre", number: "011 268 6143" },
];
