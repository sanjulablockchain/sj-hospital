import type { Myth } from "../types";

/**
 * The questions our clinicians answer most often, answered the way they answer
 * them in the room: no, usually not, and here is why.
 */
export const myths: Myth[] = [
  {
    q: "Should I take antibiotics for a fever?",
    a: "Usually not. Most fevers here are viral, and antibiotics do nothing against a virus while still disturbing your gut and building resistance. Our doctors deliberately prescribe them only when there is a reason to believe the infection is bacterial, and they will explain why either way.",
  },
  {
    q: "Is a saline drip better than drinking fluids?",
    a: "Not if you can drink. Oral fluids are absorbed perfectly well and carry no risk of infection at a needle site. A drip is genuinely useful when someone is vomiting, cannot keep fluids down, or is severely dehydrated. It is not a general tonic.",
  },
  {
    q: "Do I need a full body scan to be sure nothing is wrong?",
    a: "No, and it can do harm. Scanning a person without symptoms turns up harmless findings that lead to more scans, more anxiety and occasionally unnecessary procedures. Structured screening based on your age and history is more useful and much cheaper.",
  },
  {
    q: "Can I stop my blood pressure tablets once the reading is normal?",
    a: "The normal reading is the medicine working, not the problem going away. Stopping usually sends the pressure back up within weeks, often without you feeling it. If you want to reduce the dose, that is a conversation with your doctor, ideally alongside weight and salt changes.",
  },
  {
    q: "Is diabetes caused by eating too much sugar?",
    a: "Sugar is part of it, but type 2 diabetes is mostly about total calories, body weight, physical activity and genetics, and South Asians develop it at lower body weights than Europeans. Cutting sweets alone while eating large rice portions daily will not be enough.",
  },
  {
    q: "Are herbal and ayurvedic medicines safe to take alongside my tablets?",
    a: "Some are, some interact badly, and some are hard on the liver or kidneys in ways that do not show until damage is done. The important thing is to tell your doctor and pharmacist exactly what you are taking, without embarrassment, so interactions can be checked.",
  },
  {
    q: "Should I worry about a slightly abnormal test result?",
    a: "Often not. Laboratory reference ranges are set so that a small proportion of healthy people fall outside them, and a single borderline value in isolation usually means nothing. What matters is the trend, the context, and whether it fits your symptoms.",
  },
  {
    q: "Is coconut oil good or bad for the heart?",
    a: "It is high in saturated fat and raises LDL cholesterol, so the claims that it protects the heart are not supported. Used moderately as part of a diet with plenty of vegetables, fish and less fried food, it is not the main problem either. Total pattern beats any single ingredient.",
  },
];
