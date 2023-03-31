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
