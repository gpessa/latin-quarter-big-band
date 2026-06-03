import * as yup from "yup";
import type { ValidationMessages } from "./validationMessages";

export type BookUsFormData = {
  email: string;
  name: string;
  phone?: string;
  message: string;
};

export type JoinTheBandFormData = {
  email: string;
  name: string;
  phone?: string;
  message?: string;
  position: string;
};

export function createBookUsSchema(messages: ValidationMessages) {
  return yup
    .object({
      email: yup
        .string()
        .email(messages.invalidEmail)
        .required(messages.emailRequired),
      name: yup
        .string()
        .min(2, messages.nameTooShort)
        .required(messages.nameRequired),
      phone: yup.string().min(2, messages.phoneTooShort).optional(),
      message: yup
        .string()
        .min(10, messages.messageTooShort)
        .required(messages.messageRequired),
    })
    .required();
}

export function createJoinTheBandSchema(messages: ValidationMessages) {
  return yup
    .object({
      email: yup
        .string()
        .email(messages.invalidEmail)
        .required(messages.emailRequired),
      name: yup
        .string()
        .min(2, messages.nameTooShort)
        .required(messages.nameRequired),
      phone: yup.string().min(2, messages.phoneTooShort).optional(),
      message: yup.string(),
      position: yup.string().required(messages.positionRequired),
    })
    .required();
}
