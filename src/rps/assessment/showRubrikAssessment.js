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

//icon
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

// Link
import { Link } from "react-router-dom";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

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
import data from "layouts/tables/data/authorsTableData";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function ShowRubrikAssessment(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [cpmk, setCpmk] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [inferior, setInferior] = useState([]);
  const [average, setAverage] = useState([]);
  const [good, setGood] = useState([]);
  const [Excellent, setExcellent] = useState([]);

  const [idAssessment, setIdAssessment] = useState([]);

  const { size } = typography;

  const [validation, setValidation] = useState("");

  const [cpmkArray, setCpmkArray] = useState({
    cpmkid: [],
  });

  console.log("tescpmknya", cpmkArray.cpmkid);

  const id_detail = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/show/${id_detail}`)

      .then((response) => {
        setCriteria(response.data.criteria);
        setInferior(response.data.inferior);
        setAverage(response.data.average);
        setGood(response.data.good);
        setExcellent(response.data.Excellent);
        setIdAssessment(response.data.course_plan_assessment_id);
        fetchDatas(response.data.course_plan_assessment_id);
      });
  };

  const fetchDatass = async () => {
    const { cpmkid } = cpmkArray;
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/shows/${id_detail}`)

      .then((response) => {
        setCpmkArray({
          cpmkid: response.data,
        });
      });
  };

  const fetchDatas = async (idcepat) => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessment/${idcepat}`)

      .then((response) => {
        setCpmk(response.data);
      });
  };

  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };
  useEffect(() => {
    fetchDataUser();
    fetchData();
    fetchDatass();
    fetchDatas(idAssessment);
  }, []);

  const navigate = useNavigate();

  function ischecked(idcpmk, indeksss) {
    for (let index = 0; index < cpmkArray.cpmkid.length; index++) {
      if (idcpmk == cpmkArray.cpmkid[index]) {
        return true;
        break;
      }
    }

    return false;
  }

  const updateHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("criteria", criteria);
    formData.append("inferior", inferior);
    formData.append("average", average);
    formData.append("good", good);
    formData.append("Excellent", Excellent);

    cpmkArray.cpmkid.map((listcpmk, indess) => {
      formData.append(`listcpmk[${indess}]`, listcpmk);
    });

    await axios
      .post(`http://127.0.0.1:8000/api/rubrikassessment/show/${id_detail}`, formData)
      .then((response) => {
        console.log("result", response);
        navigate(`/rubrikassessment/${idAssessment}`);
      })
      .catch((error) => {
        setValidation(error.response.data);
        console.warn("response eror", error.response.data);
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
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={6}>
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
                      Edit Kriteria
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox display="flex" alignItems="center" ml={-1}></MDBox>
                  <form method="post" onSubmit={updateHandler}>
                    <MDBox mb={2}>
                      <MDInput
                        type="text"
                        label="Kriteria"
                        value={criteria}
                        onChange={(e) => setCriteria(e.target.value)}
                      />
                    </MDBox>

                    {cpmk.map((datas) => (
                      <MDBox>
                        {datas.cpmk.map((inputcpmk, indeknya) => (
                          <TableRow>
                            <TableCell>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="Checkbox"
                                  value={inputcpmk.cpmk_id}
                                  defaultChecked={ischecked(inputcpmk.cpmk_id, indeknya)}
                                  onChange={(e) => {
                                    const { cpmkid } = cpmkArray;
                                    if (e.target.checked) {
                                      setCpmkArray({
                                        cpmkid: [...cpmkid, inputcpmk.cpmk_id],
                                      });
                                    } else {
                                      setCpmkArray({
                                        cpmkid: cpmkid.filter((e) => e !== inputcpmk.cpmk_id),
                                      });
                                    }
                                  }}
                                  fullWidth
                                />
                                ({inputcpmk.code}) {inputcpmk.name}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </MDBox>
                    ))}

                    <MDBox display="flex" alignItems="center" ml={-1}></MDBox>

                    <MDBox mt={4} mb={1}>
                      <MDButton type="submit" variant="gradient" color="info">
                        submit
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
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowRubrikAssessment);
