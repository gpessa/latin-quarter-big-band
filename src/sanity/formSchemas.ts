import * as yup from "yup";

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

export const bookUsSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().min(2, "Name too short").required("Name is required"),
    phone: yup.string().min(2, "Phone too short").optional(),
    message: yup
      .string()
      .min(10, "Message too short")
      .required("Message is required"),
  })
  .required();

export const joinTheBandSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    name: yup.string().min(2, "Name too short").required("Name is required"),
    phone: yup.string().min(2, "Phone too short").optional(),
    message: yup.string(),
    position: yup.string().required("Position is required"),
  })
  .required();
