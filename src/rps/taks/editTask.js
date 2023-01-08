import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Material Dashboard 2 React contexts
import { useMaterialUIController, setDirection } from "context";

// Tabel React
// import Table from 'react-bootstrap/Table';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import typography from "assets/theme/base/typography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import axios from "axios";

// loader
import { PacmanLoader } from "react-spinners";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function EditTask(props) {
  // Loader
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4bace9");

  const [idrps, setIdrps] = useState([]);

  // Task
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState("");
  const [output, setOutput] = useState("");
  const [member, setMember] = useState(0);

  const { size } = typography;

  const id_task = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/task/show/${id_task}`)

      .then((response) => {
        setName(response.data.name);
        setTheme(response.data.theme);
        setDescription(response.data.description);
        setStep(response.data.step);
        setOutput(response.data.output);
        setMember(response.data.member);
        setIdrps(response.data.course_plan_id);
      });
    setLoading(false);
  };

  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const [validation, setValidation] = useState("");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
  }, []);

  const navigate = useNavigate();

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("theme", theme);
    formData.append("description", description);
    formData.append("step", step);
    formData.append("output", output);
    formData.append("member", member);

    await axios
      .post(`http://127.0.0.1:8000/api/task/show/${id_task}`, formData)
      .then((response) => {
        console.log("result", response);
        navigate(`/task/${idrps}`);
      })
      .catch((error) => {
        setValidation(error.response.data);
      });
  };

  return (
    <DashboardLayout>
      {(() => {
        if (user.type === "M") {
          navigate("/");
        }
      })()}
      <DashboardNavbar />
      {loading ? (
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <PacmanLoader color={color} loading={loading} size={25} />
        </MDBox>
      ) : (
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                {/* Isinya Tarok Di sini */}
                <Card>
                  <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                  >
                    <MDBox>
                      <MDTypography variant="h6" color="white">
                        Edit Penugasan
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox pt={4} pb={3} px={3}>
                    <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                    <form method="post" onSubmit={updateHandler}>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="name"
                          fullWidth
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="theme"
                          fullWidth
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                        />
                      </MDBox>
                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          multiline
                          rows={8}
                          label="Deskripsi"
                          fullWidth
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          multiline
                          rows={20}
                          label="Langkah"
                          fullWidth
                          value={step}
                          onChange={(e) => setStep(e.target.value)}
                        />
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          type="text"
                          label="Output"
                          fullWidth
                          value={output}
                          onChange={(e) => setOutput(e.target.value)}
                        />
                      </MDBox>

                      <MDBox mb={2}>
                        <MDInput
                          type="number"
                          label="Jumlah Anggota"
                          fullWidth
                          value={member}
                          onChange={(e) => setMember(e.target.value)}
                        />
                      </MDBox>

                      <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                      <MDBox mt={4} mb={1}>
                        <MDButton type="submit" variant="gradient" color="info">
                          Submit
                        </MDButton>
                      </MDBox>
                      <MDBox mt={3} mb={1} textAlign="center"></MDBox>
                    </form>
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(EditTask);
