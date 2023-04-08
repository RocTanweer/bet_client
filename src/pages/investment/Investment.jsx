import { useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";

import { FlexBox } from "@/layouts";
import { DateChooser } from "@/components";
import { investmentFormValSch } from "./lib/investmentYup.js";
import { useBusinessState, useInvestmentState } from "@/hooks/states.js";
import {
  addInvestment,
  getInvestments,
} from "@/state/actions/investmentActions.js";

function Investment() {
  const { state: businessState } = useBusinessState();
  const { state: investmentState, dispatch: investmentDispatch } =
    useInvestmentState();

  const {
    investmentAdd: { investmentAddLoading },
    investmentData: { investments },
  } = investmentState;

  const {
    businessDetails: { loginToken },
  } = businessState;

  useEffect(() => {
    async function getInvestmentDetails() {
      try {
        await getInvestments({ loginToken: loginToken }, investmentDispatch);
      } catch (error) {
        console.log(error);
      }
    }

    if (loginToken && investments.length === 0) {
      getInvestmentDetails();
    }

    return () => {
      console.log(investments.length === 0);
    };
  }, [investments, loginToken, getInvestments, investmentDispatch]);

  const formik = useFormik({
    initialValues: {
      investerName: "",
      amount: "",
      date: null,
      note: "",
    },
    validationSchema: investmentFormValSch,
    onSubmit: async (values) => {
      try {
        const data = {
          formData: values,
          loginToken: loginToken,
        };

        await addInvestment(data, investmentDispatch);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
      }}
    >
      <Box
        sx={{
          maxWidth: "730px",
          width: "100%",
          height: "auto",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5">Add Investment</Typography>
        </Box>

        <Box>
          <Stack gap={3} component={"form"} onSubmit={formik.handleSubmit}>
            <Box>
              <TextField
                label="Invester Name"
                type="text"
                name="investerName"
                id="investerName"
                fullWidth
                onChange={formik.handleChange}
                error={
                  formik.errors.investerName && formik.touched.investerName
                }
              />
              <FormHelperText
                error={
                  formik.errors.investerName && formik.touched.investerName
                }
              >
                {formik.errors.investerName &&
                  formik.touched.investerName &&
                  formik.errors.investerName}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
                label="Amount"
                type="number"
                name="amount"
                id="amount"
                fullWidth
                onChange={formik.handleChange}
                error={formik.errors.amount && formik.touched.amount}
              />
              <FormHelperText
                error={formik.errors.amount && formik.touched.amount}
              >
                {formik.errors.amount &&
                  formik.touched.amount &&
                  formik.errors.amount}
              </FormHelperText>
            </Box>

            <Box>
              <DateChooser
                label={"Date"}
                name={"date"}
                formik={formik}
                csx={{ width: "100%" }}
              />

              <FormHelperText error={formik.errors.date && formik.touched.date}>
                {formik.errors.date &&
                  formik.touched.date &&
                  formik.errors.date}
              </FormHelperText>
            </Box>

            <Box>
              <TextField
                label="Note"
                type="text"
                name="note"
                id="note"
                rows={3}
                fullWidth
                multiline
                onChange={formik.handleChange}
                error={formik.errors.note && formik.touched.note}
              />
              <FormHelperText error={formik.errors.note && formik.touched.note}>
                {formik.errors.note &&
                  formik.touched.note &&
                  formik.errors.note}
              </FormHelperText>
            </Box>
            <Button variant="contained" fullWidth type="submit">
              {investmentAddLoading ? (
                <>
                  <CircularProgress color="grey" size={24.5} />
                </>
              ) : (
                "Invest"
              )}
            </Button>
          </Stack>
        </Box>

        <Box></Box>
      </Box>
    </FlexBox>
  );
}

export default Investment;
