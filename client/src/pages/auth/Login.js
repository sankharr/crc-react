import { Link as RouterLink, useParams } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Card, Link, Container, Typography } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
// sections
import LoginForm from "./LoginForm";
import LoginSideImage from "../../assets/login_bg.jpeg";
import "./AuthStyles.css";
import { CompanyName } from "../../shared/Variables";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Fade from "@mui/material/Fade";
import { useState } from "react";
// import AuthSocial from '../sections/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  let { message } = useParams();
  const [alertVisibility, setAlertVisibility] = useState(message);

  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />

          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {""}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <div className="sidePictureLogin">
              <Typography variant="h4" sx={{ px: 5, mt: 15, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
            </div>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Fade
              in={alertVisibility === "registrationSuccess"}
              timeout={{ enter: 1000, exit: 1000 }}
              addEndListener={() => {
                setTimeout(() => {
                  setAlertVisibility("done")
                }, 2000);
              }}
            >
              <Alert severity="success" variant="standard" className="alert">
                <AlertTitle>Success</AlertTitle>
                Registration Successful!
              </Alert>
            </Fade>
            {/* {message === "registrationSuccess" && (
              <Alert severity="success" variant="standard" className="alert">
                <AlertTitle>Success</AlertTitle>
                Registration Successful!
              </Alert>
            )} */}

            <Typography variant="h4" gutterBottom>
              Sign in to {CompanyName}
            </Typography>

            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Enter your details below.
            </Typography>

            {/* <AuthSocial /> */}

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
