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
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import reportsLineChartData from "layouts/rtl/data/reportsLineChartData";

// RTL components
import Projects from "layouts/rtl/components/Projects";
import OrdersOverview from "layouts/rtl/components/OrdersOverview";

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

// DataTable
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

function halo(persens) {
  if (persens != 0) {
    return persens + " %";
  } else {
    return "";
  }
}

function cekIndeks(cpmkid, idkey, presen) {
  if (cpmkid == idkey) {
    return <DataTableBodyCell align="center">{halo(presen)}</DataTableBodyCell>;
  } else {
    return "";
  }
}

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const { sales, tasks } = reportsLineChartData;

  // Changing the direction to rtl
  // useEffect(() => {
  //   setDirection(dispatch, "rtl");

  //   return () => setDirection(dispatch, "ltr");
  // }, []);

  // Rubrik
  const [rubrik, setRubrik] = useState([]);
  const { size } = typography;

  useEffect(async () => {
    let result = await fetch("http://127.0.0.1:8000/api/rubrik");
    result = await result.json();
    setRubrik(result);
  }, []);

  // Penilaian
  const [penilaian, setPenilaian] = useState([]);

  useEffect(async () => {
    let result = await fetch("http://127.0.0.1:8000/api/penilaian");
    result = await result.json();
    setPenilaian(result);
  }, []);

  // CPMK
  const [cpmk, setCPMK] = useState([]);

  useEffect(async () => {
    let result = await fetch("http://127.0.0.1:8000/api/cpmk");
    result = await result.json();
    setCPMK(result);
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
                    Rubrik Penilaian
                  </MDTypography>
                </MDBox>

                {/* Tabel Mulai */}

                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    <Table size="small">
                      <TableRow>
                        <MDBox component="th" align="center">
                          <MDTypography variant="h6">CPMK \ Assessment </MDTypography>
                        </MDBox>

                        {penilaian.map((item) => (
                          <DataTableHeadCell align="center">{item.name}</DataTableHeadCell>
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
                        {cpmk.map((cpk, indexy) => (
                          <TableRow>
                            <MDBox align="justify" component="td">
                              <MDBox
                                display="inline-block"
                                width="20em"
                                color="text"
                                fontSize={size.sm}
                                px={1.5}
                              >
                                {cpk.name}
                              </MDBox>
                            </MDBox>

                            {rubrik.map((persen, index) =>
                              cekIndeks(cpk.id, persen.id_cpmk, persen.precentage)
                            )}
                            <DataTableBodyCell align="justify">
                              <MDBox
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                flexWrap="wrap"
                                color="text"
                                fontSize={size.sm}
                                px={1.5}
                              >
                                <MDTypography variant="h6">{halo(cpk.precentages)}</MDTypography>
                              </MDBox>
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

export default RTL;
