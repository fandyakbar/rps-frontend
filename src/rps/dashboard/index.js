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

import "bootstrap/dist/css/bootstrap.min.css";

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

// Notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

function cekNilai(persens) {
  if (persens != 0) {
    return persens + " %";
  } else {
    return "";
  }
}

function cekIndeks(idnilai, idassess, nilainya) {
  if (idnilai == idassess) {
    return <DataTableBodyCell align="center">{cekNilai(nilainya)}</DataTableBodyCell>;
  } else {
    return "";
  }
}

function ShowRubrikDashboard(props) {
  // cpmk
  const [rubriks, setRubriks] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_course = props.router.params.id;

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/dashboard/${id_course}`)

      .then((response) => {
        setRubriks(response.data);
      });
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
  }, []);

  console.warn("di sini cek", rubriks);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Edit Rubrik
  const [nilai, setNilai] = useState(0);
  const [idcpmks, setIdcpmks] = useState(0);
  const [idass, setIdass] = useState(0);

  const [validation, setValidation] = useState("");

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      {rubriks.map((datas) => (
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3}>
              <Grid item xs={12}>
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
                    <div>
                      {datas.matkul.map((mk) => (
                        <MDBox>
                          <MDTypography variant="h6" color="white">
                            Rubrik {mk.name}
                            <MDBox px={4} align="right"></MDBox>
                          </MDTypography>
                        </MDBox>
                      ))}
                    </div>
                  </MDBox>

                  {/* Tabel Mulai */}
                  <TableContainer>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                      <Table size="small">
                        <TableRow>
                          <MDBox component="th" align="center">
                            <MDTypography variant="h6">CPMK \ Assessment </MDTypography>
                          </MDBox>

                          {datas.assessment.map((jenis) => (
                            <DataTableHeadCell align="center">{jenis.name}</DataTableHeadCell>
                          ))}
                          <DataTableHeadCell>
                            <MDBox
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                              flexWrap="wrap"
                              color="text"
                              fontSize={size.sm}
                              px={1.5}
                            >
                              Total
                            </MDBox>
                          </DataTableHeadCell>
                        </TableRow>
                        <TableBody>
                          {datas.cpmk.map((cpk, indeks) => (
                            <TableRow>
                              <DataTableBodyCell>
                                <MDBox
                                  display="inline-block"
                                  width="20em"
                                  color="text"
                                  fontSize={size.sm}
                                  px={1.5}
                                >
                                  {cpk.name}
                                </MDBox>
                              </DataTableBodyCell>
                              {datas.nilai.map((nil) =>
                                cekIndeks(nil.course_lo_id, cpk.cpmk_id, nil.precentage)
                              )}
                              <DataTableBodyCell align="center">
                                <MDTypography variant="h6">
                                  {cekNilai(datas.totalcpmk[indeks])}
                                </MDTypography>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <DataTableBodyCell>
                              <MDTypography variant="h6">Total</MDTypography>
                            </DataTableBodyCell>
                            {datas.totalAsses.map((totalAssess) => (
                              <DataTableBodyCell align="center">
                                <MDTypography variant="h6">{cekNilai(totalAssess)}</MDTypography>
                              </DataTableBodyCell>
                            ))}
                          </TableRow>
                        </TableBody>
                      </Table>
                    </MDBox>
                  </TableContainer>
                  {/* Tabel Selesai */}
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      ))}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowRubrikDashboard);
