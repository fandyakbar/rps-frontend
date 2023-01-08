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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
// Tabel
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import DataTableHeadCell from "examples/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "examples/Tables/DataTable/DataTableBodyCell";

import backgroundImage from "assets/images/bg-profile.jpeg";

import axios from "axios";

import { Link } from "react-router-dom";
import MDButton from "components/MDButton";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

import MDAvatar from "components/MDAvatar";
import burceMars from "assets/images/profile.jpg";

import { Card } from "@mui/material";

import DataTable from "examples/Tables/DataTable";
import MDBadge from "components/MDBadge";

//
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// loader
import { PacmanLoader } from "react-spinners";

function displayRPS(list, datas, user, indeks, ngecek) {
  if (ngecek.lecturer_id == user.id) {
    return (
      <TableRow>
        <DataTableBodyCell>{list.semester}</DataTableBodyCell>
        <DataTableBodyCell>{list.code}</DataTableBodyCell>
        <DataTableBodyCell>{list.name}</DataTableBodyCell>
        <DataTableBodyCell>{list.credit}</DataTableBodyCell>
        <DataTableBodyCell>
          {(() => {
            return (
              <Link to={`/dashboard/${list.id}`}>
                <MDButton variant="gradient" color="info" fontSize="medium" iconOnly={true}>
                  <ManageSearchIcon />
                </MDButton>
              </Link>
            );
          })()}
        </DataTableBodyCell>
      </TableRow>
    );
  }
}

function RPS() {
  // Data Tabel Manual

  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#4bace9");

  // Rubrik
  const [listRPS, setListRPS] = useState([]);

  const [hitung, setHitung] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("http://127.0.0.1:8000/api/dashboard")

      .then((response) => {
        setListRPS(response.data);
        console.warn("haloo", response.data);
      });
    setLoading(false);
  };

  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchDataUser = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await axios.get("http://127.0.0.1:8000/api/auth/me").then((response) => {
      setUser(response.data);
    });
  };

  console.log("id user nih bos", user.id);

  function displayRPSAdmin(list, datas, user, indeks, ngecek, itung) {
    if (ngecek.lecturer_id == user.id) {
      return (
        <Link to={`/dashboard/${list.id}`}>
          <MDButton variant="gradient" color="info" fontSize="medium" iconOnly={true}>
            <ManageSearchIcon />
          </MDButton>
        </Link>
      );
    } else {
      if (itung <= 0) {
        if (datas.checker[indeks] === 100) {
          return (
            <Link to={`/dashboards/${list.id}`}>
              <MDButton
                title="Lihat Detail"
                variant="gradient"
                color="success"
                fontSize="medium"
                iconOnly={true}
              >
                <ManageSearchIcon />
              </MDButton>
            </Link>
          );
        } else {
          return <MDBadge badgeContent="RPS Belum Tersedia" color="warning" size="xs" container />;
        }
      }
    }
  }

  useEffect(() => {
    fetchDataUser();
    fetchData();
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="15rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <MDBox mt={3} mb={0}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4}></Grid>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />

              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
        {(() => {
          if (user.type === "D") {
            return (
              <div>
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
                  <>
                    <MDBox pt={0} px={2} lineHeight={1.25}>
                      <MDTypography variant="h6" fontWeight="medium">
                        RPS Mata Kuliah
                      </MDTypography>
                      <MDBox mb={1}>
                        <MDTypography variant="button" color="text">
                          Lihat Daftar RPS di Sini
                        </MDTypography>
                      </MDBox>
                    </MDBox>

                    <TableContainer>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={3}
                      >
                        {listRPS.map((datas) => (
                          <Table size="small">
                            <TableRow>
                              <DataTableHeadCell>Semester</DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                Kode
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                Nama Mata Kuliah
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                SKS
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center" alignItems="center">
                                Aksi
                              </DataTableHeadCell>
                            </TableRow>

                            {datas.rps.map((list, indeks) => (
                              <TableBody>
                                {list.course_plan_lecturer.map((ngecek) =>
                                  displayRPS(list, datas, user, indeks, ngecek)
                                )}
                              </TableBody>
                            ))}
                          </Table>
                        ))}
                      </MDBox>
                    </TableContainer>
                    {/* Tabel Akhir */}
                  </>
                )}
              </div>
            );
          } else if (user.type === "M") {
            return (
              <div>
                <MDBox pt={0} px={2} lineHeight={1.25}>
                  <MDTypography variant="h6" fontWeight="medium">
                    RPS Mata Kuliah
                  </MDTypography>
                  <MDBox mb={1}>
                    <MDTypography variant="button" color="text">
                      Lihat Daftar RPS di Sini
                    </MDTypography>
                  </MDBox>
                </MDBox>

                <TableContainer>
                  <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                    {listRPS.map((datas) => (
                      <Table size="small">
                        <TableRow>
                          <DataTableHeadCell>Semester</DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            Kode
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            Nama Mata Kuliah
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center">
                            SKS
                          </DataTableHeadCell>
                          <DataTableHeadCell component="th" align="center" alignItems="center">
                            Aksi
                          </DataTableHeadCell>
                        </TableRow>

                        {datas.rps.map((list, indeks) => (
                          <TableBody>
                            <TableRow>
                              <DataTableBodyCell>{list.semester}</DataTableBodyCell>
                              <DataTableBodyCell>{list.code}</DataTableBodyCell>
                              <DataTableBodyCell>{list.name}</DataTableBodyCell>
                              <DataTableBodyCell>{list.credit}</DataTableBodyCell>
                              <DataTableBodyCell>
                                {(() => {
                                  if (datas.checker[indeks] === 100) {
                                    return (
                                      <Link to={`/dashboard/${list.id}`}>
                                        <MDButton
                                          title="Lihat Detail"
                                          variant="gradient"
                                          color="info"
                                          fontSize="medium"
                                          iconOnly={true}
                                        >
                                          <ManageSearchIcon />
                                        </MDButton>
                                      </Link>
                                    );
                                  } else {
                                    return (
                                      <MDBadge
                                        badgeContent="RPS Belum Tersedia"
                                        color="warning"
                                        size="xs"
                                        container
                                      />
                                    );
                                  }
                                })()}
                              </DataTableBodyCell>
                            </TableRow>
                          </TableBody>
                        ))}
                      </Table>
                    ))}
                  </MDBox>
                </TableContainer>
                {/* Tabel Akhir */}
              </div>
            );
          } else if (user.type === "T") {
            return (
              <div>
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
                  <>
                    <MDBox pt={0} px={2} lineHeight={1.25}>
                      <MDTypography variant="h6" fontWeight="medium">
                        RPS Mata Kuliah
                      </MDTypography>
                      <MDBox mb={1}>
                        <MDTypography variant="button" color="text">
                          Lihat Daftar RPS di Sini
                        </MDTypography>
                      </MDBox>
                    </MDBox>

                    <TableContainer>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={3}
                      >
                        {listRPS.map((datas) => (
                          <Table size="small">
                            <TableRow>
                              <DataTableHeadCell>Semester</DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                Kode
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                Nama Mata Kuliah
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                SKS
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center">
                                Dosen Pengampu
                              </DataTableHeadCell>
                              <DataTableHeadCell component="th" align="center" alignItems="center">
                                Aksi
                              </DataTableHeadCell>
                            </TableRow>

                            {datas.rps.map((list, indeks) => (
                              <TableBody>
                                <TableRow>
                                  <DataTableBodyCell>{list.semester}</DataTableBodyCell>
                                  <DataTableBodyCell>{list.code}</DataTableBodyCell>
                                  <DataTableBodyCell>{list.name}</DataTableBodyCell>
                                  <DataTableBodyCell>{list.credit}</DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {list.course_plan_lecturer.map((dosen) => (
                                      <>
                                        {dosen.lecturer.name} <br />
                                      </>
                                    ))}
                                  </DataTableBodyCell>
                                  <DataTableBodyCell>
                                    {list.course_plan_lecturer.map((ngecek, itung) =>
                                      displayRPSAdmin(list, datas, user, indeks, ngecek, itung)
                                    )}
                                  </DataTableBodyCell>
                                </TableRow>
                              </TableBody>
                            ))}
                          </Table>
                        ))}
                      </MDBox>
                    </TableContainer>
                    {/* Tabel Akhir */}
                  </>
                )}
              </div>
            );
          }
        })()}
      </Card>

      <Footer />
    </DashboardLayout>
  );
}

export default RPS;
