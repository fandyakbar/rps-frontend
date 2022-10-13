/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MDAlert from "components/MDAlert";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import logoUnand from "assets/images/logo-ct.png";

// Notif
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Basic() {
  // Errror Pesan
  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Login Gagal"
      content="Email atau Password Salah"
      dateTime="silahkan coba lagi"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState("");

  const pesan = localStorage.getItem("pesan");
  const pesans = localStorage.getItem("pesans");

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    await axios
      .post("http://127.0.0.1:8000/api/auth/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("expired", response.data.expires_in);
        console.log("result", response);

        navigate("/");
      })
      .catch((error) => {
        setValidation(error.response.data);
        toast.error(error.response.data.error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard");
    }

    if (pesan) {
      toast.warning("Sesi Anda Berakhir");
      localStorage.removeItem("pesan");
    }
    if (pesans) {
      toast.warning("Anda Telah Logout");
      localStorage.removeItem("pesans");
    }
  });

  const notify = () => toast.info("Mencoba Masuk");

  return (
    <BasicLayout image={bgImage}>
      <ToastContainer />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Grid container justifyContent="center">
            <img src={logoUnand} height={40} width={40} />
          </Grid>
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
          <form onSubmit={loginHandler} method="post">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" onClick={notify} color="info" fullWidth>
                Login
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center"></MDBox>
          </form>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
