import emailValidator from "email-validator";

export const isValidEmail = (email) => {
  return emailValidator.validate(email) || false;
};
