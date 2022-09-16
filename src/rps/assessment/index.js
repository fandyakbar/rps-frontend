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

import axios from "axios";

//icon
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

// Link
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Assessment() {
  // Rubrik
  const [listRubrik, setlistRubrik] = useState([]);
  const { size } = typography;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios
      .get("http://127.0.0.1:8000/api/listrubrik")

      .then((response) => {
        setlistRubrik(response.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                  <MDTypography variant="h6" color="white">
                    Assessment RPS
                  </MDTypography>
                </MDBox>

                {/* Tabel Mulai */}

                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Table size="small">
                      <TableRow>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Code </MDTypography>
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Nama Mata Kuliah </MDTypography>
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> SKS </MDTypography>
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Semester </MDTypography>
                        </DataTableHeadCell>
                        <DataTableHeadCell component="th" align="center">
                          <MDTypography variant="h6"> Aksi </MDTypography>
                        </DataTableHeadCell>
                      </TableRow>

                      <TableBody>
                        {listRubrik.map((list) => (
                          <TableRow>
                            <DataTableBodyCell>{list.code}</DataTableBodyCell>
                            <DataTableBodyCell>{list.name}</DataTableBodyCell>
                            <DataTableBodyCell>{list.credit}</DataTableBodyCell>
                            <DataTableBodyCell>{list.semester}</DataTableBodyCell>
                            <DataTableBodyCell>
                              <Link to={`/assessment_detail/${list.course_plan_id}`}>
                                <MDButton
                                  variant="gradient"
                                  color="info"
                                  fontSize="medium"
                                  iconOnly={true}
                                >
                                  <ManageSearchIcon />
                                </MDButton>
                              </Link>
                            </DataTableBodyCell>
                          </TableRow>
                        ))}
                      </TableBody>
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

export default Assessment;
