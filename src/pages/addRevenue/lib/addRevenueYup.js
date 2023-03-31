import * as Yup from "yup";

export const revenueFormValSch = Yup.object({
  revenueItem: Yup.string("Choose a revenue item").required("This is required"),
  unit: Yup.number("Enter number of units sold").required("This is required"),
  amount: Yup.number("Enter revenue amount").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
});
