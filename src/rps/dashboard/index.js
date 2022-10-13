import React, { useState, useEffect, useRef } from "react";

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

import PrintIcon from "@mui/icons-material/Print";

// Link
import { Link } from "react-router-dom";

// modal
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

// JSODF
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Notifikasi
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//
import { ReactToPrint } from "react-to-print";
import { useReactToPrint } from "react-to-print";

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
import { List } from "@mui/material";
import Kop from "assets/images/logo-ct.png";
import { convertLength } from "@mui/material/styles/cssUtils";

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

function createMarkup() {
  return { __html: "First &middot; Second" };
}

function cekId(idkriteria, idparam, nilai) {
  if (idkriteria == idparam) {
    return nilai;
  }
}

function cekIndeks(idnilai, idassess, nilainya) {
  if (idnilai == idassess) {
    return <DataTableBodyCell align="center">{cekNilai(nilainya)}</DataTableBodyCell>;
  } else {
    return "";
  }
}

function convertBaris(replaceNilai) {
  return replaceNilai.replace(/\r\n/g, "<br/>");
}

function ShowRubrikDashboard(props) {
  // cpmk
  const [rubriks, setRubriks] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [dataTask, setDataTask] = useState([]);
  const [nilainya, setNilainya] = useState("");

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
  const fetchDatas = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/rubrikassessments/${id_course}`)

      .then((response) => {
        setDetailData(response.data);
      });
  };

  const fetchDataTask = async () => {
    await axios
      .get(`http://127.0.0.1:8000/api/task/${id_course}`)

      .then((response) => {
        setDataTask(response.data);
      });
  };

  useEffect(() => {
    fetchDataUser();
    fetchData();
    fetchDatas();
    fetchDataTask();
  }, []);

  console.warn("di sini cek", rubriks);
  console.log("cek data ases", detailData);

  const componentRef = useRef();
  const printHandler = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "testing",
    onAfterPrint: () => alert("sukes rint "),
  });

  return (
    <DashboardLayout>
      <ToastContainer />
      <DashboardNavbar />
      {rubriks.map((datas) => (
        <MDBox py={3}>
          {dataTask.map((tasks) => (
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
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={11}>
                              <MDTypography variant="h6" color="white">
                                Rubrik {mk.name}
                              </MDTypography>
                            </Grid>

                            <Grid item xs={12} md={6} lg={1}>
                              <MDBox px={4} align="right">
                                {detailData.map((datass) => (
                                  <MDButton
                                    variant="contained"
                                    color="light"
                                    size="medium"
                                    iconOnly={true}
                                    onClick={() => {
                                      toast.info("Sedang Memuat PDF");
                                      const doc = new jsPDF();
                                      var width = doc.internal.pageSize.getWidth();

                                      let img = new Image();

                                      img.src = Kop;

                                      doc.addImage(img, "png", width / 2 - 19, 0, 38, 39);

                                      doc.setFontSize(12);
                                      var text = "RENCANA PEMBELAJARAN SEMESTER",
                                        xOffset = width / 2 - 40;
                                      doc.text(text, xOffset, 50);

                                      doc.setFontSize(9);
                                      doc.text("mata kuliah: " + mk.name, 20, 60);
                                      doc.text("semester: " + mk.semester, 20, 65);
                                      doc.text("SKS: " + mk.credit, 20, 70);

                                      doc.text("Dosen Pengampu :", width - 60, 60);
                                      datas.namaDosen.map((namdos, index) => {
                                        doc.text(namdos, width - 60, 65 + index * 5);
                                      });
                                      doc.setFontSize(12);
                                      doc.text("Bagian 1 Tabel Rencana Assessment", 20, 90);

                                      autoTable(doc, {
                                        startY: 95,
                                        head: [datas.kolomPDF],
                                        body: datas.tabelPDF,
                                        margin: { top: 25, bottom: 15 },
                                        styles: { overflow: "linebreak", fontSize: 8 },
                                        showHeader: "everyPage",
                                        theme: "grid",
                                      });

                                      tasks.tugas.map((tasknya, indexy) => {
                                        doc.addPage();
                                        doc.setFontSize(12);
                                        doc.text("Bagian 2 Penugasan Mata Kuliah", 20, 20);
                                        doc.text(tasknya.name, 20, 30);

                                        doc.setFontSize(10);
                                        autoTable(doc, {
                                          startY: 40,
                                          head: [["Tema"]],
                                          body: [[tasknya.theme]],
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        let datacpmk = [];

                                        datas.cpmk.map((itemcpmk, index) => {
                                          datacpmk[index] = [
                                            "(" + itemcpmk.code + ") " + itemcpmk.name,
                                          ];
                                        });

                                        autoTable(doc, {
                                          startY: 65,
                                          head: [["CPMK yang Hendak Dicapai"]],
                                          body: datacpmk,
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        autoTable(doc, {
                                          startY: 140,
                                          head: [["Deskripsi"]],
                                          body: [[tasknya.description]],
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        autoTable(doc, {
                                          startY: 160,
                                          head: [["Langkah Pengerjaan"]],
                                          body: [[tasknya.step]],
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        autoTable(doc, {
                                          startY: 220,
                                          head: [["Luaran Tugas"]],
                                          body: [[tasknya.output]],
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });
                                      });

                                      datass.assessment.map((detailAs, index) => {
                                        doc.addPage();
                                        doc.setFontSize(12);
                                        doc.text("Bagian 3 Rubrik Penilaian", 20, 20);

                                        autoTable(doc, {
                                          startY: 30,
                                          head: [[detailAs.name]],
                                          body: [
                                            ["Nomor Kelompok"],
                                            ["Nama (NIM) Anggota"],
                                            ["1. \n2. \n3."],
                                          ],
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        let datacpmk2 = [];

                                        datass.cpmk[index].map((cpmknya, inss) => {
                                          datacpmk2[inss] = [
                                            "(" + cpmknya.code + ") " + cpmknya.name,
                                          ];
                                        });

                                        autoTable(doc, {
                                          startY: 75,
                                          head: [["CPMK yang Diases"]],
                                          body: datacpmk2,
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });

                                        let dataKriteria = [];
                                        let codecpmk = [];
                                        let codecpmkDisplay = [];

                                        datass.datas[index].map((kriteria, insk) => {
                                          datass.cpmkcode[index].map((cpmkcodess, indexks) => {
                                            codecpmk[indexks] = cpmkcodess.code;
                                          });
                                          codecpmkDisplay[insk] = codecpmk;
                                          dataKriteria[insk] = [
                                            codecpmk,
                                            kriteria.criteria,
                                            kriteria.inferior,
                                            kriteria.average,
                                            kriteria.good,
                                            kriteria.Excellent,
                                          ];
                                        });

                                        autoTable(doc, {
                                          startY: 145,
                                          head: [
                                            [
                                              "CP-MK",
                                              "Kriteria",
                                              "Inferior",
                                              "Average",
                                              "Good",
                                              "Excellent",
                                            ],
                                          ],
                                          body: dataKriteria,
                                          margin: { top: 25, bottom: 15 },
                                          styles: { overflow: "linebreak", fontSize: 8 },
                                          showHeader: "everyPage",
                                          theme: "grid",
                                        });
                                      });

                                      doc.save("rubrik-" + mk.name + ".pdf");
                                    }}
                                  >
                                    <PrintIcon />
                                  </MDButton>
                                ))}
                              </MDBox>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    </MDBox>

                    {/* Data Tabel */}
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 1 Tabel Rencana Assessment</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>

                    <TableContainer>
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        p={1}
                      >
                        {datas.matkul.map((mk) => (
                          <Table size="small">
                            <TableRow>
                              <DataTableHeadCell width="5em">Semester</DataTableHeadCell>
                              <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                              <DataTableHeadCell fontSize="small">{mk.semester}</DataTableHeadCell>
                            </TableRow>
                            <TableRow>
                              <DataTableHeadCell width="5em">SKS</DataTableHeadCell>
                              <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                              <DataTableHeadCell>{mk.credit}</DataTableHeadCell>
                            </TableRow>

                            <TableRow>
                              <DataTableHeadCell width="5em">Dosen</DataTableHeadCell>
                              <DataTableHeadCell width="5em"> : </DataTableHeadCell>
                              <DataTableHeadCell>
                                {datas.namaDosen.map((namDos) => (
                                  <List>{namDos}</List>
                                ))}
                              </DataTableHeadCell>
                            </TableRow>
                          </Table>
                        ))}
                      </MDBox>
                    </TableContainer>

                    <DataTable
                      entriesPerPage={false}
                      table={{
                        columns: datas.kolom,
                        rows: datas.tabel,
                      }}
                    />

                    <MDBox
                      id="ambilPDF"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                    >
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 2 Format Tugas Proyek</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>
                    {tasks.tugas.map((tugasItem) => (
                      <MDBox px={3}>
                        <MDBox>
                          <TableRow fullWidth>
                            <MDBox>
                              <DataTableHeadCell align="center">
                                <MDTypography>{tugasItem.name}</MDTypography>
                              </DataTableHeadCell>
                            </MDBox>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Tema</DataTableHeadCell>
                          </TableRow>
                          <DataTableBodyCell>{tugasItem.theme}</DataTableBodyCell>

                          <TableRow>
                            <DataTableHeadCell>CPMK yang hendak dicapai</DataTableHeadCell>
                          </TableRow>
                          {datas.cpmk.map((cpmkrub) => (
                            <TableRow>
                              <DataTableBodyCell>
                                ({cpmkrub.code}) {cpmkrub.name}
                              </DataTableBodyCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <DataTableHeadCell>Deskripsi</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>{tugasItem.description}</DataTableBodyCell>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Langkah Pengerjaan</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: tugasItem.step.replace(/\n/g, "<br />"),
                                }}
                              ></div>
                            </DataTableBodyCell>
                          </TableRow>
                          <TableRow>
                            <DataTableHeadCell>Bentuk dan Format Luaran</DataTableHeadCell>
                          </TableRow>
                          <TableRow>
                            <DataTableBodyCell>{tugasItem.output}</DataTableBodyCell>
                          </TableRow>
                        </MDBox>
                      </MDBox>
                    ))}

                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
                      <DataTableHeadCell>
                        <MDTypography variant="h6">Bagian 3 Rubrik Penilaian</MDTypography>
                      </DataTableHeadCell>
                    </MDBox>
                    {detailData.map((datas) => (
                      <MDBox px={3}>
                        {datas.assessment.map((ases, indeks) => (
                          <MDBox>
                            <TableRow fullWidth>
                              <MDBox>
                                <DataTableHeadCell align="center">
                                  <MDTypography>{ases.name}</MDTypography>
                                </DataTableHeadCell>
                              </MDBox>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>Nomor Kelompok :</DataTableBodyCell>
                            </TableRow>

                            <TableRow>
                              <DataTableBodyCell>Nama (NIM) Anggota</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>1.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>2.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableBodyCell>3.</DataTableBodyCell>
                            </TableRow>
                            <TableRow>
                              <DataTableHeadCell>CPMK yang diases</DataTableHeadCell>
                            </TableRow>
                            {datas.cpmk[indeks].map((cpm) => (
                              <TableRow>
                                <DataTableBodyCell>
                                  ({cpm.code}) {cpm.name}
                                </DataTableBodyCell>
                              </TableRow>
                            ))}

                            <Table>
                              <TableRow>
                                <DataTableHeadCell component="th" align="center">
                                  CP-MK
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Kriteria
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Inferior
                                </DataTableHeadCell>

                                <DataTableHeadCell component="th" align="center">
                                  Average
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Good
                                </DataTableHeadCell>
                                <DataTableHeadCell component="th" align="center">
                                  Excellent
                                </DataTableHeadCell>
                              </TableRow>

                              <TableBody>
                                {datas.datas[indeks].map((kriteria) => (
                                  <TableRow>
                                    <DataTableBodyCell width="5em">
                                      {datas.cpmkcode[indeks].map((cpmkcodes) => (
                                        <p margin-bottom="1em">
                                          {cekId(cpmkcodes.id, kriteria.id, cpmkcodes.code)}
                                        </p>
                                      ))}
                                    </DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.criteria}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.inferior}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.average}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.good}</DataTableBodyCell>
                                    <DataTableBodyCell>{kriteria.Excellent}</DataTableBodyCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </MDBox>
                        ))}
                        <Table size="small"></Table>
                      </MDBox>
                    ))}
                    {/* Data Tabel */}
                  </Card>
                </Grid>
              </Grid>
            </MDBox>
          ))}
        </MDBox>
      ))}
      <Footer />
    </DashboardLayout>
  );
}

export default withRouter(ShowRubrikDashboard);
