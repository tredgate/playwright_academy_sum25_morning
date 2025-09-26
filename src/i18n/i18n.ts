import { csTexts } from "./languages/cs_texts.ts";
import { enTexts } from "./languages/en_texts.ts";

export type Dictionary = {
  login: {
    usernamePlaceholder: string;
    passwordPlaceholder: string;
    title: string;
  };
};

export function getTexts(): Dictionary {
  const language = process.env.TEST_LANGUAGE || "en";
  let texts: Dictionary;
  switch (language) {
    case "cs":
      texts = csTexts;
      break;
    case "en":
      texts = enTexts;
      break;
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
  return texts;
}
