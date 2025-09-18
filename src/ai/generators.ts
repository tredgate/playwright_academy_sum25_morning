// generators.ts
// src/ai

function generatePassword(length: number = 12): string {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

function generateFirstName(sex?: "male" | "female"): string {
  const maleNames = ["John", "Robert", "Michael", "William", "David"];
  const femaleNames = ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth"];
  if (sex === "female") {
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  }
  return maleNames[Math.floor(Math.random() * maleNames.length)];
}

/**
 * Generates a random last name based on the specified sex.
 *
 * @param sex - Optional. The sex for which to generate the last name.
 *              If "female", selects from a list of female surnames;
 *              otherwise, selects from a list of male surnames.
 * @returns A randomly selected last name as a string.
 *
 * @example
 * ```typescript
 * console.log(generateLastName("male"));   // e.g., "Smith"
 * console.log(generateLastName("female")); // e.g., "Taylor"
 * console.log(generateLastName());         // e.g., "Johnson"
 * ```
 */
function generateLastName(sex?: "male" | "female"): string {
  const maleSurnames = ["Smith", "Johnson", "Williams", "Jones", "Brown"];
  const femaleSurnames = ["Taylor", "Anderson", "Thomas", "Jackson", "White"];
  if (sex === "female") {
    return femaleSurnames[Math.floor(Math.random() * femaleSurnames.length)];
  }
  return maleSurnames[Math.floor(Math.random() * maleSurnames.length)];
}

const lastName = generateLastName("male");
console.log(`Generated Last Name: ${lastName}`);

const password = generatePassword(16);
console.log(`Generated Password: ${password}`);

const firstName = generateFirstName("female");
console.log(`Generated First Name: ${firstName}`);
