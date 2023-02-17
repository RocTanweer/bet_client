import * as Yup from "yup";

const FILE_SIZE = 262144000;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const investmentFormValSch = Yup.object({
  investmentItem: Yup.string("Choose an investment item").required(
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

export const saleFormValSch = Yup.object({
  saleItem: Yup.string("Choose a sale item").required("This is required"),
  unit: Yup.number("Enter number of units sold").required("This is required"),
  amount: Yup.number("Enter sale amount").required("This is required"),
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
