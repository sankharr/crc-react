import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid,
  Input,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertTitle } from "@mui/material";

const URL = "http://localhost:5000/reservations";

const CompletetionAlert = (props) => {

  if (props.isError) {
    return (
      <Container sx={{ width: "40rem" }}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Reservation Creation Failed!
        </Alert>
      </Container>
    );
  } else {
    return (
      <Container sx={{ width: "40rem" }}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Reservation Creation Successfull!
        </Alert>
      </Container>
    );
  }
};

const CreateReservation = (props) => {
  const [submitCompleted, setSubmitCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const CreateReservationForm = (props) => {

    const submitValues = (formObject) => {
      // preventDefault();

      var endDate = new Date(formObject.startDate);
      endDate.setDate(endDate.getDate() + Number(formObject.days) - 1);
      endDate = new Date(endDate).toISOString().split("T")[0];

      const dataObject = {
        itemName: formObject.itemName,
        startDate: formObject.startDate,
        endDate: endDate,
        days: formObject.days,
        amount: formObject.amount,
        quantity: formObject.quantity,
        customerName: formObject.customerName,
        eventColor: formObject.eventColor,
        lastUpdatedDate: new Date(),
        status: "Active",
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
            itemName: "",
            startDate: "",
            days: "",
            amount: "",
            quantity: "",
            customerName: "",
            eventColor: "LightSeaGreen",
          }}
          validationSchema={Yup.object({
            itemName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            startDate: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            days: Yup.number()
              .min(1, "Must be equal or greater than 1")
              .required("Required"),
            amount: Yup.number()
              .min(1, "Must be equal or greater than 1")
              .required("Required"),
            quantity: Yup.number()
              .min(1, "Must be equal or greater than 1")
              .required("Required"),
            customerName: Yup.string().required("Required"),
            eventColor: Yup.string(),
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
                    Create Reservation
                  </Typography>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="itemName"
                    type="text"
                    label="Item Name"
                    error={
                      formik.touched.itemName && formik.errors.itemName
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.itemName && formik.errors.itemName
                        ? formik.errors.itemName
                        : null
                    }
                    {...formik.getFieldProps("itemName")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="customerName"
                    type="text"
                    label="Customer Name"
                    error={
                      formik.touched.customerName && formik.errors.customerName
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.customerName && formik.errors.customerName
                        ? formik.errors.customerName
                        : null
                    }
                    {...formik.getFieldProps("customerName")}
                    // onChange={()=>console.log("formik => ",formik)}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="startDate"
                    // type={formik.values.startDate != "" ? "date" : "text"}
                    type="date"
                    label="Reservation Start Date"
                    InputLabelProps={{ shrink: true }}
                    error={
                      formik.touched.startDate && formik.errors.startDate
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                        ? formik.errors.startDate
                        : null
                    }
                    {...formik.getFieldProps("startDate")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="days"
                    type="number"
                    label="Number of Days"
                    error={
                      formik.touched.days && formik.errors.days ? true : false
                    }
                    helperText={
                      formik.touched.days && formik.errors.days
                        ? formik.errors.days
                        : null
                    }
                    {...formik.getFieldProps("days")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="quantity"
                    type="number"
                    label="Quantity"
                    error={
                      formik.touched.quantity && formik.errors.quantity
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                        ? formik.errors.quantity
                        : null
                    }
                    {...formik.getFieldProps("quantity")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="eventColor"
                    type="text"
                    label="Event Colour"
                    error={
                      formik.touched.eventColor && formik.errors.eventColor
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.eventColor && formik.errors.eventColor
                        ? formik.errors.eventColor
                        : null
                    }
                    {...formik.getFieldProps("eventColor")}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    id="amount"
                    type="number"
                    label="Amount"
                    error={
                      formik.touched.amount && formik.errors.amount
                        ? true
                        : false
                    }
                    helperText={
                      formik.touched.amount && formik.errors.amount
                        ? formik.errors.amount
                        : null
                    }
                    {...formik.getFieldProps("amount")}
                  />
                </Grid>
                <Grid item md={6} xs={12}></Grid>
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
            onClick={() => navigate("/currentReservations")}
          >
            Back
          </Button>
        </Grid>
        
        {/* <CreateReservationForm /> */}
      </Grid>
      {submitCompleted ? (isError ? <CompletetionAlert isError={true} /> : <CompletetionAlert isError={false} />) : <CreateReservationForm />}
    </>
  );
};

export default CreateReservation;
