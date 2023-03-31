import * as Yup from "yup";

export const profileDetailsEditFormValSch = Yup.object({
  profilePic: Yup.mixed().notRequired(),
  name: Yup.string().required("Name is required").min(3).max(15),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string(),
});
