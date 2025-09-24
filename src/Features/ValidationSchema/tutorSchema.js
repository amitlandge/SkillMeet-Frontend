import commonProfileSchema from "./commenProfileShema";
import * as Yup from "yup";
const isEndTimeAfterStart = (start, end) => {
  if (!start || !end) return false;
  return new Date(end).getTime() > new Date(start).getTime();
};

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

  availabilityDays: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one day for availability"),

  availabilityStart: Yup.date().nullable().required("Start time is required"),

  availabilityEnd: Yup.date()
    .nullable()
    .required("End time is required")
    .test(
      "is-greater",
      "End time must be later than start time",
      function (value) {
        const { availabilityStart } = this.parent;
        return isEndTimeAfterStart(availabilityStart, value);
      }
    ),
});
