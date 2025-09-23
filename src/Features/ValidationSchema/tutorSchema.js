import commonProfileSchema from "./commenProfileShema";
import * as Yup from "yup";
export const tutorProfileSchema = Yup.object().shape({
  ...commonProfileSchema,

  bio: Yup.string()
    .min(20, "Bio must be at least 20 characters")
    .required("Bio is required"),

  skills: Yup.string()
    .min(3, "Please enter at least one skill")
    .required("Skills are required"),

  hourlyRate: Yup.number()
    .typeError("Hourly rate must be a number")
    .positive("Hourly rate must be positive")
    .required("Hourly rate is required"),

  availability: Yup.string()
    .min(5, "Please provide availability details")
    .required("Availability is required"),
});
