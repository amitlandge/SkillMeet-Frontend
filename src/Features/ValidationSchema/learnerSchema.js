import commonProfileSchema from "./commenProfileShema.js";
import * as Yup from "yup";
export const learnerProfileSchema = Yup.object().shape({
  ...commonProfileSchema,

  learningGoals: Yup.string()
    .min(10, "Learning goals must be at least 10 characters")
    .required("Learning goals are required"),

  preferredSubjects: Yup.string()
    .min(2, "Please enter at least 2 characters")
    .required("Preferred subjects are required"),
});
