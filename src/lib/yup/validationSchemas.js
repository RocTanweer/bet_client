import * as Yup from "yup";

export const expenseFormValSch = Yup.object({
  expenseItem: Yup.string("Choose an expense item").required(
    "This is required!"
  ),
  amount: Yup.number("Enter amount invested").required("This is required"),
  payment: Yup.string("Choose payment method").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
  receiptImg: Yup.mixed()
    .test(
      "fileSize",
      "File too large",
      (value) => value === null || value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported file type",
      (value) => value === null || SUPPORTED_FORMATS.includes(value.type)
    )
    .notRequired(),
});

export const revenueFormValSch = Yup.object({
  revenueItem: Yup.string("Choose a revenue item").required("This is required"),
  unit: Yup.number("Enter number of units sold").required("This is required"),
  amount: Yup.number("Enter revenue amount").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
});

export const historyFormValSch = Yup.object({
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
});

export const loginFormValSch = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerFormValSch = Yup.object({
  name: Yup.string().required("Name is required").min(3).max(15),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  isAgreed: Yup.boolean().oneOf([true], "Please agree before continuing"),
});

export const profileDetailsEditFormValSch = Yup.object({
  profilePic: Yup.mixed().notRequired(),
  name: Yup.string().required("Name is required").min(3).max(15),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string(),
});
