import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { BrowserRouter as useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

const URL = "http://localhost:5000/devices";

const CompletetionAlert = (props) => {

  if (props.isError) {
    return (
      <Container sx={{ width: "40rem" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Device Creation Failed!
        </Alert>
      </Container>
    );
  } else {
    return (
      <Container sx={{ width: "40rem" }}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Device Creation Successful!
        </Alert>
      </Container>
    );
  }
};

const AddDevice = (props) => {
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  // const navigateDevice = useNavigate();

  const AddDeviceForm = (props) => {

    const submitValues = (formObject) => {

      const dataObject = {
        itemName: formObject.deviceName,
        price: formObject.price,
        totalQuantity: formObject.totalQuantity,
        lastUpdatedDate: new Date(),
      };
      console.log("dataObject => ", dataObject);
      // axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)

      axios
        .post(URL, dataObject)
        .then((res) => {
          console.log(res.data);
          console.log("Reservation successfully updated");
          setSubmitCompleted(true);
          setIsError(false)
          console.log("is error state (then) => ",isError)
        })
        .catch((error) => {
          console.log(error);
          setSubmitCompleted(true);
          setIsError(true)
          console.log("is error state (catch) => ",isError)
        });

      // Redirect to Student List
      // navigate("/currentReservations");
    };

    return (
      <Container sx={{ width: "40rem" }}>
        <Formik
          initialValues={{
            deviceName: "",
            price: "",
            totalQuantity: ""
          }}
          validationSchema={Yup.object({
            deviceName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            price: Yup.number()
              .min(1, "Must be equal or greater than 1")
              .required("Required"),
            totalQuantity: Yup.number()
              .min(1, "Must be equal or greater than 1")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            submitValues(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{ fontWeight: "500" }}
                  >
                    Add Device
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="deviceName"
                    type="text"
                    label="Item Name"
                    error={
                      formik.touched.deviceName && formik.errors.deviceName
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.deviceName && formik.errors.deviceName
                        ? formik.errors.deviceName
                        : null
                    }
                    {...formik.getFieldProps("deviceName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="price"
                    type="text"
                    label="Price"
                    error={
                      formik.touched.price && formik.errors.price
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.price && formik.errors.price
                        ? formik.errors.price
                        : null
                    }
                    {...formik.getFieldProps("price")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="totalQuantity"
                    type="number"
                    label="Total Quantity"
                    error={
                      formik.touched.totalQuantity && formik.errors.totalQuantity ? true : false
                    }
                    helperText={
                      formik.touched.totalQuantity && formik.errors.totalQuantity
                        ? formik.errors.totalQuantity
                        : null
                    }
                    {...formik.getFieldProps("days")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => formik.resetForm()}
                  >
                    Reset
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Container>
    );
  };

  return (
    <>
      <Grid container spacing={1} className="mt-2 mb-4">
        <Grid item xs={3}>
          <Button
            variant="text"
            startIcon={<ArrowBack />}
            // onClick={() => navigateDevice("/deviceBrowser")}
          >
            Back
          </Button>
        </Grid>
        
        {/* <CreateReservationForm /> */}
      </Grid>
      {submitCompleted ? (isError ? <CompletetionAlert isError={true} /> : <CompletetionAlert isError={false} />) : <AddDeviceForm />}
    </>
  );
};

export default AddDevice;
