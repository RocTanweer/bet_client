import * as Yup from "yup";

export const investmentFormValSch = Yup.object({
  investerName: Yup.string("Include the invester name").required(
    "This is required!"
  ),
  amount: Yup.number("Enter amount invested").required("This is required"),
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
  note: Yup.string("You may include a note"),
});
