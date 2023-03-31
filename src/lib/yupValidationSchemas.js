import * as Yup from "yup";

export const historyFormValSch = Yup.object({
  date: Yup.date()
    .nullable()
    .typeError("date is required")
    .required("Date is required"),
});
