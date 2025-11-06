import path from "path";

export const contactFormData = {
  subject: "Letter of Resignation",
  letter: `Dear Anamika],

I hope you are well. I am writing to formally resign from my position at XYG, effective 11th December.

I am grateful for the opportunities, guidance, and support I have received during my time here. It has been a pleasure working with you and the team.

Please let me know how I can help make the transition as smooth as possible.

Thank you again for everything.

Sincerely,
Dhiman]`,
  validFile: path.resolve(process.cwd(), "test-data/image-file/mew.txt"),
};
