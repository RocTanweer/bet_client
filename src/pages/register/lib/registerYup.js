import * as Yup from "yup";

export const registerFormValSch = Yup.object({
  name: Yup.string().required("Name is required").min(3).max(15),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  isAgreed: Yup.boolean().oneOf([true], "Please agree before continuing"),
});
