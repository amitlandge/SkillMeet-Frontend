import * as Yup from "yup";

const commonProfileSchema = {
  fullName: Yup.string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),

  profilePic: Yup.string().url("Must be a valid URL").nullable(),
};

export default commonProfileSchema;
