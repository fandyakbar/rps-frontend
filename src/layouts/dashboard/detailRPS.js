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

function DetailRPS(props) {
  // console.warn("props", props.router.params.id);

  // cpmk
  const [datarps, setDatarps] = useState([]);

  const { size } = typography;
  // const token = localStorage.getItem('token');
  const id_course = props.router.params.id;

  const fetchData = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/myrps/${id_course}`)

      .then((response) => {
        setDatarps(response.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.warn("di sini cek", datarps);

  return (
    <DashboardLayout>
      <DashboardNavbar />
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
                  {datarps.map((datas) => (
                    <div>
                      {datas.matkul.map((mk) => (
                        <MDBox>
                          <MDTypography variant="h6" color="white">
                            {mk.name}
                          </MDTypography>
                        </MDBox>
                      ))}
                    </div>
                  ))}
                </MDBox>

                {/* Tabel Mulai */}

                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Table size="small">
                      <TableRow>
                        <MDBox align="right" component="td">
                          {" "}
                          Semester
                        </MDBox>
                        <MDBox component="td"> Semester</MDBox>
                      </TableRow>
                      <MDTypography variant="h5">Daftar CPMK</MDTypography>
                      <TableRow>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Kode </MDTypography>
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Kriteria </MDTypography>
                        </DataTableHeadCell>
                      </TableRow>

                      {datarps.map((datas) => (
                        <TableBody>
                          {datas.cpmk.map((rpsitem) => (
                            <TableRow>
                              <DataTableBodyCell>
                                <MDBox
                                  display="inline-block"
                                  color="text"
                                  fontSize={size.sm}
                                  px={1.5}
                                >
                                  {rpsitem.code}
                                </MDBox>
                              </DataTableBodyCell>
                              <DataTableBodyCell>
                                <MDBox
                                  display="inline-block"
                                  color="text"
                                  width="50em"
                                  fontSize={size.sm}
                                  px={1.5}
                                >
                                  {rpsitem.name}
                                </MDBox>
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      ))}
                    </Table>
                  </MDBox>
                </TableContainer>

                {/* Tabel Akhir */}
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(DetailRPS);
